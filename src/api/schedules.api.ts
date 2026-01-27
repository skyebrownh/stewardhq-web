import { apiFetch } from "./client";
import { type Schedule, type ScheduleGridResponse } from "@type-defs/schedule";

export const getSchedules = () => {
    return apiFetch<Schedule[]>("/schedules");
};

export const getScheduleGrid = (scheduleId: string) => {
    return apiFetch<ScheduleGridResponse>(`/schedules/${scheduleId}/grid`);
};
