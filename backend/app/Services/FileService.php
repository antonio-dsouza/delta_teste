<?php

namespace App\Services;

use CodeIgniter\HTTP\Files\UploadedFile;

class FileService
{
	public function uploadFile(UploadedFile $file, string $path): string|null
	{
		$fullPath = '../public/' . $path;

		if (!is_dir($fullPath)) {
			mkdir($fullPath, 0775, true);
		}

		if ($file && $file->isValid() && !$file->hasMoved()) {
			$mimeType = $file->getMimeType();
			if (!in_array($mimeType, ['image/png', 'image/jpeg', 'image/jpg'])) {
				return null;
			}

			$newName = $file->getRandomName();
			$file->move($fullPath, $newName);
			return $path . '/' . $newName;
		}

		return null;
	}

	public function uploadBase64Image(string $photo, string $path): string|null
	{
		$fullPath = '../public/' . $path;

		if (!is_dir($fullPath)) {
			mkdir($fullPath, 0775, true);
		}

		$extension = explode(';', explode('/', $photo)[1])[0];

		if (!isset(explode(',', $photo)[1])) return $photo;

		$photo = explode(',', $photo)[1];
		$fileData = base64_decode($photo);
		$newName = uniqid() . '.' . $extension;
		file_put_contents($fullPath . '/' . $newName, $fileData);

		return $path . '/' . $newName;
	}

	public function deleteFile(string $filePath): bool
	{
		if (file_exists('../public/' . $filePath)) {
			return unlink('../public/' . $filePath);
		}

		return false;
	}
}
