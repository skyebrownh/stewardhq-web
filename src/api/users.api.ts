import { type User } from "@type-defs/user";
import { apiFetch } from "./client";

export const getUsers = () => {
    return apiFetch<User[]>("/users");
};

export const getUser = (userId: string) => {
    return apiFetch<User>(`/users/${userId}`);
};
