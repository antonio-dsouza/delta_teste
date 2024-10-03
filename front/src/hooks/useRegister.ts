import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import toastOptions from "@services/toastConfig";

interface FormData {
    email: string;
    password: string;
    name: string;
}

interface Response {
    message?: string;
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

    const register = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);

        try {
            const response: Response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, formData, {
                headers: { "Content-Type": "application/json" },
            });

            toast.info(response.message || "Registro realizado com sucesso!", {
                ...toastOptions,
                autoClose: 3000,
            });

            setTimeout(() => {
                router.replace("/login");
            }, 1000);

        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error) && error.response && error.response.data.messages) {
                const errorMessages = error.response.data.messages;
                for (const key of Object.keys(errorMessages)) {
                    toast.error(errorMessages[key], toastOptions);
                    return;
                }
            }
            toast.error('Erro ao fazer registro, tente novamente', toastOptions);
        } finally {
            setLoading(false);
        }
    };

    return { formData, handleInputChange, register, loading };
}
