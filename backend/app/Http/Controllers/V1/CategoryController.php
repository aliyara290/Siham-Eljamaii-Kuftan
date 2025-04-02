<?php

namespace App\Http\Controllers\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Interfaces\CategoryInterface;
use App\Models\Category;

class CategoryController extends Controller
{
    private $categoryInterface;

    public function __construct(CategoryInterface $categoryInterface)
    {
        $this->categoryInterface = $categoryInterface;
    }

    public function index()
    {
        return $this->categoryInterface->getCategories();
    }


    public function store(Request $request)
    {
        return $this->categoryInterface->storeCategory($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return $this->categoryInterface->getCategory($category);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        return $this->categoryInterface->updateCategory($request, $category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        return $this->categoryInterface->deleteCategory($category);
    }
}
