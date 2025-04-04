<?php

namespace App\Repositories;

use App\Interfaces\ContactInterface;
use App\Models\Contact;
use App\Traits\HttpResponses;
use Exception;

class ContactRepository implements ContactInterface
{
    use HttpResponses;

    /**
     * Get all contacts
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function all()
    {
        try {
            $contacts = Contact::orderBy('created_at', 'desc')->paginate(15);
            
            return $this->success([
                'contacts' => $contacts,
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                $e->getMessage()
            );
        }
    }

    /**
     * Get a contact by ID
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function find($id)
    {
        try {
            $contact = Contact::findOrFail($id);
            
            return $this->success([
                'contact' => $contact,
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                404,
                'Contact not found'
            );
        }
    }

    /**
     * Create a new contact
     * 
     * @param array $data
     * @return \Illuminate\Http\JsonResponse
     */
    public function store($data)
    {
        try {
            $contact = Contact::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'subject' => $data['subject'] ?? 'general',
                'message' => $data['message'],
                'status' => 'pending'
            ]);
            
            return $this->success([
                'contact' => $contact,
                'message' => 'Your message has been sent successfully.'
            ], 201);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                'Failed to send message: ' . $e->getMessage()
            );
        }
    }

    /**
     * Update contact status
     * 
     * @param int $id
     * @param string $status
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStatus($id, $status)
    {
        try {
            $contact = Contact::findOrFail($id);
            
            $contact->update([
                'status' => $status
            ]);
            
            return $this->success([
                'contact' => $contact,
                'message' => 'Contact status updated successfully'
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                'Failed to update contact status: ' . $e->getMessage()
            );
        }
    }

    /**
     * Delete a contact
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $contact = Contact::findOrFail($id);
            $contact->delete();
            
            return $this->success([
                'message' => 'Contact deleted successfully'
            ]);
        } catch (Exception $e) {
            return $this->error(
                '',
                500,
                'Failed to delete contact: ' . $e->getMessage()
            );
        }
    }
}