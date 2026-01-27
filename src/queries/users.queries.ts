import { getAllUsers, type UserResponse } from "@api/users.api";
import { useQuery } from "@tanstack/react-query";

export const useUsersQuery = () =>
    useQuery<UserResponse[]>({
        queryKey: ["users"],
        queryFn: getAllUsers
    });
