import type { Student } from "@/types/student";
import { signOut } from "next-auth/react";

interface ValidationErrorResponse {
  error: number;
  messages: Record<string, string>;
}

const handleUnauthorized = async () => {
  await signOut({ redirect: false });
  window.location.replace('/login');
};

export const getStudents = async (): Promise<Student[]> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/students"
  );

  if (response.status === 401) {
    await handleUnauthorized();
  }

  return response.json();
};

export const getStudentById = async (id: number): Promise<Student> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL + "/api/students"}/${id}`
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
    process.env.NEXT_PUBLIC_API_URL + "/api/students",
    {
      method: "POST",
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
    `${process.env.NEXT_PUBLIC_API_URL + "/api/students"}/${id}`,
    {
      method: "PUT",
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL + "/api/students"}/${id}`, {
    method: "DELETE",
  });

  if (response.status === 401) {
    await handleUnauthorized();
  }

  return response.json();
};
