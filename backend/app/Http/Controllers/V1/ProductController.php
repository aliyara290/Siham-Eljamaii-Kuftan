<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\ProductRequest;
use App\Interfaces\ProductInterface;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $productInterface;

    public function __construct(ProductInterface $productInterface)
    {
        $this->productInterface = $productInterface;
    }

    public function index()
    {
        return $this->productInterface->all();
    }

    public function store(ProductRequest $request)
    {
        return $this->productInterface->createProduct($request);
    }

    /**
     * Display the specified product.
     */
    public function show($id)
    {
        return $this->productInterface->getProductById($id);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(ProductRequest $request, $id)
    {
        return $this->productInterface->updateProduct($request, $id);
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy($id)
    {
        return $this->productInterface->deleteProduct($id);
    }

    /**
     * Get product details.
     */
    public function getDetails($id)
    {
        return $this->productInterface->getProductDetails($id);
    }

    /**
     * Get product sizes.
     */
    public function getSizes($id)
    {
        return $this->productInterface->getProductSizes($id);
    }

    /**
     * Get product colors.
     */
    public function getColors($id)
    {
        return $this->productInterface->getProductColors($id);
    }

    /**
     * Get product images.
     */
    public function getImages($id)
    {
        return $this->productInterface->getProductImages($id);
    }

    /**
     * Get product category.
     */
    public function getCategory($id)
    {
        return $this->productInterface->getProductCategories($id);
    }

    /**
     * Get products by category.
     */
    public function getByCategory($slug)
    {
        return $this->productInterface->getProductByCategory($slug);
    }

    /**
     * Get products by size.
     */
    public function getBySize($sizeId)
    {
        return $this->productInterface->getProductBySize($sizeId);
    }

    /**
     * Get products by color.
     */
    public function getByColor($colorId)
    {
        return $this->productInterface->getProductByColor($colorId);
    }

    /**
     * Get products by price range.
     */
    public function getByPrice(Request $request)
    {
        $priceFilter = [
            'min' => $request->min_price,
            'max' => $request->max_price
        ];
        
        return $this->productInterface->getProductByPrice($priceFilter);
    }
}