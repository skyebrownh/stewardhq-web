import { Button } from "@catalyst/button";
import { Dialog } from "@catalyst/dialog";

interface ErrorStateProps {
    title?: string | undefined;
    message?: string | undefined;
    onRetry?: (() => void) | undefined;
}

export const ErrorState = ({
    title = "Something went wrong",
    message = "Please try again.",
    onRetry
}: ErrorStateProps) => {
    return (
        <div className="flex flex-col items-center gap-2 text-center border border-red-300 bg-red-50 rounded-lg p-4 mt-8">
            <h2 className="text-lg font-semibold text-red-600">{title}</h2>
            <p className="text-sm text-gray-600">{message}</p>

            {onRetry && (
                <Button color="white" onClick={onRetry} className="mt-4">
                    Try again
                </Button>
            )}
        </div>
    );
};

interface ErrorStateDialogProps extends ErrorStateProps {
    handleClose: () => void;
}

export const ErrorStateDialog = ({
    title = "Something went wrong",
    message = "Please try again.",
    onRetry,
    handleClose
}: ErrorStateDialogProps) => {
    return (
        <Dialog open onClose={handleClose}>
            <ErrorState title={title} message={message} onRetry={onRetry} />
        </Dialog>
    );
};
