'use client';

import { memo, useState, useCallback, useRef, TouchEvent } from 'react';
import Link from 'next/link';
import { Paper } from '@/types/paper';

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
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return authors.join(' and ');
    return `${authors[0]} et al.`;
}

export const PaperCard = memo(function PaperCard({ paper, isSaved, onToggleSave }: PaperCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSave = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleSave(paper.id);
    }, [paper.id, onToggleSave]);

    const handleShare = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const url = `${window.location.origin}/paper/${paper.id}`;
        if (navigator.share) {
            navigator.share({ title: paper.title, url });
        } else {
            navigator.clipboard.writeText(url);
        }
    }, [paper.id, paper.title]);

    const handleExpand = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    }, [isExpanded]);

    return (
        <article className="border-b border-[#2f3336] hover-bg transition-colors">
            <Link href={`/paper/${paper.id}`} className="block px-4 py-3">
                {/* Header row */}
                <div className="flex items-start gap-3">
                    {/* Category avatar */}
                    <div className="w-10 h-10 rounded-full bg-[#16181c] flex items-center justify-center flex-shrink-0 text-[var(--color-accent)] font-bold text-sm">
                        {paper.primaryCategory.split('.')[1]?.toUpperCase().slice(0, 2) || 'AI'}
                    </div>

                    <div className="flex-1 min-w-0">
                        {/* Author line */}
                        <div className="flex items-center gap-1 text-[15px]">
                            <span className="font-bold text-[#e7e9ea] truncate">
                                {formatAuthors(paper.authors)}
                            </span>
                            <span className="text-[#71767b]">·</span>
                            <span className="text-[#71767b]">{formatDate(paper.publishedDate)}</span>
                        </div>

                        {/* Category tag */}
                        <span className="text-[13px] text-[#71767b]">
                            {paper.primaryCategory}
                        </span>

                        {/* Title */}
                        <h2 className={`mt-1 text-[15px] text-[#e7e9ea] leading-snug ${isExpanded ? '' : 'line-clamp-2'}`}>
                            {paper.title}
                        </h2>

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
                                className="text-[var(--color-accent)] text-[15px] mt-1 hover:underline"
                            >
                                Show more
                            </button>
                        )}

                        {/* Action buttons */}
                        <div className="flex items-center justify-between mt-3 max-w-[425px]">
                            {/* Reply/comments placeholder */}
                            <button className="flex items-center gap-2 text-[#71767b] hover:text-[var(--color-accent)] transition-colors group">
                                <div className="p-2 rounded-full group-hover:bg-[var(--color-accent)]/10">
                                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                            </button>

                            {/* Share */}
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 text-[#71767b] hover:text-[var(--color-accent)] transition-colors group"
                            >
                                <div className="p-2 rounded-full group-hover:bg-[var(--color-accent)]/10">
                                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                </div>
                            </button>

                            {/* Bookmark/Save */}
                            <button
                                onClick={handleSave}
                                className={`flex items-center gap-2 transition-colors group ${isSaved ? 'text-[var(--color-accent)]' : 'text-[#71767b] hover:text-[var(--color-accent)]'}`}
                            >
                                <div className={`p-2 rounded-full ${isSaved ? 'bg-[var(--color-accent)]/10' : 'group-hover:bg-[var(--color-accent)]/10'}`}>
                                    <svg className="w-[18px] h-[18px]" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                </div>
                            </button>

                            {/* PDF link */}
                            <a
                                href={paper.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-2 text-[#71767b] hover:text-[#00ba7c] transition-colors group"
                            >
                                <div className="p-2 rounded-full group-hover:bg-[#00ba7c]/10">
                                    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <span className="text-[13px]">PDF</span>
                            </a>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
});
