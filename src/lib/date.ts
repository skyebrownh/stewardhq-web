import { format } from "date-fns/fp";

interface EventDate {
    weekdayShort: string;
    weekdayLong: string;
    day: string;
    dayLong: string;
    monthShort: string;
    monthLong: string;
    time: string;
}

export const formatEventDate = (iso: string): EventDate => {
    const date = new Date(iso);
    return {
        weekdayShort: format("E", date),
        weekdayLong: format("EEEE", date),
        day: format("dd", date),
        dayLong: format("do", date),
        monthShort: format("MMM", date),
        monthLong: format("MMMM", date),
        time: format(`hh:mm a`, date)
    };
};

export const formatScheduleDate = (year: number, month: number) => format("MMMM yyyy", new Date(year, month - 1));
