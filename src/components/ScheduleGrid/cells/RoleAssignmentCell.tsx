import type { NestedEventAssignment } from "@type-defs/assignment";
import { TableCell } from "@catalyst/table";
import { Link } from "react-router";
import { Button } from "@catalyst/button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

interface RoleAssignmentCellProps {
    assignment?: NestedEventAssignment;
}

const RoleAssignmentCell = ({ assignment }: RoleAssignmentCellProps) => {
    return (
        <TableCell className="py-1.5! px-2!">
            <Button plain disabled={!assignment?.is_applicable}>
                {/* FIXME: Don't allow linking to assignments that are not applicable. And ensure available slots work as expected. */}
                <Link to={`/assignments/${assignment?.id}`}>
                    <span className={`font-normal ${assignment?.is_applicable ? "text-slate-800" : "text-slate-400"}`}>
                        {assignment?.is_applicable
                            ? assignment?.assigned_user_first_name || (
                                  <PlusCircleIcon className="w-6 h-6 text-blue-400" />
                              )
                            : "—"}
                    </span>
                </Link>
            </Button>
        </TableCell>
    );
};

export default RoleAssignmentCell;
