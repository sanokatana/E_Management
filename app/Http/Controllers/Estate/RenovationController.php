<?php

namespace App\Http\Controllers\Estate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RenovationController extends Controller
{
    public function index()
    {
        return Inertia::render('Estate/Renovation/Index');
    }

    public function requests()
    {
        return Inertia::render('Estate/Renovation/Requests');
    }

    public function guidelines()
    {
        return Inertia::render('Estate/Renovation/Guidelines');
    }
}
