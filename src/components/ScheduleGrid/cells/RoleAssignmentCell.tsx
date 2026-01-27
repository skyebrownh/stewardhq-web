import type { ScheduleGridEventAssignment } from "@api/schedules.api";
import { Button } from "@catalyst/button";
import { TableCell } from "@catalyst/table";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

interface RoleAssignmentCellProps {
    eventId: string;
    assignment: ScheduleGridEventAssignment;
}

const RoleAssignmentCell = ({ eventId, assignment }: RoleAssignmentCellProps) => {
    return (
        <TableCell className="py-1.5! px-2!">
            {assignment.is_applicable ? (
                <Link to={`events/${eventId}/assignments/${assignment.id}`}>
                    <Button plain>
                        <span className="font-normal text-slate-800">
                            {assignment.assigned_user_first_name || (
                                <PlusCircleIcon className="w-6 h-6 text-blue-400" />
                            )}
                        </span>
                    </Button>
                </Link>
            ) : (
                <Button plain disabled>
                    <span className="font-normal text-slate-400">—</span>
                </Button>
            )}
        </TableCell>
    );
};

export default RoleAssignmentCell;
