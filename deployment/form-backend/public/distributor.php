<?php
declare(strict_types=1);
$private = (string)getenv('BIOVENT_FORM_PRIVATE_ROOT');
if (!$private || !is_file($private.'/receiver.php')) { http_response_code(503); header('Content-Type: application/json'); echo '{"accepted":false,"error":"not-configured"}'; exit; }
require $private.'/receiver.php';
bv_http('distributor');
