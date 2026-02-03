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
 * ArXiv X Logo - the distinctive X with one solid and one outlined stroke
 */
export function ArxivLogo({ className = "", size = "md" }: ArxivLogoProps) {
    return (
        <svg
            className={`${sizeClasses[size]} ${className}`}
            viewBox="0 0 100 100"
            fill="none"
        >
            {/* Solid stroke */}
            <line
                x1="75"
                y1="15"
                x2="25"
                y2="85"
                stroke="currentColor"
                strokeWidth="14"
                strokeLinecap="round"
            />
            {/* Outlined stroke - outer */}
            <line
                x1="25"
                y1="15"
                x2="75"
                y2="85"
                stroke="currentColor"
                strokeWidth="14"
                strokeLinecap="round"
            />
            {/* Outlined stroke - inner (creates the outline effect) */}
            <line
                x1="25"
                y1="15"
                x2="75"
                y2="85"
                stroke="black"
                strokeWidth="8"
                strokeLinecap="round"
            />
        </svg>
    );
}
