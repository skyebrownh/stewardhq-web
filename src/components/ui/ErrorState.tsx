import { Button } from "@catalyst/button";

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

const ErrorState = ({ title = "Something went wrong", message = "Please try again.", onRetry }: ErrorStateProps) => {
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

export default ErrorState;
