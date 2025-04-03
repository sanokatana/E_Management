<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('visitors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained(); // Resident being visited
            $table->string('visitor_name');
            $table->string('visitor_phone');
            $table->string('purpose');
            $table->dateTime('expected_arrival');
            $table->dateTime('actual_arrival')->nullable();
            $table->dateTime('departure')->nullable();
            $table->string('vehicle_number')->nullable();
            $table->enum('status', ['expected', 'checked_in', 'checked_out', 'cancelled']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('visitors');
    }
};
