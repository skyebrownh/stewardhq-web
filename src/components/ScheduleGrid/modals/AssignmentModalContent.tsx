import Badge from "@/components/ui/Badge";
import TeamBadge from "@/components/ui/TeamBadge";
import UserComboBox from "@/components/ui/UserComboBox";
import { formatEventDate } from "@/lib/date";
import {
    REQUIREMENT_COLORS,
    REQUIREMENT_LABELS,
    type RequirementLevel,
    type RequirementLevelColor
} from "@/lib/domain";
import type { ScheduleGridEvent, ScheduleGridEventAssignment } from "@api/schedules.api";
import { DescriptionDetails, DescriptionList, DescriptionTerm } from "@catalyst/description-list";
import { DialogBody, DialogDescription } from "@catalyst/dialog";

interface AssignmentModalContentProps {
    assignment: ScheduleGridEventAssignment;
    event: ScheduleGridEvent;
    selectedUserId: string | undefined;
    onUserIdChange: (userId: string | null) => void;
}

const AssignmentModalContent = ({ assignment, event, selectedUserId, onUserIdChange }: AssignmentModalContentProps) => {
    const start = formatEventDate(event.starts_at);
    const end = formatEventDate(event.ends_at);

    const level: RequirementLevel = assignment.requirement_level as RequirementLevel;
    const levelLabel: string = REQUIREMENT_LABELS[level];
    const levelColor: RequirementLevelColor = REQUIREMENT_COLORS[level];

    return (
        <>
            <DialogDescription>
                {event.event_type_name} - {start.weekdayLong} {start.monthShort} {start.dayLong}, {start.time} -{" "}
                {end.time}
            </DialogDescription>
            {event.notes && <DialogDescription>{event.notes}</DialogDescription>}
            <DialogBody>
                <DescriptionList>
                    <DescriptionTerm>Role</DescriptionTerm>
                    <DescriptionDetails>{assignment.role_name}</DescriptionDetails>

                    <DescriptionTerm>Applicable</DescriptionTerm>
                    <DescriptionDetails>
                        {assignment.is_applicable && <Badge color="green">Yes</Badge>}
                        {!assignment.is_applicable && <Badge color="red">No</Badge>}
                    </DescriptionDetails>

                    <DescriptionTerm>Requirement Level</DescriptionTerm>
                    <DescriptionDetails>
                        <Badge color={levelColor}>{levelLabel}</Badge>
                    </DescriptionDetails>

                    <DescriptionTerm>Team</DescriptionTerm>
                    <DescriptionDetails>
                        <TeamBadge teamName={event.team_name} />
                    </DescriptionDetails>

                    <DescriptionTerm>Assigned User</DescriptionTerm>
                    <DescriptionDetails>
                        <UserComboBox selectedUserId={selectedUserId} onUserIdChange={onUserIdChange} />
                    </DescriptionDetails>
                </DescriptionList>
            </DialogBody>
        </>
    );
};

export default AssignmentModalContent;
