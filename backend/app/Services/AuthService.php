<?php

namespace App\Services;

use App\Repositories\UserRepository;

class AuthService
{
    protected $userRepository;
    protected $jwtService;

    public function __construct()
    {
        $this->userRepository = new UserRepository();
        $this->jwtService = new JWTService();
    }

    public function register(array $data)
    {
        $data['password'] = password_hash($data['password'], PASSWORD_BCRYPT);

        return $this->userRepository->saveUser($data);
    }

    public function login(string $email, string $password)
    {
        $user = $this->userRepository->findUserByEmail($email);

        if (!$user || !password_verify($password, $user['password'])) {
            return false;
        }

        $token = $this->jwtService->generateJWT($user['id']);
        $user = ['id' => $user['id'], 'name' => $user['name']];

        return ['user' => $user, 'token' => $token];
    }
}
