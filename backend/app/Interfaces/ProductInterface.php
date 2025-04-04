<?php

namespace App\Interfaces;

interface ProductInterface
{
    public function all();
    public function recentProducts();
    public function createProduct($request);
    public function updateProduct($request, $productId);
    public function deleteProduct($productId);    
    public function getProductById($productId);
    public function getProductDetails($productId);
    public function getProductSizes($productId);
    public function getProductColors($productId);
    public function getProductImages($productId);
    public function getProductCategories($productId);
    public function getProductByCategory($productId);
    public function getProductBySize($productId);
    public function getProductByColor($productId);
    // public function getProductByPrice($productId);
    public function getProductByPrice($priceFilter);
}
