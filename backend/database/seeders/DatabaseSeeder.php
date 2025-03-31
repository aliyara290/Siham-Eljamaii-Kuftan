<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            ColorSeeder::class,
            SizeSeeder::class,
            ProductSeeder::class,
        ]);
        
        User::create([
            'name' => 'ali',
            'email' => 'ali@gmail.com',
            'password' => bcrypt('Yara2001'),
        ]);
    }
}