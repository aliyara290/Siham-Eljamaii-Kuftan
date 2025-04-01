<?php

namespace App\Repositories\Auth;

use App\Interfaces\Auth\ForgetPasswordInterface;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Log;

class ForgetPasswordRepository implements ForgetPasswordInterface
{
    public function sendResetLink($request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );
        Log::info('Password reset status: ' . $status);
        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => __($status)], 200)
            : response()->json(['message' => __($status)], 400);
    }
}