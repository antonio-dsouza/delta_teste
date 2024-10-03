<?php

namespace App\Services;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class JWTService
{
    private $key;

    public function __construct()
    {
        $this->key = getenv('JWT_SECRET_KEY');
    }

    public function generateJWT($userId)
    {
        $payload = [
            'iss' => getenv('JWT_ISSUER'),
            'aud' => getenv('JWT_AUDIENCE'),
            'iat' => time(),
            'exp' => time() + (int)getenv('JWT_EXPIRATION'),
            'uid' => $userId
        ];

        return JWT::encode($payload, $this->key, 'HS256');
    }

    public function verifyToken($token)
    {
        try {
            return JWT::decode($token, new Key($this->key, 'HS256'));
        } catch (Exception $e) {
            return false;
        }
    }
}
