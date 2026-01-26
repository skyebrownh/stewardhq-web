import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { NestedEvent } from "@type-defs/event.ts";

export const useEventQuery = (eventId?: string): UseQueryResult<NestedEvent, Error> =>
    useQuery({
        queryKey: ["event", eventId],
        enabled: Boolean(eventId),
        queryFn: () => {
            throw new Error("Event fetch not implemented");
        }
    });
