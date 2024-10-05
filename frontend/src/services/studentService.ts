import type { Student } from "@/types/student";
import { logout } from "./authService";

interface ValidationErrorResponse {
  error: number;
  messages: Record<string, string>;
}

const handleUnauthorized = async () => {
  logout();
  window.location.replace('/login');
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  };
};

export const getStudents = async (): Promise<Student[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/students`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (response.status === 401) {
    await handleUnauthorized();
  }

  return response.json();
};

export const getStudentById = async (id: number): Promise<Student> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/students/${id}`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (response.status === 401) {
    await handleUnauthorized();
  }

  return response.json();
};

export const createStudent = async (
  student: Student
): Promise<Student | ValidationErrorResponse> => {
  const formData = new FormData();
  Object.entries(student).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/students`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: formData,
    }
  );

  if (response.status === 401) {
    await handleUnauthorized();
    return { error: 401, messages: { general: "Não autorizado" } };
  }

  if (!response.ok) {
    const errorResponse = await response.json();
    return { error: response.status, messages: errorResponse.messages };
  }

  return response.json();
};

export const updateStudent = async (
  id: number,
  student: Student
): Promise<Student | ValidationErrorResponse> => {
  const formData = new FormData();
  Object.entries(student).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/students/${id}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: formData,
    }
  );

  if (response.status === 401) {
    await handleUnauthorized();
    return { error: 401, messages: { general: "Não autorizado" } };
  }

  return response.json();
};

export const deleteStudent = async (id: number): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/students/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (response.status === 401) {
    await handleUnauthorized();
  }

  return response.json();
};