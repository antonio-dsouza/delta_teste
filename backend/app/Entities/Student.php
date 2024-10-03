<?php

namespace App\Entities;

use CodeIgniter\Entity\Entity;

class Student extends Entity
{
    protected $attributes = [
        'id' => null,
        'name' => null,
        'email' => null,
        'phone' => null,
        'address' => null,
        'photo' => null,
    ];
    protected $datamap = [];
    protected $dates   = ['created_at', 'updated_at', 'deleted_at'];
    protected $casts   = [];
}
