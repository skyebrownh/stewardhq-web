import { useScheduleGridQuery } from "@/queries/schedules.queries";
import ScheduleGrid from "@components/ScheduleGrid/ScheduleGrid";
import { Outlet, useParams } from "react-router";

const ScheduleGridLayout = () => {
    const { scheduleId } = useParams();
    useScheduleGridQuery(scheduleId);

    return (
        <>
            <ScheduleGrid />
            <Outlet />
        </>
    );
};

export default ScheduleGridLayout;
