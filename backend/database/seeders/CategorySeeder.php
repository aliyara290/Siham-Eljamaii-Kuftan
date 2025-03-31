<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create main categories
        $categories = [
            [
                'name' => 'Men',
                'icon' => 'man',
                'children' => [
                    ['name' => 'Shirts', 'icon' => 'shirt'],
                    ['name' => 'Pants', 'icon' => 'pants'],
                    ['name' => 'Shoes', 'icon' => 'shoes'],
                    ['name' => 'Accessories', 'icon' => 'accessories'],
                ]
            ],
            [
                'name' => 'Women',
                'icon' => 'woman',
                'children' => [
                    ['name' => 'Dresses', 'icon' => 'dress'],
                    ['name' => 'Tops', 'icon' => 'top'],
                    ['name' => 'Skirts', 'icon' => 'skirt'],
                    ['name' => 'Shoes', 'icon' => 'shoes'],
                    ['name' => 'Accessories', 'icon' => 'accessories'],
                ]
            ],
            [
                'name' => 'Kids',
                'icon' => 'kid',
                'children' => [
                    ['name' => 'Boys', 'icon' => 'boy'],
                    ['name' => 'Girls', 'icon' => 'girl'],
                ]
            ]
        ];

        foreach ($categories as $categoryData) {
            $children = $categoryData['children'] ?? [];
            unset($categoryData['children']);
            
            $category = Category::create($categoryData);
            
            foreach ($children as $childData) {
                $childData['parent_id'] = $category->id;
                Category::create($childData);
            }
        }
    }
}