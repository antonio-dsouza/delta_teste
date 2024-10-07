import Image from "next/image";
import { Edit, Eye, Trash } from "lucide-react";
import type { Student } from "@/types/student";
import DefaultUser from "@assets/default_user.png";
import ButtonAction from "@components/button/ButtonAction";

const colorClasses = {
  blue: {
    bg: "bg-blue-500",
    hover: "hover:bg-blue-600",
  },
  yellow: {
    bg: "bg-yellow-500",
    hover: "hover:bg-yellow-600",
  },
  red: {
    bg: "bg-red-500",
    hover: "hover:bg-red-600",
  },
};

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
  const fullAddress = [
    student.street ? `${student.street} ${student.street_number}` : null,
    student.neighborhood ? `${student.neighborhood}` : null,
    student.city && student.state ? `${student.city}/${student.state}` : null,
    student.country ? `${student.country}` : null,
  ]
    .filter(Boolean)
    .join(", ");

  const formattedAddress = fullAddress
    ? fullAddress.replace(/, ([^,]*)$/, " - $1")
    : "Endereço não disponível";

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="flex items-center px-6 py-4">
        <Image
          src={
            typeof student.photo === "string" && student.photo.trim() !== ""
              ? `${process.env.NEXT_PUBLIC_API_URL}/${student.photo}`
              : DefaultUser
          }
          width={1000}
          height={1000}
          alt="Imagem Aluno"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ps-3">
          <div className="text-base font-semibold">{student.name}</div>
        </div>
      </td>
      <td className="px-6 py-4">{student.email}</td>
      <td className="px-6 py-4">
        <p>{formattedAddress}</p>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-1">
          <ButtonAction
            icon={<Edit className="w-4 h-4 text-white" />}
            color={colorClasses.blue}
            onClick={() => onEdit(student)}
          />
          <ButtonAction
            icon={<Eye className="w-4 h-4 text-white" />}
            color={colorClasses.yellow}
            onClick={() => onView(student)}
          />
          <ButtonAction
            icon={<Trash className="w-4 h-4 text-white" />}
            color={colorClasses.red}
            onClick={() => onDelete(student.id)}
          />
        </div>
      </td>
    </tr>
  );
}
