import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Paper } from '@/types/paper';
import { fetchPaperById } from '@/lib/arxiv';
import { PaperPageClient } from './PaperPageClient';

interface PaperPageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PaperPageProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const paper = await fetchPaperById(id);
        if (!paper) {
            return { title: 'Paper Not Found' };
        }

        return {
            title: `${paper.title} | Arxiv Doomscroller`,
            description: paper.abstract.slice(0, 160) + '...',
            openGraph: {
                title: paper.title,
                description: paper.abstract.slice(0, 160) + '...',
                type: 'article',
                authors: paper.authors,
            },
            twitter: {
                card: 'summary_large_image',
                title: paper.title,
                description: paper.abstract.slice(0, 160) + '...',
            },
        };
    } catch {
        return { title: 'Paper | Arxiv Doomscroller' };
    }
}

export default async function PaperPage({ params, searchParams }: PaperPageProps & { searchParams: Promise<{ thumbnail?: string }> }) {
    const { id } = await params;
    const { thumbnail } = await searchParams;

    let paper: Paper | null = null;

    try {
        paper = await fetchPaperById(id);
        // Use thumbnail from URL if available (from trending/home page)
        if (paper && thumbnail && !paper.thumbnail) {
            paper.thumbnail = thumbnail;
        }
    } catch (error) {
        console.error('Error fetching paper:', error);
    }

    if (!paper) {
        notFound();
    }

    return <PaperPageClient paper={paper} />;
}
