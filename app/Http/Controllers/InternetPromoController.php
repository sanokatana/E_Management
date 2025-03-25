<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class InternetPromoController extends Controller
{
    public function index()
    {
        $promos = DB::table('tb_promointernet')->get();
        return Inertia::render('setup/promo_internet', [
            'promos' => $promos
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'free_months' => 'required|integer|min:1',
        ]);

        $validated['created_at'] = Carbon::now();
        $validated['updated_at'] = Carbon::now();

        DB::table('tb_promointernet')->insert($validated);
        return redirect()->back();
    }
}
