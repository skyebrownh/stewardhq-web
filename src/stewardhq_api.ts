const STEWARDHQ_API_BASE_URL = import.meta.env.VITE_STEWARDHQ_API_BASE_URL;
const STEWARDHQ_API_KEY = import.meta.env.VITE_STEWARDHQ_API_KEY;

const HEADERS = {
    "x-api-key": STEWARDHQ_API_KEY
};

export interface Schedule {
    id: string;
    month: number;
    year: number;
    notes?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export const getSchedules = async () => {
    const res = await fetch(`${STEWARDHQ_API_BASE_URL}/schedules`, { headers: HEADERS });
    if (!res.ok) {
        throw new Error(`Failed to fetch schedules: ${res.statusText}`);
    }
    const data = await res.json();
    const schedules: Schedule[] = data as Schedule[];
    console.log(schedules);
    return schedules;
};
