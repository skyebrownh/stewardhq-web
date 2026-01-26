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
import { type NestedEventAssignment, type Schedule } from "../types/schedule";
import { Button } from "./catalyst-ui-kit/button";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/solid";

const ScheduleGrid = () => {
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
    const [hideUnavailable, setHideUnavailable] = useState(false);

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

    const getEventDateElement = (iso: string) => {
        const { weekday, day } = formatEventDate(iso);
        return (
            <p className="flex items-center gap-2 font-semibold">
                <span className="min-w-[4ch] text-slate-800 uppercase tracking-wide">{weekday}</span>
                <span className="h-4 w-px bg-slate-300 shrink-0" />
                <span className="tabular-nums text-slate-800 bg-slate-200 rounded-md px-1 py-0.5">{day}</span>
            </p>
        );
    };

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
            <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-slate-950/10 pb-6">
                <Heading>{formatScheduleDate(effectiveSchedule!.year, effectiveSchedule!.month)} Schedule</Heading>
                <div className="flex gap-4">
                    <div>
                        <Button outline onClick={() => setHideUnavailable((prev) => !prev)}>
                            {hideUnavailable ? <EyeIcon /> : <EyeSlashIcon />}
                            {hideUnavailable ? "Show Unavailable" : "Hide Unavailable"}
                        </Button>
                    </div>
                    <div>
                        <Listbox
                            name="schedule"
                            value={formatScheduleDate(effectiveSchedule!.year, effectiveSchedule!.month)}
                            onChange={(value: string) =>
                                setSelectedSchedule(
                                    schedules?.find((s) => formatScheduleDate(s.year, s.month) === value) ?? null
                                )
                            }>
                            {sortedSchedules?.map((schedule) => (
                                <ListboxOption
                                    key={schedule.id}
                                    value={formatScheduleDate(schedule.year, schedule.month)}>
                                    <ListboxLabel>{formatScheduleDate(schedule.year, schedule.month)}</ListboxLabel>
                                </ListboxOption>
                            ))}
                        </Listbox>
                    </div>
                </div>
            </div>
            <Table dense>
                <TableHead>
                    <TableRow className="bg-slate-100 text-slate-800">
                        <TableHeader>Event</TableHeader>
                        {activeRoles?.map((role) => (
                            <TableHeader key={role.id}>{role.name}</TableHeader>
                        ))}
                        <TableHeader className={hideUnavailable ? "hidden" : ""}>Unavailable</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedEvents.map((eventObj) => {
                        const roleMap = assignmentsByEventId.get(eventObj.event?.id);
                        return (
                            <TableRow key={eventObj.event?.id}>
                                <TableCell className="py-1.5! px-2!">
                                    {getEventDateElement(eventObj.event?.starts_at)}
                                    <p className="text-xs text-slate-600 mt-1.5">{eventObj.event?.notes}</p>
                                </TableCell>

                                {activeRoles.map((role) => {
                                    const assignment = roleMap?.get(role.code);
                                    return (
                                        <TableCell key={role.id} className="py-1.5! px-2!">
                                            <Button
                                                plain
                                                onClick={() => {
                                                    console.log(assignment);
                                                }}>
                                                <span className="font-normal">
                                                    {assignment?.assigned_user_first_name}
                                                </span>
                                            </Button>
                                        </TableCell>
                                    );
                                })}

                                <TableCell className={`py-1.5! px-2! text-wrap ${hideUnavailable ? "hidden" : ""}`}>
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
