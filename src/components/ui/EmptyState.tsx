import { Dialog } from "@catalyst/dialog";
import { Text } from "@catalyst/text";

interface EmptyStateProps {
    message?: string | undefined;
}

export const EmptyState = ({ message = "No results found." }: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Text className="text-sm text-gray-600">{message}</Text>
        </div>
    );
};

interface EmptyStateDialogProps extends EmptyStateProps {
    handleClose: () => void;
}

export const EmptyStateDialog = ({ message = "No results found.", handleClose }: EmptyStateDialogProps) => {
    return (
        <Dialog open onClose={handleClose}>
            <EmptyState message={message} />
        </Dialog>
    );
};
