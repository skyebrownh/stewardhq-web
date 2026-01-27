import EventCell from "@/components/ScheduleGrid/cells/EventCell";
import RoleAssignmentCell from "@/components/ScheduleGrid/cells/RoleAssignmentCell";
import UnavailableCell from "@/components/ScheduleGrid/cells/UnavailableCell";
import type { Role } from "@/types/role";
import { TableCell, TableRow } from "@catalyst/table";
import type { NestedEventAssignment } from "@type-defs/assignment";
import type { ScheduleGridEvent } from "@type-defs/schedule";

interface ScheduleGridRowProps {
    eventObj: ScheduleGridEvent;
    activeRoles: Role[];
    hideUnavailable: boolean;
    roleMap: Map<string, NestedEventAssignment>;
}

const ScheduleGridRow = ({ eventObj, activeRoles, hideUnavailable, roleMap }: ScheduleGridRowProps) => {
    return (
        <TableRow>
            <EventCell event={eventObj.event} />

            {activeRoles.map((role) => {
                const assignment = roleMap.get(role.code);

                if (!assignment)
                    return (
                        <TableCell key={role.id} className="py-1.5! px-5! text-gray-400 font-light">
                            (na)
                        </TableCell>
                    );

                return <RoleAssignmentCell key={role.id} assignment={assignment} />;
            })}

            {!hideUnavailable && <UnavailableCell availability={eventObj.availability} />}
        </TableRow>
    );
};

export default ScheduleGridRow;
