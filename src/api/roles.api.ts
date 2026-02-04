import { getHeaders } from "@lib/utils";
import { apiFetch } from "./client";

export interface RoleResponse {
    name: string;
    description: string;
    order: number;
    is_active: boolean;
    id: string;
    code: string;
    created_at: string;
    updated_at: string;
}

export interface RoleInsertBody {
    name: string;
    description?: string | null;
    order: number;
    is_active?: boolean | null;
    code: string;
}

export interface RoleUpdateBody {
    name?: string | null;
    description?: string | null;
    order?: number | null;
    is_active?: boolean | null;
}

export const getAllRoles = () => {
    return apiFetch<RoleResponse[]>("/roles");
};

export const getRole = (roleId: string) => {
    return apiFetch<RoleResponse>(`/roles/${roleId}`);
};

export const insertRole = (body: RoleInsertBody, token: string | null) => {
    return apiFetch<RoleResponse>("/roles", {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });
};

export const updateRole = (roleId: string, body: RoleUpdateBody, token: string | null) => {
    return apiFetch<RoleResponse>(`/roles/${roleId}`, {
        method: "PATCH",
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });
};

export const deleteRole = (roleId: string, token: string | null) => {
    return apiFetch<void>(`/roles/${roleId}`, {
        method: "DELETE",
        headers: getHeaders(token)
    });
};
