import { useState, useEffect } from "react";
import { getSchedules, getScheduleGrid, type ScheduleGridResponse } from "../stewardhq_api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/catalyst-ui-kit/table";

const ScheduleGrid = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [scheduleGrid, setScheduleGrid] = useState<ScheduleGridResponse | null>(null);

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

    const toTime = (iso: string) => new Date(iso).getTime();

    return (
        <>
            {isLoading && <p>Loading...</p>}

            {error && <p>Error: {error}</p>}

            <Table dense>
                <TableHead>
                    <TableRow>
                        <TableHeader>Event</TableHeader>
                        <TableHeader>ProPresenter</TableHeader>
                        <TableHeader>Sound</TableHeader>
                        <TableHeader>Camera Director</TableHeader>
                        <TableHeader>Main Cam 1</TableHeader>
                        <TableHeader>Main Cam 2</TableHeader>
                        <TableHeader>Mobile Cam 3</TableHeader>
                        <TableHeader>On Call</TableHeader>
                        <TableHeader>Unavailable</TableHeader>
                        <TableHeader>Notes</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {scheduleGrid?.events
                        ?.sort((a, b) => toTime(a.event?.starts_at) - toTime(b.event?.starts_at))
                        .map((eventObj, index) => (
                            <TableRow key={eventObj.event?.id ? `event-${eventObj.event?.id}` : `event-${index}`}>
                                <TableCell>{eventObj.event?.title || "Untitled Event"}</TableCell>
                                <TableCell>
                                    {
                                        eventObj.event_assignments?.find(
                                            (assignment) => assignment.role_code === "propresenter"
                                        )?.assigned_user_first_name
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        eventObj.event_assignments?.find(
                                            (assignment) => assignment.role_code === "sound"
                                        )?.assigned_user_first_name
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        eventObj.event_assignments?.find(
                                            (assignment) => assignment.role_code === "camera_director"
                                        )?.assigned_user_first_name
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        eventObj.event_assignments?.find(
                                            (assignment) => assignment.role_code === "main_camera_1"
                                        )?.assigned_user_first_name
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        eventObj.event_assignments?.find(
                                            (assignment) => assignment.role_code === "main_camera_2"
                                        )?.assigned_user_first_name
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        eventObj.event_assignments?.find(
                                            (assignment) => assignment.role_code === "mobile_camera_3"
                                        )?.assigned_user_first_name
                                    }
                                </TableCell>
                                <TableCell>
                                    {
                                        eventObj.event_assignments?.find(
                                            (assignment) => assignment.role_code === "on_call"
                                        )?.assigned_user_first_name
                                    }
                                </TableCell>
                                <TableCell>
                                    {eventObj.availability
                                        ?.map((user) => user.user_first_name)
                                        .sort((a, b) => a.localeCompare(b))
                                        .join(", ")}
                                </TableCell>
                                <TableCell>{eventObj.event?.notes}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    );
};

export default ScheduleGrid;
