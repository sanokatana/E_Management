<?php

namespace App\Http\Controllers\Estate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisitorController extends Controller
{
    public function index()
    {
        return Inertia::render('Estate/Visitors/Index');
    }

    public function register()
    {
        return Inertia::render('Estate/Visitors/Register');
    }

    public function logs()
    {
        return Inertia::render('Estate/Visitors/Logs');
    }
}