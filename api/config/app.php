<?php

return [
    'name' => env('APP_NAME', 'Elleva Contact API'),
    'env' => env('APP_ENV', 'production'),
    'debug' => (bool) env('APP_DEBUG', false),
    'url' => env('APP_URL', 'https://adm.elleva.me'),
    'frontend_url' => env('FRONTEND_URL', 'https://elleva.me'),
    'api_prefix' => '/'.trim((string) env('API_PREFIX', '/api/v3'), '/'),
    'timezone' => 'America/Sao_Paulo',
    'locale' => 'pt_BR',
    'fallback_locale' => 'en',
    'key' => env('APP_KEY'),
    'cipher' => 'AES-256-CBC',
];
