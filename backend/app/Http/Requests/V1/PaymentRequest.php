<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class PaymentRequest extends FormRequest
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
        return match ($this->route()->getActionMethod()) {
            'createPaymentIntent' => [
                'amount' => 'required|numeric|min:0.01',
                'currency' => 'nullable|string|size:3',
                'description' => 'nullable|string|max:255',
                'order_id' => 'nullable|string',
                'customer_email' => 'nullable|email',
            ],
            'processPayment' => [
                'payment_method_id' => 'required|string',
                'amount' => 'required|numeric|min:0.01',
                'currency' => 'nullable|string|size:3',
                'description' => 'nullable|string|max:255',
                'order_id' => 'nullable|string',
                'customer_email' => 'nullable|email',
            ],
            default => [],
        };
    }
}