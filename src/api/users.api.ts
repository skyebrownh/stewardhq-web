import { apiFetch } from "./client";

export interface UserResponse {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    is_active: boolean;
    id: string;
    created_at: string;
    updated_at: string;
}

export interface UserInsertBody {
    first_name: string;
    last_name: string;
    email?: string;
    phone: string;
    is_active?: boolean;
}

export interface UserUpdateBody {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    is_active?: boolean;
}

export const getAllUsers = () => {
    return apiFetch<UserResponse[]>("/users");
};

export const getUser = (userId: string) => {
    return apiFetch<UserResponse>(`/users/${userId}`);
};

export const insertUser = (body: UserInsertBody) => {
    return apiFetch<UserResponse>("/users", {
        method: "POST",
        body: JSON.stringify(body)
    });
};

export const updateUser = (userId: string, body: UserUpdateBody) => {
    return apiFetch<UserResponse>(`/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(body)
    });
};

export const deleteUser = (userId: string) => {
    return apiFetch<void>(`/users/${userId}`, {
        method: "DELETE"
    });
};
