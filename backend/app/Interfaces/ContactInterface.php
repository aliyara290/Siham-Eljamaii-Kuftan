<?php

namespace App\Interfaces;

interface ContactInterface
{
    /**
     * Get all contacts
     * 
     * @return mixed
     */
    public function all();
    
    /**
     * Get a contact by ID
     * 
     * @param int $id
     * @return mixed
     */
    public function find($id);
    
    /**
     * Create a new contact
     * 
     * @param array $data
     * @return mixed
     */
    public function store($data);
    
    /**
     * Update contact status
     * 
     * @param int $id
     * @param string $status
     * @return mixed
     */
    public function updateStatus($id, $status);
    
    /**
     * Delete a contact
     * 
     * @param int $id
     * @return mixed
     */
    public function destroy($id);
}