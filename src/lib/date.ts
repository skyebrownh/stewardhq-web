import { format } from "date-fns/fp";

export const formatEventDate = (iso: string) => format("E - dd MMM", new Date(iso));
