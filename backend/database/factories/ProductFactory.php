<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name_en = $this->faker->words(3, true);
        // Simulate Arabic translation using faker
        $name_ar = 'عربي: ' . $name_en;
        
        $description_en = $this->faker->paragraph(3);
        $description_ar = 'عربي: ' . substr($description_en, 0, 30) . '...';
        
        $price = $this->faker->randomFloat(2, 10, 500);
        $hasDiscount = $this->faker->boolean(30);
        
        return [
            'name_en' => ucfirst($name_en),
            'name_ar' => $name_ar,
            'price' => $price,
            'old_price' => $hasDiscount ? $price * (1 + $this->faker->randomFloat(2, 0.1, 0.5)) : null,
            'description_en' => $description_en,
            'description_ar' => $description_ar,
        ];
    }
}