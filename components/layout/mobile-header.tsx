"use client";

import Link from "next/link";
import { ArxivLogo } from "@/components/ui/arxiv-logo";
import { BookmarkIcon } from "@/components/ui/icons";

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
    userName,
    userImage,
    isGuest,
    savedCount,
}: MobileHeaderProps) {
    return (
        <div className="flex items-center justify-between px-4 py-3 lg:hidden">
            {/* Profile pic */}
            {userImage ? (
                <img src={userImage} alt="" className="w-8 h-8 rounded-full" />
            ) : (
                <div className="w-8 h-8 rounded-full bg-[#16181c] flex items-center justify-center text-[#e7e9ea] text-sm font-bold">
                    {isGuest ? "G" : userName?.charAt(0).toUpperCase() || "U"}
                </div>
            )}

            <ArxivLogo size="md" className="text-[#e7e9ea]" />

            <Link href="/saved" className="relative p-2">
                <BookmarkIcon className="w-5 h-5 text-[#e7e9ea]" />
                {savedCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#1d9bf0] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {savedCount}
                    </span>
                )}
            </Link>
        </div>
    );
}
