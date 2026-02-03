import Link from "next/link";
import { ReactNode } from "react";

interface NavItemProps {
    href: string;
    icon: ReactNode;
    label: string;
    active?: boolean;
    count?: number;
}

/**
 * Reusable navigation item for sidebar
 */
export function NavItem({ href, icon, label, active, count }: NavItemProps) {
    return (
        <Link
            href={href}
            className="flex items-center gap-5 px-3 py-3 rounded-full hover-bg transition-colors"
        >
            {icon}
            <span className={`text-xl ${active ? "font-bold" : ""} text-[#e7e9ea]`}>
                {label}
            </span>
            {count !== undefined && count > 0 && (
                <span className="text-sm text-[#71767b]">{count}</span>
            )}
        </Link>
    );
}
