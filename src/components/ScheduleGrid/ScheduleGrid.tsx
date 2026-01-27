import { Table, TableBody, TableHead } from "@catalyst/table";
import ScheduleGridSkeleton from "@components/skeletons/ScheduleGridSkeleton";
import EmptyState from "@components/ui/EmptyState";
import ErrorState from "@components/ui/ErrorState";
import { queryClient } from "@lib/queryClient";
import { useRolesQuery } from "@queries/roles.queries";
import { useScheduleGridQuery, useSchedulesQuery } from "@queries/schedules.queries";
import { useState } from "react";
import { useScheduleGridData } from "./hooks/useScheduleGridData";
import { useScheduleSelection } from "./hooks/useScheduleSelection";
import ScheduleGridHeader from "./table/ScheduleGridHeader";
import ScheduleGridHeaderRow from "./table/ScheduleGridHeaderRow";
import ScheduleGridRow from "./table/ScheduleGridRow";

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
    if (!effectiveSchedule) return <EmptyState message="No schedule found." />;

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <ScheduleGridHeader
                schedule={effectiveSchedule}
                hideUnavailable={hideUnavailable}
                onToggleHideUnavailable={() => setHideUnavailable((prev) => !prev)}
                schedules={sortedSchedules}
                onSelectSchedule={(schedule) => setSelectedSchedule(schedule)}
            />

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
