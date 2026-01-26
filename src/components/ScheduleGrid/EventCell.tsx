import type { ScheduleGridEvent } from "@type-defs/schedule";
import Badge from "@components/ui/Badge";
import { TableCell } from "@catalyst/table";
import { formatEventDate } from "@lib/date";

interface EventCellProps {
    eventObj: ScheduleGridEvent;
}

const EventCell = ({ eventObj: { event } }: EventCellProps) => {
    const { weekday, day, startTime } = formatEventDate(event.starts_at);
    return (
        <TableCell className="py-1.5! px-2!">
            <div className="flex items-center gap-2 font-semibold">
                <span className="min-w-[4ch] text-slate-800 uppercase tracking-wide">{weekday}</span>
                <div className="flex items-center gap-2 bg-slate-200/50 rounded-md px-2 py-0.5 text-slate-800">
                    <span className="tabular-nums">{day}</span>
                    <span className="h-4 w-px bg-slate-400 shrink-0" />
                    <span className="font-normal">{startTime}</span>
                </div>
                {!event.team_name && <Badge color="gray">No Team</Badge>}
                {event.team_name === "Alpha" && <Badge color="pink">Alpha</Badge>}
                {event.team_name === "Omega" && <Badge color="blue">Omega</Badge>}
            </div>
            <p className="text-xs text-slate-600 mt-1.5">{event.notes}</p>
        </TableCell>
    );
};

export default EventCell;
