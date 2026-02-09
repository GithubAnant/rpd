"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

interface PaperCardVisualProps {
    thumbnail?: string;
    category: string;
    title: string;
}

const CATEGORY_IMAGES: Record<string, string> = {
    "cs.AI": "/categories/ai.png",
    "cs.LG": "/categories/ml.png",
    "cs.CL": "/categories/cl.png",
    "cs.CV": "/categories/cv.png",
    "cs.RO": "/categories/ro.png",
    physics: "/categories/physics.png",
    math: "/categories/math.png",
};

export function PaperCardVisual({ thumbnail, category, title }: PaperCardVisualProps) {
    const [imageError, setImageError] = useState(false);

    // Select category image
    const categoryImage = useMemo(() => {
        const catKey = Object.keys(CATEGORY_IMAGES).find(k => category.includes(k)) || "cs.AI";
        return CATEGORY_IMAGES[catKey] || "/categories/ai.png";
    }, [category]);

    if (thumbnail && !imageError) {
        return (
            <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-3 border border-[#2f3336]">
                <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    onError={() => setImageError(true)}
                />
            </div>
        );
    }

    // Fallback Category Image Visual
    return (
        <div className="w-full aspect-video rounded-xl mb-3 border border-[#2f3336] relative overflow-hidden group">
            <Image
                src={categoryImage}
                alt={category}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
            />

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Category badge integrated into visual */}
            <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-white text-xs font-bold border border-white/10 z-10">
                {category}
            </div>
        </div>
    );
}
