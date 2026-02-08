'use client';

import { useEffect, useRef, useState } from 'react';
import { Paper } from '@/types/paper';

interface ShareMenuProps {
    paper: Paper;
    isOpen: boolean;
    onClose: () => void;
    buttonRef: React.RefObject<HTMLButtonElement>;
}

export function ShareMenu({ paper, isOpen, onClose, buttonRef }: ShareMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [copiedItem, setCopiedItem] = useState<string | null>(null);

    // Close menu when clicking outside
    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(e.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose, buttonRef]);

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedItem(label);
        setTimeout(() => {
            setCopiedItem(null);
            onClose();
        }, 1500);
    };

    if (!isOpen) return null;

    const siteUrl = `${window.location.origin}/paper/${paper.id}`;
    const embedCode = `<iframe src="${siteUrl}" width="100%" height="600" frameborder="0"></iframe>`;

    return (
        <div
            ref={menuRef}
            className="absolute bottom-full right-0 mb-2 w-64 bg-[#16181c] rounded-xl shadow-xl border border-[#2f3336] overflow-hidden z-50"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="py-2">
                {/* Copy paper link */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleCopy(siteUrl, 'site');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#1e2125] transition-colors flex items-center gap-3"
                >
                    <svg className="w-5 h-5 text-[#71767b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <div className="flex-1">
                        <p className="text-[15px] text-[#e7e9ea]">
                            {copiedItem === 'site' ? 'Copied!' : 'Copy link to paper'}
                        </p>
                        <p className="text-[13px] text-[#71767b]">Share this page</p>
                    </div>
                </button>

                {/* Copy arXiv link */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleCopy(paper.arxivUrl, 'arxiv');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#1e2125] transition-colors flex items-center gap-3"
                >
                    <svg className="w-5 h-5 text-[#71767b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <div className="flex-1">
                        <p className="text-[15px] text-[#e7e9ea]">
                            {copiedItem === 'arxiv' ? 'Copied!' : 'Copy arXiv link'}
                        </p>
                        <p className="text-[13px] text-[#71767b]">Original source</p>
                    </div>
                </button>

                {/* Copy PDF link */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleCopy(paper.pdfUrl, 'pdf');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#1e2125] transition-colors flex items-center gap-3"
                >
                    <svg className="w-5 h-5 text-[#71767b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div className="flex-1">
                        <p className="text-[15px] text-[#e7e9ea]">
                            {copiedItem === 'pdf' ? 'Copied!' : 'Copy PDF link'}
                        </p>
                        <p className="text-[13px] text-[#71767b]">Direct PDF link</p>
                    </div>
                </button>

                {/* Copy embed code */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleCopy(embedCode, 'embed');
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-[#1e2125] transition-colors flex items-center gap-3"
                >
                    <svg className="w-5 h-5 text-[#71767b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                    <div className="flex-1">
                        <p className="text-[15px] text-[#e7e9ea]">
                            {copiedItem === 'embed' ? 'Copied!' : 'Copy embed code'}
                        </p>
                        <p className="text-[13px] text-[#71767b]">Embed in website</p>
                    </div>
                </button>

                {/* Native share (if available) */}
                {typeof navigator !== 'undefined' && navigator.share && (
                    <>
                        <div className="border-t border-[#2f3336] my-2" />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                navigator.share({ title: paper.title, url: siteUrl });
                                onClose();
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-[#1e2125] transition-colors flex items-center gap-3"
                        >
                            <svg className="w-5 h-5 text-[#71767b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            <div className="flex-1">
                                <p className="text-[15px] text-[#e7e9ea]">Share via...</p>
                                <p className="text-[13px] text-[#71767b]">Use system share</p>
                            </div>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
