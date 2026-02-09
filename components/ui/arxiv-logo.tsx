import Image from "next/image";

interface ArxivLogoProps {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-80 h-80",
};

/**
 * Arxiv X Logo - The app's main logo
 */
export function ArxivLogo({ className = "", size = "md" }: ArxivLogoProps) {
    return (
        <Image
            src="/arxiv-x-logo.png"
            alt="Arxiv Logo"
            width={size === "sm" ? 24 : size === "md" ? 32 : size === "lg" ? 48 : 320}
            height={size === "sm" ? 24 : size === "md" ? 32 : size === "lg" ? 48 : 320}
            className={className}
        />
    );
}
