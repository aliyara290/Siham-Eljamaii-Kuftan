<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => [
                'ar' => $this->name_ar,
                'en' => $this->name_en,
            ],
            'price' => $this->price,
            'old_price' => $this->old_price,
            'description' => [
                'ar' => $this->description_ar,
                'en' => $this->description_en,
            ],
            'details' => ProductDetailResource::collection($this->whenLoaded('details')),
            'care_instructions' => ProductCareInstructionResource::collection($this->whenLoaded('careInstructions')),
            'images' => ProductImageResource::collection($this->whenLoaded('images')),
            'colors' => ColorResource::collection($this->whenLoaded('colors')),
            'sizes' => SizeResource::collection($this->whenLoaded('sizes')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}