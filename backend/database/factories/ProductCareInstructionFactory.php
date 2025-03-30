<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductCareInstruction;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductCareInstructionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ProductCareInstruction::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $instruction_en = $this->faker->sentence();
        $instruction_ar = 'عربي: ' . $instruction_en;
        
        return [
            'instruction_en' => $instruction_en,
            'instruction_ar' => $instruction_ar,
            'product_id' => Product::factory(),
        ];
    }
}