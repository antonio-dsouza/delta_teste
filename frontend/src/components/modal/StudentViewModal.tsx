import InputGroup from "@components/inputs/InputGroup";
import { Student } from "@/types/student";
import Divider from "@components/divider/Divider";
import Image from "next/image";
import DefaultUser from "@assets/default_user.png";

export default function StudentViewModal({
  formData,
  setViewingStudent,
}: {
  formData: Student;
  setViewingStudent: (formData: Student | null) => void;
}) {
  return (
    <div
      id="student-modal"
      aria-hidden="true"
      className={`flex justify-center items-center bg-[#000000bd] fixed z-50 w-full overflow-x-hidden md:inset-0 `}
    >
      <div className="relative w-10/12 max-h-screen">
        <div className="relative bg-white rounded-lg shadow">
          <button
            onClick={() => setViewingStudent(null)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
            data-modal-hide="student-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Fechar modal</span>
          </button>
          <div className="px-6  overflow-y-auto h-[500px] py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              Visualizando {formData.name}
            </h3>
            <div className="flex flex-col gap-2 w-full">
              <Divider text="Dados gerais" />
              <div className="flex gap-1 flex-grow max-md:flex-col">
                <InputGroup>
                  <h1 className="font-medium">Nome</h1>
                  <p>{formData.name != "" ? formData.name : "-"}</p>
                </InputGroup>
                <InputGroup>
                  <h1 className="font-medium">Email</h1>
                  <p>{formData.email != "" ? formData.email : "-"}</p>
                </InputGroup>
                <InputGroup>
                  <h1 className="font-medium">Telefone</h1>
                  <p>{formData.phone != "" ? formData.phone : "-"}</p>
                </InputGroup>
              </div>
              <Divider text="Endereço" />
              <div className="flex gap-1 flex-grow max-md:flex-col">
                <InputGroup>
                  <h1 className="font-medium">CEP</h1>
                  <p>
                    {formData.postal_code != "" ? formData.postal_code : "-"}
                  </p>
                </InputGroup>
                <InputGroup>
                  <h1 className="font-medium">Rua</h1>
                  <p>{formData.street != "" ? formData.street : "-"}</p>
                </InputGroup>
                <InputGroup>
                  <h1 className="font-medium">Número</h1>
                  <p>
                    {formData.street_number != ""
                      ? formData.street_number
                      : "-"}
                  </p>
                </InputGroup>
                <InputGroup>
                  <h1 className="font-medium">Complemento</h1>
                  <p>{formData.complement != "" ? formData.complement : "-"}</p>
                </InputGroup>
              </div>
              <div className="flex gap-1 flex-grow max-md:flex-col">
                <InputGroup>
                  <h1 className="font-medium">Bairro</h1>
                  <p>
                    {formData.neighborhood != "" ? formData.neighborhood : "-"}
                  </p>
                </InputGroup>
                <InputGroup>
                  <h1 className="font-medium">Cidade</h1>
                  <p>{formData.city != "" ? formData.city : "-"}</p>
                </InputGroup>
                <InputGroup>
                  <h1 className="font-medium">Estado</h1>
                  <p>{formData.state != "" ? formData.state : "-"}</p>
                </InputGroup>
                <InputGroup>
                  <h1 className="font-medium">País</h1>
                  <p>{formData.country != "" ? formData.country : "-"}</p>
                </InputGroup>
              </div>
              <Divider text="Imagem" />
              <Image
                src={
                  typeof formData.photo === "string" &&
                  formData.photo.trim() !== ""
                    ? `${process.env.NEXT_PUBLIC_API_URL}/${formData.photo}`
                    : DefaultUser
                }
                width={1000}
                height={1000}
                alt="Imagem Aluno"
                className="w-48 h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
