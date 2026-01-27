import { Button } from "@catalyst/button";
import { TableCell } from "@catalyst/table";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import type { NestedEventAssignment } from "@type-defs/assignment";
import { Link } from "react-router";

interface RoleAssignmentCellProps {
    assignment: NestedEventAssignment;
}

const RoleAssignmentCell = ({ assignment }: RoleAssignmentCellProps) => {
    return (
        <TableCell className="py-1.5! px-2!">
            <Link to={`/assignments/${assignment.id}`}>
                <Button plain disabled={!assignment.is_applicable}>
                    <span className={`font-normal ${assignment.is_applicable ? "text-slate-800" : "text-slate-400"}`}>
                        {assignment.is_applicable
                            ? assignment.assigned_user_first_name || (
                                  <PlusCircleIcon className="w-6 h-6 text-blue-400" />
                              )
                            : "—"}
                    </span>
                </Button>
            </Link>
        </TableCell>
    );
};

export default RoleAssignmentCell;
