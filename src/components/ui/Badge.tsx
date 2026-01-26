import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    color: "gray" | "red" | "yellow" | "green" | "blue" | "indigo" | "purple" | "pink";
}

const Badge = ({ children, color }: BadgeProps) => {
    return (
        <span
            className={`inline-flex items-center rounded-md bg-${color}-100 px-2 py-1 text-xs font-medium text-${color}-600`}>
            {children}
        </span>
    );
};

export default Badge;
