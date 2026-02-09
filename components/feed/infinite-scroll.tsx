'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { Paper, PapersResponse } from '@/types/paper';
import { PaperCard } from '@/components/paper/paper-card';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { useSavedPapers } from '@/hooks/useSavedPapers';

interface InfiniteScrollProps {
    initialCategory?: string;
    searchQuery?: string;
}

export function InfiniteScroll({ initialCategory = 'cs.AI', searchQuery }: InfiniteScrollProps) {
    const [papers, setPapers] = useState<Paper[]>([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [category] = useState(initialCategory);

    const { isSaved, toggleSave } = useSavedPapers();
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const isLoadingRef = useRef(false);

    const fetchPapers = useCallback(async (pageNum: number) => {
        if (isLoadingRef.current || !hasMore) return;

        isLoadingRef.current = true;
        setIsLoading(true);
        setError(null);

        try {
            let endpoint: string;

            if (searchQuery) {
                // Search mode
                endpoint = `/api/search?q=${encodeURIComponent(searchQuery)}&page=${pageNum}`;
            } else if (category === 'trending') {
                endpoint = '/api/trending';
            } else {
                endpoint = `/api/papers?page=${pageNum}&category=${category}`;
            }

            const res = await fetch(endpoint);

            if (!res.ok) {
                throw new Error('Failed to fetch papers');
            }

            const data: PapersResponse = await res.json();

            setPapers((prev) => {
                // Deduplicate papers by ID
                const existingIds = new Set(prev.map((p) => p.id));
                const newPapers = data.papers.filter((p) => !existingIds.has(p.id));
                return [...prev, ...newPapers];
            });

            setHasMore(data.hasMore);
            setPage(pageNum);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
            isLoadingRef.current = false;
        }
    }, [category, hasMore, searchQuery]);

    // Intersection Observer for infinite scroll
    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoadingRef.current && hasMore) {
                    fetchPapers(page + 1);
                }
            },
            { rootMargin: '200px', threshold: 0 }
        );

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current);
        }

        return () => observerRef.current?.disconnect();
    }, [fetchPapers, page, hasMore]);

    // Initial load
    useEffect(() => {
        fetchPapers(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen">

            {/* Papers feed */}
            <div className="flex flex-col">
                {papers.map((paper) => (
                    <PaperCard
                        key={paper.id}
                        paper={paper}
                        isSaved={isSaved(paper.id)}
                        onToggleSave={toggleSave}
                    />
                ))}

                {/* Loading skeletons */}
                {isLoading && (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                )}

                {/* Error state */}
                {error && (
                    <div className="text-center py-8 px-4">
                        <p className="text-red-400 mb-4">{error}</p>
                        <button
                            onClick={() => fetchPapers(page)}
                            className="px-6 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-full text-sm font-medium transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Load more trigger */}
                <div ref={loadMoreRef} className="h-4" />

                {/* End of feed */}
                {!hasMore && papers.length > 0 && (
                    <p className="text-center text-zinc-500 py-8 text-sm px-4">
                        You&apos;ve reached the end! 🎉
                    </p>
                )}

                {/* Empty state */}
                {!isLoading && !error && papers.length === 0 && (
                    <div className="text-center py-16 px-4">
                        <p className="text-zinc-400 text-lg mb-2">No papers found</p>
                        <p className="text-zinc-500 text-sm">Try refreshing the page</p>
                    </div>
                )}
            </div>
        </div>
    );
}
