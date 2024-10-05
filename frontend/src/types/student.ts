export interface Student {
    id: number | null;
    name: string;
    email: string;
    phone: string;
    street: string;
    street_number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    photo: File | string | null;
    modalOpen: boolean,
    isUpdating: boolean,
}
