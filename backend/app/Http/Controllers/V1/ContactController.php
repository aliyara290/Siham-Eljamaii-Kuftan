<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\ContactRequest;
use App\Interfaces\ContactInterface;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    private $contactInterface;

    public function __construct(ContactInterface $contactInterface)
    {
        $this->contactInterface = $contactInterface;
    }

    /**
     * Display a listing of the contacts.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->contactInterface->all();
    }

    /**
     * Store a newly created contact in storage.
     * 
     * @param \App\Http\Requests\V1\ContactRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ContactRequest $request)
    {
        return $this->contactInterface->store($request->validated());
    }

    /**
     * Display the specified contact.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        return $this->contactInterface->find($id);
    }

    /**
     * Update the specified contact status.
     * 
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:pending,resolved',
        ]);

        return $this->contactInterface->updateStatus($id, $request->status);
    }

    /**
     * Remove the specified contact from storage.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        return $this->contactInterface->destroy($id);
    }
}