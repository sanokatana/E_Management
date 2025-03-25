<?php

use App\Http\Controllers\BastController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InternetPromoController;
use App\Http\Controllers\InternetRateController;
use App\Http\Controllers\IplPromoController;
use App\Http\Controllers\IplRateController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/data/bast', [BastController::class, 'index'])
        ->middleware(['auth'])
        ->name('data.bast');

    Route::get('/data/customer', [CustomerController::class, 'index'])
        ->middleware(['auth'])
        ->name('data.customer');

    Route::get('/setting/rate-ipl', [IplRateController::class, 'index']);
    Route::post('/setting/rate-ipl', [IplRateController::class, 'store']);
    Route::get('/setting/rate-internet', [InternetRateController::class, 'index']);
    Route::post('/setting/rate-internet', [InternetRateController::class, 'store']);
});

Route::middleware(['auth'])->group(function () {
    Route::get('/setting/promo-internet', [InternetPromoController::class, 'index']);
    Route::post('/setting/promo-internet', [InternetPromoController::class, 'store']);
    Route::get('/setting/promo-ipl', [IplPromoController::class, 'index']);
    Route::post('/setting/promo-ipl', [IplPromoController::class, 'store']);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
