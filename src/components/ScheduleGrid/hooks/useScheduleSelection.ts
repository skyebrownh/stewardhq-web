import { LS_SELECTED_SCHEDULE_ID_KEY } from "@lib/localStorage";
import type { Schedule } from "@type-defs/schedule";
import { useEffect, useMemo, useState } from "react";

export function useScheduleSelection(schedules?: Schedule[]) {
    // Store the selected schedule ID from localStorage
    const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(() => {
        return localStorage.getItem(LS_SELECTED_SCHEDULE_ID_KEY);
    });

    // Find the selected schedule when schedules are available
    const selectedSchedule = useMemo(() => {
        if (!selectedScheduleId || !schedules?.length) return null;
        return schedules.find((s) => s.id === selectedScheduleId) ?? null;
    }, [selectedScheduleId, schedules]);

    const defaultSchedule = useMemo(() => {
        if (!schedules?.length) return null;

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        return schedules.find((s) => s.year === currentYear && s.month === currentMonth) ?? schedules[0];
    }, [schedules]);

    const effectiveSchedule = selectedSchedule ?? defaultSchedule;

    // Update localStorage when selectedScheduleId changes
    useEffect(() => {
        if (selectedScheduleId) {
            localStorage.setItem(LS_SELECTED_SCHEDULE_ID_KEY, selectedScheduleId);
        }
    }, [selectedScheduleId]);

    const setSelectedSchedule = (schedule: Schedule | null) => {
        if (schedule) {
            setSelectedScheduleId(schedule.id);
        } else {
            setSelectedScheduleId(null);
            localStorage.removeItem(LS_SELECTED_SCHEDULE_ID_KEY);
        }
    };

    return { effectiveSchedule, setSelectedSchedule };
}
