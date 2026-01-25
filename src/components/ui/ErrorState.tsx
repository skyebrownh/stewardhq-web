import { Button } from "../catalyst-ui-kit/button";

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

const ErrorState = ({ title = "Something went wrong", message = "Please try again.", onRetry }: ErrorStateProps) => {
    return (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="text-sm text-gray-600">{message}</p>

            {onRetry && (
                <Button outline onClick={onRetry} className="mt-4">
                    Try again
                </Button>
            )}
        </div>
    );
};

export default ErrorState;
