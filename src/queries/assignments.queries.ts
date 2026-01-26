import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { Assignment } from "@type-defs/assignment";

export const useAssignmentQuery = (assignmentId?: string): UseQueryResult<Assignment, Error> =>
    useQuery({
        queryKey: ["assignment", assignmentId],
        enabled: Boolean(assignmentId),
        queryFn: () => {
            throw new Error("Assignment fetch not implemented");
        }
    });
