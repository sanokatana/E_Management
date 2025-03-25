<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class IplRateController extends Controller
{
    public function index()
    {
        $rates = DB::table('tb_iplrate')->get();
        return Inertia::render('setup/rate_ipl', [
            'rates' => $rates
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'rate' => 'required|numeric',
            'periode_start' => 'required|date',
            'periode_end' => 'required|date|after:periode_start',
        ]);

        DB::table('tb_iplrate')->insert($validated);
        return redirect()->back();
    }
}
