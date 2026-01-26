import { createBrowserRouter } from "react-router";
import AssignmentModal from "@/components/ScheduleGrid/modals/AssignmentModal";
import ScheduleGridLayout from "@components/ScheduleGrid/ScheduleGridLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ScheduleGridLayout />,
        children: [{ path: "assignments/:assignmentId", element: <AssignmentModal /> }]
    }
]);
