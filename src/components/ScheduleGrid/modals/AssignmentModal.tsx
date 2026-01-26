import { useState } from "react";
import { Button } from "@catalyst/button";
import { Dialog } from "@catalyst/dialog";
import { DialogTitle } from "@catalyst/dialog";
import { DialogDescription } from "@catalyst/dialog";
import { DialogBody } from "@catalyst/dialog";
import { Field, Label } from "@catalyst/fieldset";
import { Input } from "@catalyst/input";
import { DialogActions } from "@catalyst/dialog";
import { useNavigate, useParams } from "react-router";

const AssignmentModal = () => {
    const { assignmentId } = useParams();
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    const handleClick = () => {
        setIsOpen(false);
        navigate("/");
    };

    return (
        <Dialog open={isOpen} onClose={setIsOpen}>
            <DialogTitle>Assignment for {assignmentId}</DialogTitle>
            <DialogDescription>This is the assignment for the event.</DialogDescription>
            <DialogBody>
                <Field>
                    <Label>User</Label>
                    <Input name="user" placeholder="User" />
                </Field>
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
