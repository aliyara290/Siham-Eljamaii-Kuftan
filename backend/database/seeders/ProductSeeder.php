<?php

namespace Database\Seeders;

use App\Models\Color;
use App\Models\Product;
use App\Models\ProductCareInstruction;
use App\Models\ProductDetail;
use App\Models\ProductImage;
use App\Models\Size;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all colors and sizes
        $colors = Color::all();
        $sizes = Size::all();

        // Create 20 products with their relationships
        Product::factory(20)->create()->each(function (Product $product) use ($colors, $sizes) {
            // Add 2-4 product details
            ProductDetail::factory(rand(2, 4))->create([
                'product_id' => $product->id
            ]);

            // Add 1-3 care instructions
            ProductCareInstruction::factory(rand(1, 3))->create([
                'product_id' => $product->id
            ]);

            // Add 3-5 product images
            ProductImage::factory(rand(3, 5))->create([
                'product_id' => $product->id
            ]);

            // Attach 2-4 random colors
            $product->colors()->attach(
                $colors->random(rand(2, 4))->pluck('id')->toArray()
            );

            // Attach 3-5 random sizes
            $product->sizes()->attach(
                $sizes->random(rand(3, 5))->pluck('id')->toArray()
            );
        });
    }
}