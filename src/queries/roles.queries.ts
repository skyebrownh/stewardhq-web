import { getRoles } from "@api/roles.api";
import { useQuery } from "@tanstack/react-query";

export const useRolesQuery = () =>
    useQuery({
        queryKey: ["roles"],
        queryFn: getRoles
    });
