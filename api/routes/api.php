<?php

use App\Http\Controllers\ContactEmailController;
use Illuminate\Support\Facades\Route;

/*
| Elleva Contact API — API_PREFIX is preserved from the existing API v3.
| Public endpoint only; no database, authentication, finance or admin routes.
*/
Route::prefix(trim((string) config('app.api_prefix', '/api/v3'), '/'))->group(function (): void {
    Route::post('/contact/email', [ContactEmailController::class, 'send'])
        ->middleware('throttle:5,1');
});
