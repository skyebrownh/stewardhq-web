const STEWARDHQ_API_BASE_URL = import.meta.env.VITE_STEWARDHQ_API_BASE_URL;
const STEWARDHQ_API_KEY = import.meta.env.VITE_STEWARDHQ_API_KEY;

const HEADERS = {
    "x-api-key": STEWARDHQ_API_KEY
};

interface Schedule {
    id: string;
    month: number;
    year: number;
    notes?: string;
    is_active: boolean;
}

interface NestedUser {
    user_id: string;
    user_first_name: string;
    user_last_name: string;
}

interface NestedEventAssignment {
    id: string;
    is_appliable: boolean;
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

interface NestedEvent {
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

interface ScheduleGridEvent {
    event: NestedEvent;
    event_assignments: NestedEventAssignment[];
    availability: NestedUser[];
}

export interface ScheduleGrid extends Schedule {
    events: ScheduleGridEvent[];
}

export const getSchedules = async () => {
    const res = await fetch(`${STEWARDHQ_API_BASE_URL}/schedules`, { headers: HEADERS });
    if (!res.ok) {
        throw new Error(`Failed to fetch schedules: ${res.statusText}`);
    }
    const data = await res.json();
    const schedules = data as Schedule[];
    // console.log(schedules);
    return schedules;
};

export const getScheduleGrid = async (scheduleId: string) => {
    const res = await fetch(`${STEWARDHQ_API_BASE_URL}/schedules/${scheduleId}/grid`, { headers: HEADERS });
    if (!res.ok) {
        throw new Error(`Failed to fetch schedule grid: ${res.statusText}`);
    }
    const data = await res.json();
    const scheduleGrid = data as ScheduleGrid;
    // console.log(scheduleGrid);
    return scheduleGrid;
};
