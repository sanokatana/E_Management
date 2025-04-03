<?php

namespace App\Http\Controllers\Estate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InternetServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Estate/Internet/Index');
    }

    public function packages()
    {
        return Inertia::render('Estate/Internet/Packages');
    }

    public function subscribers()
    {
        return Inertia::render('Estate/Internet/Subscribers');
    }

    public function issues()
    {
        return Inertia::render('Estate/Internet/Issues');
    }
}
