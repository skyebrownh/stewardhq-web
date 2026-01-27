import AssignmentModalSkeleton from "@/components/skeletons/AssignmentModalSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { queryClient } from "@/lib/queryClient";
import { useAssignmentQuery } from "@/queries/assignments.queries";
import { useEventQuery } from "@/queries/events.queries";
import { Button } from "@catalyst/button";
import { Dialog, DialogActions, DialogTitle } from "@catalyst/dialog";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import AssignmentModalContent from "./AssignmentModalContent";

const AssignmentModal = () => {
    const navigate = useNavigate();
    const { assignmentId } = useParams();
    const { data: assignment, isLoading: assignmentLoading, error: assignmentError } = useAssignmentQuery(assignmentId);
    const { data: event, isLoading: eventLoading, error: eventError } = useEventQuery(assignment?.eventId);
    const [isOpen, setIsOpen] = useState(true);

    const handleAssign = () => {
        setIsOpen(false);
        void navigate("/");
    };

    const handleRetry = () => {
        if (!assignmentId) return;
        void queryClient.invalidateQueries({ queryKey: ["assignment", assignmentId] });
    };

    const handleClose = () => {
        setIsOpen(false);
        void navigate("/");
    };

    const isLoading = assignmentLoading || eventLoading;
    const isError = assignmentError || eventError;
    const isEmpty = !isLoading && !isError && (!assignment || !event);
    const hasContent = !isLoading && !isError && assignment && event;

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Update Assignment</DialogTitle>

            {isLoading && <AssignmentModalSkeleton />}

            {isError && (
                <ErrorState
                    title="Error loading assignment or event."
                    message="Please try again."
                    onRetry={handleRetry}
                />
            )}

            {isEmpty && <EmptyState message="Assignment or event not found." />}

            {hasContent && <AssignmentModalContent assignment={assignment} event={event} />}

            <DialogActions>
                <Button plain onClick={handleClose}>
                    Cancel
                </Button>
                {hasContent && <Button onClick={handleAssign}>Assign</Button>}
            </DialogActions>
        </Dialog>
    );
};

export default AssignmentModal;
