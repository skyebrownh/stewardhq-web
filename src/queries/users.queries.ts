import { getUser, getUsers } from "@api/users.api";
import { useQuery } from "@tanstack/react-query";

export const useUsersQuery = () =>
    useQuery({
        queryKey: ["users"],
        queryFn: getUsers
    });

export const useUserQuery = (userId?: string) =>
    useQuery({
        queryKey: ["user", userId],
        enabled: Boolean(userId),
        queryFn: () => getUser(userId!)
    });
