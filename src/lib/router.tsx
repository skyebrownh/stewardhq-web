import AssignmentModal from "@/components/ScheduleGrid/modals/AssignmentModal";
import ScheduleGridEntry from "@/components/ScheduleGrid/ScheduleGridEntry";
import ScheduleGridLayout from "@components/ScheduleGrid/ScheduleGridLayout";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ScheduleGridEntry />
    },
    {
        path: "/schedules/:scheduleId/grid",
        element: <ScheduleGridLayout />,
        children: [{ path: "events/:eventId/assignments/:assignmentId", element: <AssignmentModal /> }]
    }
]);
