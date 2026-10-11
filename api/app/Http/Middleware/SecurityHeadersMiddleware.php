<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class SecurityHeadersMiddleware
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // O cookie HttpOnly é a fonte canônica quando já existe.
        // Se ainda não existir, adota o X-Device-Id enviado pelo frontend.
        $deviceCookieName = (string) config('security.cookies.device', 'financontrol_device_id');
        $cookieId = $request->cookie($deviceCookieName);
        $headerId = $request->header('X-Device-Id');

        if ($cookieId && Str::isUuid($cookieId)) {
            $deviceId = $cookieId;
        } elseif ($headerId && Str::isUuid($headerId)) {
            $deviceId = $headerId;
        } else {
            $deviceId = (string) Str::uuid();
        }

        // Todos os serviços internos passam a enxergar exatamente o mesmo ID,
        // mesmo se uma versão antiga do frontend enviar um header divergente.
        $request->headers->set('X-Device-Id', $deviceId);

        /** @var Response $response */
        $response = $next($request);

        // Devolve o ID canônico para o frontend sincronizar o localStorage.
        $response->headers->set('X-Device-Id', $deviceId);

        // Headers de Segurança HTTP Defensivos
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

        // Em ambientes HTTPS/Produção, impõe HSTS
        if ($request->isSecure() || config('app.env') === 'production') {
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        }

        // Remove cabeçalhos de identificação de versão de servidor
        $response->headers->remove('X-Powered-By');
        $response->headers->remove('Server');

        // Cria o cookie HttpOnly quando ainda não existir/for inválido.
        if (!$cookieId || !Str::isUuid($cookieId)) {
            $cookiePath = (string) config('session.path', '/');
            $cookieDomain = config('session.domain') ?: null;
            $cookieSecure = (bool) config('session.secure', $request->isSecure());
            $cookieSameSite = (string) config('session.same_site', 'lax');

            $response->headers->setCookie(
                cookie(
                    $deviceCookieName,
                    $deviceId,
                    525600, // 1 ano (em minutos)
                    $cookiePath,
                    $cookieDomain,
                    $cookieSecure,
                    true, // HttpOnly
                    false,
                    $cookieSameSite
                )
            );
        }

        return $response;
    }
}
