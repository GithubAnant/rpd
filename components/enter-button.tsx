"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function EnterButton() {
    const router = useRouter();

    const handleEnter = useCallback(() => {
        // Set cookie to remember user has visited
        document.cookie = "visited=true; path=/; max-age=31536000"; // 1 year
        router.push("/home");
    }, [router]);

    return (
        <button
            onClick={handleEnter}
            className="bg-white text-black hover:bg-neutral-200 transition-colors duration-200 font-bold rounded-full h-14 text-[15px] w-full"
        >
            Enter
        </button>
    );
}
