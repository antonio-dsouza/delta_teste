import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { register } from "../services/authService";
import toastOptions from "@services/toastConfig";

interface FormData {
    email: string;
    password: string;
    name: string;
}

export default function useRegister() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        name: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);

        try {
            await register(formData);
            toast.info("Registro realizado com sucesso!", {
                ...toastOptions,
                autoClose: 3000,
            });

            setTimeout(() => {
                router.replace("/login");
            }, 1000);

        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Erro ao fazer registro, tente novamente', toastOptions);
        } finally {
            setLoading(false);
        }
    };

    return { formData, handleInputChange, handleRegister, loading };
}
