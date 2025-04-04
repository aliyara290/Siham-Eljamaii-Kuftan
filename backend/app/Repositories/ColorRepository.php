<?php

namespace App\Repositories;

use App\Http\Resources\V1\ColorCollectionResource;
use App\Interfaces\ColorInterface;
use App\Traits\HttpResponses;
use App\Models\Color;
use Exception;

class ColorRepository implements ColorInterface
{
    use HttpResponses;

    // public function createColor()
    // {
    //     try {
    //         // Since we can't accept $request as a parameter to match the interface,
    //         // we need to get it from the request
    //         $request = request();
    //         $color = Color::create([
    //             'name' => $request->name,
    //             'hex' => $request->hex
    //         ]);
            
    //         return $this->success([
    //             'color' => $color,
    //             'message' => 'Color created successfully'
    //         ]);
    //     } catch (Exception $e) {
    //         return $this->error(
    //             '',
    //             500,
    //             $e->getMessage()
    //         );
    //     }
        
    // }

    /**
     * Delete a color
     *
     * @return \Illuminate\Http\JsonResponse
     */
    // public function deleteColor()
    // {
    //     try {
    //         // Since we can't accept $id as a parameter to match the interface,
    //         // we need to get it from the request
    //         $id = request('id');
            
    //         if (!$id) {
    //             return $this->error(
    //                 '',
    //                 400,
    //                 'Color ID is required'
    //             );
    //         }
            
    //         $color = Color::findOrFail($id);
            
    //         // Check if color is associated with products
    //         if ($color->products()->count() > 0) {
    //             return $this->error(
    //                 '',
    //                 400,
    //                 'Cannot delete color as it is associated with products'
    //             );
    //         }
            
    //         $color->delete();
            
    //         return $this->success([
    //             'message' => 'Color deleted successfully'
    //         ]);
    //     } catch (Exception $e) {
    //         return $this->error(
    //             '',
    //             500,
    //             $e->getMessage()
    //         );
    //     }
    // }

    public function all()
    {
        try {
            $colors = Color::get();
            
            return $this->success([
                'colors' => new ColorCollectionResource($colors),
            ]);
            
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }
}