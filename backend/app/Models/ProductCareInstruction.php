<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductCareInstruction extends Model
{
    use HasFactory;

    protected $fillable = [
        'instruction_ar',
        'instruction_en',
        'product_id',
    ];

    /**
     * Get the product that owns the care instruction.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}