import { Dialog } from "@catalyst/dialog";

export const AssignmentModalSkeleton = () => {
    return (
        <div className="animate-pulse w-full h-full px-4 py-8">
            <div className="flex flex-col gap-4">
                <div className="h-12 w-full rounded bg-gray-200" />
                <div className="h-12 w-full rounded bg-gray-200" />
                <div className="h-12 w-full rounded bg-gray-200" />
                <div className="h-12 w-full rounded bg-gray-200" />
            </div>
        </div>
    );
};

interface AssignmentModalSkeletonDialogProps {
    handleClose: () => void;
}

export const AssignmentModalSkeletonDialog = ({ handleClose }: AssignmentModalSkeletonDialogProps) => {
    return (
        <Dialog open onClose={handleClose}>
            <AssignmentModalSkeleton />
        </Dialog>
    );
};
