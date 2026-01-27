import type { NestedEvent } from "@type-defs/event.ts";
import { TableCell } from "@catalyst/table";
import { formatEventDate } from "@lib/date";
import TeamBadge from "@/components/ui/TeamBadge";

interface EventCellProps {
    event: NestedEvent;
}

const EventCell = ({ event }: EventCellProps) => {
    const { weekdayShort, day, time } = formatEventDate(event.starts_at);
    return (
        <TableCell className="py-1.5! px-2!">
            <div className="flex items-center gap-2 font-semibold">
                <span className="min-w-[4ch] text-slate-800 uppercase tracking-wide">{weekdayShort}</span>
                <div className="flex items-center gap-2 bg-slate-200/50 rounded-md px-2 py-0.5 text-slate-800">
                    <span className="tabular-nums">{day}</span>
                    <span className="h-4 w-px bg-slate-400 shrink-0" />
                    <span className="font-normal">{time}</span>
                </div>
                <TeamBadge teamName={event.team_name} />
            </div>
            <p className="text-xs text-slate-600 mt-1.5">{event.notes}</p>
        </TableCell>
    );
};

export default EventCell;
