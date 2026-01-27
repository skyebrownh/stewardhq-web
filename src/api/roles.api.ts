import { apiFetch } from "./client";
import { type Role } from "@type-defs/role";

export const getRoles = () => {
    return apiFetch<Role[]>("/roles");
};
