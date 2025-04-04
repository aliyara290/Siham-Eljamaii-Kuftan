<?php

namespace App\Interfaces;

use App\Models\Gallery;

interface GalleryInterface
{
    /**
     * Get all gallery items
     * 
     * @return mixed
     */
    public function all();
    
    /**
     * Get a gallery item by ID
     * 
     * @param Gallery $gallery
     * @return mixed
     */
    public function find(Gallery $gallery);
    
    /**
     * Create a new gallery item
     * 
     * @param object $request
     * @return mixed
     */
    public function store($request);
    
    /**
     * Update a gallery item
     * 
     * @param object $request
     * @param Gallery $gallery
     * @return mixed
     */
    public function update($request, Gallery $gallery);
    
    /**
     * Delete a gallery item
     * 
     * @param Gallery $gallery
     * @return mixed
     */
    public function destroy(Gallery $gallery);
}