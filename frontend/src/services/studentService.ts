import type { Student } from "@/types/student";
import { logout } from "./authService";
import { getBase64 } from "./fileService";
import { StudentDashboard } from "@/types/studentDashboard";

interface ValidationErrorResponse {
  error: number;
  messages: Record<string, string>;
}

async function handleUnauthorized() {
  logout();
  window.location.replace("/login");
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "Content-Type": "application/json",
  };
}

export async function getStudents(): Promise<Student[]> {
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
}

export async function getStudentById(id: number): Promise<Student> {
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
}
export async function createStudent(
  student: Student
): Promise<Student | ValidationErrorResponse> {
  if (student.photo instanceof File) {
    student.photo = await getBase64(student.photo);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/students`,
    {
      method: "POST",
      headers: {
        ...getAuthHeaders(),
      },
      body: JSON.stringify(student),
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
}

export async function updateStudent(
  id: number,
  student: Student
): Promise<Student | ValidationErrorResponse> {
  if (student.photo instanceof File) {
    student.photo = await getBase64(student.photo);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/students/${id}`,
    {
      method: "PUT",
      headers: {
        ...getAuthHeaders(),
      },
      body: JSON.stringify(student),
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
}

export async function deleteStudent(id: number): Promise<void> {
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
}

export async function getStudentDashboard(): Promise<StudentDashboard> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  if (response.status === 401) {
    await handleUnauthorized();
  }

  return response.json();
}
