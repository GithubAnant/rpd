"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArxivLogo } from "@/components/ui/arxiv-logo";
import { BookmarkIcon } from "@/components/ui/icons";
import { InstallButton } from "@/components/install-button";

interface MobileHeaderProps {
    userName?: string | null;
    userImage?: string | null;
    isGuest: boolean;
    savedCount: number;
}

/**
 * Mobile header with profile pic, logo, and bookmarks link
 */
export function MobileHeader({
    savedCount,
}: Omit<MobileHeaderProps, "userName" | "userImage" | "isGuest">) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex items-center justify-between px-4 py-3 lg:hidden">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <ArxivLogo size="lg" className="text-[#e7e9ea]" />
                <InstallButton variant="mobile" />
            </div>

            <Link href="/saved" className="relative p-2">
                <BookmarkIcon className="w-5 h-5 text-[#e7e9ea]" />
                {mounted && savedCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#1d9bf0] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {savedCount}
                    </span>
                )}
            </Link>
        </div>
    );
}
