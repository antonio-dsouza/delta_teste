<?php

namespace App\Services;

use App\Repositories\StudentRepository;
use CodeIgniter\Exceptions\PageNotFoundException;

class StudentService
{
    protected $studentRepository;

    public function __construct()
    {
        $this->studentRepository = new StudentRepository();
    }

    public function getAllStudents()
    {
        return $this->studentRepository->findAll();
    }

    public function getStudent($id)
    {
        $student = $this->studentRepository->findById($id);

        if (!$student) {
            throw new PageNotFoundException('Aluno não encontrado.');
        }

        return $student;
    }

    public function createStudent($data)
    {
        return $this->studentRepository->create($data);
    }

    public function updateStudent($id, $data)
    {
        $student = $this->studentRepository->findById($id);

        if (!$student) {
            throw new PageNotFoundException('Aluno não encontrado.');
        }

        return $this->studentRepository->update($id, $data);
    }

    public function deleteStudent($id)
    {
        $student = $this->studentRepository->findById($id);

        if (!$student) {
            throw new PageNotFoundException('Aluno não encontrado.');
        }

        return $this->studentRepository->delete($id);
    }
}
