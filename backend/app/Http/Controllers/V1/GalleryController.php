<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\StoreGalleryRequest;
use App\Http\Requests\V1\UpdateGalleryRequest;
use App\Interfaces\GalleryInterface;
use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    private $galleryInterface;

    public function __construct(GalleryInterface $galleryInterface)
    {
        $this->galleryInterface = $galleryInterface;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return $this->galleryInterface->all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreGalleryRequest $request)
    {
        return $this->galleryInterface->store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Gallery $gallery)
    {
        return $this->galleryInterface->find($gallery);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGalleryRequest $request, Gallery $gallery)
    {
        return $this->galleryInterface->update($request, $gallery);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Gallery $gallery)
    {
        return $this->galleryInterface->destroy($gallery);
    }
}