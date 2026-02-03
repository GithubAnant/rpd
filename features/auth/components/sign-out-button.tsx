"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { LogoutIcon } from "@/components/ui/icons";

/**
 * Sign out button - only shown for authenticated users, not guests
 */
export function SignOutButton() {
    const router = useRouter();

    const handleSignOut = useCallback(async () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("guestMode");
        }
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                },
            },
        });
    }, [router]);

    return (
        <button
            onClick={handleSignOut}
            className="flex items-center gap-5 px-3 py-3 rounded-full hover-bg transition-colors w-full text-left"
        >
            <LogoutIcon className="text-[#e7e9ea]" />
            <span className="text-xl text-[#e7e9ea]">Sign out</span>
        </button>
    );
}
