"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArxivLogo } from "@/components/ui/arxiv-logo";
import { NavItem } from "@/components/ui/nav-item";
import { HomeIcon, BookmarkIcon } from "@/components/ui/icons";


interface SidebarProps {
    savedCount: number;
    isGuest: boolean;
}

/**
 * Desktop sidebar with logo, navigation, and sign out
 */
export function Sidebar({ savedCount }: Omit<SidebarProps, "isGuest">) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <aside className="hidden lg:flex flex-col w-68.75 px-3 border-r border-[#2f3336] sticky top-0 h-screen">
            {/* Logo */}
            <div className="p-3 mt-1">
                <Link href="/home" className="inline-block text-[#e7e9ea]">
                    <ArxivLogo size="lg" />
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
                    count={mounted ? savedCount : 0}
                />
            </nav>
        </aside>
    );
}
