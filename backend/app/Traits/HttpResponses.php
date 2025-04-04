<?php

namespace App\Traits;

trait HttpResponses
{

    protected function success($data, $message = null, $code = 200)
    {
        return response()->json([
            "message" => $message,
            "data" => $data,
        ], $code);
    }

    protected function error($data, $code, $message = null)
    {
        return response()->json([
            "status" => "Error has occured...",
            "message" => $message,
            "data" => $data,
        ], $code);
    }
}
