<?php
declare(strict_types=1);
require __DIR__.'/../../deployment/form-backend/private/receiver.php';
$repository = dirname(__DIR__, 2); $root = sys_get_temp_dir().'/biovent-php-test-'.bin2hex(random_bytes(6)); mkdir($root, 0700); mkdir($root.'/public', 0700); mkdir($root.'/store', 0700);
$config = ['origin'=>'https://biovent.test','recipients'=>['professional'=>'professional@example.test','distributor'=>'distribution@example.test'],'sender'=>'sender@example.test','storageDirectory'=>$root.'/store','registryFile'=>$repository.'/data/product-variants.json','registrySHA256'=>hash_file('sha256',$repository.'/data/product-variants.json'),'componentsFile'=>$repository.'/data/prosthetic-components.json','componentsSHA256'=>hash_file('sha256',$repository.'/data/prosthetic-components.json'),'rateSalt'=>str_repeat('x',64),'retentionDays'=>30,'approvedPrivacyVersion'=>'synthetic-test-only'];
$checks=[];
function check(bool $condition, string $name): void { global $checks; if (!$condition) throw new RuntimeException($name); $checks[]=$name; }
function key_for(int $n): string { return sprintf('00000000-0000-4000-8000-%012d', $n); }
function request_for(array $data, int $n): array { global $root; return ['method'=>'POST','origin'=>'https://biovent.test','contentType'=>'application/json','body'=>json_encode($data),'idempotencyKey'=>key_for($n),'peerIP'=>'192.0.2.'.$n,'documentRoot'=>$root.'/public']; }
function expect_failure(int $status, string $kind, array $request, array $config, string $name): void { try { bv_receive($kind,$request,$config); check(false,$name); } catch (BioVentFailure $error) { check($error->status===$status,$name); } }
$base=['kind'=>'professional','purpose'=>'quotation','company'=>'Synthetic clinic','contactName'=>'Test person','country'=>'Germany','email'=>'test@example.test','phone'=>'','product'=>'smart','diameter'=>4,'length'=>5,'reference'=>null,'quantity'=>2,'message'=>'Synthetic local test.','locale'=>'en','consent'=>true,'honeypot'=>''];
$request=request_for($base,1); $accepted=bv_receive('professional',$request,$config); check($accepted['accepted']&&str_starts_with($accepted['reference'],'BV-P-'),'durable receipt accepted');
$again=bv_receive('professional',$request,$config); check($again['reference']===$accepted['reference']&&count(glob($root.'/store/requests/*.json'))===1,'same-key retry returns one receipt');
$record=json_decode(file_get_contents($root.'/store/requests/'.$accepted['reference'].'.json'),true);check($record['delivery']==='queued'&&$record['fields']['diameter']===4&&$record['fields']['source']['page']===8,'server-derived catalogue and queued status');
expect_failure(409,'professional',request_for(array_replace($base,['company'=>'Different']),1),$config,'idempotency conflict');
foreach ([['diameter'=>5],['length'=>99],['reference'=>'FORGED'],['diameter'=>5.5,'length'=>15],['consent'=>false],['email'=>"a@example.test\r\nBcc: x@example.test"],['honeypot'=>'bot'],['quantity'=>1.5],['locale'=>'xx'],['contactName'=>str_repeat('ü',161)],['message'=>"bad\0text"]] as $i=>$patch) expect_failure(422,'professional',request_for(array_replace($base,$patch),$i+10),$config,'invalid fields '.$i);
foreach (['smart','promx','monoblock','zygoma'] as $i=>$family) { $data=array_replace($base,['product'=>$family,'diameter'=>null,'length'=>null,'reference'=>null]);check(bv_receive('professional',request_for($data,$i+30),$config)['accepted'],'product-level '.$family); }
check(bv_receive('professional',request_for(array_replace($base,['component'=>'multi-unit']),40),$config)['accepted'],'documented component accepted');
expect_failure(422,'professional',request_for(array_replace($base,['product'=>'promx','diameter'=>null,'length'=>null,'component'=>'multi-unit']),41),$config,'cross-family component rejected');
expect_failure(422,'professional',request_for(array_replace($base,['component'=>'imagined-ti-base']),42),$config,'unknown component rejected');
$dist=['company'=>'Synthetic distributor','contactName'=>'Test distributor','email'=>'distribution@example.test','website'=>'https://example.test','country'=>'Türkiye','phone'=>'','experience'=>'No real transmission','products'=>['smart','zygoma'],'locale'=>'tr','consent'=>true,'honeypot'=>''];check(str_starts_with(bv_receive('distributor',request_for($dist,50),$config)['reference'],'BV-D-'),'independent distributor receipt');
expect_failure(422,'distributor',request_for(array_replace($dist,['products'=>['smart','smart']]),51),$config,'duplicate product rejected');
expect_failure(422,'distributor',request_for(array_replace($dist,['website'=>'javascript:alert(1)']),52),$config,'unsafe website rejected');
expect_failure(403,'professional',array_replace(request_for($base,60),['origin'=>'https://other.test']),$config,'foreign origin rejected');
expect_failure(405,'professional',array_replace(request_for($base,61),['method'=>'GET']),$config,'method rejected');
expect_failure(415,'professional',array_replace(request_for($base,62),['contentType'=>'text/plain']),$config,'content type rejected');
expect_failure(413,'professional',array_replace(request_for($base,63),['body'=>str_repeat('x',16385)]),$config,'oversized body rejected');
expect_failure(400,'professional',array_replace(request_for($base,64),['body'=>'{invalid']),$config,'malformed JSON rejected');
expect_failure(422,'professional',array_replace(request_for($base,65),['idempotencyKey'=>'../unsafe']),$config,'invalid retry key rejected');
expect_failure(503,'professional',request_for($base,66),array_replace($config,['registrySHA256'=>str_repeat('0',64)]),'registry integrity required');
expect_failure(503,'professional',request_for($base,67),array_replace($config,['recipients'=>[]]),'missing destination fails closed');
expect_failure(503,'professional',request_for($base,68),array_replace($config,['approvedPrivacyVersion'=>'']),'approved privacy configuration required');
expect_failure(503,'professional',request_for($base,69),array_replace($config,['storageDirectory'=>$root.'/public']),'public storage prohibited');
expect_failure(429,'professional',array_replace(request_for($base,70),['peerIP'=>'192.0.2.1']),$config,'rate limit uses peer address');
$log=file_get_contents($root.'/store/events.ndjson');check(!str_contains($log,'example.test')&&!str_contains($log,'Test person'),'auxiliary log omits contact fields');
require __DIR__.'/../../deployment/form-backend/private/dispatcher.php';
$failed=bv_dispatch($config,fn()=>false);check($failed['retry']>0&&$failed['sent']===0,'failed delivery remains queued for retry');
foreach(glob($root.'/store/requests/*.json') as $path){$r=json_decode(file_get_contents($path),true);$r['lastAttempt']=0;bv_atomic($path,$r);}
$sent=bv_dispatch($config,fn()=>true);check($sent['sent']===$failed['retry'],'mock transport acceptance updates every receipt');
$repeat=bv_dispatch($config,fn()=>throw new RuntimeException('must not deliver twice'));check($repeat['sent']===0&&$repeat['retry']===0,'transport-accepted receipts do not resend');
foreach(glob($root.'/store/requests/*.json') as $path){$r=json_decode(file_get_contents($path),true);$r['receivedTimestamp']=time()-31*86400;bv_atomic($path,$r);}
$purged=bv_dispatch($config,fn()=>false);check($purged['purged']===$sent['sent'],'approved retention cleanup removes expired private requests');
$result=['passed'=>true,'runtime'=>'PHP '.PHP_VERSION.' (WebAssembly CLI when invoked through php-wasm)','cases'=>count($checks),'checks'=>$checks,'liveDeliveryTested'=>false,'privateReceiptPersistence'=>true];
file_put_contents($repository.'/artifacts/v13/backend-results.json',json_encode($result,JSON_PRETTY_PRINT));echo json_encode($result,JSON_PRETTY_PRINT).PHP_EOL;
function remove_tree(string $path): void { foreach (scandir($path) as $name) { if ($name==='.'||$name==='..') continue; $p=$path.'/'.$name;is_dir($p)?remove_tree($p):unlink($p); } rmdir($path); }
remove_tree($root);
