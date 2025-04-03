<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "nameArr" => $this->name_ar,
            "nameEn" => $this->name_en,
            "icon" => $this->icon,
            "children" => $this->children,
            "parentId" => $this->parent_id,
            "createdAt" => $this->created_at,
        ];
    }
}
