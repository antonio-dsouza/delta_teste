<?php

namespace App\Repositories;

use App\Models\StudentModel;

class StudentRepository
{
    protected $model;

    public function __construct()
    {
        $this->model = new StudentModel();
    }

    public function findAll()
    {
        return $this->model->findAll();
    }

    public function findById($id)
    {
        return $this->model->find($id);
    }

    public function create(array $data)
    {
        $this->model->insert($data);
        return $this->model->find($this->model->insertID());
    }

    public function update($id, array $data)
    {
        $this->model->update($id, $data);
        return $this->model->find($id);
    }

    public function delete($id)
    {
        $this->model->delete($id);
        return ['id' => $id];
    }

    public function countAll()
    {
        return $this->model->countAllResults();
    }

    public function countByDateRange($dateRange)
    {
        return $this->model
            ->where('created_at >=', date('Y-m-d H:i:s', strtotime($dateRange)))
            ->countAllResults();
    }
}
