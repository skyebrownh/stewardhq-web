import { useState } from "react";
import { Dialog } from "@catalyst/dialog";
import { DialogTitle } from "@catalyst/dialog";
import { useNavigate, useParams } from "react-router";
import { useAssignmentQuery } from "@/queries/assignments.queries";
import { useEventQuery } from "@/queries/events.queries";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import { queryClient } from "@/lib/queryClient";
import AssignmentModalSkeleton from "@/components/skeletons/AssignmentModalSkeleton";
import AssignmentModalContent from "./AssignmentModalContent";
import { Button } from "@catalyst/button";
import { DialogActions } from "@catalyst/dialog";

const AssignmentModal = () => {
    const navigate = useNavigate();
    const { assignmentId } = useParams();
    const { data: assignment, isLoading: assignmentLoading, error: assignmentError } = useAssignmentQuery(assignmentId);
    const { data: event, isLoading: eventLoading, error: eventError } = useEventQuery(assignment?.eventId);
    const [isOpen, setIsOpen] = useState(true);

    const handleClick = () => {
        setIsOpen(false);
        navigate("/");
    };

    const handleRetry = () => {
        if (!assignmentId) return;
        queryClient.invalidateQueries({ queryKey: ["assignment", assignmentId] });
    };

    const isLoading = assignmentLoading || eventLoading;
    const isError = assignmentError || eventError;
    const isEmpty = !isLoading && !isError && (!assignment || !event);
    const hasContent = !isLoading && !isError && assignment && event;

    return (
        <Dialog open={isOpen} onClose={setIsOpen}>
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
                <Button plain onClick={handleClick}>
                    Cancel
                </Button>
                {hasContent && <Button onClick={handleClick}>Assign</Button>}
            </DialogActions>
        </Dialog>
    );
};

export default AssignmentModal;
