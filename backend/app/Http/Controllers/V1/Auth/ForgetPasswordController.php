<?php

namespace App\Http\Controllers\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\ForgetPasswordRequest;
use App\Interfaces\Auth\ForgetPasswordInterface;

class ForgetPasswordController extends Controller
{
    private $forgetPasswordInterface;

    public function __construct(ForgetPasswordInterface $forgetPasswordInterface)
    {
        $this->forgetPasswordInterface = $forgetPasswordInterface;
    }

    public function sendResetLink(ForgetPasswordRequest $request)
    {
        return $this->forgetPasswordInterface->sendResetLink($request);
    }
}