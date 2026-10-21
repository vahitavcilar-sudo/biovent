<?php
declare(strict_types=1);
if(PHP_SAPI!=='cli'){http_response_code(403);exit;}
require __DIR__.'/dispatcher.php';
if(!is_file(__DIR__.'/config.php')){fwrite(STDERR,"Configure private config.php first.\n");exit(1);}
try{$stats=bv_dispatch(require __DIR__.'/config.php',fn($to,$subject,$body,$headers)=>mail($to,$subject,$body,$headers));echo json_encode($stats).PHP_EOL;}catch(Throwable $error){fwrite(STDERR,"Dispatch unavailable; review private configuration/storage.\n");exit(1);}
// mail() acceptance is not confirmation of inbox delivery. Real end-to-end delivery must be verified on the host.
