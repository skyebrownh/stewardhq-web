import type { ScheduleResponse } from "@/api/schedules.api";
import { useMemo } from "react";

export const useSortedSchedules = (schedules?: ScheduleResponse[]) => {
    return useMemo(() => {
        if (!schedules) return [];
        return [...schedules].sort((a, b) => a.year - b.year || a.month - b.month);
    }, [schedules]);
};
