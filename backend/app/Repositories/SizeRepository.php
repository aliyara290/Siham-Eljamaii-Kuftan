<?php

namespace App\Repositories;

use App\Http\Resources\V1\SizeResource;
use App\Interfaces\SizeInterface;
use App\Models\Size;
use App\Traits\HttpResponses;
use Exception;

class SizeRepository implements SizeInterface
{
    use HttpResponses;

    /**
     * Get all sizes
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function all()
    {
        try {
            $sizes = Size::all();
            
            return $this->success([
                'sizes' => SizeResource::collection($sizes),
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