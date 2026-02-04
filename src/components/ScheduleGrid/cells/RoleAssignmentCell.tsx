import type { ScheduleGridEventAssignment } from "@api/schedules.api";
import { Button } from "@catalyst/button";
import { TableCell } from "@catalyst/table";
import { useAuth } from "@clerk/react-router";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";

interface RoleAssignmentCellProps {
    eventId: string;
    assignment: ScheduleGridEventAssignment;
}

const RoleAssignmentCell = ({ eventId, assignment }: RoleAssignmentCellProps) => {
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
        return (
            <TableCell className="py-1.5! px-2!">
                <Button plain disabled className="disabled:opacity-90!">
                    {assignment.is_applicable && (
                        <span className="font-normal text-slate-800">
                            {assignment.assigned_user_first_name || (
                                <PlusCircleIcon className="w-6 h-6 text-blue-400" />
                            )}
                        </span>
                    )}
                    {!assignment.is_applicable && <span className="font-normal text-slate-400">—</span>}
                </Button>
            </TableCell>
        );
    }

    return (
        <TableCell className="py-1.5! px-2!">
            <Link to={`events/${eventId}/assignments/${assignment.id}`}>
                <Button plain>
                    {assignment.is_applicable && (
                        <span className="font-normal text-slate-800">
                            {assignment.assigned_user_first_name || (
                                <PlusCircleIcon className="w-6 h-6 text-blue-400" />
                            )}
                        </span>
                    )}
                    {!assignment.is_applicable && <span className="font-normal text-slate-400">—</span>}
                </Button>
            </Link>
        </TableCell>
    );
};

export default RoleAssignmentCell;
