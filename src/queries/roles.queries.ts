import { useQuery } from "@tanstack/react-query";
import { getRoles } from "@api/roles.api";

export const useRolesQuery = () =>
    useQuery({
        queryKey: ["roles"],
        queryFn: getRoles
    });
