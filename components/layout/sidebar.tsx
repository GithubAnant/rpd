"use client";

import Link from "next/link";
import { ArxivLogo } from "@/components/ui/arxiv-logo";
import { NavItem } from "@/components/ui/nav-item";
import { HomeIcon, BookmarkIcon } from "@/components/ui/icons";
import { SignOutButton } from "@/features/auth";

interface SidebarProps {
    savedCount: number;
    isGuest: boolean;
}

/**
 * Desktop sidebar with logo, navigation, and sign out
 */
export function Sidebar({ savedCount, isGuest }: SidebarProps) {
    return (
        <aside className="hidden lg:flex flex-col w-[275px] px-3 border-r border-[#2f3336]">
            {/* Logo */}
            <div className="p-3 mt-1">
                <Link href="/home" className="inline-block text-[#e7e9ea]">
                    <ArxivLogo size="md" />
                </Link>
            </div>

            {/* Nav items */}
            <nav className="flex-1 mt-1">
                <NavItem
                    href="/home"
                    icon={<HomeIcon className="text-[#e7e9ea]" fill />}
                    label="Home"
                    active
                />
                <NavItem
                    href="/saved"
                    icon={<BookmarkIcon className="text-[#e7e9ea]" />}
                    label="Bookmarks"
                    count={savedCount}
                />
                {/* Only show sign out for authenticated users, not guests */}
                {!isGuest && <SignOutButton />}
            </nav>
        </aside>
    );
}
