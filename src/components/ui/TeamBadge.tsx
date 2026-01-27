import Badge from "@/components/ui/Badge";

interface TeamBadgeProps {
    teamName: string | null;
}

const TeamBadge = ({ teamName }: TeamBadgeProps) => {
    return (
        <>
            {!teamName && <Badge color="gray">No Team</Badge>}
            {teamName === "Alpha" && <Badge color="purple">Alpha</Badge>}
            {teamName === "Omega" && <Badge color="blue">Omega</Badge>}
        </>
    );
};

export default TeamBadge;
