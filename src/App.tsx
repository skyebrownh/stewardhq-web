import AssignmentModal from "@/components/ScheduleGrid/modals/AssignmentModal";
import ScheduleGridEntry from "@/components/ScheduleGrid/ScheduleGridEntry";
import ScheduleGridLayout from "@/components/ScheduleGrid/ScheduleGridLayout";
import { Route, Routes } from "react-router";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<ScheduleGridEntry />} />
            <Route path="schedules/:scheduleId/grid" element={<ScheduleGridLayout />}>
                <Route path="events/:eventId/assignments/:assignmentId" element={<AssignmentModal />} />
            </Route>
        </Routes>
    );
};

export default App;
