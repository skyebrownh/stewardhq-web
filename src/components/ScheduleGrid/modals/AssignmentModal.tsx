import { useState } from "react";
import { Button } from "@catalyst/button";
import { Dialog } from "@catalyst/dialog";
import { DialogTitle } from "@catalyst/dialog";
import { DialogDescription } from "@catalyst/dialog";
import { DialogBody } from "@catalyst/dialog";
// import { Field, Label } from "@catalyst/fieldset";
// import { Input } from "@catalyst/input";
import { DialogActions } from "@catalyst/dialog";
import { useNavigate, useParams } from "react-router";
import { useAssignmentQuery } from "@/queries/assignments.queries";
import { useEventQuery } from "@/queries/events.queries";

const AssignmentModal = () => {
    const navigate = useNavigate();
    const { assignmentId } = useParams();
    const { data: assignment } = useAssignmentQuery(assignmentId);
    const { data: event } = useEventQuery(assignment?.eventId);
    const [isOpen, setIsOpen] = useState(true);

    const handleClick = () => {
        setIsOpen(false);
        navigate("/");
    };

    return (
        <Dialog open={isOpen} onClose={setIsOpen}>
            <DialogTitle>Assignment Details</DialogTitle>
            <DialogDescription>View and edit the assignment details.</DialogDescription>
            <DialogBody>
                {/* <Field>
                    <Label>User</Label>
                    <Input name="user" placeholder="User" />
                </Field> */}
                <p>{event?.title}</p>
                <p>{event?.starts_at}</p>
                <p>{event?.ends_at}</p>
                <p>{event?.notes}</p>
                <p>{event?.team_name}</p>
                <p>{event?.event_type_name}</p>
                <p>{assignment?.role_name}</p>
                <p>{assignment?.is_applicable}</p>
                <p>{assignment?.requirement_level}</p>
                <p>
                    {assignment?.assigned_user_first_name} {assignment?.assigned_user_last_name}
                </p>
                <p>{assignment?.is_active}</p>
            </DialogBody>
            <DialogActions>
                <Button plain onClick={handleClick}>
                    Cancel
                </Button>
                <Button onClick={handleClick}>Assign</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssignmentModal;
