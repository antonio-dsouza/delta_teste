import Button from "@components/button/Button";
import Dropzone from "@components/inputs/DropZone";
import Input from "@components/inputs/Input";
import InputGroup from "@components/inputs/InputGroup";
import Label from "@components/labels/Label";
import { Student } from "@/types/student";
import { FormEvent, useState } from "react";
import Divider from "@components/divider/Divider";
import { fetchAddressByPostalCode } from "@services/cepService";

export default function StudentFormModal({
  formData,
  setFormData,
  handleSubmit,
}: {
  formData: Student;
  setFormData: (formData: Student) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (file: File | null) =>
    setFormData({ ...formData, photo: file });

  async function handlePostalCodeChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { value } = e.target;
    setFormData({ ...formData, postal_code: value });

    const onlyDigits = value.replace(/\D/g, "");
    if (onlyDigits.length < 8) return;

    setLoading(true);

    try {
      const address = await fetchAddressByPostalCode(value);
      setFormData({
        ...formData,
        postal_code: value,
        street: address.street,
        neighborhood: address.neighborhood,
        city: address.city,
        state: address.state,
        complement: address.complement,
      });
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      id="student-modal"
      aria-hidden="true"
      className={`flex justify-center items-center bg-[#000000bd] fixed z-50 w-full overflow-hidden md:inset-0 `}
    >
      <div className="relative w-10/12 max-h-screen">
        <div className="relative bg-white rounded-lg shadow">
          <button
            onClick={() => setFormData({ ...formData, modalOpen: false })}
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
          <div className="px-6 overflow-y-scroll h-[500px] py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              {formData.isUpdating ? "Atualizar aluno" : "Adicionar aluno"}
            </h3>
            <form className="flex gap-2" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 w-full">
                <Divider text="Dados gerais" />
                <div className="flex gap-1 flex-grow max-md:flex-col">
                  <InputGroup>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      value={formData.name}
                      name="name"
                      id="name"
                      type="text"
                      placeholder="Digite o nome"
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      value={formData.email}
                      name="email"
                      id="email"
                      type="text"
                      placeholder="Digite o email"
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      mask="(99) 99999-9999"
                      value={formData.phone}
                      name="phone"
                      id="phone"
                      type="text"
                      placeholder="Digite o telefone"
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </div>
                <Divider text="Endereço" />
                <div className="flex gap-1 flex-grow max-md:flex-col">
                  <InputGroup>
                    <Label htmlFor="postal_code">CEP</Label>
                    <Input
                      mask="99999-999"
                      value={formData.postal_code}
                      name="postal_code"
                      id="postal_code"
                      type="text"
                      placeholder="Digite o CEP"
                      onChange={handlePostalCodeChange}
                      required
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label htmlFor="street">Rua</Label>
                    <Input
                      value={formData.street}
                      name="street"
                      id="street"
                      type="text"
                      placeholder="Digite a rua"
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label htmlFor="street_number">Número</Label>
                    <Input
                      value={formData.street_number}
                      name="street_number"
                      id="street_number"
                      type="text"
                      placeholder="Digite o número"
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label htmlFor="complement">Complemento</Label>
                    <Input
                      value={formData.complement}
                      name="complement"
                      id="complement"
                      type="text"
                      placeholder="Digite o complemento"
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </div>
                <div className="flex gap-1 flex-grow max-md:flex-col">
                  <InputGroup>
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input
                      value={formData.neighborhood}
                      name="neighborhood"
                      id="neighborhood"
                      type="text"
                      placeholder="Digite o bairro"
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      value={formData.city}
                      name="city"
                      id="city"
                      type="text"
                      placeholder="Digite a cidade"
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label htmlFor="state">Estado</Label>
                    <Input
                      value={formData.state}
                      name="state"
                      id="state"
                      type="text"
                      placeholder="Digite o estado"
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label htmlFor="country">País</Label>
                    <Input
                      value={formData.country}
                      name="country"
                      id="country"
                      type="text"
                      placeholder="Digite o país"
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </div>
                <Divider text="Imagem" />
                <Dropzone
                  file={formData.photo}
                  onFileChange={handleFileChange}
                />
                <Button>
                  {loading
                    ? "Carregando..."
                    : formData.isUpdating
                    ? "Atualizar"
                    : "Adicionar"}
                </Button>
              </div>
            </form>
            {loading && (
              <div className="absolute inset-0 flex justify-center items-center bg-gray-200 bg-opacity-50">
                <span className="text-lg font-bold">Carregando...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
