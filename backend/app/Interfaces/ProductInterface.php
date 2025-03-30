<?php

namespace App\Interfaces;

interface ProductInterface
{
    public function all();
    public function createProduct();
    public function updateProduct();
    public function deleteProduct();    
    public function getProductById();
    public function getProductDetails();
    public function getProductSizes();
    public function getProductColors();
    public function getProductImages();
    public function getProductCategories();
    public function getProductByCategory();
    public function getProductBySize();
    public function getProductByColor();
    public function getProductByPrice();
}
