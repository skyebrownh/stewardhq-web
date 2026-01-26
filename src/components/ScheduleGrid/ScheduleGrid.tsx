import { useState } from "react";
import { Table, TableBody, TableHead } from "@catalyst/table";
import ScheduleGridSkeleton from "@components/skeletons/ScheduleGridSkeleton";
import ErrorState from "@components/ui/ErrorState";
import EmptyState from "@components/ui/EmptyState";
import { useRolesQuery } from "@queries/roles.queries";
import { useScheduleGridQuery, useSchedulesQuery } from "@queries/schedules.queries";
import { formatScheduleDate } from "@lib/date";
import { queryClient } from "@lib/queryClient";
import { Heading } from "@catalyst/heading";
import { Listbox, ListboxLabel, ListboxOption } from "@catalyst/listbox";
import { Button } from "@catalyst/button";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import ScheduleGridRow from "./table/ScheduleGridRow";
import ScheduleGridHeaderRow from "./table/ScheduleGridHeaderRow";
import { useScheduleSelection } from "./hooks/useScheduleSelection";
import { useScheduleGridData } from "./hooks/useScheduleGridData";

const ScheduleGrid = () => {
    const [hideUnavailable, setHideUnavailable] = useState(false);

    const { data: roles, isLoading: rolesLoading, error: rolesError } = useRolesQuery();
    const { data: schedules, isLoading: schedulesLoading, error: schedulesError } = useSchedulesQuery();

    const { effectiveSchedule, setSelectedSchedule } = useScheduleSelection(schedules);

    const {
        data: scheduleGrid,
        isLoading: gridLoading,
        error: gridError
    } = useScheduleGridQuery(effectiveSchedule?.id);

    const { activeRoles, sortedSchedules, sortedEvents, assignmentsByEventId } = useScheduleGridData(
        roles,
        schedules,
        scheduleGrid
    );

    const handleRetry = () => {
        if (!effectiveSchedule) return;
        queryClient.invalidateQueries({ queryKey: ["schedule-grid", effectiveSchedule.id] });
    };

    const isLoading = rolesLoading || schedulesLoading || gridLoading;
    const error = rolesError || schedulesError || gridError;

    if (isLoading) return <ScheduleGridSkeleton />;
    if (error)
        return (
            <ErrorState
                title="Unable to load schedule"
                message="There was an error loading the schedule. Please try again."
                onRetry={handleRetry}
            />
        );
    if (!sortedEvents.length) return <EmptyState message="No events found." />;

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-slate-950/10 pb-6">
                <Heading>
                    {effectiveSchedule ? formatScheduleDate(effectiveSchedule.year, effectiveSchedule.month) : "(NA)"}{" "}
                    Schedule
                </Heading>
                <div className="flex gap-4">
                    <div>
                        <Button outline onClick={() => setHideUnavailable((prev) => !prev)}>
                            {hideUnavailable ? <EyeIcon /> : <EyeSlashIcon />}
                            {hideUnavailable ? "Show Unavailable" : "Hide Unavailable"}
                        </Button>
                    </div>
                    {effectiveSchedule && (
                        <div>
                            <Listbox
                                name="schedule"
                                value={formatScheduleDate(effectiveSchedule.year, effectiveSchedule.month)}
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
                    )}
                </div>
            </div>
            <Table dense>
                <TableHead>
                    <ScheduleGridHeaderRow activeRoles={activeRoles} hideUnavailable={hideUnavailable} />
                </TableHead>
                <TableBody>
                    {sortedEvents.map((eventObj) => {
                        const roleMap = assignmentsByEventId.get(eventObj.event?.id);
                        return (
                            <ScheduleGridRow
                                key={eventObj.event?.id}
                                eventObj={eventObj}
                                activeRoles={activeRoles}
                                hideUnavailable={hideUnavailable}
                                roleMap={roleMap}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default ScheduleGrid;
