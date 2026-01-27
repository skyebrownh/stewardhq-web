import { Combobox, ComboboxLabel, ComboboxOption } from "@catalyst/combobox";
import { useUsersQuery } from "@queries/users.queries";
import { useState } from "react";

interface UserComboBoxProps {
    currentUserId?: string;
}

const UserComboBox = ({ currentUserId }: UserComboBoxProps) => {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(currentUserId || null);
    const { data: users, isLoading, error } = useUsersQuery();

    if (isLoading) return <span className="text-sm text-gray-500">Loading users...</span>;
    if (error) return <span className="text-sm text-red-500">Error loading users: {error.message}</span>;
    if (!users) return <span className="text-sm text-gray-500">No users found</span>;

    const getDisplayName = (userId: string | null) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.first_name + " " + user.last_name : undefined;
    };

    return (
        <Combobox
            name="user"
            options={users.map((user) => user.id)}
            displayValue={getDisplayName}
            value={selectedUserId || undefined}
            placeholder="Select a user..."
            onChange={setSelectedUserId}>
            {(userId: string) => (
                <ComboboxOption value={userId}>
                    <ComboboxLabel>{getDisplayName(userId)}</ComboboxLabel>
                </ComboboxOption>
            )}
        </Combobox>
    );
};

export default UserComboBox;
