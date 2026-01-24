import { useEffect, useState } from "react";
import "./App.css";
import { getSchedules, type Schedule } from "./stewardhq_api";

const App = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([]);

    useEffect(() => {
        getSchedules().then((schedules) => setSchedules(schedules));
    }, []);

    return (
        <>
            <h1>Schedules</h1>
            <ul>
                {schedules.map((schedule) => (
                    <li key={schedule.id}>
                        {schedule.month} {schedule.year}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default App;
