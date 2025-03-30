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
        // Create products table
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('slug')->unique();
            $table->string('sku')->unique()->nullable();
            $table->string('name_ar')->nullable();
            $table->string('name_en')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('old_price', 10, 2)->nullable();
            $table->text('description_ar')->nullable();
            $table->text('description_en')->nullable();
            $table->integer('quantity')->default(0);
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->enum('featured', ['yes', 'no'])->default('no');
            $table->foreignUuid('category_id')->constrained('categories')->onDelete('cascade');
            $table->timestamps();
        });

        // Create product_details table
        Schema::create('product_details', function (Blueprint $table) {
            $table->id();
            $table->text('detail_ar')->nullable();
            $table->text('detail_en')->nullable();
            $table->foreignUuid('product_id')->constrained('products')->onDelete('cascade');
            $table->timestamps();
        });

        // Create product_care_instructions table
        Schema::create('product_care_instructions', function (Blueprint $table) {
            $table->id();
            $table->text('instruction_ar')->nullable();
            $table->text('instruction_en')->nullable();
            $table->foreignUuid('product_id')->constrained('products')->onDelete('cascade');
            $table->timestamps();
        });

        // Create product_images table
        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->string('url');
            $table->integer('sort_order')->default(0);
            $table->foreignUuid('product_id')->constrained('products')->onDelete('cascade');
            $table->timestamps();
        });

        // Create colors table
        Schema::create('colors', function (Blueprint $table) {
            $table->id();
            $table->string('name_ar')->nullable();
            $table->string('name_en')->nullable();
            $table->string('value'); // Hex color code
            $table->timestamps();
        });

        // Create product_colors pivot table
        Schema::create('product_colors', function (Blueprint $table) {
            $table->foreignUuid('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('color_id')->constrained('colors')->onDelete('cascade');
            $table->primary(['product_id', 'color_id']);
            $table->timestamps();
        });

        // Create sizes table
        Schema::create('sizes', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Size name (XS, S, M, etc.)
            $table->timestamps();
        });

        // Create product_sizes pivot table
        Schema::create('product_sizes', function (Blueprint $table) {
            $table->foreignUuid('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('size_id')->constrained('sizes')->onDelete('cascade');
            $table->primary(['product_id', 'size_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_sizes');
        Schema::dropIfExists('sizes');
        Schema::dropIfExists('product_colors');
        Schema::dropIfExists('colors');
        Schema::dropIfExists('product_images');
        Schema::dropIfExists('product_care_instructions');
        Schema::dropIfExists('product_details');
        Schema::dropIfExists('products');
    }
};