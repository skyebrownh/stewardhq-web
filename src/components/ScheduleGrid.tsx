import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns/fp";
import { getRoles, getSchedules, getScheduleGrid, type ScheduleGridResponse, type Role } from "../stewardhq_api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/catalyst-ui-kit/table";

const ScheduleGrid = () => {
    // Fetch roles
    const {
        data: roles,
        isLoading: rolesLoading,
        error: rolesError
    } = useQuery<Role[]>({
        queryKey: ["roles"],
        queryFn: getRoles
    });

    // Fetch schedules
    const {
        data: schedules,
        isLoading: schedulesLoading,
        error: schedulesError
    } = useQuery({
        queryKey: ["schedules"],
        queryFn: getSchedules
    });

    // Derive the scheduleId
    const scheduleId = useMemo(
        () => schedules?.find((schedule) => schedule.year === 2025 && schedule.month === 12)?.id,
        [schedules]
    );

    // Fetch schedule grid (depends on scheduleId)
    const {
        data: scheduleGrid,
        isLoading: gridLoading,
        error: gridError
    } = useQuery<ScheduleGridResponse>({
        queryKey: ["scheduleGrid", scheduleId],
        queryFn: () => getScheduleGrid(scheduleId!),
        enabled: Boolean(scheduleId) // prevents premature fetch
    });

    const isLoading = rolesLoading || schedulesLoading || gridLoading;
    const error = rolesError || schedulesError || gridError;

    const toTime = (iso: string) => new Date(iso).getTime();
    const formatEventDate = (iso: string) => format("E - dd MMM", new Date(iso));

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <Table dense>
            <TableHead>
                <TableRow>
                    <TableHeader>Event</TableHeader>
                    {roles?.map((role) => {
                        if (!role.is_active) return null;
                        return <TableHeader key={role.id}>{role.name}</TableHeader>;
                    })}
                    <TableHeader>Unavailable</TableHeader>
                    <TableHeader>Notes</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {scheduleGrid?.events
                    ?.sort((a, b) => toTime(a.event?.starts_at) - toTime(b.event?.starts_at))
                    .map((eventObj) => (
                        <TableRow key={eventObj.event?.id}>
                            <TableCell>{formatEventDate(eventObj.event?.starts_at)}</TableCell>

                            {roles?.map((role) => {
                                if (!role.is_active) return null;
                                return (
                                    <TableCell key={role.id}>
                                        {
                                            eventObj.event_assignments?.find(
                                                (assignment) => assignment.role_code === role.code
                                            )?.assigned_user_first_name
                                        }
                                    </TableCell>
                                );
                            })}

                            <TableCell>
                                {eventObj.availability
                                    ?.map((user) => user.user_first_name)
                                    .sort((a, b) => a.localeCompare(b))
                                    .join(", ")}
                            </TableCell>

                            <TableCell>{eventObj.event?.notes}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
};

export default ScheduleGrid;
