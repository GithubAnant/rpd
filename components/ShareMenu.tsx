'use client';

import { useState } from 'react';
import { Paper } from '@/types/paper';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Link2, ExternalLink, FileText, Code, Share2 } from 'lucide-react';

interface ShareMenuProps {
    paper: Paper;
    children: React.ReactNode;
}

export function ShareMenu({ paper, children }: ShareMenuProps) {
    const [copiedItem, setCopiedItem] = useState<string | null>(null);

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedItem(label);
        setTimeout(() => {
            setCopiedItem(null);
        }, 1500);
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Dispatch a synthetic contextmenu event at the click location
        // This makes the context menu use its native positioning logic
        const contextMenuEvent = new MouseEvent('contextmenu', {
            bubbles: true,
            cancelable: true,
            clientX: e.clientX,
            clientY: e.clientY,
            button: 2
        });
        e.currentTarget.dispatchEvent(contextMenuEvent);
    };

    const siteUrl = typeof window !== 'undefined' ? `${window.location.origin}/paper/${paper.id}` : '';
    const embedCode = `<iframe src="${siteUrl}" width="100%" height="600" frameborder="0"></iframe>`;

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild onClick={handleClick}>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
                <ContextMenuItem onClick={() => handleCopy(siteUrl, 'site')}>
                    <Link2 />
                    <span>{copiedItem === 'site' ? 'Copied!' : 'Copy link to paper'}</span>
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleCopy(paper.arxivUrl, 'arxiv')}>
                    <ExternalLink />
                    <span>{copiedItem === 'arxiv' ? 'Copied!' : 'Copy arXiv link'}</span>
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleCopy(paper.pdfUrl, 'pdf')}>
                    <FileText />
                    <span>{copiedItem === 'pdf' ? 'Copied!' : 'Copy PDF link'}</span>
                </ContextMenuItem>
                <ContextMenuItem onClick={() => handleCopy(embedCode, 'embed')}>
                    <Code />
                    <span>{copiedItem === 'embed' ? 'Copied!' : 'Copy embed code'}</span>
                </ContextMenuItem>
                {typeof navigator !== 'undefined' && navigator.share && (
                    <>
                        <ContextMenuSeparator />
                        <ContextMenuItem onClick={() => navigator.share({ title: paper.title, url: siteUrl })}>
                            <Share2 />
                            <span>Share via...</span>
                        </ContextMenuItem>
                    </>
                )}
            </ContextMenuContent>
        </ContextMenu>
    );
}
