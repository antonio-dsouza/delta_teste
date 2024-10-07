<?php

namespace App\Controllers;

use App\Services\StudentService;
use CodeIgniter\RESTful\ResourceController;
use Exception;

class DashboardController extends ResourceController
{
    protected $studentService;

    public function __construct()
    {
        $this->studentService = new StudentService();
    }

    public function index()
    {
        try {
            $statistics = $this->studentService->getDashboardStatistics();
            return $this->respond($statistics);
        } catch (Exception $exception) {
            return $this->fail($exception->getMessage());
        }
    }
}
