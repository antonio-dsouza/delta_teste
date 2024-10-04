"use client";

import Image from "next/image";
import logo from "@assets/delta_logo.png";
import InputGroup from "@components/inputs/InputGroup";
import Input from "@components/inputs/Input";
import Label from "@components/labels/Label";
import Button from "@components/button/Button";
import useRegister from "@hooks/useRegister";

const Register: React.FC = () => {
  const { formData, handleInputChange, register, loading } = useRegister();

  return (
    <section className="h-screen">
      <div className="flex justify-center items-center h-full bg-gray-200">
        <div className="w-[500px] h-[600px] shadow-md drop-shadow-[0_4px_70px_rgba(0,0,0,0.10)] bg-[rgba(255,255,255,0.30)] backdrop-blur-3xl rounded-3xl">
          <div className="p-24 flex flex-col gap-6">
            <Image src={logo} alt="Logo Delta Global" className="m-auto w-64" />
            <h1 className="text-gray-950 text-3xl font-semibold">
              Cadastre-se
            </h1>
            <form className="flex flex-col gap-4" onSubmit={register}>
              <InputGroup>
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Seu nome completo"
                  onChange={handleInputChange}
                  value={formData.name}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Seu Email"
                  onChange={handleInputChange}
                  value={formData.email}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Sua senha"
                  onChange={handleInputChange}
                  value={formData.password}
                  required
                />
              </InputGroup>
              <Button type="submit">
                {" "}
                {loading ? "Carregando..." : "Cadastrar-se"}
              </Button>
              <h2 className="text-xs font-normal">
                Você já tem uma conta?{" "}
                <a
                  href="/login"
                  className="text-xs font-semibold hover:underline"
                >
                  Logue-se aqui
                </a>
              </h2>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
