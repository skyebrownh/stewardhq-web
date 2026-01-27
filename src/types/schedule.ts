import type { NestedEventAssignment } from "@type-defs/assignment";
import type { NestedEvent } from "@type-defs/event";
import type { NestedUser } from "@type-defs/user";

export interface Schedule {
    id: string;
    month: number;
    year: number;
    notes?: string;
    is_active: boolean;
}

export interface ScheduleGridEvent {
    event: NestedEvent;
    event_assignments: NestedEventAssignment[];
    availability: NestedUser[];
}

export interface ScheduleGridResponse extends Schedule {
    events: ScheduleGridEvent[];
}
