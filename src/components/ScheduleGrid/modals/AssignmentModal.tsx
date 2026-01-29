import { AssignmentModalSkeletonDialog } from "@/components/skeletons/AssignmentModalSkeleton";
import { EmptyStateDialog } from "@/components/ui/EmptyState";
import { ErrorStateDialog } from "@/components/ui/ErrorState";
import { queryClient } from "@/lib/queryClient";
import { useScheduleGridQuery } from "@/queries/schedules.queries";
import { Button } from "@catalyst/button";
import { Dialog, DialogActions, DialogTitle } from "@catalyst/dialog";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import AssignmentModalContent from "./AssignmentModalContent";

const AssignmentModal = () => {
    const navigate = useNavigate();
    const { scheduleId, eventId, assignmentId } = useParams();

    const {
        data: scheduleGrid,
        isLoading: scheduleGridLoading,
        error: scheduleGridError
    } = useScheduleGridQuery(scheduleId);

    const eventObj = scheduleGrid?.events.find((eventObj) => eventObj.event.id === eventId);
    const event = eventObj?.event;
    const assignment = eventObj?.event_assignments.find((assignment) => assignment.id === assignmentId);

    const [selectedUserId, setSelectedUserId] = useState<string | null>(assignment?.assigned_user_id ?? null);

    const handleAssign = () => {
        void navigate(`/schedules/${scheduleId}/grid`, { replace: true });
    };

    const handleRetry = () => {
        if (!scheduleId) return;
        void queryClient.invalidateQueries({ queryKey: ["schedule-grid", scheduleId] });
    };

    const handleClose = () => {
        void navigate(`/schedules/${scheduleId}/grid`, { replace: true });
    };

    const isEmpty = !scheduleGridLoading && !scheduleGridError && (!assignment || !event);

    if (scheduleGridLoading) return <AssignmentModalSkeletonDialog handleClose={handleClose} />;

    if (scheduleGridError)
        return (
            <ErrorStateDialog
                title="Error loading assignment or event."
                message="Please try again."
                onRetry={handleRetry}
                handleClose={handleClose}
            />
        );

    if (isEmpty) return <EmptyStateDialog message="Assignment or event not found." handleClose={handleClose} />;

    return (
        <Dialog open onClose={handleClose}>
            <DialogTitle>Update Assignment</DialogTitle>

            <AssignmentModalContent
                assignment={assignment!}
                event={event!}
                selectedUserId={selectedUserId ?? undefined}
                onUserIdChange={setSelectedUserId}
            />

            <DialogActions>
                <Button plain onClick={handleClose}>
                    Cancel
                </Button>
                <Button onClick={handleAssign}>Assign</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssignmentModal;
