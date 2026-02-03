'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { Paper } from '@/types/paper';
import { useSavedPapers } from '@/hooks/useSavedPapers';

interface PaperPageClientProps {
    paper: Paper;
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    });
}

export function PaperPageClient({ paper }: PaperPageClientProps) {
    const { isSaved, toggleSave } = useSavedPapers();
    const saved = isSaved(paper.id);

    const handleShare = useCallback(async () => {
        const url = `${window.location.origin}/paper/${paper.id}`;
        if (navigator.share) {
            await navigator.share({ title: paper.title, url });
        } else {
            await navigator.clipboard.writeText(url);
        }
    }, [paper.id, paper.title]);

    return (
        <main className="min-h-screen bg-black">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#2f3336]">
                <div className="flex items-center gap-8 px-4 py-2 max-w-[600px] mx-auto">
                    <Link
                        href="/home"
                        className="p-2 -ml-2 rounded-full hover-bg transition-colors"
                    >
                        <svg className="w-5 h-5 text-[#e7e9ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <h1 className="text-xl font-bold text-[#e7e9ea]">Paper</h1>
                </div>
            </header>

            {/* Paper content */}
            <article className="max-w-[600px] mx-auto border-x border-[#2f3336]">
                <div className="px-4 py-3">
                    {/* Author info */}
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#16181c] flex items-center justify-center flex-shrink-0 text-[#1d9bf0] font-bold text-sm">
                            {paper.primaryCategory.split('.')[1]?.toUpperCase().slice(0, 2) || 'AI'}
                        </div>
                        <div>
                            <p className="font-bold text-[15px] text-[#e7e9ea]">{paper.authors[0]}</p>
                            <p className="text-[15px] text-[#71767b]">{paper.primaryCategory}</p>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="mt-4 text-[17px] text-[#e7e9ea] leading-normal">
                        {paper.title}
                    </h2>

                    {/* Full abstract */}
                    <p className="mt-3 text-[15px] text-[#e7e9ea] leading-relaxed whitespace-pre-line">
                        {paper.abstract}
                    </p>

                    {/* Timestamp */}
                    <time className="block mt-4 text-[15px] text-[#71767b]">
                        {formatDate(paper.publishedDate)}
                    </time>

                    {/* Engagement stats placeholder */}
                    <div className="flex items-center gap-4 py-4 mt-3 border-t border-b border-[#2f3336] text-[15px]">
                        <span className="text-[#71767b]">
                            <span className="font-bold text-[#e7e9ea]">{paper.authors.length}</span> Authors
                        </span>
                        <span className="text-[#71767b]">
                            <span className="font-bold text-[#e7e9ea]">{paper.categories.length}</span> Categories
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-around py-2 border-b border-[#2f3336]">
                        <button className="p-3 text-[#71767b] hover:text-[#1d9bf0] rounded-full hover-bg transition-colors">
                            <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </button>

                        <button
                            onClick={handleShare}
                            className="p-3 text-[#71767b] hover:text-[#1d9bf0] rounded-full hover-bg transition-colors"
                        >
                            <svg className="w-[22px] h-[22px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </button>

                        <button
                            onClick={() => toggleSave(paper.id)}
                            className={`p-3 rounded-full hover-bg transition-colors ${saved ? 'text-[#1d9bf0]' : 'text-[#71767b] hover:text-[#1d9bf0]'}`}
                        >
                            <svg className="w-[22px] h-[22px]" fill={saved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                        </button>
                    </div>

                    {/* Authors list */}
                    <div className="py-4">
                        <h3 className="text-[15px] font-bold text-[#e7e9ea] mb-3">Authors</h3>
                        <div className="space-y-2">
                            {paper.authors.map((author, i) => (
                                <p key={i} className="text-[15px] text-[#71767b]">{author}</p>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="py-4 border-t border-[#2f3336]">
                        <h3 className="text-[15px] font-bold text-[#e7e9ea] mb-3">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                            {paper.categories.map((cat) => (
                                <span
                                    key={cat}
                                    className="px-3 py-1 text-[13px] bg-transparent border border-[#536471] text-[#71767b] rounded-full"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* External links */}
                    <div className="py-4 border-t border-[#2f3336] space-y-3">
                        <a
                            href={paper.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white font-bold rounded-full transition-colors text-[15px]"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download PDF
                        </a>
                        <a
                            href={paper.arxivUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 bg-transparent border border-[#536471] hover:bg-[#181818] text-[#e7e9ea] font-bold rounded-full transition-colors text-[15px]"
                        >
                            View on arXiv
                        </a>
                    </div>
                </div>
            </article>
        </main>
    );
}
