<?php

namespace App\Repositories;

use App\Http\Requests\V1\StoreCategoryRequest;
use App\Http\Resources\V1\CategoryCollection;
use App\Http\Resources\V1\CategoryResource;
use App\Interfaces\CategoryInterface;
use App\Models\Category;
use App\Traits\HttpResponses;
use Exception;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Str;

class CategoryRepository implements CategoryInterface
{
    use HttpResponses;

    public function getCategories()
    {
        try {
            // Only get top-level categories (those with null parent_id) with their children
            $categories = Category::whereNull("parent_id")->with("children")->get();
            
            if ($categories->isEmpty()) {
                return response()->json(["message" => "No categories to show!"], 404);
            }
            
            // Only return the top-level categories with their nested children
            return new CategoryCollection($categories);
        } catch (Exception $e) {
            return $this->error(
                '',
                'Failed to show categories',
                500
            );
        }
    }

    public function getCategory($category)
    {
        try {
            $category = Category::find($category);
            
            if (!$category) {
                return response()->json(["message" => "Category not found!"], 404);
            }
            
            return new CategoryResource($category);
        } catch (Exception $e) {
            return $this->error(
                '',
                'Failed to show category'
            );
        }
    }

    public function storeCategory($request)
    {
        try {
            
            $slug = Str::slug($request->name_en);
            
            $originalSlug = $slug;
            $count = 1;
            
            while (Category::where('slug', $slug)->exists()) {
                $slug = "{$originalSlug}-{$count}";
                $count++;
            }
            
            $category = Category::create([
                "name_ar" => $request->name_ar,
                "name_en" => $request->name_en,
                "slug" => $slug,
                "icon" => $request->icon,
                "parent_id" => $request->parentId,
            ]);

            return $this->success([
                "category" => $category,
                "message" => "Category added successfully",
            ], 201);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }

    public function updateCategory($request, $category)
    {
        try {
            $category = Category::find($category);
            
            if (!$category) {
                return response()->json(["message" => "Category not found!"], 404);
            }
            
            // Prepare the data for update
            $updateData = [
                "name_ar" => $request->name_ar,
                "name_en" => $request->name_en,
                "icon" => $request->icon
            ];
            
            // Update slug if name_en has changed
            if ($request->has('name_en') && $request->name_en !== $category->name_en) {
                // Create a slug from the English name
                $slug = Str::slug($request->name_en);
                
                // Check for uniqueness (excluding the current category)
                $originalSlug = $slug;
                $count = 1;
                
                while (Category::where('slug', $slug)->where('id', '!=', $category->id)->exists()) {
                    $slug = "{$originalSlug}-{$count}";
                    $count++;
                }
                
                $updateData['slug'] = $slug;
            }
            
            $category->update($updateData);

            return $this->success([
                "category" => $category,
                "message" => "Category updated successfully",
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                'Failed to update category',
                $e->getMessage()
            );
        }
    }

    public function deleteCategory($category)
    {
        try {
            $category = Category::find($category);
            
            if (!$category) {
                return response()->json(["message" => "Category not found!"], 404);
            }
            
            // Check if category has children
            $childrenCount = Category::where('parent_id', $category->id)->count();
            if ($childrenCount > 0) {
                return response()->json([
                    "message" => "Cannot delete category with subcategories. Please delete subcategories first."
                ], 400);
            }
            
            $category->delete();
            
            return $this->success([
                "category" => $category,
                "message" => "Category deleted successfully",
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                'Failed to delete category',
                $e->getMessage()
            );
        }
    }
}