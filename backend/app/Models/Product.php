<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name_ar',
        'name_en',
        'price',
        'old_price',
        'description_ar',
        'description_en',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'old_price' => 'decimal:2',
    ];

    /**
     * Get the product details for the product.
     */
    public function details(): HasMany
    {
        return $this->hasMany(ProductDetail::class);
    }

    /**
     * Get the care instructions for the product.
     */
    public function careInstructions(): HasMany
    {
        return $this->hasMany(ProductCareInstruction::class);
    }

    /**
     * Get the images for the product.
     */
    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }

    /**
     * Get the colors available for the product.
     */
    public function colors(): BelongsToMany
    {
        return $this->belongsToMany(Color::class, 'product_colors')
                    ->withTimestamps();
    }

    /**
     * Get the sizes available for the product.
     */
    public function sizes(): BelongsToMany
    {
        return $this->belongsToMany(Size::class, 'product_sizes')
                    ->withTimestamps();
    }
}