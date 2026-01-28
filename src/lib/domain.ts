import type { ScheduleResponse } from "@/api/schedules.api";
import { getCurrentMonthAndYear } from "./utils";

export const getCurrentSchedule: (schedules: ScheduleResponse[]) => ScheduleResponse | null = (schedules) => {
    const { year, month } = getCurrentMonthAndYear();
    return schedules.find((s) => s.year === year && s.month === month) ?? null;
};

export const getScheduleById: (schedules: ScheduleResponse[], scheduleId: string) => ScheduleResponse | null = (
    schedules,
    scheduleId
) => {
    return schedules.find((s) => s.id === scheduleId) ?? null;
};

export type RequirementLevel = "required" | "preferred" | "optional";
export type RequirementLevelColor = "red" | "yellow" | "gray";

export const REQUIREMENT_LABELS: Record<RequirementLevel, string> = {
    required: "Required",
    preferred: "Preferred",
    optional: "Optional"
};

export const REQUIREMENT_COLORS: Record<RequirementLevel, RequirementLevelColor> = {
    required: "red",
    preferred: "yellow",
    optional: "gray"
};
