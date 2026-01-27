import { getScheduleGrid, getSchedules } from "@api/schedules.api";
import { useQuery } from "@tanstack/react-query";

export const useSchedulesQuery = () =>
    useQuery({
        queryKey: ["schedules"],
        queryFn: getSchedules
    });

export const useScheduleGridQuery = (scheduleId?: string) =>
    useQuery({
        queryKey: ["schedule-grid", scheduleId],
        queryFn: () => getScheduleGrid(scheduleId!),
        gcTime: 60 * 60 * 1000, // 1 hour
        enabled: Boolean(scheduleId)
    });
