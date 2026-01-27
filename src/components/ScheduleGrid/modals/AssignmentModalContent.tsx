import type { Assignment } from "@/types/assignment";
import type { NestedEvent } from "@/types/event";
import { formatEventDate } from "@/lib/date";
import { DialogDescription } from "@catalyst/dialog";
import { DialogBody } from "@catalyst/dialog";
import { DescriptionList, DescriptionTerm, DescriptionDetails } from "@catalyst/description-list";
import Badge from "@/components/ui/Badge";
import TeamBadge from "@/components/ui/TeamBadge";

interface AssignmentModalContentProps {
    assignment?: Assignment;
    event?: NestedEvent;
}

const AssignmentModalContent = ({ assignment, event }: AssignmentModalContentProps) => {
    if (!assignment || !event) return null;
    const { weekdayLong, dayLong, monthShort, time: startTime } = formatEventDate(event.starts_at);
    const { time: endTime } = formatEventDate(event.ends_at);
    const requirementLevel =
        assignment.requirement_level.charAt(0).toUpperCase() + assignment.requirement_level.slice(1).toLowerCase();
    const requirementLevelBadgeColor =
        requirementLevel === "Required" ? "red" : requirementLevel === "Preferred" ? "yellow" : "gray";

    return (
        <>
            <DialogDescription>
                {event.event_type_name} - {weekdayLong} {monthShort} {dayLong}, {startTime} - {endTime}
            </DialogDescription>
            {event.notes && <DialogDescription>{event.notes}</DialogDescription>}
            <DialogBody>
                {/* <Field>
                <Label>User</Label>
                <Input name="user" placeholder="User" />
            </Field> */}
                <DescriptionList>
                    <DescriptionTerm>Role</DescriptionTerm>
                    <DescriptionDetails>{assignment.role_name}</DescriptionDetails>

                    <DescriptionTerm>Requirement Level</DescriptionTerm>
                    <DescriptionDetails>
                        <Badge color={requirementLevelBadgeColor}>{requirementLevel}</Badge>
                    </DescriptionDetails>

                    <DescriptionTerm>Team</DescriptionTerm>
                    <DescriptionDetails>
                        <TeamBadge teamName={event.team_name} />
                    </DescriptionDetails>

                    <DescriptionTerm>Assigned User</DescriptionTerm>
                    <DescriptionDetails>
                        {assignment.assigned_user_first_name} {assignment.assigned_user_last_name}
                    </DescriptionDetails>
                </DescriptionList>
            </DialogBody>
        </>
    );
};

export default AssignmentModalContent;
