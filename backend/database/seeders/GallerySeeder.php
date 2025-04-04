<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample gallery items
        $galleries = [
            [
                'photo' => 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/custom_resized_5d1127c3-01b7-426f-a9ba-5ddf77025254.jpg?crop=region&crop_height=1023&crop_left=0&crop_top=0&crop_width=819&v=1690670418&width=720',
                'title' => 'Traditional Kaftan',
                'description' => 'A beautiful traditional Moroccan kaftan design.',
                'is_featured' => true,
            ],
            [
                'photo' => 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/djellaba_femme_dor.jpg?crop=region&crop_height=1200&crop_left=120&crop_top=0&crop_width=960&v=1742610117&width=720',
                'title' => 'Modern Jelaba',
                'description' => 'Contemporary Moroccan jelaba with custom embroidery.',
                'is_featured' => true,
            ],
            [
                'photo' => 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/105_0a4b7901-6aa1-4edb-ad59-94fb58dfa720.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1724375971&width=720',
                'title' => 'Handmade Accessories',
                'description' => 'Handcrafted traditional accessories.',
                'is_featured' => false,
            ],
            [
                'photo' => 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/custom_resized_5d1127c3-01b7-426f-a9ba-5ddf77025254.jpg?crop=region&crop_height=1023&crop_left=0&crop_top=0&crop_width=819&v=1690670418&width=720',
                'title' => 'Traditional Kaftan',
                'description' => 'A beautiful traditional Moroccan kaftan design.',
                'is_featured' => true,
            ],
            [
                'photo' => 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/djellaba_femme_dor.jpg?crop=region&crop_height=1200&crop_left=120&crop_top=0&crop_width=960&v=1742610117&width=720',
                'title' => 'Modern Jelaba',
                'description' => 'Contemporary Moroccan jelaba with custom embroidery.',
                'is_featured' => true,
            ],
            [
                'photo' => 'https://ma.bouchrafilalilahlou.com/cdn/shop/files/105_0a4b7901-6aa1-4edb-ad59-94fb58dfa720.jpg?crop=region&crop_height=1080&crop_left=108&crop_top=0&crop_width=864&v=1724375971&width=720',
                'title' => 'Handmade Accessories',
                'description' => 'Handcrafted traditional accessories.',
                'is_featured' => false,
            ],
        ];

        foreach ($galleries as $gallery) {
            Gallery::create($gallery);
        }
    }
}