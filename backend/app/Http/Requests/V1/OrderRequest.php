<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class OrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // You may want to add authorization logic here
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'total_amount' => 'required|numeric|min:0.01',
            'currency' => 'nullable|string|size:3',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|string|exists:products,id',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.options' => 'nullable|array',
            'shipping_address' => 'nullable|array',
            'shipping_address.first_name' => 'required_with:shipping_address|string',
            'shipping_address.last_name' => 'required_with:shipping_address|string',
            'shipping_address.address1' => 'required_with:shipping_address|string',
            'shipping_address.city' => 'required_with:shipping_address|string',
            'shipping_address.postal_code' => 'required_with:shipping_address|string',
            'shipping_address.country' => 'required_with:shipping_address|string',
            'shipping_address.phone' => 'nullable|string',
            'billing_address' => 'nullable|array',
            'billing_address.first_name' => 'required_with:billing_address|string',
            'billing_address.last_name' => 'required_with:billing_address|string',
            'billing_address.address1' => 'required_with:billing_address|string',
            'billing_address.city' => 'required_with:billing_address|string',
            'billing_address.postal_code' => 'required_with:billing_address|string',
            'billing_address.country' => 'required_with:billing_address|string',
            'billing_address.phone' => 'nullable|string',
            'notes' => 'nullable|string',
        ];
    }
}