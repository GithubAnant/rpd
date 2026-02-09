import Image from "next/image";

interface ArxivLogoProps {
    className?: string;
    size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

/**
 * Xapers Logo - The app's main logo
 */
export function ArxivLogo({ className = "", size = "md" }: ArxivLogoProps) {
    let dim = 32;
    switch (size) {
        case "sm": dim = 24; break;
        case "md": dim = 32; break;
        case "lg": dim = 48; break;
        case "xl": dim = 320; break;
        case "2xl": dim = 500; break;
        default: dim = 32;
    }

    return (
        <Image
            src="/icon-512.png"
            alt="Xapers Logo"
            width={dim}
            height={dim}
            className={className}
        />
    );
}
