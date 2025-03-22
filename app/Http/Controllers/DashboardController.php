<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Kontrak;
use App\Models\Bast;
use App\Models\Unit;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'customerCount' => Customer::count(),
            'kontrakCount' => Kontrak::count(),
            'bastCount' => Bast::count(),
            'unitCount' => Unit::count(),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats
        ]);
    }
}
