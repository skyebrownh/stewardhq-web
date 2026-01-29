import AssignmentModal from "@/components/ScheduleGrid/modals/AssignmentModal";
import ScheduleGridEntry from "@/components/ScheduleGrid/ScheduleGridEntry";
import ScheduleGridLayout from "@/components/ScheduleGrid/ScheduleGridLayout";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/react-router";
import { Route, Routes } from "react-router";

const App = () => {
    return (
        <>
            <header className="flex items-center justify-center py-8 px-4">
                {/* Show the sign-in button when the user is signed out */}
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                {/* Show the user button when the user is signed in */}
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<ScheduleGridEntry />} />
                    <Route path="schedules/:scheduleId/grid" element={<ScheduleGridLayout />}>
                        <Route path="events/:eventId/assignments/:assignmentId" element={<AssignmentModal />} />
                    </Route>
                </Routes>
            </main>
        </>
    );
};

export default App;
