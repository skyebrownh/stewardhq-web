import type { AssignmentResponse } from "@/api/assignments.api";
import type { ScheduleGridEventAssignment, ScheduleResponse } from "@/api/schedules.api";
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

export const mapAssignmentResponseToScheduleGridEventAssignment: (
    assignment: AssignmentResponse
) => ScheduleGridEventAssignment = (assignment) => {
    return {
        is_applicable: assignment.is_applicable,
        requirement_level: assignment.requirement_level,
        assigned_user_id: assignment.assigned_user_id,
        is_active: assignment.is_active,
        id: assignment.id,
        role_id: assignment.role_id,
        role_name: assignment.role_name,
        role_order: assignment.role_order,
        role_code: assignment.role_code,
        assigned_user_first_name: assignment.assigned_user_first_name,
        assigned_user_last_name: assignment.assigned_user_last_name
    };
};
