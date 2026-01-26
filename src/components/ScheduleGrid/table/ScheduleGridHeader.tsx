import { Heading } from "@/components/catalyst-ui-kit/heading";
import { Button } from "@catalyst/button";
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import { Listbox, ListboxLabel, ListboxOption } from "@catalyst/listbox";
import { formatScheduleDate } from "@lib/date";
import type { Schedule } from "@type-defs/schedule";

interface ScheduleGridHeaderProps {
    schedule: Schedule;
    hideUnavailable: boolean;
    onToggleHideUnavailable: () => void;
    schedules: Schedule[];
    onSelectSchedule: (schedule: Schedule | null) => void;
}

const ScheduleGridHeader = ({
    schedule,
    hideUnavailable,
    onToggleHideUnavailable,
    schedules,
    onSelectSchedule
}: ScheduleGridHeaderProps) => {
    const unavailableLabel = hideUnavailable ? "Show Unavailable" : "Hide Unavailable";
    const scheduleLabel = formatScheduleDate(schedule.year, schedule.month);

    const scheduleOptions = schedules.map((s) => ({
        id: s.id,
        label: formatScheduleDate(s.year, s.month),
        schedule: s
    }));

    const findScheduleByLabel = (scheduleLabel: string) => {
        return scheduleOptions.find(({ label }) => label === scheduleLabel)?.schedule ?? null;
    };

    return (
        <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-slate-950/10 pb-6">
            <Heading>{scheduleLabel} Schedule</Heading>
            <div className="flex gap-4">
                <div>
                    <Button outline onClick={onToggleHideUnavailable}>
                        {hideUnavailable ? <EyeIcon /> : <EyeSlashIcon />}
                        {unavailableLabel}
                    </Button>
                </div>
                <div>
                    <Listbox
                        name="schedule"
                        value={scheduleLabel}
                        onChange={(value: string) => onSelectSchedule(findScheduleByLabel(value))}>
                        {scheduleOptions.map(({ id, label }) => (
                            <ListboxOption key={id} value={label}>
                                <ListboxLabel>{label}</ListboxLabel>
                            </ListboxOption>
                        ))}
                    </Listbox>
                </div>
            </div>
        </div>
    );
};

export default ScheduleGridHeader;
