export async function login (email: string, password: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error("Erro ao logar, verifique os dados!");
    }

    const data = await response.json();
    return data;
};

export async function register (formData: { email: string; password: string; name: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        const data = await response.json();
        if (data.messages) {
            const errorMessages = data.messages;
            throw new Error(errorMessages[Object.keys(errorMessages)[0]]);
        }
        throw new Error("Erro ao fazer registro, tente novamente");
    }

    const data = await response.json();
    return data;
};

export function logout() {
    localStorage.removeItem("token");
    window.location.replace("/login");
};

export function isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
};
