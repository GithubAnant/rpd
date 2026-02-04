import Image from "next/image";
import { useMemo } from "react";

interface PaperCardVisualProps {
    thumbnail?: string;
    category: string;
    title: string;
}

const CATEGORY_COLORS: Record<string, [string, string]> = {
    "cs.AI": ["#3b82f6", "#8b5cf6"], // Blue -> Purple
    "cs.LG": ["#10b981", "#3b82f6"], // Emerald -> Blue
    "cs.CL": ["#f59e0b", "#ef4444"], // Amber -> Red
    "cs.CV": ["#ec4899", "#8b5cf6"], // Pink -> Purple
    "cs.RO": ["#f97316", "#db2777"], // Orange -> Pink
    physics: ["#0ea5e9", "#1e40af"], // Sky -> Dark Blue
    math: ["#84cc16", "#15803d"],   // Lime -> Green
};

export function PaperCardVisual({ thumbnail, category, title }: PaperCardVisualProps) {
    // Deterministic gradient fallback
    const gradient = useMemo(() => {
        // defaults
        let start = "#6366f1";
        let end = "#a855f7";

        // Try to find a matching color key
        const catKey = Object.keys(CATEGORY_COLORS).find(k => category.includes(k)) || "cs.AI";
        if (CATEGORY_COLORS[catKey]) {
            [start, end] = CATEGORY_COLORS[catKey];
        }

        // Slight randomization based on title char code sum to vary the angle/shade
        const hash = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const angle = hash % 360;

        return `linear-gradient(${angle}deg, ${start}, ${end})`;
    }, [category, title]);

    if (thumbnail) {
        return (
            <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-3 border border-[#2f3336]">
                <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>
        );
    }

    // Fallback Gradient Visual
    return (
        <div
            className="w-full aspect-video rounded-xl mb-3 border border-[#2f3336] relative overflow-hidden group"
            style={{ background: gradient }}
        >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
            {/* Abstract Pattern Overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay" />

            {/* Category badge integrated into visual */}
            <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/40 backdrop-blur-md rounded-md text-white text-xs font-bold border border-white/10">
                {category}
            </div>
        </div>
    );
}
