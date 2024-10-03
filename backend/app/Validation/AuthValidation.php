<?php

namespace App\Validation;

use CodeIgniter\Validation\ValidationInterface;

class AuthValidation
{
    protected $validation;

    public function __construct()
    {
        $this->validation = \Config\Services::validation();
    }

    public function validateRegister(array $data): bool
    {
        $this->validation->setRules([
            'name' => [
                'rules' => 'required|min_length[3]',
                'label' => 'Nome',
                'errors' => [
                    'required' => 'A {field} é obrigatório.',
                    'min_length' => 'A {field} deve ter pelo menos {param} caracteres.'
                ]
            ],
            'email' => [
                'rules' => 'required|valid_email|is_unique[users.email]',
                'label' => 'E-mail',
                'errors' => [
                    'required' => 'O {field} é obrigatório.',
                    'valid_email' => 'O {field} deve ser um e-mail válido.',
                    'is_unique' => 'Este {field} já está em uso.'
                ]
            ],
            'password' => [
                'rules' => 'required|min_length[6]',
                'label' => 'Senha',
                'errors' => [
                    'required' => 'A {field} é obrigatória.',
                    'min_length' => 'A {field} deve ter pelo menos {param} caracteres.'
                ]
            ]
        ]);

        return $this->validation->run($data);
    }

    public function validateLogin(array $data): bool
    {
        $this->validation->setRules([
            'email' => [
                'rules' => 'required|valid_email',
                'label' => 'E-mail',
                'errors' => [
                    'required' => 'O {field} é obrigatório.',
                    'valid_email' => 'O {field} deve ser um e-mail válido.',
                ]
            ],
            'password' => [
                'rules' => 'required',
                'label' => 'Senha',
                'errors' => [
                    'required' => 'A {field} é obrigatória.'
                ]
            ]
        ]);

        return $this->validation->run($data);
    }

    public function getErrors(): array
    {
        return $this->validation->getErrors();
    }
}
