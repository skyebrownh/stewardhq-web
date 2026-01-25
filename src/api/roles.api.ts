import { apiFetch } from "./client";
import { type Role } from "../types/role";

export const getRoles = () => {
    return apiFetch<Role[]>("/roles");
};
