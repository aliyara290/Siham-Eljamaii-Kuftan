<?php

namespace App\Providers;

use App\Http\Requests\V1\ResetPasswordRequest;
use App\Interfaces\Auth\AuthInterface;
use App\Interfaces\Auth\ForgetPasswordInterface;
use App\Interfaces\CategoryInterface;
use App\Interfaces\ColorInterface;
use App\Interfaces\ContactInterface;
use App\Interfaces\GalleryInterface;
use App\Interfaces\OrderInterface;
use App\Interfaces\PaymentInterface;
use App\Interfaces\ProductInterface;
use App\Interfaces\SizeInterface;
use App\Repositories\Auth\AuthRepository;
use App\Repositories\Auth\ForgetPasswordRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\ColorRepository;
use App\Repositories\ContactRepository;
use App\Repositories\GalleryRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use App\Repositories\SizeRepository;
use App\Repositories\StripePaymentRepository;
use Illuminate\Support\ServiceProvider;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(GalleryInterface::class, GalleryRepository::class);
        $this->app->bind(CategoryInterface::class, CategoryRepository::class);
        $this->app->bind(AuthInterface::class, AuthRepository::class);
        $this->app->bind(ProductInterface::class, ProductRepository::class);
        $this->app->bind(PaymentInterface::class, StripePaymentRepository::class);
        $this->app->bind(OrderInterface::class, OrderRepository::class);
        $this->app->bind(ColorInterface::class, ColorRepository::class);
        $this->app->bind(SizeInterface::class, SizeRepository::class);
        $this->app->bind(ForgetPasswordInterface::class, ForgetPasswordRepository::class);
        $this->app->bind(ContactInterface::class, ContactRepository::class);
        // In AppServiceProvider.php
        $this->app->bind(\App\Interfaces\Auth\ResetPasswordInterface::class, \App\Repositories\Auth\ResetPasswordRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
