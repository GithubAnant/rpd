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
 * Pin Logo - A thumbtack/pin icon representing saved/pinned papers
 */
export function ArxivLogo({ className = "", size = "md" }: ArxivLogoProps) {
    return (
        <svg
            className={`${sizeClasses[size]} ${className}`}
            viewBox="0 0 100 100"
            fill="none"
        >
            {/* Pin head (top diamond shape) */}
            <path
                d="M50 10L68.75 43.75L50 87.5L31.25 43.75L50 10Z"
                fill="currentColor"
            />
            {/* Pin point (circle at bottom) */}
            <circle cx="50" cy="87.5" r="7" fill="currentColor" />
        </svg>
    );
}
