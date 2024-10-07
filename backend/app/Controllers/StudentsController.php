<?php

namespace App\Controllers;

use App\Services\FileService;
use App\Services\StudentService;
use App\Validation\StudentValidation;
use CodeIgniter\Exceptions\PageNotFoundException;
use CodeIgniter\RESTful\ResourceController;
use Exception;

class StudentsController extends ResourceController
{
    protected $studentService;
    protected $studentValidation;
    protected $fileService;

    public function __construct()
    {
        $this->studentService = new StudentService();
        $this->studentValidation = new StudentValidation();
        $this->fileService = new FileService();
    }

    public function index()
    {
        try {
            $students = $this->studentService->getAllStudents();
        } catch (Exception $exception) {
            return $this->fail($exception->getMessage());
        }

        return $this->respond($students);
    }

    public function show($id = null)
    {
        try {
            $student = $this->studentService->getStudent($id);
        } catch (PageNotFoundException $exception) {
            return $this->failNotFound($exception->getMessage());
        } catch (Exception $exception) {
            return $this->fail($exception->getMessage());
        }

        return $this->respond($student);
    }

    public function create()
    {
        $data = $this->request->getJSON(true);

        if (!$this->studentValidation->validateCreate($data)) {
            return $this->fail($this->studentValidation->getErrors());
        }

        if (isset($data['photo']) && !empty($data['photo'])) {
            $photoPath = $this->fileService->uploadBase64Image($data['photo'], 'uploads/students');
            if (!$photoPath) {
                return $this->fail('Erro ao enviar a imagem.', 400);
            }
            $data['photo'] = $photoPath;
        }

        try {
            $student = $this->studentService->createStudent($data);
        } catch (Exception $exception) {
            return $this->fail($exception->getMessage());
        }

        return $this->respondCreated($student);
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        if (!$this->studentValidation->validateUpdate($data, $id)) {
            return $this->fail($this->studentValidation->getErrors());
        }

        if (isset($data['photo']) && !empty($data['photo'])) {
            $photoPath = $this->fileService->uploadBase64Image($data['photo'], 'uploads/students');
            if (!$photoPath) {
                return $this->fail('Erro ao enviar a imagem.', 400);
            }
            $data['photo'] = $photoPath;
        }

        try {
            $student = $this->studentService->updateStudent($id, $data);
        } catch (PageNotFoundException $exception) {
            return $this->failNotFound($exception->getMessage());
        } catch (Exception $exception) {
            return $this->fail($exception->getMessage());
        }

        return $this->respondUpdated($student);
    }

    public function delete($id = null)
    {
        try {
            $student = $this->studentService->getStudent($id);

            if (!empty($student['photo'])) {
                $this->fileService->deleteFile($student['photo']);
            }

            $result = $this->studentService->deleteStudent($id);
        } catch (PageNotFoundException $exception) {
            return $this->failNotFound($exception->getMessage());
        } catch (Exception $exception) {
            return $this->fail($exception->getMessage());
        }

        return $this->respondDeleted($result);
    }
}
