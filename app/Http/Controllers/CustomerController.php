<?php

namespace App\Http\Controllers;

use App\Models\Bast;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::all();

        return Inertia::render('data/customer', [
            'customers' => $customers
        ]);
    }
}
