<?php

namespace App\Http\Controllers\Estate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        return Inertia::render('Estate/Events/Index');
    }

    public function upcoming()
    {
        return Inertia::render('Estate/Events/Upcoming');
    }

    public function registrations()
    {
        return Inertia::render('Estate/Events/Registrations');
    }
}
