import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import toastOptions from "@services/toastConfig";

const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      toast.error("Erro ao logar, verifique os dados!", toastOptions);
      return false;
    }

    toast.info("Logado com sucesso, redirecionando!", {
      ...toastOptions,
    });

    setTimeout(() => {
      window.location.replace("/");
    }, 3000);

    return true;
  };

  return { login, loading };
};

export default useAuth;
