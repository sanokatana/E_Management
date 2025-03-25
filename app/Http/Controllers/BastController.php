<?php

namespace App\Http\Controllers;

use App\Models\Bast;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class BastController extends Controller
{
    public function index()
    {
        $basts = DB::connection('chl_naraya')
            ->table('ms_bast')
            ->join('ms_kontrak', 'ms_bast.NoKontrak', '=', 'ms_kontrak.NoKontrak')
            ->join('ms_customer', 'ms_kontrak.NoCustomer', '=', 'ms_customer.NoCustomer')
            ->join('ms_unit', 'ms_kontrak.NoStock', '=', 'ms_unit.NoStock')
            ->select('ms_bast.*',
                    'ms_customer.Nama as NamaCustomer',
                    'ms_customer.NoCustomer',
                    'ms_unit.Luas as LuasTanah')
            ->get();

        $iplRates = DB::table('tb_iplrate')
            ->where('periode_end', '>=', now())
            ->get();

        $internetRates = DB::table('tb_internetrate')
            ->where('periode_end', '>=', now())
            ->get();

        return Inertia::render('data/bast', [
            'basts' => $basts,
            'iplRates' => $iplRates,
            'internetRates' => $internetRates
        ]);
    }
}
