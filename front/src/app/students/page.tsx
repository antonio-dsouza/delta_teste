"use client";
import { useState, useEffect, FormEvent } from "react";
import { toast } from "react-toastify";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "@services/studentService";
import type { Student } from "@/types/student";
import NavBar from "@/components/navegation/NavBar";
import Button from "@/components/button/Button";
import toastOptions from "@services/toastConfig";
import StudentFormModal from "@components/modal/StudentFormModal";
import StudentTable from "@components/table/StudentTable";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<Student>({
    id: null,
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    modalOpen: false,
    photo: null,
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

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const studentData = { ...formData, photo: formData.photo };

    try {
      const response = formData.isUpdating
        ? await updateStudent(formData.id!, studentData)
        : await createStudent(studentData);

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
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      modalOpen: false,
      photo: null,
      isUpdating: false,
      id: null,
    });
  };

  const handleEdit = (student: Student) => {
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      street: student.street,
      city: student.city,
      state: student.state,
      postal_code: student.postal_code,
      country: student.country,
      photo: student.photo,
      modalOpen: true,
      isUpdating: true,
      id: student.id,
    });
  };

  const handleView = (student: Student) => {
    setViewingStudent(student);
  };

  const handleDelete = async (id: number | null) => {
    if (!id) return;
    if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
      try {
        await deleteStudent(id);
        toast.success("Aluno excluído com sucesso!", toastOptions);
        fetchStudents();
      } catch {
        toast.error("Erro ao excluir aluno", toastOptions);
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
              onClick={() => setFormData({ ...formData, modalOpen: true })}
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
          <div className="modal">
            <h2>Visualizando Aluno</h2>
            <p>Nome: {viewingStudent.name}</p>
            <p>Email: {viewingStudent.email}</p>
            <p>Endereço: {viewingStudent.street}</p>
            <Button onClick={() => setViewingStudent(null)}>Fechar</Button>
          </div>
        )}
      </main>
    </>
  );
}
