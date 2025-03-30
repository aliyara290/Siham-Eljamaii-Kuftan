<?php

namespace Database\Factories;

use App\Models\Color;
use Illuminate\Database\Eloquent\Factories\Factory;

class ColorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Color::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name_en = $this->faker->colorName();
        $name_ar = 'عربي: ' . $name_en;
        
        return [
            'name_en' => $name_en,
            'name_ar' => $name_ar,
            'value' => $this->faker->hexColor(),
        ];
    }
}