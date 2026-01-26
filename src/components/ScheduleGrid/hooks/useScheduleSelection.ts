import type { Schedule } from "@type-defs/schedule";
import { useMemo, useState } from "react";

export function useScheduleSelection(schedules?: Schedule[]) {
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);

    const defaultSchedule = useMemo(() => {
        if (!schedules?.length) return null;

        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        return schedules.find((s) => s.year === currentYear && s.month === currentMonth) ?? schedules[0];
    }, [schedules]);

    const effectiveSchedule = selectedSchedule ?? defaultSchedule;

    return { effectiveSchedule, setSelectedSchedule };
}
