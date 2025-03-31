<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Interfaces\ColorInterface;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    private $colorInterface;

    public function __construct(ColorInterface $colorInterface)
    {
        $this->colorInterface = $colorInterface;
    }

    public function index()
    {
        return $this->colorInterface->all();
    }
}
