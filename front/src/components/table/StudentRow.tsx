import Image from "next/image";
import { Edit, Eye, Trash } from "lucide-react";
import type { Student } from "@/types/student";
import bolo from "@assets/bolo.jpg";
import ButtonAction from "@components/button/ButtonAction";

export default function StudentRow({
  student,
  onEdit,
  onView,
  onDelete,
}: {
  student: Student;
  onEdit: (student: Student) => void;
  onView: (student: Student) => void;
  onDelete: (studentId: number | null) => void;
}) {
  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="flex items-center px-6 py-4">
        <Image
          src={bolo}
          alt="Imagem Aluno"
          className="w-10 h-10 rounded-full"
        />
        <div className="ps-3">
          <div className="text-base font-semibold">{student.name}</div>
        </div>
      </td>
      <td className="px-6 py-4">{student.email}</td>
      <td className="px-6 py-4">{student.street}</td>
      <td className="px-6 py-4">
        <div className="flex gap-1">
          <ButtonAction
            icon={<Edit className="w-4 h-4 text-white" />}
            color="blue"
            onClick={() => onEdit(student)}
          />
          <ButtonAction
            icon={<Eye className="w-4 h-4 text-white" />}
            color="yellow"
            onClick={() => onView(student)}
          />
          <ButtonAction
            icon={<Trash className="w-4 h-4 text-white" />}
            color="red"
            onClick={() => onDelete(student.id)}
          />
        </div>
      </td>
    </tr>
  );
}
