import type { NestedUser } from "@type-defs/user";
import { TableCell } from "@catalyst/table";

interface UnavailableCellProps {
    availability: NestedUser[];
}

const UnavailableCell = ({ availability }: UnavailableCellProps) => {
    return (
        <TableCell className="py-1.5! px-2! text-wrap bg-red-50 text-red-700 font-light">
            {availability
                ?.map((user) => user.user_first_name)
                .sort((a, b) => a.localeCompare(b))
                .join(", ")}
        </TableCell>
    );
};

export default UnavailableCell;
