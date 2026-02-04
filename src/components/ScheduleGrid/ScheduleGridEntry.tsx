import { getCurrentSchedule } from "@/lib/domain";
import { LS_SELECTED_SCHEDULE_ID_KEY } from "@/lib/localStorage";
import { queryClient } from "@/lib/queryClient";
import { useSchedulesQuery } from "@/queries/schedules.queries";
import ScheduleGridSkeleton from "@components/skeletons/ScheduleGridSkeleton";
import { EmptyState } from "@components/ui/EmptyState";
import { ErrorState } from "@components/ui/ErrorState";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";

// Since ScheduleGridEntry is the root component:
// We will attempt to redirect to the schedule grid with either:
// 1. The stored schedule ID in localStorage
// 2. The default schedule ID for the current month
// Else: render an alternative state
const ScheduleGridEntry = () => {
    const navigate = useNavigate();
    const { data: schedules, isLoading, error } = useSchedulesQuery();

    const defaultScheduleId = useMemo(() => {
        if (!schedules || schedules.length === 0) return null;
        const defaultSchedule = getCurrentSchedule(schedules);
        return defaultSchedule?.id ?? schedules[0].id;
    }, [schedules]);

    useEffect(() => {
        if (isLoading) return;
        if (error) return;
        if (!schedules || schedules.length === 0) return;
        if (!defaultScheduleId) return;

        const storedId = localStorage.getItem(LS_SELECTED_SCHEDULE_ID_KEY);
        const storedIsValid = storedId ? schedules.some((s) => s.id === storedId) : false;

        const selectedId = storedIsValid ? storedId : defaultScheduleId;
        if (!storedIsValid && selectedId) {
            localStorage.setItem(LS_SELECTED_SCHEDULE_ID_KEY, selectedId);
        }

        void navigate(`/schedules/${selectedId}/grid`, { replace: true });
    }, [schedules, navigate, defaultScheduleId, isLoading, error]);

    const handleRetry = () => {
        void queryClient.invalidateQueries({ queryKey: ["schedules"] });
    };

    if (isLoading) return <ScheduleGridSkeleton />;
    if (error) return <ErrorState title="Failed to load schedules" message="Please try again" onRetry={handleRetry} />;
    if (!schedules || schedules.length === 0) return <EmptyState message="No schedules found" />;

    return null;
};

export default ScheduleGridEntry;
