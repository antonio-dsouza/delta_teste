"use client";
import { useState, useEffect, FormEvent } from "react";
import { toast } from "react-toastify";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
} from "@services/studentService";
import type { Student } from "@/types/student";
import NavBar from "@/components/navegation/NavBar";
import Button from "@/components/button/Button";
import toastOptions from "@services/toastConfig";
import StudentFormModal from "@components/modal/StudentFormModal";
import StudentTable from "@components/table/StudentTable";
import StudentViewModal from "@components/modal/StudentViewModal";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<Student>({
    id: null,
    name: "",
    email: "",
    phone: "",
    street: "",
    street_number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    modalOpen: false,
    photo: "",
    isUpdating: false,
  });
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch {
      toast.error("Erro ao carregar alunos", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentById = async (id: number) => {
    try {
      const student = await getStudentById(id);
      if (student) {
        setFormData({
          ...student,
          modalOpen: true,
          isUpdating: true,
        });
      }
    } catch (error) {
      toast.error(
        `Erro ao carregar detalhes do aluno com ID ${id}: ${error}`,
        toastOptions
      );
    }
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = formData.isUpdating
        ? await updateStudent(formData.id!, formData)
        : await createStudent(formData);

      if ("error" in response) {
        handleValidationErrors(response.messages);
        return;
      }

      toast.success(
        `Aluno ${
          formData.isUpdating ? "atualizado" : "adicionado"
        } com sucesso!`,
        toastOptions
      );
      resetForm();
      fetchStudents();
    } catch {
      toast.error("Erro ao salvar aluno", toastOptions);
    }
  };

  const handleValidationErrors = (errors: Record<string, string>) => {
    Object.values(errors).forEach((message) =>
      toast.error(message, toastOptions)
    );
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      email: "",
      phone: "",
      street: "",
      street_number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      modalOpen: false,
      photo: "",
      isUpdating: false,
    });
  };

  const handleEdit = async (student: Student) => {
    await fetchStudentById(student.id!);
  };

  const handleView = async (student: Student) => {
    const fetchedStudent = await getStudentById(student.id!);
    setViewingStudent(fetchedStudent);
  };

  const handleDelete = async (id: number | null) => {
    if (!id) return;
    if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
      try {
        await deleteStudent(id);
        toast.success("Aluno excluído com sucesso!", toastOptions);
        fetchStudents();
      } catch (error) {
        toast.error(`Erro ao excluir aluno: ${error}`, toastOptions);
      }
    }
  };

  return (
    <>
      <NavBar />
      <main className="container mx-auto py-10">
        <div className="flex justify-between items-center pb-11">
          <h1 className="font-semibold text-5xl">Alunos</h1>
          <div className="w-40">
            <Button
              onClick={() => {
                resetForm();
                setFormData((prev) => ({ ...prev, modalOpen: true }));
              }}
            >
              Adicionar
            </Button>
          </div>
        </div>

        {loading ? (
          <p>Carregando alunos...</p>
        ) : (
          <StudentTable
            students={students}
            onEdit={handleEdit}
            onView={handleView}
            onDelete={handleDelete}
          />
        )}

        {formData.modalOpen && (
          <StudentFormModal
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleFormSubmit}
          />
        )}

        {viewingStudent && (
          <StudentViewModal
            formData={viewingStudent}
            setViewingStudent={setViewingStudent}
          />
        )}
      </main>
    </>
  );
}
