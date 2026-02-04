import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from "@/components/catalyst-ui-kit/dropdown";
import { Heading } from "@/components/catalyst-ui-kit/heading";
import type { ScheduleResponse } from "@api/schedules.api";
import { Listbox, ListboxOption } from "@catalyst/listbox";
import { ChevronDownIcon, EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import { formatScheduleDate } from "@lib/date";

interface ScheduleGridHeaderProps {
    currentSchedule: ScheduleResponse;
    schedules: ScheduleResponse[];
    onSelectSchedule: (newScheduleId: string) => void;
    hideUnavailable: boolean;
    onToggleHideUnavailable: () => void;
}

const ScheduleGridHeader = ({
    currentSchedule,
    hideUnavailable,
    onToggleHideUnavailable,
    schedules,
    onSelectSchedule
}: ScheduleGridHeaderProps) => {
    const unavailableLabel = hideUnavailable ? "Show Unavailable" : "Hide Unavailable";
    const scheduleLabel = formatScheduleDate(currentSchedule.year, currentSchedule.month);

    return (
        <div className="flex flex-col sm:flex-row w-full flex-wrap items-start sm:items-end justify-between gap-4 border-b border-slate-950/10 pb-6">
            <Heading>{scheduleLabel} Schedule</Heading>
            <div className="flex flex-col sm:flex-row gap-4">
                <div>
                    <Dropdown>
                        <DropdownButton outline>
                            Options
                            <ChevronDownIcon />
                        </DropdownButton>
                        <DropdownMenu>
                            <DropdownItem onClick={onToggleHideUnavailable}>
                                {hideUnavailable ? <EyeIcon /> : <EyeSlashIcon />}
                                {unavailableLabel}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div>
                    <Listbox
                        name="schedule"
                        value={currentSchedule.id}
                        onChange={(newScheduleId: string) => onSelectSchedule(newScheduleId)}>
                        {schedules.map((s) => (
                            <ListboxOption key={s.id} value={s.id}>
                                {formatScheduleDate(s.year, s.month)}
                            </ListboxOption>
                        ))}
                    </Listbox>
                </div>
            </div>
        </div>
    );
};

export default ScheduleGridHeader;
