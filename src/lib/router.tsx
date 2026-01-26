import { createBrowserRouter } from "react-router";
import AssignmentModal from "../components/AssignmentModal";
import ScheduleGridLayout from "../components/ScheduleGridLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ScheduleGridLayout />,
        children: [{ path: "assignments/:assignmentId", element: <AssignmentModal /> }]
    }
]);
