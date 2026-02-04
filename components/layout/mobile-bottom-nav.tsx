"use client";

import Link from "next/link";
import { HomeIcon, BookmarkIcon } from "@/components/ui/icons";

interface MobileBottomNavProps {
    userImage?: string | null;
    isGuest: boolean;
    savedCount: number;
}

/**
 * Mobile bottom navigation bar
 */
export function MobileBottomNav({
    savedCount,
}: Omit<MobileBottomNavProps, "userImage" | "isGuest">) {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-[#2f3336] flex items-center justify-around py-2 lg:hidden safe-bottom">
            <Link href="/home" className="p-3">
                <HomeIcon className="text-[#e7e9ea]" fill />
            </Link>
            <Link href="/saved" className="p-3 relative">
                <BookmarkIcon className="text-[#e7e9ea]" />
                {savedCount > 0 && (
                    <span className="absolute top-1 right-1 bg-[#1d9bf0] text-white text-[11px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {savedCount > 9 ? "9+" : savedCount}
                    </span>
                )}
            </Link>
        </nav>
    );
}
