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
            className="flex items-center gap-5 px-3 py-3 rounded-full hover:bg-white/10 transition-colors w-full"
        >
            {icon}
            <span className={`text-xl ${active ? "font-bold" : "font-medium"} text-[#e7e9ea]`}>
                {label}
            </span>
            {count !== undefined && count > 0 && (
                <span className="ml-auto text-[#e7e9ea] font-medium text-sm">
                    {count}
                </span>
            )}
        </Link>
    );
}
