<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class BillingController extends Controller
{
    public function index()
    {
        $bills = DB::table('tb_ipl')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('billing/billing', [
            'bills' => $bills
        ]);
    }
}
