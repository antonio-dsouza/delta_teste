<?php

namespace App\Validation;

class StudentValidation
{
    protected $validation;

    public function __construct()
    {
        $this->validation = \Config\Services::validation();
    }

    public function validateCreate(array &$data): bool
    {
        $this->validation->setRules([
            'name' => [
                'rules' => 'required|min_length[3]|max_length[255]',
                'label' => 'Nome',
                'errors' => [
                    'required' => 'O {field} é obrigatório.',
                    'min_length' => 'O {field} deve ter pelo menos {param} caracteres.',
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'email' => [
                'rules' => 'required|valid_email|is_unique[students.email]',
                'label' => 'E-mail',
                'errors' => [
                    'required' => 'O {field} é obrigatório.',
                    'valid_email' => 'O {field} deve ser um e-mail válido.',
                    'is_unique' => 'Já existe um aluno cadastro com o {field} informado.'
                ]
            ],
            'phone' => [
                'rules' => 'required|max_length[16]',
                'label' => 'Telefone',
                'errors' => [
                    'required' => 'O {field} é obrigatório.',
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'street' => [
                'rules' => 'required|max_length[255]',
                'label' => 'Rua',
                'errors' => [
                    'required' => 'A {field} é obrigatória.',
                    'max_length' => 'A {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'street_number' => [
                'rules' => 'required|max_length[6]',
                'label' => 'Número',
                'errors' => [
                    'required' => 'O {field} é obrigatório.',
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'complement' => [
                'rules' => 'permit_empty|max_length[128]',
                'label' => 'Complemento',
                'errors' => [
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'neighborhood' => [
                'rules' => 'required|max_length[96]',
                'label' => 'Bairro',
                'errors' => [
                    'required' => 'O {field} é obrigatório.',
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'city' => [
                'rules' => 'required|max_length[96]',
                'label' => 'Cidade',
                'errors' => [
                    'required' => 'A {field} é obrigatória.',
                    'max_length' => 'A {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'state' => [
                'rules' => 'required|max_length[96]',
                'label' => 'Estado',
                'errors' => [
                    'required' => 'O {field} é obrigatório.',
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'postal_code' => [
                'rules' => 'required|max_length[16]',
                'label' => 'Código Postal',
                'errors' => [
                    'required' => 'O {field} é obrigatório.',
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'country' => [
                'rules' => 'required|max_length[96]',
                'label' => 'País',
                'errors' => [
                    'required' => 'O {field} é obrigatório.',
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'photo' => [
                'rules' => 'permit_empty',
                'label' => 'Foto',
            ]
        ]);

        $data = array_intersect_key($data, $this->validation->getRules());

        return $this->validation->run($data);
    }

    public function validateUpdate(array &$data, int $studentId): bool
    {
        $this->validation->setRules([
            'name' => [
                'rules' => 'permit_empty|min_length[3]|max_length[255]',
                'label' => 'Nome',
                'errors' => [
                    'min_length' => 'O {field} deve ter pelo menos {param} caracteres.',
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'email' => [
                'rules' => "permit_empty|valid_email|is_unique[students.email,id,{$studentId}]",
                'label' => 'E-mail',
                'errors' => [
                    'permit_empty' => 'O {field} é obrigatório.',
                    'valid_email' => 'O {field} deve ser um e-mail válido.',
                    'is_unique' => 'Já existe um aluno cadastrado com o {field} informado.'
                ]
            ],
            'phone' => [
                'rules' => 'permit_empty|max_length[16]',
                'label' => 'Telefone',
                'errors' => [
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'street' => [
                'rules' => 'permit_empty|max_length[255]',
                'label' => 'Rua',
                'errors' => [
                    'max_length' => 'A {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'street_number' => [
                'rules' => 'permit_empty|max_length[6]',
                'label' => 'Número',
                'errors' => [
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'complement' => [
                'rules' => 'permit_empty|max_length[128]',
                'label' => 'Complemento',
                'errors' => [
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'neighborhood' => [
                'rules' => 'permit_empty|max_length[96]',
                'label' => 'Bairro',
                'errors' => [
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'city' => [
                'rules' => 'permit_empty|max_length[96]',
                'label' => 'Cidade',
                'errors' => [
                    'max_length' => 'A {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'state' => [
                'rules' => 'permit_empty|max_length[96]',
                'label' => 'Estado',
                'errors' => [
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'postal_code' => [
                'rules' => 'permit_empty|max_length[16]',
                'label' => 'Código Postal',
                'errors' => [
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'country' => [
                'rules' => 'permit_empty|max_length[96]',
                'label' => 'País',
                'errors' => [
                    'max_length' => 'O {field} deve ter no máximo {param} caracteres.'
                ]
            ],
            'photo' => [
                'rules' => 'permit_empty',
                'label' => 'Foto',
                'errors' => [
                    'mime_in' => 'O {field} deve ser JPG, JPEG ou PNG.',
                    'max_size' => 'O {field} deve ter no máximo 2MB.'
                ]
            ]
        ]);

        $data = array_intersect_key($data, $this->validation->getRules());

        return $this->validation->run($data);
    }

    public function getErrors(): array
    {
        return $this->validation->getErrors();
    }
}
