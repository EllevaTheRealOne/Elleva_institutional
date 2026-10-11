<?php

return [
    'default' => env('MAIL_MAILER', 'smtp'),
    'mailers' => [
        'smtp' => [
            'transport' => 'smtp',
            'scheme' => env('MAIL_SCHEME', 'smtp'),
            'url' => env('MAIL_URL'),
            'host' => env('MAIL_HOST', 'smtp.gmail.com'),
            'port' => (int) env('MAIL_PORT', 587),
            'username' => env('MAIL_USERNAME'),
            'password' => env('MAIL_PASSWORD'),
            'timeout' => 15,
            'local_domain' => env('MAIL_EHLO_DOMAIN', parse_url((string) env('APP_URL', 'https://elleva.me'), PHP_URL_HOST)),
        ],
    ],
    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'contact@elleva.me'),
        'name' => env('MAIL_FROM_NAME', 'Elleva Website'),
    ],
];
