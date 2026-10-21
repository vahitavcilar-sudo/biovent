<?php
// Place config.php and every private file OUTSIDE public_html. Do not commit live values.
return [
    'origin'=>'https://biovent-implant.com',
    'recipients'=>['professional'=>'','distributor'=>''],
    'sender'=>'',
    'storageDirectory'=>__DIR__.'/storage',
    'registryFile'=>__DIR__.'/product-variants.json',
    'registrySHA256'=>'REPLACE_WITH_SHA256_FROM_BUILD_INSTRUCTIONS',
    'componentsFile'=>__DIR__.'/prosthetic-components.json',
    'componentsSHA256'=>'REPLACE_WITH_SHA256_FROM_BUILD_INSTRUCTIONS',
    'rateSalt'=>'', // Generate locally with bin2hex(random_bytes(32)); never expose in frontend.
    'retentionDays'=>0, // Controller/legal approval required; no invented retention policy.
    'approvedPrivacyVersion'=>'',
];
