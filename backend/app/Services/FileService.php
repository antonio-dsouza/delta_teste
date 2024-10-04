<?php

namespace App\Services;

use CodeIgniter\Files\File;
use CodeIgniter\HTTP\Files\UploadedFile;

class FileService
{
    public function uploadFile(UploadedFile $file, string $path): string|null
    {
        if ($file && $file->isValid()) {
            $newName = $file->getRandomName();
            $file->move(WRITEPATH . $path, $newName);
            return $path . '/' . $newName;
        }

        return null;
    }

    public function deleteFile(string $filePath): bool
    {
        if (file_exists(WRITEPATH . $filePath)) {
            return unlink(WRITEPATH . $filePath);
        }

        return false;
    }
}
