<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Adjust based on your authorization logic
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name_ar' => 'required|string|max:255',
            'name_en' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'old_price' => 'nullable|numeric|min:0',
            'description_ar' => 'nullable|string',
            'description_en' => 'nullable|string',
            'details' => 'nullable|array',
            'details.*.detail_ar' => 'nullable|string',
            'details.*.detail_en' => 'nullable|string',
            'care_instructions' => 'nullable|array',
            'care_instructions.*.instruction_ar' => 'nullable|string',
            'care_instructions.*.instruction_en' => 'nullable|string',
            'colors' => 'nullable|array',
            'colors.*' => 'exists:colors,id',
            'sizes' => 'nullable|array',
            'sizes.*' => 'exists:sizes,id',
            'images' => 'nullable|array',
            'images.*.url' => 'required|string',
            'images.*.sort_order' => 'nullable|integer|min:0',
        ];

        return $rules;
    }
}