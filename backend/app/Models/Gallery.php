<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'photo',
        'title',
        'description',
        'is_featured'
    ];
    
    /**
     * Get the URL for the gallery photo.
     *
     * @return string
     */
    public function getPhotoUrlAttribute()
    {
        if ($this->photo) {
            return url('storage/' . $this->photo);
        }
        
        return null;
    }
}