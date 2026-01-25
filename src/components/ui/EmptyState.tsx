import { Text } from "../catalyst-ui-kit/text";

interface EmptyStateProps {
    message?: string;
}

const EmptyState = ({ message = "No results found." }: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Text className="text-sm text-gray-600">{message}</Text>
        </div>
    );
};

export default EmptyState;
