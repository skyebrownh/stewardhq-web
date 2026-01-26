import type { NestedEventAssignment, Schedule, ScheduleGridResponse } from "@type-defs/schedule";
import type { Role } from "@type-defs/role";
import { useMemo } from "react";

export function useScheduleGridData(roles?: Role[], schedules?: Schedule[], scheduleGrid?: ScheduleGridResponse) {
    const activeRoles = useMemo(() => {
        if (!roles) return [];
        return [...roles].sort((a, b) => a.order - b.order).filter((role) => role.is_active);
    }, [roles]);

    const sortedSchedules = useMemo(() => {
        if (!schedules) return [];
        return [...schedules].sort((a, b) => a.year - b.year || a.month - b.month);
    }, [schedules]);

    const sortedEvents = useMemo(() => {
        if (!scheduleGrid) return [];
        return [...scheduleGrid.events].sort(
            (a, b) => new Date(a.event.starts_at).getTime() - new Date(b.event.starts_at).getTime()
        );
    }, [scheduleGrid]);

    const assignmentsByEventId = useMemo(() => {
        const map = new Map<string, Map<string, NestedEventAssignment>>();

        sortedEvents.forEach((eventObj) => {
            const roleMap = new Map<string, NestedEventAssignment>();
            eventObj.event_assignments?.forEach((assignment) => {
                roleMap.set(assignment.role_code, assignment);
            });
            map.set(eventObj.event.id, roleMap);
        });

        return map;
    }, [sortedEvents]);

    return { activeRoles, sortedSchedules, sortedEvents, assignmentsByEventId };
}
