'use client';

import { memo, useState, useCallback } from 'react';
import Link from 'next/link';
import { Paper } from '@/types/paper';
import { PaperCardVisual } from './paper-card-visual';
import { PaperActions } from './paper-actions';
import { formatDate, formatAuthors } from '@/lib/format';

interface PaperCardProps {
    paper: Paper;
    isSaved: boolean;
    onToggleSave: (id: string, thumbnail?: string) => void;
}

export const PaperCard = memo(function PaperCard({ paper, isSaved, onToggleSave }: PaperCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    }, [isExpanded]);

    const paperUrl = paper.thumbnail
        ? `/paper/${paper.id}?thumbnail=${encodeURIComponent(paper.thumbnail)}`
        : `/paper/${paper.id}`;

    return (
        <article className="border-b border-[#2f3336] hover:bg-neutral-900/30 transition-colors">
            <Link href={paperUrl} className="block px-4 py-4">
                {/* Header row */}
                <div className="flex items-start gap-3">
                    {/* Category avatar */}
                    <div className="w-10 h-10 rounded-full bg-[#16181c] flex items-center justify-center shrink-0 text-(--color-accent) font-bold text-sm">
                        {paper.primaryCategory.split('.')[1]?.toUpperCase().slice(0, 2) || 'AI'}
                    </div>

                    <div className="flex-1 min-w-0">
                        {/* Author line */}
                        <div className="flex items-center gap-1 text-[15px]">
                            <span className="font-bold text-[#e7e9ea] truncate max-w-[60%]">
                                {formatAuthors(paper.authors)}
                            </span>
                            <span className="text-[#71767b] shrink-0">·</span>
                            <span className="text-[#71767b] shrink-0 whitespace-nowrap">{formatDate(paper.publishedDate)}</span>
                        </div>

                        {/* Title */}
                        <h2 className={`mt-1 text-[15px] text-[#e7e9ea] leading-snug ${isExpanded ? '' : 'line-clamp-2'}`}>
                            {paper.title}
                        </h2>

                        {/* Visual Cover */}
                        <div className="mt-3">
                            <PaperCardVisual
                                thumbnail={paper.thumbnail}
                                category={paper.primaryCategory}
                                title={paper.title}
                            />
                        </div>

                        {/* Abstract */}
                        <p
                            className={`mt-2 text-[15px] text-[#71767b] leading-normal ${isExpanded ? '' : 'line-clamp-3'}`}
                            onClick={handleExpand}
                        >
                            {paper.abstract}
                        </p>

                        {!isExpanded && paper.abstract.length > 200 && (
                            <button
                                onClick={handleExpand}
                                className="text-(--color-accent) text-[15px] mt-1 hover:underline"
                            >
                                Show more
                            </button>
                        )}

                        {/* Action buttons */}
                        <PaperActions paper={paper} isSaved={isSaved} onToggleSave={onToggleSave} />
                    </div>
                </div>
            </Link>
        </article>
    );
});
