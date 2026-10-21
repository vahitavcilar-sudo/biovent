<?php
declare(strict_types=1);
// PHP 8.1+. Private durable outbox shared by two independent public endpoints.
final class BioVentFailure extends RuntimeException {
    public function __construct(public int $status, string $reason) { parent::__construct($reason); }
}
function bv_fail(int $status, string $reason): never { throw new BioVentFailure($status, $reason); }
function bv_atomic(string $path, array $value): void {
    $temporary = $path . '.' . bin2hex(random_bytes(8)) . '.tmp';
    $file = @fopen($temporary, 'x');
    if (!$file) bv_fail(503, 'storage-unavailable');
    try {
        $data = json_encode($value, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
        if (fwrite($file, $data) !== strlen($data) || !fflush($file)) bv_fail(503, 'storage-unavailable');
        if (function_exists('fsync') && !fsync($file)) bv_fail(503, 'storage-unavailable');
    } catch (Throwable $error) { @unlink($temporary); throw $error; } finally { fclose($file); }
    if (!@rename($temporary, $path)) { @unlink($temporary); bv_fail(503, 'storage-unavailable'); }
    @chmod($path, 0600);
}
function bv_private_path(string $path, string $documentRoot): string {
    $real = realpath($path); $public = realpath($documentRoot);
    if (!$real || ($public && ($real === $public || str_starts_with($real, $public . DIRECTORY_SEPARATOR)))) bv_fail(503, 'private-storage-required');
    return $real;
}
function bv_field(array $data, string $name, int $limit, bool $required = false, bool $multiline = false): string {
    $value = $data[$name] ?? null;
    if (!is_string($value) || !preg_match('//u', $value) || preg_match_all('/./us', $value) > $limit || str_contains($value, "\0")) bv_fail(422, 'invalid-field');
    $value = trim($value);
    if (($required && $value === '') || (!$multiline && preg_match('/[\r\n]/', $value))) bv_fail(422, 'invalid-field');
    return $value;
}
function bv_validate(string $kind, array $data, array $registry, array $components = []): array {
    if (($data['honeypot'] ?? null) !== '' || ($data['consent'] ?? null) !== true || !in_array($data['locale'] ?? null, ['en','de','tr','ar'], true)) bv_fail(422, 'invalid-request');
    $fields = ['kind'=>$kind,'locale'=>$data['locale'],'consent'=>true];
    foreach (['company','contactName','country','email','phone'] as $name) $fields[$name] = bv_field($data, $name, $name === 'email' ? 254 : 160, $name !== 'phone');
    if (!filter_var($fields['email'], FILTER_VALIDATE_EMAIL)) bv_fail(422, 'invalid-email');
    if ($kind === 'distributor') {
        $fields['website'] = bv_field($data, 'website', 254);
        if ($fields['website'] && (!filter_var($fields['website'], FILTER_VALIDATE_URL) || !in_array(parse_url($fields['website'], PHP_URL_SCHEME), ['http','https'], true))) bv_fail(422, 'invalid-website');
        $fields['experience'] = bv_field($data, 'experience', 2000, false, true);
        $ids = $data['products'] ?? null;
        if (!is_array($ids) || !array_is_list($ids) || count($ids) < 1 || count($ids) > 4 || count(array_unique($ids, SORT_REGULAR)) !== count($ids)) bv_fail(422, 'invalid-products');
        foreach ($ids as $id) if (!is_string($id) || !isset($registry[$id])) bv_fail(422, 'invalid-products');
        $fields['products'] = $ids;
    } else {
        if (($data['kind'] ?? null) !== 'professional' || !in_array($data['purpose'] ?? null, ['information','quotation'], true)) bv_fail(422, 'invalid-purpose');
        $id = $data['product'] ?? null;
        if (!is_string($id) || !isset($registry[$id])) bv_fail(422, 'invalid-product');
        $componentId=$data['component']??null;$component=null;
        if($componentId!==null){if(!is_string($componentId))bv_fail(422,'invalid-component');foreach($components[$id]??[] as $entry)if($entry['id']===$componentId){$component=$entry;break;}if(!$component)bv_fail(422,'invalid-component');}
        $fields['component']=$component;
        $fields['product'] = $id; $fields['purpose'] = $data['purpose']; $fields['message'] = bv_field($data, 'message', 2000, false, true);
        $quantity = $data['quantity'] ?? null;
        if (!array_key_exists('quantity', $data) || ($quantity !== null && (!is_int($quantity) || $quantity < 1 || $quantity > 100000))) bv_fail(422, 'invalid-quantity');
        $fields['quantity'] = $quantity;
        foreach (['diameter','length','reference'] as $key) if (!array_key_exists($key, $data)) bv_fail(422, 'invalid-configuration');
        $variant = null;
        if ($data['diameter'] === null && $data['length'] === null) {
            if ($data['reference'] !== null) bv_fail(422, 'invalid-reference');
        } else {
            if ((!is_int($data['diameter']) && !is_float($data['diameter'])) || (!is_int($data['length']) && !is_float($data['length']))) bv_fail(422, 'invalid-configuration');
            foreach ($registry[$id] as $candidate) if ($candidate['diameter'] == $data['diameter'] && $candidate['length'] == $data['length']) { $variant = $candidate; break; }
            if (!$variant || ($variant['reference'] ?? null) !== $data['reference']) bv_fail(422, 'invalid-reference');
        }
        $fields['diameter'] = $variant['diameter'] ?? null; $fields['length'] = $variant['length'] ?? null; $fields['reference'] = $variant['reference'] ?? null;
        $fields['source'] = $variant['source'] ?? null;
    }
    return $fields;
}
function bv_receive(string $kind, array $request, array $config): array {
    if (!in_array($kind, ['professional','distributor'], true)) bv_fail(404, 'not-found');
    if (($request['method'] ?? '') !== 'POST') bv_fail(405, 'method-not-allowed');
    $origin = $config['origin'] ?? ''; $recipient = $config['recipients'][$kind] ?? ''; $sender = $config['sender'] ?? '';
    if (!$origin || !filter_var($recipient, FILTER_VALIDATE_EMAIL) || !filter_var($sender, FILTER_VALIDATE_EMAIL) || strlen($config['rateSalt'] ?? '') < 32 || (!is_int($config['retentionDays']??null)||$config['retentionDays']<1||$config['retentionDays']>3650) || empty($config['approvedPrivacyVersion'])) bv_fail(503, 'not-configured');
    if (($request['origin'] ?? '') !== rtrim($origin, '/')) bv_fail(403, 'origin-denied');
    if (!str_starts_with(strtolower($request['contentType'] ?? ''), 'application/json')) bv_fail(415, 'json-required');
    $raw = $request['body'] ?? '';
    if (!is_string($raw) || strlen($raw) > 16384) bv_fail(413, 'body-too-large');
    try { $data = json_decode($raw, true, 16, JSON_THROW_ON_ERROR); } catch (Throwable $error) { bv_fail(400, 'invalid-json'); }
    if (!is_array($data) || array_is_list($data)) bv_fail(400, 'invalid-json');
    $root = bv_private_path((string)($config['storageDirectory'] ?? ''), (string)($request['documentRoot'] ?? ''));
    if (!is_dir($root) || !is_writable($root)) bv_fail(503, 'storage-unavailable');
    $registryFile = bv_private_path((string)($config['registryFile'] ?? ''), (string)($request['documentRoot'] ?? ''));
    if (!hash_equals((string)($config['registrySHA256'] ?? ''), hash_file('sha256', $registryFile))) bv_fail(503, 'registry-mismatch');
    try { $registry = json_decode(file_get_contents($registryFile), true, 16, JSON_THROW_ON_ERROR); } catch (Throwable $error) { bv_fail(503, 'registry-unavailable'); }
    if (!is_array($registry)) bv_fail(503, 'registry-unavailable');
    $components=[];
    if(!empty($config['componentsFile'])){$componentFile=bv_private_path($config['componentsFile'],(string)($request['documentRoot']??''));if(!hash_equals($config['componentsSHA256']??'',hash_file('sha256',$componentFile)))bv_fail(503,'components-mismatch');try{$components=json_decode(file_get_contents($componentFile),true,16,JSON_THROW_ON_ERROR);}catch(Throwable $error){bv_fail(503,'components-unavailable');}if(!is_array($components))bv_fail(503,'components-unavailable');}
    $fields = bv_validate($kind, $data, $registry, $components);
    $key = $request['idempotencyKey'] ?? '';
    if (!is_string($key) || !preg_match('/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i', $key)) bv_fail(422, 'invalid-idempotency-key');
    $hash = hash('sha256', json_encode($fields, JSON_THROW_ON_ERROR));
    $reference = 'BV-' . ($kind === 'professional' ? 'P-' : 'D-') . strtoupper(substr(hash_hmac('sha256', $kind . ':' . strtolower($key), $config['rateSalt']), 0, 20));
    umask(0077);
    foreach (['requests','rates'] as $dir) if (!is_dir($root.'/'.$dir) && !@mkdir($root.'/'.$dir, 0700) && !is_dir($root.'/'.$dir)) bv_fail(503, 'storage-unavailable');
    $lock = @fopen($root.'/submit.lock', 'c+');
    if (!$lock || !flock($lock, LOCK_EX)) bv_fail(503, 'storage-unavailable');
    try {
        $path = $root.'/requests/'.$reference.'.json';
        if (is_file($path)) {
            $existing = json_decode(file_get_contents($path), true);
            if(!is_array($existing)||!is_string($existing['payloadHash']??null))bv_fail(503,'receipt-unavailable');
            if (!hash_equals($existing['payloadHash'], $hash)) bv_fail(409, 'idempotency-conflict');
            return ['accepted'=>true,'reference'=>$reference,'status'=>'received'];
        }
        $ip = (string)($request['peerIP'] ?? 'unknown'); // Adapter uses REMOTE_ADDR only, never forwarded input.
        $ratePath = $root.'/rates/'.hash_hmac('sha256', $ip, $config['rateSalt']).'.json';
        $rate = is_file($ratePath) ? json_decode(file_get_contents($ratePath), true) : [];
        $now = time(); $hits = array_values(array_filter(is_array($rate) ? ($rate['hits'] ?? []) : [], fn($t)=>is_int($t) && $t > $now-3600));
        if (count($hits) >= 5 || ($hits && max($hits) > $now-60)) bv_fail(429, 'rate-limited');
        $hits[] = $now; bv_atomic($ratePath, ['hits'=>$hits]);
        bv_atomic($path, ['reference'=>$reference,'kind'=>$kind,'receivedAt'=>gmdate('c'),'receivedTimestamp'=>$now,'privacyVersion'=>$config['approvedPrivacyVersion'],'payloadHash'=>$hash,'delivery'=>'queued','attempts'=>0,'fields'=>$fields]);
        // The durable receipt is the authoritative log. This auxiliary log deliberately omits contact fields.
        @file_put_contents($root.'/events.ndjson', json_encode(['reference'=>$reference,'kind'=>$kind,'event'=>'received','at'=>gmdate('c')])."\n", FILE_APPEND | LOCK_EX);
        return ['accepted'=>true,'reference'=>$reference,'status'=>'received'];
    } finally { flock($lock, LOCK_UN); fclose($lock); }
}
function bv_http(string $kind): never {
    header('Content-Type: application/json; charset=utf-8'); header('Cache-Control: no-store'); header('X-Content-Type-Options: nosniff');
    try {
        $root = (string)getenv('BIOVENT_FORM_PRIVATE_ROOT');
        bv_private_path($root, (string)($_SERVER['DOCUMENT_ROOT'] ?? ''));
        $configFile = $root.'/config.php';
        if (!is_file($configFile)) bv_fail(503, 'not-configured');
        $config = require $configFile;
        if (!is_array($config)) bv_fail(503, 'not-configured');
        $body = file_get_contents('php://input', false, null, 0, 16385);
        $result = bv_receive($kind, ['method'=>$_SERVER['REQUEST_METHOD'] ?? '', 'origin'=>$_SERVER['HTTP_ORIGIN'] ?? '', 'contentType'=>$_SERVER['CONTENT_TYPE'] ?? '', 'body'=>$body === false ? '' : $body, 'idempotencyKey'=>$_SERVER['HTTP_IDEMPOTENCY_KEY'] ?? '', 'peerIP'=>$_SERVER['REMOTE_ADDR'] ?? '', 'documentRoot'=>$_SERVER['DOCUMENT_ROOT'] ?? ''], $config);
        http_response_code(202); echo json_encode($result);
    } catch (BioVentFailure $error) {
        http_response_code($error->status); if ($error->status === 429) header('Retry-After: 60'); if ($error->status === 405) header('Allow: POST');
        echo json_encode(['accepted'=>false,'error'=>$error->getMessage()]);
    } catch (Throwable $error) { http_response_code(503); echo json_encode(['accepted'=>false,'error'=>'temporarily-unavailable']); }
    exit;
}
