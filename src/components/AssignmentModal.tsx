import { useState } from "react";
import { Button } from "./catalyst-ui-kit/button";
import { Dialog } from "./catalyst-ui-kit/dialog";
import { DialogTitle } from "./catalyst-ui-kit/dialog";
import { DialogDescription } from "./catalyst-ui-kit/dialog";
import { DialogBody } from "./catalyst-ui-kit/dialog";
import { Field, Label } from "./catalyst-ui-kit/fieldset";
import { Input } from "./catalyst-ui-kit/input";
import { DialogActions } from "./catalyst-ui-kit/dialog";
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
