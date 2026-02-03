"use client";

import { signIn } from "@/lib/auth-client";
import { useCallback } from "react";
import { GoogleIcon } from "@/components/ui/icons";

/**
 * Google sign-in button
 */
export function SignInButton() {
    const handleSignIn = useCallback(async () => {
        await signIn.social({
            provider: "google",
            callbackURL: "/home",
        });
    }, []);

    return (
        <button
            onClick={handleSignIn}
            className="flex items-center justify-center gap-3 w-full py-3 bg-white hover:bg-gray-100 text-black font-bold rounded-full transition-colors text-[15px]"
        >
            <GoogleIcon />
            <span>Sign up with Google</span>
        </button>
    );
}
