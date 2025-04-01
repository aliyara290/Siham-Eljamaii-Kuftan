<?php

namespace App\Repositories\Auth;
use App\Http\Requests\V1\ForgetPasswordRequest;
use App\Interfaces\Auth\ResetPasswordInterface;
use App\Models\User;
use App\Traits\httpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class ResetPasswordRepository implements ResetPasswordInterface
{

    public function resetPassword($request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|min:6|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Password has been reset.'], 200);
        }

        return response()->json(['message' => 'Invalid token or email.'], 400);
    }
}
