import { type Role } from "@type-defs/role";
import { apiFetch } from "./client";

export const getRoles = () => {
    return apiFetch<Role[]>("/roles");
};
