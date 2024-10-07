import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../services/authService";
import toastOptions from "@services/toastConfig";

export default function useAuth() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);

    try {
      const result = await login(email, password);

      localStorage.setItem("token", result.token);
      localStorage.setItem("name", result.user.name);

      toast.info("Logado com sucesso, redirecionando!", {
        ...toastOptions,
      });

      setTimeout(() => {
        window.location.replace("/");
      }, 1000);

      return true;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao logar, verifique os dados",
        toastOptions
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
}
