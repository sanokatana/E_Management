<?php

use App\Http\Controllers\BastController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InternetPromoController;
use App\Http\Controllers\InternetRateController;
use App\Http\Controllers\IplPromoController;
use App\Http\Controllers\IplRateController;
use App\Http\Controllers\Estate\InternetServiceController;
use App\Http\Controllers\Estate\CustomerServiceController;
use App\Http\Controllers\Estate\FacilityController;
use App\Http\Controllers\Estate\RenovationController;
use App\Http\Controllers\Estate\VisitorController;
use App\Http\Controllers\Estate\EventController;
use App\Http\Controllers\Estate\MaintenanceController;
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

    // Estate Management Routes
    Route::prefix('estate')->name('estate.')->group(function () {
        // Internet Services
        Route::get('/internet', [InternetServiceController::class, 'index'])->name('internet.index');
        Route::get('/internet/packages', [InternetServiceController::class, 'packages'])->name('internet.packages');
        Route::get('/internet/subscribers', [InternetServiceController::class, 'subscribers'])->name('internet.subscribers');
        Route::get('/internet/issues', [InternetServiceController::class, 'issues'])->name('internet.issues');

        // Customer Service
        Route::get('/customer-service', [CustomerServiceController::class, 'index'])->name('customer-service.index');
        Route::get('/customer-service/tickets', [CustomerServiceController::class, 'tickets'])->name('customer-service.tickets');
        Route::get('/customer-service/knowledge-base', [CustomerServiceController::class, 'knowledgeBase'])->name('customer-service.knowledge-base');

        // Facilities
        Route::get('/facilities', [FacilityController::class, 'index'])->name('facilities.index');
        Route::get('/facilities/gym', [FacilityController::class, 'gym'])->name('facilities.gym');
        Route::get('/facilities/club-house', [FacilityController::class, 'clubHouse'])->name('facilities.club-house');
        Route::get('/facilities/bookings', [FacilityController::class, 'bookings'])->name('facilities.bookings');

        // Renovation
        Route::get('/renovation', [RenovationController::class, 'index'])->name('renovation.index');
        Route::get('/renovation/requests', [RenovationController::class, 'requests'])->name('renovation.requests');
        Route::get('/renovation/guidelines', [RenovationController::class, 'guidelines'])->name('renovation.guidelines');

        // Visitors
        Route::get('/visitors', [VisitorController::class, 'index'])->name('visitors.index');
        Route::get('/visitors/register', [VisitorController::class, 'register'])->name('visitors.register');
        Route::get('/visitors/logs', [VisitorController::class, 'logs'])->name('visitors.logs');

        // Community Events
        Route::get('/events', [EventController::class, 'index'])->name('events.index');
        Route::get('/events/upcoming', [EventController::class, 'upcoming'])->name('events.upcoming');
        Route::get('/events/registrations', [EventController::class, 'registrations'])->name('events.registrations');

        // Maintenance
        Route::get('/maintenance', [MaintenanceController::class, 'index'])->name('maintenance.index');
        Route::get('/maintenance/submit', [MaintenanceController::class, 'submit'])->name('maintenance.submit');
        Route::get('/maintenance/requests', [MaintenanceController::class, 'requests'])->name('maintenance.requests');
    });
});

Route::middleware(['auth'])->group(function () {
    Route::get('/setting/promo-internet', [InternetPromoController::class, 'index']);
    Route::post('/setting/promo-internet', [InternetPromoController::class, 'store']);
    Route::get('/setting/promo-ipl', [IplPromoController::class, 'index']);
    Route::post('/setting/promo-ipl', [IplPromoController::class, 'store']);
    Route::post('/create/bill', [BillController::class, 'store'])->name('bill.store');
    Route::get('/billing', [BillingController::class, 'index'])->name('billing.index');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
