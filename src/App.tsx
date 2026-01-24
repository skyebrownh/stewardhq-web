import { useEffect, useState } from "react";
import { getSchedules, getScheduleGrid, type ScheduleGrid } from "./stewardhq_api";

const App = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [scheduleGrid, setScheduleGrid] = useState<ScheduleGrid | null>(null);

    useEffect(() => {
        getSchedules()
            .then((schedules) => {
                const scheduleId = schedules.find((schedule) => schedule.year === 2025 && schedule.month === 12)?.id;

                if (scheduleId) {
                    getScheduleGrid(scheduleId).then((scheduleGrid) => setScheduleGrid(scheduleGrid));
                }
            })
            .catch((error) => setError(error.message))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            <h1>Schedule Grid</h1>

            {isLoading && <p>Loading...</p>}

            {error && <p>Error: {error}</p>}

            {scheduleGrid?.events?.map((eventObj, index) => (
                <div key={eventObj.event?.id ? `event-${eventObj.event?.id}` : `event-${index}`}>
                    <h2>{eventObj.event?.title || "Untitled Event"}</h2>
                    <p>{eventObj.event?.notes || "No Notes"}</p>
                    <p>{eventObj.event?.team_name || "No Team"}</p>
                    <h3>Event Assignments</h3>
                    <ul>
                        {eventObj.event_assignments?.map((assignment) => (
                            <li key={assignment.id}>
                                {assignment.role_name} - {assignment.assigned_user_first_name || "No User"}
                            </li>
                        ))}
                    </ul>
                    <h3>Availability</h3>
                    <ul>
                        {eventObj.availability?.map((user) => (
                            <li key={user.user_id}>
                                {user.user_first_name} {user.user_last_name}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    );
};

export default App;
