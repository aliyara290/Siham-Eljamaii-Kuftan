<?php

namespace App\Interfaces\Auth;

interface ForgetPasswordInterface
{
    public function sendResetLink($request);
}
