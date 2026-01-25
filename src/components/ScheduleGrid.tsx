import { useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/catalyst-ui-kit/table";
import { useRolesQuery } from "../queries/roles.queries";
import { useScheduleGridQuery, useSchedulesQuery } from "../queries/schedules.queries";
import { formatEventDate } from "../lib/date";

const ScheduleGrid = () => {
    const { data: roles, isLoading: rolesLoading, error: rolesError } = useRolesQuery();
    const { data: schedules, isLoading: schedulesLoading, error: schedulesError } = useSchedulesQuery();

    // Derive the scheduleId
    const scheduleId = useMemo(
        () => schedules?.find((schedule) => schedule.year === 2025 && schedule.month === 12)?.id,
        [schedules]
    );

    const { data: scheduleGrid, isLoading: gridLoading, error: gridError } = useScheduleGridQuery(scheduleId!);

    const activeRoles = useMemo(() => {
        if (!roles) return [];
        return [...roles].sort((a, b) => a.order - b.order).filter((role) => role.is_active);
    }, [roles]);

    const sortedEvents = useMemo(() => {
        if (!scheduleGrid) return [];
        return [...scheduleGrid.events].sort(
            (a, b) => new Date(a.event.starts_at).getTime() - new Date(b.event.starts_at).getTime()
        );
    }, [scheduleGrid]);

    const assignmentsByEventId = useMemo(() => {
        const map = new Map<string, Map<string, string>>();

        sortedEvents.forEach((eventObj) => {
            const roleMap = new Map<string, string>();
            eventObj.event_assignments?.forEach((assignment) => {
                roleMap.set(assignment.role_code, assignment.assigned_user_first_name);
            });
            map.set(eventObj.event.id, roleMap);
        });

        return map;
    }, [sortedEvents]);

    const isLoading = rolesLoading || schedulesLoading || gridLoading;
    const error = rolesError || schedulesError || gridError;

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <Table dense>
            <TableHead>
                <TableRow>
                    <TableHeader>Event</TableHeader>
                    {activeRoles?.map((role) => (
                        <TableHeader key={role.id}>{role.name}</TableHeader>
                    ))}
                    <TableHeader>Unavailable</TableHeader>
                    <TableHeader>Notes</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {sortedEvents.map((eventObj) => {
                    const roleMap = assignmentsByEventId.get(eventObj.event?.id);
                    return (
                        <TableRow key={eventObj.event?.id}>
                            <TableCell>{formatEventDate(eventObj.event?.starts_at)}</TableCell>

                            {activeRoles.map((role) => (
                                <TableCell key={role.id}>{roleMap?.get(role.code)}</TableCell>
                            ))}

                            <TableCell>
                                {eventObj.availability
                                    ?.map((user) => user.user_first_name)
                                    .sort((a, b) => a.localeCompare(b))
                                    .join(", ")}
                            </TableCell>

                            <TableCell>{eventObj.event?.notes}</TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default ScheduleGrid;
