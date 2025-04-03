<?php

namespace App\Http\Controllers\Estate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaintenanceController extends Controller
{
    public function index()
    {
        return Inertia::render('Estate/Maintenance/Index');
    }

    public function submit()
    {
        return Inertia::render('Estate/Maintenance/Submit');
    }

    public function requests()
    {
        return Inertia::render('Estate/Maintenance/Requests');
    }
}
