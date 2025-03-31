<?php

namespace App\Repositories;

use App\Interfaces\PaymentInterface;
use App\Traits\HttpResponses;
use Exception;
use Stripe\Exception\ApiErrorException;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class StripePaymentRepository implements PaymentInterface
{
    use HttpResponses;

}