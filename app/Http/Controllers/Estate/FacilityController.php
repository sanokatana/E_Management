<?php

namespace App\Http\Controllers\Estate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacilityController extends Controller
{
    public function index()
    {
        return Inertia::render('Estate/Facilities/Index');
    }

    public function gym()
    {
        return Inertia::render('Estate/Facilities/Gym');
    }

    public function clubHouse()
    {
        return Inertia::render('Estate/Facilities/ClubHouse');
    }

    public function bookings()
    {
        return Inertia::render('Estate/Facilities/Bookings');
    }
}
