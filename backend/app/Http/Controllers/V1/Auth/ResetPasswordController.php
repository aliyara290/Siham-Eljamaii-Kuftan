<?php

namespace App\Http\Controllers\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\ResetPasswordRequest;
use App\Interfaces\Auth\ResetPasswordInterface;

class ResetPasswordController extends Controller
{
    private $resetPasswordInterface;

    public function __construct(ResetPasswordInterface $resetPasswordInterface)
    {
        $this->resetPasswordInterface = $resetPasswordInterface;
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        return $this->resetPasswordInterface->resetPassword($request);
    }
}