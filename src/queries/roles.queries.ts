import { getAllRoles, type RoleResponse } from "@api/roles.api";
import { useQuery } from "@tanstack/react-query";

export const useRolesQuery = () =>
    useQuery<RoleResponse[]>({
        queryKey: ["roles"],
        queryFn: getAllRoles
    });
