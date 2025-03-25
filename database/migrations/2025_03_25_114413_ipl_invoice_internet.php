<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tb_iplrate', function (Blueprint $table) {
            $table->id();
            $table->decimal('rate', 15, 2);
            $table->date('periode_start');
            $table->date('periode_end');
            $table->timestamps();
        });

        Schema::create('tb_internetrate', function (Blueprint $table) {
            $table->id();
            $table->string('speed');
            $table->decimal('tariff', 15, 2);
            $table->date('periode_start');
            $table->date('periode_end');
            $table->timestamps();
        });

        Schema::create('tb_promoipl', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('free_months');
            $table->timestamps();
        });

        Schema::create('tb_promointernet', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('free_months');
            $table->timestamps();
        });

        Schema::create('tb_ipl', function (Blueprint $table) {
            $table->id();
            $table->string('NoCustomer');  // Just a string field without constraint
            $table->decimal('nominal_ipl', 15, 2);
            $table->decimal('nominal_internet', 15, 2)->nullable();
            $table->unsignedBigInteger('ipl_rate_id');  // Regular integer field without constraint
            $table->unsignedBigInteger('internet_id')->nullable();  // Regular integer field without constraint
            $table->date('periode_ipl_start');
            $table->date('periode_ipl_end');
            $table->date('periode_internet_start')->nullable();
            $table->date('periode_internet_end')->nullable();
            $table->string('status')->default('Unpaid');
            $table->unsignedBigInteger('updated_by')->nullable();  // Regular integer field without constraint
            $table->timestamps();
        });

        Schema::create('tb_invoice', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique();
            $table->unsignedBigInteger('ipl_id');  // Regular integer field without constraint
            $table->string('NoCustomer');  // Just a string field without constraint
            $table->decimal('total_amount', 15, 2);
            $table->date('due_date');
            $table->string('status')->default('Unpaid');
            $table->unsignedBigInteger('updated_by')->nullable();  // Regular integer field without constraint
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tb_invoice');
        Schema::dropIfExists('tb_ipl');
        Schema::dropIfExists('tb_promointernet');
        Schema::dropIfExists('tb_promoipl');
        Schema::dropIfExists('tb_internetrate');
        Schema::dropIfExists('tb_iplrate');
    }
};
