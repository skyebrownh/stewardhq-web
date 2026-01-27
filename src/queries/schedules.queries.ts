import type { ScheduleGridResponse, ScheduleResponse } from "@api/schedules.api";
import { getAllSchedules, getScheduleGrid } from "@api/schedules.api";
import { useQuery } from "@tanstack/react-query";

export const useSchedulesQuery = () =>
    useQuery<ScheduleResponse[]>({
        queryKey: ["schedules"],
        queryFn: getAllSchedules
    });

export const useScheduleGridQuery = (scheduleId?: string) =>
    useQuery<ScheduleGridResponse>({
        queryKey: ["schedule-grid", scheduleId],
        queryFn: () => getScheduleGrid(scheduleId!),
        gcTime: 60 * 60 * 1000, // 1 hour
        enabled: Boolean(scheduleId)
    });
