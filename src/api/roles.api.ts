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
    description?: string;
    order: number;
    is_active?: boolean;
    code: string;
}

export interface RoleUpdateBody {
    name?: string;
    description?: string;
    order?: number;
    is_active?: boolean;
}

export const getAllRoles = () => {
    return apiFetch<RoleResponse[]>("/roles");
};

export const getRole = (roleId: string) => {
    return apiFetch<RoleResponse>(`/roles/${roleId}`);
};

export const insertRole = (body: RoleInsertBody) => {
    return apiFetch<RoleResponse>("/roles", {
        method: "POST",
        body: JSON.stringify(body)
    });
};

export const updateRole = (roleId: string, body: RoleUpdateBody) => {
    return apiFetch<RoleResponse>(`/roles/${roleId}`, {
        method: "PATCH",
        body: JSON.stringify(body)
    });
};

export const deleteRole = (roleId: string) => {
    return apiFetch<void>(`/roles/${roleId}`, {
        method: "DELETE"
    });
};
