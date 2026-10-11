# Elleva Contact API — Laravel API v3 slim

API independente baseada na arquitetura Laravel da API v3 fornecida. Preserva `API_PREFIX=/api/v3`, estrutura Laravel, `routes/api.php`, configuração centralizada e middleware de headers de segurança. Remove rotas de autenticação, finanças, administração, modelos, migrations, seeders e código de acesso ao banco.

## Endpoint

`POST https://adm.elleva.me/api/v3/contact/email`

JSON:
```json
{
  "name": "Visitor Name",
  "email": "visitor@example.com",
  "topic": "general",
  "message": "Hello Elleva",
  "website": ""
}
```

Topics: `general`, `business`, `institutional`, `privacy` route to `contact@elleva.me`; `support` and `account` route to `support@elleva.me`. The recipient cannot be chosen by the client.

## Install

Requires PHP 8.2+ and Composer, compatible with Laravel 12.

1. Copy `.env.example` to `.env` and set a unique `APP_KEY` (`php artisan key:generate`).
2. Set the Google Workspace SMTP app password in `MAIL_PASSWORD`. Never commit `.env`.
3. Run `composer install --no-dev --optimize-autoloader`.
4. Ensure `storage/` and `bootstrap/cache/` are writable by PHP.
5. Deploy the project so the web document root points to `public/`; do not expose project root or `.env` publicly.
6. Configure the hosting's document root or rewrite rules for Laravel's `public/index.php`.

Google Workspace SMTP: `smtp.gmail.com:587` with STARTTLS. The account must be permitted to use SMTP and the chosen authentication method must be allowed by Workspace policy.

## Protections

- Laravel request validation and max lengths.
- Honeypot field `website`.
- Rate limit: 5 requests per minute per IP.
- CORS allowlist from `CORS_ALLOWED_ORIGINS`.
- Generic errors returned to clients; details are logged server-side.
- No database, auth, user sessions, finance or admin endpoints.

The rate limiter uses Laravel's configured cache store. Set `CACHE_STORE=file` (default in `.env.example`) so no database cache is required.
