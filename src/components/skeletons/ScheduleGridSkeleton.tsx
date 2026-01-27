import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@catalyst/table";

const SkeletonCell = () => <div className="h-8 w-full rounded bg-gray-200 animate-pulse" />;

const ScheduleGridSkeleton = () => {
    const rows = Array.from({ length: 8 });
    const cols = Array.from({ length: 10 });

    return (
        <Table dense>
            <TableHead>
                <TableRow>
                    {cols.map((_, i) => (
                        <TableHeader key={i}>
                            <SkeletonCell />
                        </TableHeader>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((_, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {cols.map((_, colIndex) => (
                            <TableCell key={colIndex}>
                                <SkeletonCell />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ScheduleGridSkeleton;
