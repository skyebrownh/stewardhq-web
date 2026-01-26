import { format } from "date-fns/fp";

export const formatEventDate = (iso: string) => format("E - dd MMM", new Date(iso));

export const formatScheduleDate = (year: number, month: number) => format("MMMM yyyy", new Date(year, month - 1));
