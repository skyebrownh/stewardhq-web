import { format } from "date-fns/fp";

interface EventDate {
    weekday: string;
    day: string;
}

export const formatEventDate = (iso: string): EventDate => {
    const date = new Date(iso);
    return {
        weekday: format("E", date),
        day: format("dd", date)
    };
};

export const formatScheduleDate = (year: number, month: number) => format("MMMM yyyy", new Date(year, month - 1));
