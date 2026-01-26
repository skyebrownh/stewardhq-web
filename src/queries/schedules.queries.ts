import { useQuery } from "@tanstack/react-query";
import { getSchedules, getScheduleGrid } from "../api/schedules.api";

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
