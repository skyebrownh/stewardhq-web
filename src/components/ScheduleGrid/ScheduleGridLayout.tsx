import ScheduleGrid from "@components/ScheduleGrid/ScheduleGrid";
import { Outlet } from "react-router";

const ScheduleGridLayout = () => {
    return (
        <>
            <ScheduleGrid />
            <Outlet />
        </>
    );
};

export default ScheduleGridLayout;
