<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Services\AuthService;
use CodeIgniter\HTTP\ResponseInterface;
use App\Validation\AuthValidation;
use Exception;

class AuthController extends ResourceController
{
    protected $authService;
    protected $validation;

    public function __construct()
    {
        $this->authService = new AuthService();
        $this->validation = new AuthValidation();
    }

    public function register()
    {
        $data = $this->request->getJSON(true);

        if (!$this->validation->validateRegister($data)) {
            return $this->fail($this->validation->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }

        try {
            $user = $this->authService->register($data);
        } catch (Exception $exception) {
            return $this->fail('Erro interno ao realizar o registro: ' . $exception->getMessage(), ResponseInterface::HTTP_INTERNAL_SERVER_ERROR);
        }

        if (!$user) {
            return $this->fail('Falha no registro do usuário', ResponseInterface::HTTP_BAD_REQUEST);
        }

        return $this->respondCreated(['message' => 'Usuário registrado com sucesso']);
    }

    public function login()
    {
        $data = $this->request->getJSON(true);

        if (!$this->validation->validateLogin($data)) {
            return $this->fail($this->validation->getErrors(), ResponseInterface::HTTP_BAD_REQUEST);
        }

        try {
            $return = $this->authService->login($data['email'], $data['password']);
        } catch (Exception $exception) {
            return $this->fail('Erro interno ao realizar o login: ' . $exception->getMessage(), ResponseInterface::HTTP_INTERNAL_SERVER_ERROR);
        }

        if (!$return) {
            return $this->fail('Credenciais inválidas', ResponseInterface::HTTP_UNAUTHORIZED);
        }

        return $this->respond($return, ResponseInterface::HTTP_OK);
    }
}
