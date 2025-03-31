<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "title" => ["required", "string"],
            "description" => ["required", "string", "string"],
            "content" => ["required", "string"],
            "tags" => ["required", "array"],
            "tags.*" => ["exists:tags,id"],
            "duration" => ["required", "integer"],
            "cover" => ["required", "string"],
            "level" => ["required", "string", "in:advanced,beginner,intermediate"],
            "categoryId" => ["required", "string", "exists:categories,id"],
            "teacherId" => ["required", "string", "exists:users,id"],
        ];
    }
}
