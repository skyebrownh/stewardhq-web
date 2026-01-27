import EventCell from "@/components/ScheduleGrid/cells/EventCell";
import RoleAssignmentCell from "@/components/ScheduleGrid/cells/RoleAssignmentCell";
import UnavailableCell from "@/components/ScheduleGrid/cells/UnavailableCell";
import type { RoleResponse } from "@api/roles.api";
import type { ScheduleGridEventAssignment, ScheduleGridEventResponse } from "@api/schedules.api";
import { TableCell, TableRow } from "@catalyst/table";

interface ScheduleGridRowProps {
    eventObj: ScheduleGridEventResponse;
    roles: RoleResponse[];
    hideUnavailable: boolean;
    roleMap: Map<string, ScheduleGridEventAssignment>;
}

const ScheduleGridRow = ({ eventObj, roles, hideUnavailable, roleMap }: ScheduleGridRowProps) => {
    return (
        <TableRow>
            <EventCell event={eventObj.event} />

            {roles.map((role) => {
                const assignment = roleMap.get(role.code);

                if (!assignment)
                    return (
                        <TableCell key={role.id} className="py-1.5! px-5! text-gray-400 font-light">
                            (na)
                        </TableCell>
                    );

                return <RoleAssignmentCell key={role.id} eventId={eventObj.event.id} assignment={assignment} />;
            })}

            {!hideUnavailable && <UnavailableCell availability={eventObj.availability} />}
        </TableRow>
    );
};

export default ScheduleGridRow;
