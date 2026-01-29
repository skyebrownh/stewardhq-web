import { getScheduleById } from "@/lib/domain";
import { LS_SELECTED_SCHEDULE_ID_KEY } from "@/lib/localStorage";
import { Table, TableBody, TableHead, TableRow } from "@catalyst/table";
import { useScheduleGridData } from "@components/ScheduleGrid/hooks/useScheduleGridData";
import { useSortedSchedules } from "@components/ScheduleGrid/hooks/useSortedSchedules";
import ScheduleGridHeader from "@components/ScheduleGrid/table/ScheduleGridHeader";
import ScheduleGridHeaderRow from "@components/ScheduleGrid/table/ScheduleGridHeaderRow";
import ScheduleGridRow from "@components/ScheduleGrid/table/ScheduleGridRow";
import ScheduleGridSkeleton from "@components/skeletons/ScheduleGridSkeleton";
import { EmptyState } from "@components/ui/EmptyState";
import { ErrorState } from "@components/ui/ErrorState";
import { queryClient } from "@lib/queryClient";
import { useRolesQuery } from "@queries/roles.queries";
import { useScheduleGridQuery, useSchedulesQuery } from "@queries/schedules.queries";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";

const ScheduleGrid = () => {
    const navigate = useNavigate();
    const { scheduleId } = useParams();

    const [hideUnavailable, setHideUnavailable] = useState(false);

    // get roles and schedules
    const { data: roles, isLoading: rolesLoading, error: rolesError } = useRolesQuery();
    const { data: schedules, isLoading: schedulesLoading, error: schedulesError } = useSchedulesQuery();
    const sortedSchedules = useSortedSchedules(schedules ?? []);

    // get the effective schedule for selector listbox
    const effectiveSchedule = useMemo(() => {
        if (!schedules || !scheduleId) return null;
        return schedules.find((s) => s.id === scheduleId) ?? null;
    }, [schedules, scheduleId]);

    // get the schedule grid data
    const { data: scheduleGrid, isLoading: gridLoading, error: gridError } = useScheduleGridQuery(scheduleId);

    // from schedule grid data, derive other datasets
    const { activeAndSortedRoles, sortedEvents, assignmentsByEventId } = useScheduleGridData(roles ?? [], scheduleGrid);

    const handleSelectSchedule = (newScheduleId: string) => {
        const newSchedule = getScheduleById(schedules ?? [], newScheduleId);
        if (!newSchedule) return;
        localStorage.setItem(LS_SELECTED_SCHEDULE_ID_KEY, newSchedule.id);
        void navigate(`/schedules/${newSchedule.id}/grid`); // changes scheduleId URL param so effectiveSchedule is updated
    };

    const handleRetry = () => {
        void queryClient.invalidateQueries({ queryKey: ["roles"] });
        void queryClient.invalidateQueries({ queryKey: ["schedules"] });
        if (scheduleId) {
            void queryClient.invalidateQueries({ queryKey: ["schedule-grid", scheduleId] });
        }
    };

    if (rolesLoading || schedulesLoading || gridLoading) return <ScheduleGridSkeleton />;

    if (rolesError || schedulesError || gridError)
        return (
            <ErrorState
                title="Unable to load schedule view"
                message="There was an error loading the schedule view. Please try again."
                onRetry={handleRetry}
            />
        );

    if (!effectiveSchedule) return <EmptyState message="No schedule found." />;

    return (
        <>
            <ScheduleGridHeader
                currentSchedule={effectiveSchedule}
                hideUnavailable={hideUnavailable}
                onToggleHideUnavailable={() => setHideUnavailable((prev) => !prev)}
                schedules={sortedSchedules}
                onSelectSchedule={handleSelectSchedule}
            />

            <Table dense>
                <TableHead>
                    <ScheduleGridHeaderRow roles={activeAndSortedRoles} hideUnavailable={hideUnavailable} />
                </TableHead>
                <TableBody>
                    {sortedEvents.map((eventObj) => {
                        const roleMap = assignmentsByEventId.get(eventObj.event?.id);

                        if (!roleMap)
                            return <TableRow key={eventObj.event?.id}>Event Row error: No role map found</TableRow>;

                        return (
                            <ScheduleGridRow
                                key={eventObj.event?.id}
                                eventObj={eventObj}
                                roles={activeAndSortedRoles}
                                hideUnavailable={hideUnavailable}
                                roleMap={roleMap}
                            />
                        );
                    })}
                </TableBody>
            </Table>
        </>
    );
};

export default ScheduleGrid;
