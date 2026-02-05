"use client";

import { useCallback } from "react";
import { Paper } from "@/types/paper";
import { useSavedPapers } from "@/hooks/useSavedPapers";
import { PageHeader } from "@/components/ui/page-header";
import {
    CommentIcon,
    ShareIcon,
    BookmarkIcon,
    DownloadIcon,
} from "@/components/ui/icons";

interface PaperPageClientProps {
    paper: Paper;
}

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
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
            <PageHeader title="Paper" />

            {/* Paper content */}
            <article className="max-w-[600px] mx-auto border-x border-[#2f3336]">
                <div className="px-4 py-3">
                    {/* Author info */}
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#16181c] flex items-center justify-center shrink-0 text-[#1d9bf0] font-bold text-sm">
                            {paper.primaryCategory.split(".")[1]?.toUpperCase().slice(0, 2) ||
                                "AI"}
                        </div>
                        <div>
                            <p className="font-bold text-[15px] text-[#e7e9ea]">
                                {paper.authors[0]}
                            </p>

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

                    {/* Engagement stats */}
                    <div className="flex items-center gap-4 py-4 mt-3 border-t border-b border-[#2f3336] text-[15px]">
                        <span className="text-[#71767b]">
                            <span className="font-bold text-[#e7e9ea]">
                                {paper.authors.length}
                            </span>{" "}
                            Authors
                        </span>
                        <span className="text-[#71767b]">
                            <span className="font-bold text-[#e7e9ea]">
                                {paper.categories.length}
                            </span>{" "}
                            Categories
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-around py-2 border-b border-[#2f3336]">
                        <button className="p-3 text-[#71767b] hover:text-[#1d9bf0] rounded-full hover-bg transition-colors">
                            <CommentIcon className="w-[22px] h-[22px]" />
                        </button>

                        <button
                            onClick={handleShare}
                            className="p-3 text-[#71767b] hover:text-[#1d9bf0] rounded-full hover-bg transition-colors"
                        >
                            <ShareIcon className="w-[22px] h-[22px]" />
                        </button>

                        <button
                            onClick={() => toggleSave(paper.id)}
                            className={`p-3 rounded-full hover-bg transition-colors ${saved
                                ? "text-[#1d9bf0]"
                                : "text-[#71767b] hover:text-[#1d9bf0]"
                                }`}
                        >
                            <BookmarkIcon className="w-[22px] h-[22px]" fill={saved} />
                        </button>
                    </div>

                    {/* Authors list */}
                    <div className="py-4">
                        <h3 className="text-[15px] font-bold text-[#e7e9ea] mb-3">
                            Authors
                        </h3>
                        <div className="space-y-2">
                            {paper.authors.map((author, i) => (
                                <p key={i} className="text-[15px] text-[#71767b]">
                                    {author}
                                </p>
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
                            <DownloadIcon className="w-5 h-5" />
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
