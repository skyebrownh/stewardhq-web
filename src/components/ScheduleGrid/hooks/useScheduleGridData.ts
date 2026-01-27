import type { RoleResponse } from "@api/roles.api";
import type { ScheduleGridEventAssignment, ScheduleGridResponse } from "@api/schedules.api";
import { useMemo } from "react";

export function useScheduleGridData(roles: RoleResponse[], scheduleGrid?: ScheduleGridResponse) {
    const activeAndSortedRoles = useMemo(() => {
        return [...roles].sort((a, b) => a.order - b.order).filter((role) => role.is_active);
    }, [roles]);

    const sortedEvents = useMemo(() => {
        if (!scheduleGrid) return [];
        return [...scheduleGrid.events].sort(
            (a, b) => new Date(a.event.starts_at).getTime() - new Date(b.event.starts_at).getTime()
        );
    }, [scheduleGrid]);

    const assignmentsByEventId = useMemo(() => {
        const map = new Map<string, Map<string, ScheduleGridEventAssignment>>();

        sortedEvents.forEach((eventObj) => {
            const roleMap = new Map<string, ScheduleGridEventAssignment>();
            eventObj.event_assignments?.forEach((assignment) => {
                roleMap.set(assignment.role_code, assignment);
            });
            map.set(eventObj.event.id, roleMap);
        });

        return map;
    }, [sortedEvents]);

    return { activeAndSortedRoles, sortedEvents, assignmentsByEventId };
}
