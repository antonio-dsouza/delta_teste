<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateStudentsTable extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'          => [
                'type'           => 'INT',
                'constraint'     => 11,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'name'        => [
                'type'       => 'VARCHAR',
                'constraint' => '160',
            ],
            'email'       => [
                'type'       => 'VARCHAR',
                'constraint' => '160',
                'unique'     => true,
            ],
            'phone'       => [
                'type'       => 'VARCHAR',
                'constraint' => '16',
                'null'       => true,
            ],
            'street'      => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
                'null'       => true,
            ],
            'city'        => [
                'type'       => 'VARCHAR',
                'constraint' => '96',
                'null'       => true,
            ],
            'state'       => [
                'type'       => 'VARCHAR',
                'constraint' => '96',
                'null'       => true,
            ],
            'postal_code' => [
                'type'       => 'VARCHAR',
                'constraint' => '16',
                'null'       => true,
            ],
            'country'     => [
                'type'       => 'VARCHAR',
                'constraint' => '96',
                'null'       => true,
            ],
            'photo'       => [
                'type'       => 'VARCHAR',
                'constraint' => '255',
                'null'       => true,
            ],
            'created_at'  => [
                'type'       => 'DATETIME',
                'null'       => true,
            ],
            'updated_at'  => [
                'type'       => 'DATETIME',
                'null'       => true,
            ],
        ]);

        $this->forge->addKey('id', true);
        $this->forge->createTable('students');
    }

    public function down()
    {
        $this->forge->dropTable('students');
    }
}
