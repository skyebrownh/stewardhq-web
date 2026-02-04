import { getHeaders } from "@/lib/utils";
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
    email?: string | null;
    phone: string;
    is_active?: boolean | null;
}

export interface UserUpdateBody {
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
    phone?: string | null;
    is_active?: boolean | null;
}

export const getAllUsers = () => {
    return apiFetch<UserResponse[]>("/users");
};

export const getUser = (userId: string) => {
    return apiFetch<UserResponse>(`/users/${userId}`);
};

export const insertUser = (body: UserInsertBody, token: string | null) => {
    return apiFetch<UserResponse>("/users", {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });
};

export const updateUser = (userId: string, body: UserUpdateBody, token: string | null) => {
    return apiFetch<UserResponse>(`/users/${userId}`, {
        method: "PATCH",
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });
};

export const deleteUser = (userId: string, token: string | null) => {
    return apiFetch<void>(`/users/${userId}`, {
        method: "DELETE",
        headers: getHeaders(token)
    });
};
