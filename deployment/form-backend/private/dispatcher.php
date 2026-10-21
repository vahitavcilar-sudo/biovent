<?php
declare(strict_types=1);
require_once __DIR__.'/receiver.php';
/** Transport is injectable for local tests. The production CLI passes PHP mail(), never a browser-selected destination. */
function bv_dispatch(array $config, callable $transport): array {
    $root = bv_private_path((string)($config['storageDirectory']??''), (string)($_SERVER['DOCUMENT_ROOT']??''));
    if (!is_int($config['retentionDays']??null) || $config['retentionDays']<1 || !filter_var($config['sender']??'', FILTER_VALIDATE_EMAIL)) bv_fail(503,'not-configured');
    $lock = fopen($root.'/dispatch.lock','c+');
    if (!$lock || !flock($lock,LOCK_EX|LOCK_NB)) return ['sent'=>0,'retry'=>0,'purged'=>0,'locked'=>true];
    $stats=['sent'=>0,'retry'=>0,'purged'=>0,'locked'=>false];
    try {
        foreach (glob($root.'/requests/BV-*.json')?:[] as $path) {
            $record=json_decode(file_get_contents($path),true); if(!is_array($record))continue;
            if(($record['receivedTimestamp']??time())<time()-$config['retentionDays']*86400){unlink($path);$stats['purged']++;continue;}
            if(($record['delivery']??'')==='transport-accepted'||($record['lastAttempt']??0)>time()-300)continue;
            $recipient=$config['recipients'][$record['kind']]??'';if(!filter_var($recipient,FILTER_VALIDATE_EMAIL))continue;
            $record['attempts']=($record['attempts']??0)+1;$record['lastAttempt']=time();$fields=$record['fields'];
            $body='BioVent '.$record['kind'].' request — '.$record['reference']."\nReceived: ".$record['receivedAt']."\n\n";
            foreach($fields as $name=>$value)$body.=$name.': '.(is_array($value)?json_encode($value,JSON_UNESCAPED_UNICODE):(is_bool($value)?($value?'true':'false'):(string)$value))."\n";
            try{$sent=$transport($recipient,'BioVent '.$record['kind'].' '.$record['reference'],$body,['From'=>$config['sender'],'Reply-To'=>$fields['email'],'Content-Type'=>'text/plain; charset=UTF-8'])===true;}catch(Throwable $error){$sent=false;}
            $record['delivery']=$sent?'transport-accepted':'retry';bv_atomic($path,$record);$stats[$sent?'sent':'retry']++;
            file_put_contents($root.'/events.ndjson',json_encode(['reference'=>$record['reference'],'event'=>$record['delivery'],'at'=>gmdate('c')])."\n",FILE_APPEND|LOCK_EX);
        }
        foreach(glob($root.'/rates/*.json')?:[] as $path)if(filemtime($path)<time()-86400)unlink($path);
    }finally{flock($lock,LOCK_UN);fclose($lock);}
    return $stats;
}
