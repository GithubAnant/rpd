'use client';

import { memo, useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import { Paper } from '@/types/paper';
import { PaperCardVisual } from './paper-card-visual';
import { ShareMenu } from './ShareMenu';

interface PaperCardProps {
    paper: Paper;
    isSaved: boolean;
    onToggleSave: (id: string) => void;
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return 'now';
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatAuthors(authors: string[]): string {
    if (authors.length === 0) return '';
    if (authors.length <= 3) return authors.join(', ');
    return `${authors.slice(0, 3).join(', ')} et al.`;
}

export const PaperCard = memo(function PaperCard({ paper, isSaved, onToggleSave }: PaperCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
    const shareButtonRef = useRef<HTMLButtonElement>(null!);

    const handleSave = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleSave(paper.id);
    }, [paper.id, onToggleSave]);

    const handleShare = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsShareMenuOpen(!isShareMenuOpen);
    }, [isShareMenuOpen]);

    const handleExpand = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    }, [isExpanded]);

    return (
        <article className="border-b border-[#2f3336] hover:bg-neutral-900/30 transition-colors">
            <Link href={`/paper/${paper.id}`} className="block px-4 py-4">
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
                        <div className="flex items-center justify-between mt-3 max-w-106.25 relative">
                            {/* Share */}
                            <button
                                ref={shareButtonRef}
                                onClick={handleShare}
                                className="flex items-center gap-2 text-[#71767b] hover:text-(--color-accent) transition-colors group"
                            >
                                <div className="p-2 rounded-full group-hover:bg-accent/10">
                                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                </div>
                            </button>

                            <ShareMenu
                                paper={paper}
                                isOpen={isShareMenuOpen}
                                onClose={() => setIsShareMenuOpen(false)}
                                buttonRef={shareButtonRef}
                            />

                            {/* Bookmark/Save */}
                            <button
                                onClick={handleSave}
                                className={`flex items-center gap-2 transition-colors group ${isSaved ? 'text-(--color-accent)' : 'text-[#71767b] hover:text-(--color-accent)'}`}
                            >
                                <div className={`p-2 rounded-full ${isSaved ? 'bg-accent/10' : 'group-hover:bg-accent/10'}`}>
                                    <svg className="w-4.5 h-4.5" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                </div>
                            </button>

                            {/* PDF link */}
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(paper.pdfUrl, '_blank', 'noopener,noreferrer');
                                }}
                                className="flex items-center gap-2 text-[#71767b] hover:text-[#00ba7c] transition-colors group"
                            >
                                <div className="p-2 rounded-full group-hover:bg-[#00ba7c]/10">
                                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <span className="text-[13px]">PDF</span>
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
});
