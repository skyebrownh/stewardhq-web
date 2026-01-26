import type { NestedEventAssignment, ScheduleGridEvent } from "@type-defs/schedule";
import { TableRow } from "@catalyst/table";
import EventCell from "@components/ScheduleGrid/EventCell";
import RoleAssignmentCell from "@components/ScheduleGrid/RoleAssignmentCell";
import UnavailableCell from "@components/ScheduleGrid/UnavailableCell";
import type { Role } from "@/types/role";

interface ScheduleGridRowProps {
    eventObj: ScheduleGridEvent;
    activeRoles: Role[];
    hideUnavailable: boolean;
    roleMap?: Map<string, NestedEventAssignment>;
}

const ScheduleGridRow = ({ eventObj, activeRoles, hideUnavailable, roleMap }: ScheduleGridRowProps) => {
    return (
        <TableRow>
            <EventCell event={eventObj.event} />

            {activeRoles.map((role) => (
                <RoleAssignmentCell key={role.id} assignment={roleMap?.get(role.code)} />
            ))}

            {!hideUnavailable && <UnavailableCell availability={eventObj.availability} />}
        </TableRow>
    );
};

export default ScheduleGridRow;
