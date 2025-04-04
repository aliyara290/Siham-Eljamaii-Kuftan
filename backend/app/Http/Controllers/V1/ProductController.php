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

    public function recentProducts()
    {
        return $this->productInterface->recentProducts();
    }

    public function store(ProductRequest $request)
    {
        return $this->productInterface->createProduct($request);
    }
 
    public function show($slug)
    {
        return $this->productInterface->getProductById($slug);
    }

     
    public function update(ProductRequest $request, $id)
    {
        return $this->productInterface->updateProduct($request, $id);
    }

     
    public function destroy($id)
    {
        return $this->productInterface->deleteProduct($id);
    }

     
    public function getDetails($slug)
    {
        return $this->productInterface->getProductDetails($slug);
    }

     
    public function getSizes($slug)
    {
        return $this->productInterface->getProductSizes($slug);
    }


    public function getColors($slug)
    {
        return $this->productInterface->getProductColors($slug);
    }


    public function getImages($slug)
    {
        return $this->productInterface->getProductImages($slug);
    }


    public function getCategory($id)
    {
        return $this->productInterface->getProductCategories($id);
    }


    public function getByCategory($slug)
    {
        return $this->productInterface->getProductByCategory($slug);
    }


    public function getBySize($sizeId)
    {
        return $this->productInterface->getProductBySize($sizeId);
    }


    public function getByColor($colorId)
    {
        return $this->productInterface->getProductByColor($colorId);
    }

    public function getByPrice(Request $request)
    {
        $priceFilter = [
            'min' => $request->min_price,
            'max' => $request->max_price
        ];
        
        return $this->productInterface->getProductByPrice($priceFilter);
    }
}