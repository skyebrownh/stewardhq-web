import AssignmentModal from "@/components/ScheduleGrid/modals/AssignmentModal";
import ScheduleGridEntry from "@/components/ScheduleGrid/ScheduleGridEntry";
import ScheduleGridLayout from "@/components/ScheduleGrid/ScheduleGridLayout";
import { Route, Routes } from "react-router";
import { AppLayout } from "./components/AppLayout";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AppLayout />}>
                <Route index element={<ScheduleGridEntry />} />
                <Route path="schedules/:scheduleId/grid" element={<ScheduleGridLayout />}>
                    <Route path="events/:eventId/assignments/:assignmentId" element={<AssignmentModal />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
