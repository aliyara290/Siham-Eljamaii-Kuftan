<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

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
                'name_en' => 'Kaftan',
                'name_ar' => 'قفطان',
                'icon' => 'kaftan',
                'slug' => 'kaftan',
                'children' => [
                    [
                        'name_en' => 'Moroccan Kaftan', 
                        'name_ar' => 'قفطان مغربي', 
                        'icon' => 'moroccan-kaftan',
                        'slug' => 'moroccan-kaftan'
                    ],
                    [
                        'name_en' => 'Traditional Kaftan', 
                        'name_ar' => 'قفطان تقليدي', 
                        'icon' => 'traditional-kaftan',
                        'slug' => 'traditional-kaftan'
                    ],
                    [
                        'name_en' => 'Modern Kaftan', 
                        'name_ar' => 'قفطان عصري', 
                        'icon' => 'modern-kaftan',
                        'slug' => 'modern-kaftan'
                    ],
                ]
            ],
            [
                'name_en' => 'Jelaba',
                'name_ar' => 'جلابة',
                'icon' => 'jelaba',
                'slug' => 'jelaba',
                'children' => [
                    [
                        'name_en' => 'Traditional Jelaba', 
                        'name_ar' => 'جلابة تقليدية', 
                        'icon' => 'traditional-jelaba',
                        'slug' => 'traditional-jelaba'
                    ],
                    [
                        'name_en' => 'Modern Jelaba', 
                        'name_ar' => 'جلابة عصرية', 
                        'icon' => 'modern-jelaba',
                        'slug' => 'modern-jelaba'
                    ],
                    [
                        'name_en' => 'Embroidered Jelaba', 
                        'name_ar' => 'جلابة مطرزة', 
                        'icon' => 'embroidered-jelaba',
                        'slug' => 'embroidered-jelaba'
                    ],
                ]
            ],
            [
                'name_en' => 'Accessories',
                'name_ar' => 'إكسسوارات',
                'icon' => 'accessories',
                'slug' => 'accessories',
                'children' => [
                    [
                        'name_en' => 'Belts', 
                        'name_ar' => 'أحزمة', 
                        'icon' => 'belt',
                        'slug' => 'belts'
                    ],
                    [
                        'name_en' => 'Jewelry', 
                        'name_ar' => 'مجوهرات', 
                        'icon' => 'jewelry',
                        'slug' => 'jewelry'
                    ],
                    [
                        'name_en' => 'Headwear', 
                        'name_ar' => 'غطاء الرأس', 
                        'icon' => 'headwear',
                        'slug' => 'headwear'
                    ],
                    [
                        'name_en' => 'Shoes', 
                        'name_ar' => 'أحذية', 
                        'icon' => 'shoes',
                        'slug' => 'shoes'
                    ],
                ]
            ]
        ];

        $this->createCategoriesRecursively($categories);
    }

    /**
     * Create categories recursively with slug support.
     * 
     * @param array $categories The categories to create
     * @param string|null $parentId The parent ID or null for root categories
     * @return void
     */
    private function createCategoriesRecursively(array $categories, $parentId = null): void
    {
        foreach ($categories as $categoryData) {
            $children = $categoryData['children'] ?? [];
            unset($categoryData['children']);
            
            if ($parentId !== null) {
                $categoryData['parent_id'] = $parentId;
            }
            
            // Generate slug if not provided
            if (!isset($categoryData['slug'])) {
                $categoryData['slug'] = Str::slug($categoryData['name_en']);
            }
            
            $category = Category::create($categoryData);
            
            if (!empty($children)) {
                $this->createCategoriesRecursively($children, $category->id);
            }
        }
    }
}