export interface Schedule {
    id: string;
    month: number;
    year: number;
    notes?: string;
    is_active: boolean;
}

export interface NestedUser {
    user_id: string;
    user_first_name: string;
    user_last_name: string;
}

export interface NestedEventAssignment {
    id: string;
    is_applicable: boolean;
    requirement_level: string;
    role_id: string;
    role_name: string;
    role_order: number;
    role_code: string;
    assigned_user_id: string;
    assigned_user_first_name: string;
    assigned_user_last_name: string;
    is_active: boolean;
}

export interface NestedEvent {
    id: string;
    title: string;
    starts_at: string;
    ends_at: string;
    notes: string;
    is_active: boolean;
    team_id: string;
    team_name: string;
    team_code: string;
    event_type_id: string;
    event_type_name: string;
    event_type_code: string;
}

export interface ScheduleGridEvent {
    event: NestedEvent;
    event_assignments: NestedEventAssignment[];
    availability: NestedUser[];
}

export interface ScheduleGridResponse extends Schedule {
    events: ScheduleGridEvent[];
}
