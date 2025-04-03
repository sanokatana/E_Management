<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class BillController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Received bill creation request:', $request->all());

        $validated = $request->validate([
            'NoCustomer' => 'required|string',
            'NoST' => 'required|string',
            'nominal_ipl' => 'required|numeric',
            'nominal_internet' => 'nullable|numeric',
            'ipl_rate_id' => 'required|exists:tb_iplrate,id',
            'internet_id' => 'nullable|exists:tb_internetrate,id',
            'periode_ipl_start' => 'required|date',
            'periode_ipl_end' => 'required|date|after:periode_ipl_start',
            'periode_internet_start' => 'nullable|date',
            'periode_internet_end' => 'nullable|date|after:periode_internet_start',
            'status' => 'required|string',
        ]);

        try {
            DB::beginTransaction();

            $now = Carbon::now();

            DB::table('tb_ipl')->insert([
                'NoCustomer' => $validated['NoCustomer'],
                'NoST' => $validated['NoST'],
                'nominal_ipl' => $validated['nominal_ipl'],
                'nominal_internet' => $validated['nominal_internet'],
                'ipl_rate_id' => $validated['ipl_rate_id'],
                'internet_id' => $validated['internet_id'],
                'periode_ipl_start' => $validated['periode_ipl_start'],
                'periode_ipl_end' => $validated['periode_ipl_end'],
                'periode_internet_start' => $validated['periode_internet_start'],
                'periode_internet_end' => $validated['periode_internet_end'],
                'status' => $validated['status'],
                'updated_by' => Auth::id(),
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            DB::commit();

            Log::info('Bill created successfully');
            return redirect()->back()->with('success', 'Bill created successfully');

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error creating bill:', ['error' => $e->getMessage()]);
            return redirect()->back()->withErrors(['error' => 'Failed to create bill: ' . $e->getMessage()]);
        }
    }
}
