'use client';

import { useCallback } from 'react';
import { Paper } from '@/types/paper';
import { ShareMenu } from './share-menu';
import { useLikedPapers } from '@/hooks/useLikedPapers';

interface PaperActionsProps {
    paper: Paper;
    isSaved: boolean;
    onToggleSave: (id: string, thumbnail?: string) => void;
}

export function PaperActions({ paper, isSaved, onToggleSave }: PaperActionsProps) {
    const { isLiked, toggleLike } = useLikedPapers();
    const liked = isLiked(paper.id);

    const handleSave = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onToggleSave(paper.id, paper.thumbnail);
    }, [paper.id, paper.thumbnail, onToggleSave]);

    const handleLike = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleLike(paper.id);
    }, [paper.id, toggleLike]);

    return (
        <div className="flex items-center justify-between mt-3 max-w-106.25 relative">
            {/* PDF link */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(paper.pdfUrl, '_blank', 'noopener,noreferrer');
                }}
                title="Download PDF"
                className="flex items-center gap-2 text-[#71767b] hover:text-[#00ba7c] transition-colors group"
            >
                <div className="p-2 rounded-full group-hover:bg-[#00ba7c]/10 flex items-center gap-1">
                    <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium">PDF</span>
                </div>
            </button>

            {/* Like */}
            <button
                onClick={handleLike}
                title={liked ? "Unlike" : "Like"}
                className={`flex items-center gap-2 transition-colors group ${liked ? 'text-[#f91880]' : 'text-[#71767b] hover:text-[#f91880]'}`}
            >
                <div className={`p-2 rounded-full ${liked ? 'bg-[#f91880]/10' : 'group-hover:bg-[#f91880]/10'}`}>
                    <svg className="w-4.5 h-4.5" fill={liked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
            </button>

            {/* Bookmark/Save */}
            <button
                onClick={handleSave}
                title={isSaved ? "Remove bookmark" : "Bookmark"}
                className={`flex items-center gap-2 transition-colors group ${isSaved ? 'text-(--color-accent)' : 'text-[#71767b] hover:text-(--color-accent)'}`}
            >
                <div className={`p-2 rounded-full ${isSaved ? 'bg-accent/10' : 'group-hover:bg-accent/10'}`}>
                    <svg className="w-4.5 h-4.5" fill={isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                </div>
            </button>

            {/* Share */}
            <ShareMenu paper={paper}>
                <button
                    title="Share"
                    className="flex items-center gap-2 text-[#71767b] hover:text-(--color-accent) transition-colors group"
                >
                    <div className="p-2 rounded-full group-hover:bg-accent/10">
                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                    </div>
                </button>
            </ShareMenu>
        </div>
    );
}
