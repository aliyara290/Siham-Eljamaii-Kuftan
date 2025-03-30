<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Color extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_ar',
        'name_en',
        'value',
    ];

    /**
     * Get the products that have this color.
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_colors')
                    ->withTimestamps();
    }
}