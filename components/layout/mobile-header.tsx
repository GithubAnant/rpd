"use client";

import { useState, useEffect } from "react";
import { ArxivLogo } from "@/components/ui/arxiv-logo";
import { InstallButton } from "@/components/install-button";

interface MobileHeaderProps {
    userName?: string | null;
    userImage?: string | null;
    isGuest: boolean;
}

/**
 * Mobile header with profile pic, logo, and bookmarks link
 */
export function MobileHeader({ }: Omit<MobileHeaderProps, "userName" | "userImage" | "isGuest">) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="flex items-center justify-between px-4 py-3 lg:hidden">
            {/* Logo */}
            <ArxivLogo size="lg" className="text-[#e7e9ea]" />

            {/* Install Button (Top Right) */}
            <InstallButton variant="mobile" />
        </div>
    );
}
