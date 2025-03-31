<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Interfaces\SizeInterface;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    private $sizeInterface;

    public function __construct(SizeInterface $sizeInterface)
    {
        $this->sizeInterface = $sizeInterface;
    }

    public function index()
    {
        return $this->sizeInterface->all();
    }
}
