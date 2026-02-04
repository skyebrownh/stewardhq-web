import type { RequirementLevel } from "@/lib/domain";
import { getHeaders } from "@lib/utils";
import { apiFetch } from "./client";

export interface AssignmentResponse {
    is_applicable: boolean;
    requirement_level: string;
    assigned_user_id: string;
    is_active: boolean;
    id: string;
    event_id: string;
    role_id: string;
    event_title: string;
    event_starts_at: string;
    event_ends_at: string;
    event_notes: string;
    event_is_active: boolean;
    event_schedule_id: string;
    event_schedule_month: number;
    event_schedule_year: number;
    event_schedule_notes: string;
    event_schedule_is_active: boolean;
    event_team_id: string;
    event_team_name: string;
    event_team_code: string;
    event_team_is_active: boolean;
    event_type_id: string;
    event_type_name: string;
    event_type_code: string;
    event_type_is_active: boolean;
    role_name: string;
    role_description: string;
    role_order: number;
    role_code: string;
    role_is_active: boolean;
    assigned_user_first_name: string;
    assigned_user_last_name: string;
    assigned_user_email: string;
    assigned_user_phone: string;
    assigned_user_is_active: boolean;
    proficiency_level_id: string;
    proficiency_level_name: string;
    proficiency_level_rank: number;
    proficiency_level_is_assignable: boolean;
    proficiency_level_is_active: boolean;
    proficiency_level_code: string;
}

export interface AssignmentUpdateBody {
    is_applicable?: boolean | null;
    requirement_level?: RequirementLevel | null;
    assigned_user_id?: string | null;
    is_active?: boolean | null;
}

export const getAssignmentsByEvent = (eventId: string) => {
    return apiFetch<AssignmentResponse[]>(`/events/${eventId}/assignments`);
};

export const updateAssignment = (assignmentId: string, body: AssignmentUpdateBody, token: string | null) => {
    return apiFetch<AssignmentResponse>(`/assignments/${assignmentId}`, {
        method: "PATCH",
        headers: getHeaders(token),
        body: JSON.stringify(body)
    });
};
