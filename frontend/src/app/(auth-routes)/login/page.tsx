"use client";

import Image from "next/image";
import logo from "@assets/delta_logo.png";
import InputGroup from "@components/inputs/InputGroup";
import Input from "@components/inputs/Input";
import Label from "@components/labels/Label";
import Button from "@components/button/Button";
import { useState } from "react";
import useAuth from "@hooks/useAuth";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { handleLogin, loading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await handleLogin(formData.email, formData.password);
  };

  return (
    <section className="h-screen">
      <div className="flex justify-center items-center h-full bg-gray-200">
        <div className="w-[500px] h-[600px] shadow-md drop-shadow-[0_4px_70xpx_rgba(0,0,0,0.10)] bg-[rgba(255,255,255,0.30)] backdrop-blur-3xl rounded-3xl">
          <div className="p-24 flex flex-col gap-6">
            <Image src={logo} alt="logo" className="m-auto w-64" />
            <h1 className="text-gray-950 text-3xl font-semibold">Login</h1>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <InputGroup>
                <Label htmfor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Seu Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label htmfor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Sua senha"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </InputGroup>
              <Button type="submit" disabled={loading}>
                {loading ? "Carregando..." : "Logar-se"}
              </Button>
              <h2 className="text-xs font-normal">
                Você não tem uma conta?{" "}
                <a
                  href="register"
                  className="text-xs font-semibold hover:underline"
                >
                  Registre-se aqui
                </a>
              </h2>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
