import { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./catalyst-ui-kit/table";
import ScheduleGridSkeleton from "./skeletons/ScheduleGridSkeleton";
import ErrorState from "./ui/ErrorState";
import EmptyState from "./ui/EmptyState";
import { useRolesQuery } from "../queries/roles.queries";
import { useScheduleGridQuery, useSchedulesQuery } from "../queries/schedules.queries";
import { formatEventDate, formatScheduleDate } from "../lib/date";
import { queryClient } from "../lib/queryClient";
import { Heading } from "./catalyst-ui-kit/heading";
import { Listbox, ListboxLabel, ListboxOption } from "./catalyst-ui-kit/listbox";
import { type Schedule } from "../types/schedule";

const ScheduleGrid = () => {
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

    const { data: roles, isLoading: rolesLoading, error: rolesError } = useRolesQuery();
    const { data: schedules, isLoading: schedulesLoading, error: schedulesError } = useSchedulesQuery();

    // Derive the scheduleId
    const defaultSchedule = useMemo(() => {
        if (!schedules?.length) return null;

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        return schedules.find((s) => s.year === currentYear && s.month === currentMonth) ?? schedules[0];
    }, [schedules]);

    const effectiveSchedule = selectedSchedule ?? defaultSchedule;

    const {
        data: scheduleGrid,
        isLoading: gridLoading,
        error: gridError
    } = useScheduleGridQuery(effectiveSchedule?.id);

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

    if (isLoading) return <ScheduleGridSkeleton />;
    if (error)
        return (
            <ErrorState
                title="Unable to load schedule"
                message="There was an error loading the schedule. Please try again."
                onRetry={() => {
                    if (!effectiveSchedule) return;
                    queryClient.invalidateQueries({ queryKey: ["schedule-grid", effectiveSchedule.id] });
                }}
            />
        );
    if (sortedEvents.length === 0) return <EmptyState message="No events scheduled for this month." />;

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
                <Heading>{formatScheduleDate(effectiveSchedule!.year, effectiveSchedule!.month)} Schedule</Heading>
                <div className="flex gap-4">
                    <Listbox
                        name="schedule"
                        value={formatScheduleDate(effectiveSchedule!.year, effectiveSchedule!.month)}
                        onChange={(value: string) =>
                            setSelectedSchedule(
                                schedules?.find((s) => formatScheduleDate(s.year, s.month) === value) ?? null
                            )
                        }>
                        {sortedSchedules?.map((schedule) => (
                            <ListboxOption key={schedule.id} value={formatScheduleDate(schedule.year, schedule.month)}>
                                <ListboxLabel>{formatScheduleDate(schedule.year, schedule.month)}</ListboxLabel>
                            </ListboxOption>
                        ))}
                    </Listbox>
                </div>
            </div>
            <Table dense>
                <TableHead>
                    <TableRow>
                        <TableHeader>Event</TableHeader>
                        {activeRoles?.map((role) => (
                            <TableHeader key={role.id}>{role.name}</TableHeader>
                        ))}
                        <TableHeader>Unavailable</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedEvents.map((eventObj) => {
                        const roleMap = assignmentsByEventId.get(eventObj.event?.id);
                        return (
                            <TableRow key={eventObj.event?.id}>
                                <TableCell>
                                    <p>{formatEventDate(eventObj.event?.starts_at)}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{eventObj.event?.notes}</p>
                                </TableCell>

                                {activeRoles.map((role) => (
                                    <TableCell key={role.id}>{roleMap?.get(role.code)}</TableCell>
                                ))}

                                <TableCell>
                                    {eventObj.availability
                                        ?.map((user) => user.user_first_name)
                                        .sort((a, b) => a.localeCompare(b))
                                        .join(", ")}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default ScheduleGrid;
