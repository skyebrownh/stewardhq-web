import { AssignmentModalSkeletonDialog } from "@/components/skeletons/AssignmentModalSkeleton";
import { EmptyStateDialog } from "@/components/ui/EmptyState";
import { ErrorStateDialog } from "@/components/ui/ErrorState";
import { queryClient } from "@/lib/queryClient";
import { useUpdateAssignmentMutation } from "@/queries/assignments.queries";
import { useScheduleGridQuery } from "@/queries/schedules.queries";
import { Button } from "@catalyst/button";
import { Dialog, DialogActions, DialogTitle } from "@catalyst/dialog";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import AssignmentModalContent from "./AssignmentModalContent";

const AssignmentModal = () => {
    const navigate = useNavigate();
    const { scheduleId, eventId, assignmentId } = useParams();
    const [open, setOpen] = useState(true);

    const {
        data: scheduleGrid,
        isLoading: scheduleGridLoading,
        error: scheduleGridError
    } = useScheduleGridQuery(scheduleId);

    const eventObj = scheduleGrid?.events.find((eventObj) => eventObj.event.id === eventId);
    const event = eventObj?.event;
    const assignment = eventObj?.event_assignments.find((assignment) => assignment.id === assignmentId);

    const updateAssignmentMutation = useUpdateAssignmentMutation(assignmentId, scheduleId);

    const [selectedUserId, setSelectedUserId] = useState<string | null>(assignment?.assigned_user_id ?? null);

    useEffect(() => {
        if (!open) void navigate(-1);
    }, [open, navigate]);

    const handleAssign = () => {
        updateAssignmentMutation.mutate({
            assigned_user_id: selectedUserId
        });
        setOpen(false);
    };

    const handleRetry = () => {
        if (!scheduleId) return;
        void queryClient.invalidateQueries({ queryKey: ["schedule-grid", scheduleId] });
    };

    const handleClose = () => setOpen(false);

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
        <Dialog open={open} onClose={handleClose}>
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
                <Button onClick={handleAssign} disabled={assignment!.assigned_user_id === selectedUserId}>
                    Assign
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssignmentModal;
