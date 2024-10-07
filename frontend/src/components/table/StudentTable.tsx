import type { Student } from "@/types/student";
import StudentRow from "./StudentRow";

export default function StudentTable({
  students,
  onEdit,
  onView,
  onDelete,
}: {
  students: Student[];
  onEdit: (student: Student) => void;
  onView: (student: Student) => void;
  onDelete: (studentId: number | null) => void;
}) {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Endereço
            </th>
            <th scope="col" className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                onEdit={onEdit}
                onView={onView}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center px-6 py-4">
                Nenhum aluno encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
