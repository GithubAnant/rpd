"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Guest mode button - stores preference in localStorage and redirects to home
 */
export function GuestButton() {
    const router = useRouter();

    const handleGuest = useCallback(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("guestMode", "true");
        }
        router.push("/home");
    }, [router]);

    return (
        <button
            onClick={handleGuest}
            className="flex items-center justify-center w-full py-3 bg-transparent border border-[#536471] hover:bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold rounded-full transition-colors text-[15px]"
        >
            Continue as guest
        </button>
    );
}
