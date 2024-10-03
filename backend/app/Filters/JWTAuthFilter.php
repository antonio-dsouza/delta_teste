<?php

namespace App\Filters;

use App\Services\JWTService;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Services;

class JWTAuthFilter implements FilterInterface
{
    protected $jwtService;

    public function __construct()
    {
        $this->jwtService = new JWTService();
    }

    public function before(RequestInterface $request, $arguments = null)
    {
        $token = $request->getHeaderLine('Authorization');

        if (!$token) {
            return Services::response()->setStatusCode(401)->setJSON(['message' => 'Token de autorização é obrigatório']);
        }

        $decodedToken = $this->jwtService->verifyToken(str_replace('Bearer ', '', $token));

        if (!$decodedToken) {
            return Services::response()->setStatusCode(ResponseInterface::HTTP_UNAUTHORIZED)->setJSON(['message' => 'Token inválido']);
        }

        $request->user = $decodedToken;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        //
    }
}
