import type { ScheduleGridEvent } from "@type-defs/schedule";
import { TableCell } from "@catalyst/table";

interface UnavailableCellProps {
    eventObj: ScheduleGridEvent;
    hideUnavailable: boolean;
}

const UnavailableCell = ({ eventObj: { availability }, hideUnavailable }: UnavailableCellProps) => {
    const hiddenClass = hideUnavailable ? "hidden" : "";
    return (
        <TableCell className={`py-1.5! px-2! text-wrap bg-red-50 text-red-700 font-light ${hiddenClass}`}>
            {availability
                ?.map((user) => user.user_first_name)
                .sort((a, b) => a.localeCompare(b))
                .join(", ")}
        </TableCell>
    );
};

export default UnavailableCell;
