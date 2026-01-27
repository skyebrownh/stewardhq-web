import type { RoleResponse } from "@api/roles.api";
import { TableHeader, TableRow } from "@catalyst/table";

interface ScheduleGridHeaderRowProps {
    roles: RoleResponse[];
    hideUnavailable: boolean;
}

const ScheduleGridHeaderRow = ({ roles, hideUnavailable }: ScheduleGridHeaderRowProps) => {
    const getAbbreviatedRoleName = (role_name: string) => {
        // TODO: Add an abbreviated name to role in DB
        return role_name.replace("Camera Director", "Cam Director").replace("Camera", "");
    };

    return (
        <TableRow className="bg-slate-100 text-slate-800">
            <TableHeader className="px-2!">Event</TableHeader>

            {roles.map((role) => (
                <TableHeader key={role.id} className="pl-5!">
                    {getAbbreviatedRoleName(role.name)}
                </TableHeader>
            ))}

            {!hideUnavailable && <TableHeader className="px-2! bg-red-50 text-red-700">Unavailable</TableHeader>}
        </TableRow>
    );
};

export default ScheduleGridHeaderRow;
