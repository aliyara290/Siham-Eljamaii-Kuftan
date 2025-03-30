<?php

namespace App\Repositories;

use App\Http\Resources\ProductCollectionResource;
use App\Interfaces\ProductInterface;
use App\Models\Product;
use App\Traits\HttpResponses;
use Exception;

class ProductRepository implements ProductInterface
{
    /**
     * Create a new class instance.
     */
    use HttpResponses;
    
     public function all() {
        try {
            $products = Product::get();
            return new ProductCollectionResource($products);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
     }
    public function createProduct($request) {}
    public function updateProduct($request, $productId) {}
    public function deleteProduct($productId) {}    
    public function getProductById($productId) {}
    public function getProductDetails($productId) {}
    public function getProductSizes($productId) {}
    public function getProductColors($productId) {}
    public function getProductImages($productId) {}
    public function getProductCategories($productId) {}
    public function getProductByCategory($productId) {}
    public function getProductBySize($productId) {}
    public function getProductByColor($productId) {}
    public function getProductByPrice($productId) {}


}
