<?php

namespace Database\Seeders;

use App\Models\Size;
use Illuminate\Database\Seeder;

class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create standard clothing sizes
        $sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

        foreach ($sizes as $size) {
            Size::create(['name' => $size]);
        }
    }
}