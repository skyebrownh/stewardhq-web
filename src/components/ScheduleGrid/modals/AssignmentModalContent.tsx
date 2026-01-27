import Badge from "@/components/ui/Badge";
import TeamBadge from "@/components/ui/TeamBadge";
import UserComboBox from "@/components/ui/UserComboBox";
import { formatEventDate } from "@/lib/date";
import type { Assignment } from "@/types/assignment";
import type { NestedEvent } from "@/types/event";
import { DescriptionDetails, DescriptionList, DescriptionTerm } from "@catalyst/description-list";
import { DialogBody, DialogDescription } from "@catalyst/dialog";

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
                        <UserComboBox currentUserId={assignment.assigned_user_id} />
                    </DescriptionDetails>
                </DescriptionList>
            </DialogBody>
        </>
    );
};

export default AssignmentModalContent;
