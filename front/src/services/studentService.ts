import type { Student } from "@/types/student";
import { signOut } from "next-auth/react";

interface ValidationErrorResponse {
  error: number;
  messages: Record<string, string>;
}

export const getStudents = async (): Promise<Student[]> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/students"
  );

  if (response.status === 401) {
    await signOut({
      redirect: false,
    });

    window.location.replace('/login');

  }

  return response.json();
};

export const getStudentById = async (id: number): Promise<Student> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL + "/api/students"}/${id}`
  );

  if (response.status === 401) {
    await signOut({
      redirect: false,
    });

    window.location.replace('/login');

  }

  return response.json();
};

export const createStudent = async (
  student: Student
): Promise<Student | ValidationErrorResponse> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/students",
    {
      method: "POST",
      body: JSON.stringify(student),
      headers: { "Content-Type": "application/json" },
    }
  );

  if (response.status === 401) {
    await signOut({
      redirect: false,
    });

    window.location.replace('/login');

    return { error: 401, messages: { general: "Não autorizado" } };
  }

  if (!response.ok) {
    const errorResponse = await response.json();
    return { error: response.status, messages: errorResponse.messages };
  }

  return await response.json();
};

export const updateStudent = async (
  id: number,
  student: Student
): Promise<Student | ValidationErrorResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL + "/api/students"}/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }
  );

  if (response.status === 401) {
    await signOut({
      redirect: false,
    });

    window.location.replace('/login');

    return { error: 401, messages: { general: "Não autorizado" } };
  }

  return response.json();
};

export const deleteStudent = async (id: number): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL + "/api/students"}/${id}`, {
    method: "DELETE",
  });

  if (response.status === 401) {
    await signOut({
      redirect: false,
    });

    window.location.replace('/login');
  }

  return response.json();
};
