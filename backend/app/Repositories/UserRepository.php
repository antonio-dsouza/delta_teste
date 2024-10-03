<?php

namespace App\Repositories;

use App\Models\UserModel;

class UserRepository
{
    protected $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    public function findUserByEmail(string $email)
    {
        return $this->userModel->where('email', $email)->first();
    }

    public function saveUser(array $data)
    {
        return $this->userModel->insert($data);
    }
}
