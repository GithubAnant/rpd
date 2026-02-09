"use client";

import { useInstallPrompt } from "@/hooks/use-install-prompt";
import { DownloadIcon } from "@/components/ui/icons";

interface InstallButtonProps {
    className?: string;
    variant?: "sidebar" | "mobile";
}

export function InstallButton({ className = "", variant = "sidebar" }: InstallButtonProps) {
    const { isInstallable, promptToInstall } = useInstallPrompt();

    if (!isInstallable) return null;

    if (variant === "sidebar") {
        return (
            <button
                onClick={promptToInstall}
                className={`flex items-center gap-5 px-3 py-3 rounded-full hover:bg-white/10 transition-colors text-[#e7e9ea] w-full ${className}`}
            >
                <DownloadIcon className="w-7 h-7" />
                <span className="text-xl">Install App</span>
            </button>
        );
    }

    return (
        <button
            onClick={promptToInstall}
            className={`flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors text-[#e7e9ea] ${className}`}
            title="Install App"
        >
            <DownloadIcon className="w-6 h-6" />
        </button>
    );
}
