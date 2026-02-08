import Link from "next/link";

interface BackArrowIconProps {
    className?: string;
}

export function BackArrowIcon({ className = "" }: BackArrowIconProps) {
    return (
        <svg
            className={`w-5 h-5 ${className}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
        </svg>
    );
}

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    backHref?: string;
}

/**
 * Reusable page header with back button and title
 */
export function PageHeader({
    title,
    subtitle,
    backHref = "/home",
}: PageHeaderProps) {
    return (
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#2f3336]">
            <div className="flex items-center gap-8 px-4 py-2 max-w-150 mx-auto">
                <Link
                    href={backHref}
                    className="p-2 -ml-2 rounded-full hover-bg transition-colors"
                >
                    <BackArrowIcon className="text-[#e7e9ea]" />
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-[#e7e9ea]">{title}</h1>
                    {subtitle && (
                        <p className="text-[13px] text-[#71767b]">{subtitle}</p>
                    )}
                </div>
            </div>
        </header>
    );
}
