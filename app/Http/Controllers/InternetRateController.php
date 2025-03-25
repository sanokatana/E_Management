<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class InternetRateController extends Controller
{
    public function index()
    {
        $rates = DB::table('tb_internetrate')->get();
        return Inertia::render('setup/rate_internet', [
            'rates' => $rates
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'speed' => 'required|string',
            'tariff' => 'required|numeric',
            'periode_start' => 'required|date',
            'periode_end' => 'required|date|after:periode_start',
        ]);

        $validated['created_at'] = Carbon::now();
        $validated['updated_at'] = Carbon::now();

        DB::table('tb_internetrate')->insert($validated);
        return redirect()->back();
    }
}
