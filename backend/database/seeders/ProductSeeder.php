<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Color;
use App\Models\Product;
use App\Models\ProductCareInstruction;
use App\Models\ProductDetail;
use App\Models\ProductImage;
use App\Models\Size;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

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
        
        // Create a default category if none exists
        if (Category::count() == 0) {
            $category = Category::create([
                'name_ar' => 'Default Category',
                'icon' => 'default-icon'
            ]);
        }
        
        $categories = Category::all();

        // Create 20 products with their relationships
        Product::factory(60)->make()->each(function ($product) use ($colors, $sizes, $categories) {
            // Assign a random category
            $product->category_slug = $categories->random()->slug;
            
            // Generate slug from name_en if not already set
            if (!$product->slug) {
                $product->slug = Str::slug($product->name_en);
            }
            
            // Generate a unique SKU if not already set
            if (!$product->sku) {
                $product->sku = 'SKU-' . strtoupper(Str::random(8));
            }
            
            $product->save();

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