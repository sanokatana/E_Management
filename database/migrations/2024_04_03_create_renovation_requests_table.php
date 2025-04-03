<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('renovation_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('house_unit');
            $table->string('request_number')->unique();
            $table->text('description');
            $table->enum('type', ['interior', 'exterior', 'structural', 'other']);
            $table->date('planned_start_date');
            $table->date('planned_end_date');
            $table->enum('status', ['pending', 'approved', 'in_progress', 'completed', 'rejected']);
            $table->text('contractor_details')->nullable();
            $table->json('attachments')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->text('notes')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('approved_by')->nullable()->constrained('users');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('renovation_requests');
    }
};
