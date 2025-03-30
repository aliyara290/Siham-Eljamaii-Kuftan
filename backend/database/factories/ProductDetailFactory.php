<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductDetailFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProductDetail::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $detail_en = $this->faker->sentence();
        $detail_ar = 'عربي: ' . $detail_en;
        
        return [
            'detail_en' => $detail_en,
            'detail_ar' => $detail_ar,
            'product_id' => Product::factory(),
        ];
    }
}