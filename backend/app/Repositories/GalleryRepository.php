<?php

namespace App\Repositories;

use App\Http\Resources\V1\GalleryCollectionResource;
use App\Http\Resources\V1\GalleryResource;
use App\Interfaces\GalleryInterface;
use App\Models\Gallery;
use App\Traits\HttpResponses;
use Exception;
use Illuminate\Support\Facades\Storage;

class GalleryRepository implements GalleryInterface
{
    use HttpResponses;

    /**
     * Get all gallery items
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function all()
    {
        try {
            $galleries = Gallery::orderBy('created_at', 'desc')->get();
            
            return $this->success(
                new GalleryCollectionResource($galleries),
            );
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }

    /**
     * Get a gallery item by ID
     * 
     * @param Gallery $gallery
     * @return \Illuminate\Http\JsonResponse
     */
    public function find(Gallery $gallery)
    {
        try {
            return $this->success([
                'gallery' => new GalleryResource($gallery),
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                404,
                'Gallery item not found'
            );
        }
    }

    /**
     * Create a new gallery item
     * 
     * @param object $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store($request)
    {
        try {
            // Handle file upload
            $photo = $request->file('photo');
            $photoPath = $photo->store('galleries', 'public');
            
            $gallery = Gallery::create([
                'photo' => $photoPath,
                'title' => $request->title,
                'description' => $request->description,
                'is_featured' => $request->is_featured ?? false,
            ]);
            
            return $this->success([
                'gallery' => new GalleryResource($gallery),
                'message' => 'Gallery item added successfully.'
            ], 201);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                'Failed to upload gallery item: ' . $e->getMessage()
            );
        }
    }

    /**
     * Update a gallery item
     * 
     * @param object $request
     * @param Gallery $gallery
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($request, Gallery $gallery)
    {
        try {
            $data = [
                'title' => $request->title ?? $gallery->title,
                'description' => $request->description ?? $gallery->description,
                'is_featured' => $request->is_featured ?? $gallery->is_featured,
            ];
            
            // Handle file upload if provided
            if ($request->hasFile('photo')) {
                // Delete old file
                if ($gallery->photo) {
                    Storage::disk('public')->delete($gallery->photo);
                }
                
                // Store new file
                $photo = $request->file('photo');
                $photoPath = $photo->store('galleries', 'public');
                $data['photo'] = $photoPath;
            }
            
            $gallery->update($data);
            
            return $this->success([
                'gallery' => new GalleryResource($gallery),
                'message' => 'Gallery item updated successfully'
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                'Failed to update gallery item: ' . $e->getMessage()
            );
        }
    }

    /**
     * Delete a gallery item
     * 
     * @param Gallery $gallery
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Gallery $gallery)
    {
        try {
            // Delete the associated file
            if ($gallery->photo) {
                Storage::disk('public')->delete($gallery->photo);
            }
            
            $gallery->delete();
            
            return $this->success([
                'message' => 'Gallery item deleted successfully'
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                'Failed to delete gallery item: ' . $e->getMessage()
            );
        }
    }
}