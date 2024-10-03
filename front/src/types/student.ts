export interface Student {
    id: number | null;
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    photo: File | null;
    modalOpen: boolean,
    isUpdating: boolean,
}
