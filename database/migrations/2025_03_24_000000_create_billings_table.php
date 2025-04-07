<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
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

        Schema::create('billings', function (Blueprint $table) {
            $table->id();
            $table->string('NoCustomer');
            $table->string('NoST');
            $table->decimal('nominal_ipl', 15, 2);
            $table->decimal('nominal_internet', 15, 2)->nullable();
            $table->unsignedBigInteger('ipl_rate_id');
            $table->unsignedBigInteger('internet_id')->nullable();
            $table->date('periode_ipl_start');
            $table->date('periode_ipl_end');
            $table->date('periode_internet_start')->nullable();
            $table->date('periode_internet_end')->nullable();
            $table->string('status')->default('Unpaid');
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();
        });

        Schema::create('tb_invoice', function (Blueprint $table) {
            $table->id();

            // Foreign Keys
            $table->foreignId('id_billing')->constrained('billings')->onDelete('cascade');
            $table->string('id_customer');  // References external customer_no
            $table->foreignId('id_ipl')->constrained('billings')->onDelete('cascade');

            // Invoice Numbers
            $table->string('ipl_invoice')->unique();
            $table->string('int_invoice')->unique();

            // IPL (Facility Management) Fields
            $table->decimal('kuantitas_ipl', 10, 2)->default(0);
            $table->decimal('potongan_ipl', 10, 2)->default(0);
            $table->decimal('total_ipl', 10, 2)->default(0);
            $table->decimal('denda_ipl', 10, 2)->default(0);
            $table->decimal('ppn_ipl', 10, 2)->default(0);
            $table->decimal('ppn_iplnominal', 10, 2)->default(0);
            $table->decimal('diskonipl_persen', 5, 2)->default(0);
            $table->decimal('diskonipl_nominal', 10, 2)->default(0);
            $table->decimal('diskonipl_nominaltopersen', 5, 2)->default(0);
            $table->decimal('diskonipl_persentonominal', 10, 2)->default(0);
            $table->decimal('promo_ipl', 10, 2)->default(0);
            $table->decimal('promo_iplpersen', 5, 2)->default(0);
            $table->decimal('promo_iplnominal', 10, 2)->default(0);
            $table->date('start_ipl_invoice');
            $table->date('end_ipl_invoice');
            $table->integer('bulanpromoipl_invoice')->default(0);
            $table->string('namapromoipl_invoice')->nullable();

            // Internet Related Fields
            $table->string('speed_internet')->nullable();
            $table->decimal('internet_invoice', 10, 2)->default(0);
            $table->decimal('kuantitas_internet', 10, 2)->default(0);
            $table->decimal('potongan_internet', 10, 2)->default(0);
            $table->decimal('total_internet', 10, 2)->default(0);
            $table->decimal('denda_internet', 10, 2)->default(0);
            $table->decimal('ppn_internet', 10, 2)->default(0);
            $table->decimal('ppn_internetnominal', 10, 2)->default(0);
            $table->decimal('diskoninternet_persen', 5, 2)->default(0);
            $table->decimal('diskoninternet_nominal', 10, 2)->default(0);
            $table->decimal('diskoninternet_nominaltopersen', 5, 2)->default(0);
            $table->decimal('diskoninternet_persentonominal', 10, 2)->default(0);
            $table->decimal('promo_internet', 10, 2)->default(0);
            $table->decimal('promo_internetpersen', 5, 2)->default(0);
            $table->decimal('promo_internetnominal', 10, 2)->default(0);
            $table->date('startinternet_invoice');
            $table->date('endinternet_invoice');
            $table->integer('bulanpromointernet_invoice')->default(0);
            $table->string('namapromointernet_invoice')->nullable();

            // General Invoice Fields
            $table->decimal('potongan_tambahan', 10, 2)->default(0);
            $table->decimal('grandtotal_invoice', 10, 2)->default(0);
            $table->string('status_invoice')->default('pending');
            $table->decimal('penalty_invoice', 10, 2)->default(0);
            $table->decimal('ppn_invoice', 10, 2)->default(0);
            $table->decimal('subtotal', 10, 2)->default(0);

            // Dates
            $table->date('send_date')->nullable();
            $table->date('tgl_bayar')->nullable();
            $table->date('tgl_jatuhtempo');

            $table->timestamps();

            // Indexes for better query performance
            $table->index('status_invoice');
            $table->index('tgl_jatuhtempo');
            $table->index('send_date');
            $table->index('id_customer');
        });

        Schema::create('tb_ipl', function (Blueprint $table) {
            $table->id();
            $table->string('NoCustomer');
            $table->string('NoST');
            $table->decimal('nominal_ipl', 15, 2);
            $table->decimal('nominal_internet', 15, 2)->nullable();
            $table->unsignedBigInteger('ipl_rate_id');
            $table->unsignedBigInteger('internet_id')->nullable();
            $table->date('periode_ipl_start');
            $table->date('periode_ipl_end');
            $table->date('periode_internet_start')->nullable();
            $table->date('periode_internet_end')->nullable();
            $table->string('status')->default('Unpaid');
            $table->unsignedBigInteger('updated_by');
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('ipl_rate_id')->references('id')->on('tb_iplrate');
            $table->foreign('internet_id')->references('id')->on('tb_internetrate');
            $table->foreign('updated_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_invoice');
        Schema::dropIfExists('tb_ipl');
        Schema::dropIfExists('billings');
        Schema::dropIfExists('tb_promointernet');
        Schema::dropIfExists('tb_promoipl');
        Schema::dropIfExists('tb_internetrate');
        Schema::dropIfExists('tb_iplrate');
    }
};
