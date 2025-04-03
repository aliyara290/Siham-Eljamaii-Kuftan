<?php

use App\Http\Controllers\V1\Auth\AuthController;
use App\Http\Controllers\V1\Auth\ForgetPasswordController;
use App\Http\Controllers\V1\Auth\ResetPasswordController;
use App\Http\Controllers\V1\CategoryController;
use App\Http\Controllers\V1\ColorController;
use App\Http\Controllers\V1\OrderController;
use App\Http\Controllers\V1\ProductController;
use App\Http\Controllers\V1\PaymentController;
use App\Http\Controllers\V1\SizeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// User authentication routes
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::prefix('v1')->group(function () {
    // Auth routes
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::get('/google', [AuthController::class, 'redirectToGoogle']);
        Route::get('/google/callback', [AuthController::class, 'handleGoogleCallback']);
        Route::post('/logout', [AuthController::class, 'destroy'])->middleware('auth:sanctum');
        
        // Password reset routes
        Route::post('/forgot-password', [ForgetPasswordController::class, 'sendResetLink']);
        Route::post('/reset-password', [ResetPasswordController::class, 'resetPassword']);
    });
    
    // Product filter routes - these come first to avoid route conflicts
    Route::prefix('products')->group(function () {
        Route::get('/filters/category/{slug}', [ProductController::class, 'getByCategory']);
        Route::get('/filters/size/{sizeId}', [ProductController::class, 'getBySize']);
        Route::get('/filters/color/{colorId}', [ProductController::class, 'getByColor']);
        Route::get('/filters/price', [ProductController::class, 'getByPrice']);
    });
    
    Route::get('/colors', [ColorController::class, 'index']);
    Route::get('/sizes', [SizeController::class, 'index']);
    Route::apiResource('/categories', CategoryController::class);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::get('/products/{id}/details', [ProductController::class, 'getDetails']);
    Route::get('/products/{id}/sizes', [ProductController::class, 'getSizes']);
    Route::get('/products/{id}/colors', [ProductController::class, 'getColors']);
    Route::get('/products/{id}/images', [ProductController::class, 'getImages']);
    Route::get('/products/{id}/category', [ProductController::class, 'getCategory']);

    // Payment routes
    Route::prefix('payments')->group(function () {
        // Public webhook endpoint (no auth)
        Route::post('/webhook', [PaymentController::class, 'handleWebhook']);
        // Protected routes
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/create-intent', [PaymentController::class, 'createPaymentIntent']);
            Route::post('/process', [PaymentController::class, 'processPayment']);
            Route::get('/{paymentId}', [PaymentController::class, 'getPaymentDetails']);
        });
    });
    
    // Order routes (all protected)
    Route::prefix('orders')->middleware('auth:sanctum')->group(function () {
        Route::post('/', [OrderController::class, 'store']);
        Route::get('/my-orders', [OrderController::class, 'myOrders']);
        Route::get('/{id}', [OrderController::class, 'show']);
        Route::patch('/{id}/status', [OrderController::class, 'updateStatus']);
        // Admin routes (would need admin middleware in a real app)
        Route::get('/user/{userId}', [OrderController::class, 'userOrders']);
    });
    
    // Protected routes (write operations)
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('products', [ProductController::class, 'store']);
        Route::put('products/{id}', [ProductController::class, 'update']);
        Route::patch('products/{id}', [ProductController::class, 'update']);
        Route::delete('products/{id}', [ProductController::class, 'destroy']);
    });
});