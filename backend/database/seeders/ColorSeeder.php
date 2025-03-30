<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create predefined colors
        $colors = [
            ['name_en' => 'Black', 'name_ar' => 'أسود', 'value' => '#000000'],
            ['name_en' => 'White', 'name_ar' => 'أبيض', 'value' => '#FFFFFF'],
            ['name_en' => 'Red', 'name_ar' => 'أحمر', 'value' => '#FF0000'],
            ['name_en' => 'Blue', 'name_ar' => 'أزرق', 'value' => '#0000FF'],
            ['name_en' => 'Green', 'name_ar' => 'أخضر', 'value' => '#00FF00'],
            ['name_en' => 'Yellow', 'name_ar' => 'أصفر', 'value' => '#FFFF00'],
            ['name_en' => 'Purple', 'name_ar' => 'أرجواني', 'value' => '#800080'],
            ['name_en' => 'Pink', 'name_ar' => 'وردي', 'value' => '#FFC0CB'],
            ['name_en' => 'Orange', 'name_ar' => 'برتقالي', 'value' => '#FFA500'],
            ['name_en' => 'Brown', 'name_ar' => 'بني', 'value' => '#A52A2A'],
        ];

        foreach ($colors as $color) {
            Color::create($color);
        }
    }
}