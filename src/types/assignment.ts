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

export interface Assignment extends NestedEventAssignment {
    eventId: string;
}
