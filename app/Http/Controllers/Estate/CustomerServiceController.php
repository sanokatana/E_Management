<?php

namespace App\Http\Controllers\Estate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerServiceController extends Controller
{
    public function index()
    {
        return Inertia::render('Estate/CustomerService/Index');
    }

    public function tickets()
    {
        return Inertia::render('Estate/CustomerService/Tickets');
    }

    public function knowledgeBase()
    {
        return Inertia::render('Estate/CustomerService/KnowledgeBase');
    }
}
