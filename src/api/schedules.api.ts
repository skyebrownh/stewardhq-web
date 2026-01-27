import { apiFetch } from "./client";

export interface ScheduleResponse {
    is_active: boolean;
    notes: string;
    id: string;
    month: number;
    year: number;
    created_at: string;
    updated_at: string;
}

export interface ScheduleInsertBody {
    month: number;
    year: number;
    notes?: string;
    is_active?: boolean;
}

export interface ScheduleUpdateBody {
    notes?: string;
    is_active?: boolean;
}

export const getAllSchedules = () => {
    return apiFetch<ScheduleResponse[]>("/schedules");
};

export const getSchedule = (scheduleId: string) => {
    return apiFetch<ScheduleResponse>(`/schedules/${scheduleId}`);
};

export const insertSchedule = (body: ScheduleInsertBody) => {
    return apiFetch<ScheduleResponse>("/schedules", {
        method: "POST",
        body: JSON.stringify(body)
    });
};

export const updateSchedule = (scheduleId: string, body: ScheduleUpdateBody) => {
    return apiFetch<ScheduleResponse>(`/schedules/${scheduleId}`, {
        method: "PATCH",
        body: JSON.stringify(body)
    });
};

export const deleteSchedule = (scheduleId: string) => {
    return apiFetch<void>(`/schedules/${scheduleId}`, {
        method: "DELETE"
    });
};

// Schedule Grid

export interface ScheduleGridEvent {
    title: string;
    starts_at: string;
    ends_at: string;
    team_id: string;
    event_type_id: string;
    notes: string;
    is_active: boolean;
    id: string;
    schedule_id: string;
    schedule_month: number;
    schedule_year: number;
    schedule_notes: string;
    schedule_is_active: boolean;
    team_name: string;
    team_code: string;
    team_is_active: boolean;
    event_type_name: string;
    event_type_code: string;
    event_type_is_active: boolean;
}

export interface ScheduleGridEventAssignment {
    is_applicable: boolean;
    requirement_level: string;
    assigned_user_id: string;
    is_active: boolean;
    id: string;
    role_id: string;
    role_name: string;
    role_order: number;
    role_code: string;
    assigned_user_first_name: string;
    assigned_user_last_name: string;
}

export interface ScheduleGridAvailability {
    user_id: string;
    user_first_name: string;
    user_last_name: string;
}

export interface ScheduleGridEventResponse {
    event: ScheduleGridEvent;
    event_assignments: ScheduleGridEventAssignment[];
    availability: ScheduleGridAvailability[];
}

export interface ScheduleGridResponse {
    schedule: ScheduleResponse;
    events: ScheduleGridEventResponse[];
}

export const getScheduleGrid = (scheduleId: string) => {
    return apiFetch<ScheduleGridResponse>(`/schedules/${scheduleId}/grid`);
};
