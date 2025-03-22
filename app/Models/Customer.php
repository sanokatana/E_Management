<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $connection = 'chl_naraya';
    protected $table = 'ms_customer';
}
