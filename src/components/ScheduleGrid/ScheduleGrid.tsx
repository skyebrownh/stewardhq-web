import { Table, TableBody, TableHead, TableRow } from "@catalyst/table";
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

    // get roles and schedules
    const { data: roles, isLoading: rolesLoading, error: rolesError } = useRolesQuery();
    const { data: schedules, isLoading: schedulesLoading, error: schedulesError } = useSchedulesQuery();

    // get the effective schedule for selector listbox
    const { effectiveSchedule, setSelectedSchedule } = useScheduleSelection(schedules);

    // get the schedule grid data
    const {
        data: scheduleGrid,
        isLoading: gridLoading,
        error: gridError
    } = useScheduleGridQuery(effectiveSchedule?.id);

    // from schedule grid data, derive other datasets
    const { activeRoles, sortedSchedules, sortedEvents, assignmentsByEventId } = useScheduleGridData(
        roles,
        schedules,
        scheduleGrid
    );

    const handleRetry = () => {
        if (!effectiveSchedule) return;
        void queryClient.invalidateQueries({ queryKey: ["schedule-grid", effectiveSchedule.id] });
    };

    const isLoading = rolesLoading || schedulesLoading || gridLoading;
    const error = rolesError || schedulesError || gridError;

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {isLoading && <ScheduleGridSkeleton />}

            {error && (
                <ErrorState
                    title="Unable to load schedule"
                    message="There was an error loading the schedule. Please try again."
                    onRetry={handleRetry}
                />
            )}
            {!effectiveSchedule && <EmptyState message="No schedule found." />}

            {!isLoading && !error && effectiveSchedule && (
                <>
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

                                if (!roleMap)
                                    return (
                                        <TableRow key={eventObj.event?.id}>Event Row error: No role map found</TableRow>
                                    );

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
                </>
            )}
        </div>
    );
};

export default ScheduleGrid;
