import React from "react";

const badgeColors = {
    gray: "bg-gray-100 text-gray-600",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-800",
    green: "bg-green-100 text-green-700",
    blue: "bg-blue-100 text-blue-700",
    indigo: "bg-indigo-100 text-indigo-700",
    purple: "bg-purple-100 text-purple-700",
    pink: "bg-pink-100 text-pink-700"
} as const;

interface BadgeProps {
    children: React.ReactNode;
    color: keyof typeof badgeColors;
}

const Badge = ({ children, color }: BadgeProps) => {
    return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${badgeColors[color]}`}>
            {children}
        </span>
    );
};

export default Badge;
