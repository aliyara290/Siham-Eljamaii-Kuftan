<?php

namespace App\Repositories;
use App\Http\Resources\V1\ProductCollectionResource;
use App\Http\Resources\V1\ProductResource;
use App\Http\Resources\V1\ProductDetailResource;
use App\Http\Resources\V1\ProductCareInstructionResource;
use App\Http\Resources\V1\ProductImageResource;
use App\Http\Resources\V1\ColorResource;
use App\Http\Resources\V1\SizeResource;
use App\Http\Resources\V1\CategoryResource;
use App\Interfaces\ProductInterface;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\ProductImage;
use App\Traits\HttpResponses;
use Exception;
use Illuminate\Support\Str;

class ProductRepository implements ProductInterface
{
    use HttpResponses;
    
    public function all() {
        try {
            $products = Product::with(['details', 'careInstructions', 'images', 'colors', 'sizes'])->paginate(10);
            return new ProductCollectionResource($products);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }

    public function createProduct($request) {
        try {
            $product = Product::create([
                'name_ar' => $request->name_ar,
                'name_en' => $request->name_en,
                'price' => $request->price,
                'old_price' => $request->old_price,
                'description_ar' => $request->description_ar,
                'description_en' => $request->description_en,
                'slug' => Str::slug($request->name_en),
                'sku' => $request->sku,
                'quantity' => $request->quantity ?? 0,
                'status' => $request->status ?? 'active',
                'featured' => $request->featured ?? 'no',
                'category_id' => $request->category_id,
            ]);

            // Handle product details
            if ($request->has('details') && is_array($request->details)) {
                foreach ($request->details as $detail) {
                    $product->details()->create([
                        'detail_ar' => $detail['detail_ar'] ?? null,
                        'detail_en' => $detail['detail_en'] ?? null,
                    ]);
                }
            }

            // Handle care instructions
            if ($request->has('care_instructions') && is_array($request->care_instructions)) {
                foreach ($request->care_instructions as $instruction) {
                    $product->careInstructions()->create([
                        'instruction_ar' => $instruction['instruction_ar'] ?? null,
                        'instruction_en' => $instruction['instruction_en'] ?? null,
                    ]);
                }
            }

            // Handle images
            if ($request->has('images') && is_array($request->images)) {
                foreach ($request->images as $image) {
                    $product->images()->create([
                        'url' => $image['url'],
                        'sort_order' => $image['sort_order'] ?? 0,
                    ]);
                }
            }

            // Handle colors
            if ($request->has('colors') && is_array($request->colors)) {
                $product->colors()->attach($request->colors);
            }

            // Handle sizes
            if ($request->has('sizes') && is_array($request->sizes)) {
                $product->sizes()->attach($request->sizes);
            }

            return $this->success([
                'product' => new ProductResource($product->load(['details', 'careInstructions', 'images', 'colors', 'sizes'])),
                'message' => 'Product created successfully',
            ], 201);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }

    public function updateProduct($request, $productId) {
        try {
            $product = Product::findOrFail($productId);
            
            $product->update([
                'name_ar' => $request->name_ar ?? $product->name_ar,
                'name_en' => $request->name_en ?? $product->name_en,
                'price' => $request->price ?? $product->price,
                'old_price' => $request->old_price ?? $product->old_price,
                'description_ar' => $request->description_ar ?? $product->description_ar,
                'description_en' => $request->description_en ?? $product->description_en,
                'slug' => $request->name_en ? Str::slug($request->name_en) : $product->slug,
                'sku' => $request->sku ?? $product->sku,
                'quantity' => $request->quantity ?? $product->quantity,
                'status' => $request->status ?? $product->status,
                'featured' => $request->featured ?? $product->featured,
                'category_id' => $request->category_id ?? $product->category_id,
            ]);

            // Update product details
            if ($request->has('details') && is_array($request->details)) {
                // Remove existing details
                $product->details()->delete();

                // Add new details
                foreach ($request->details as $detail) {
                    $product->details()->create([
                        'detail_ar' => $detail['detail_ar'] ?? null,
                        'detail_en' => $detail['detail_en'] ?? null,
                    ]);
                }
            }

            // Update care instructions
            if ($request->has('care_instructions') && is_array($request->care_instructions)) {
                // Remove existing care instructions
                $product->careInstructions()->delete();

                // Add new care instructions
                foreach ($request->care_instructions as $instruction) {
                    $product->careInstructions()->create([
                        'instruction_ar' => $instruction['instruction_ar'] ?? null,
                        'instruction_en' => $instruction['instruction_en'] ?? null,
                    ]);
                }
            }

            // Update images
            if ($request->has('images') && is_array($request->images)) {
                // Remove existing images
                $product->images()->delete();

                // Add new images
                foreach ($request->images as $image) {
                    $product->images()->create([
                        'url' => $image['url'],
                        'sort_order' => $image['sort_order'] ?? 0,
                    ]);
                }
            }

            // Update colors
            if ($request->has('colors') && is_array($request->colors)) {
                $product->colors()->sync($request->colors);
            }

            // Update sizes
            if ($request->has('sizes') && is_array($request->sizes)) {
                $product->sizes()->sync($request->sizes);
            }

            return $this->success([
                'product' => new ProductResource($product->load(['details', 'careInstructions', 'images', 'colors', 'sizes'])),
                'message' => 'Product updated successfully',
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }

    public function deleteProduct($productId) {
        try {
            $product = Product::findOrFail($productId);
            
            // Delete related records
            $product->details()->delete();
            $product->careInstructions()->delete();
            $product->images()->delete();
            $product->colors()->detach();
            $product->sizes()->detach();
            
            // Delete the product
            $product->delete();
            
            return $this->success([
                'message' => 'Product deleted successfully'
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }

    public function getProductById($productId) {
        try {
            $product = Product::with(['details', 'careInstructions', 'images', 'colors', 'sizes'])
                ->findOrFail($productId);
            
            return $this->success([
                'product' => new ProductResource($product),
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                404,
                'Product not found'
            );
        }
    }

    public function getProductDetails($productId) {
        try {
            $details = ProductDetail::where('product_id', $productId)->get();
            
            return $this->success([
                'details' => ProductDetailResource::collection($details),
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }

    public function getProductSizes($productId) {
        try {
            $product = Product::findOrFail($productId);
            $sizes = $product->sizes;
            
            return $this->success([
                'sizes' => SizeResource::collection($sizes),
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }

    public function getProductColors($productId) {
        try {
            $product = Product::findOrFail($productId);
            $colors = $product->colors;
            
            return $this->success([
                'colors' => ColorResource::collection($colors),
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }

    public function getProductImages($productId) {
        try {
            $images = ProductImage::where('product_id', $productId)->get();
            
            return $this->success([
                'images' => ProductImageResource::collection($images),
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }

    public function getProductCategories($productId) {
        try {
            $product = Product::with('category')->findOrFail($productId);
            
            if ($product->category) {
                return $this->success([
                    'category' => new CategoryResource($product->category),
                ]);
            }
            
            return $this->error(
                '',
                404,
                'No category found for this product'
            );
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }

    public function getProductByCategory($categoryId) {
        try {
            $products = Product::where('category_id', $categoryId)
                ->with(['details', 'careInstructions', 'images', 'colors', 'sizes'])
                ->paginate(10);
            
            return new ProductCollectionResource($products);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }

    public function getProductBySize($sizeId) {
        try {
            $products = Product::whereHas('sizes', function($query) use ($sizeId) {
                    $query->where('sizes.id', $sizeId);
                })
                ->with(['details', 'careInstructions', 'images', 'colors', 'sizes'])
                ->paginate(10);
            
            return new ProductCollectionResource($products);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }

    public function getProductByColor($colorId) {
        try {
            $products = Product::whereHas('colors', function($query) use ($colorId) {
                    $query->where('colors.id', $colorId);
                })
                ->with(['details', 'careInstructions', 'images', 'colors', 'sizes'])
                ->paginate(10);
            
            return new ProductCollectionResource($products);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }

    public function getProductByPrice($priceFilter) {
        try {
            $query = Product::query();
            
            if (is_array($priceFilter)) {
                if (isset($priceFilter['min']) && isset($priceFilter['max'])) {
                    $query->whereBetween('price', [$priceFilter['min'], $priceFilter['max']]);
                } else if (isset($priceFilter['min'])) {
                    $query->where('price', '>=', $priceFilter['min']);
                } else if (isset($priceFilter['max'])) {
                    $query->where('price', '<=', $priceFilter['max']);
                }
            } else {
                // If priceFilter is not an array, assume it's a maximum price value
                $query->where('price', '<=', $priceFilter);
            }
            
            $products = $query->with(['details', 'careInstructions', 'images', 'colors', 'sizes'])
                ->paginate(10);
            
            return new ProductCollectionResource($products);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }
}