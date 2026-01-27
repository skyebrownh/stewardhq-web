import AssignmentModal from "@/components/ScheduleGrid/modals/AssignmentModal";
import ScheduleGridLayout from "@components/ScheduleGrid/ScheduleGridLayout";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ScheduleGridLayout />,
        children: [{ path: "assignments/:assignmentId", element: <AssignmentModal /> }]
    }
]);
