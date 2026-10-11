<?php

$origins = array_filter(array_map('trim', explode(',', env('CORS_ALLOWED_ORIGINS', 'https://elleva.me,https://www.elleva.me'))));

return [
    'paths' => ['api/*', 'api/v3/*'],
    'allowed_methods' => ['POST', 'OPTIONS'],
    'allowed_origins' => array_values(array_unique($origins)),
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['Content-Type', 'Accept', 'Origin', 'X-Requested-With'],
    'exposed_headers' => [],
    'max_age' => 600,
    'supports_credentials' => false,
];
