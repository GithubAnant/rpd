"use client";

import { useEffect, useState } from "react";
import { Paper } from "@/types/paper";
import { PaperCard } from "@/components/PaperCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useSavedPapers } from "@/hooks/useSavedPapers";
import { PageHeader } from "@/components/ui/page-header";

export default function SavedPage() {
    const { savedIds, isSaved, toggleSave, isLoaded } = useSavedPapers();
    const [papers, setPapers] = useState<Paper[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isLoaded) return;

        const fetchSavedPapers = async () => {
            if (savedIds.size === 0) {
                setPapers([]);
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const results = await Promise.all(
                    Array.from(savedIds).map(async (id) => {
                        const res = await fetch(`/api/paper/${id}`);
                        if (!res.ok) return null;
                        return res.json() as Promise<Paper>;
                    })
                );
                setPapers(results.filter((p): p is Paper => p !== null));
            } catch {
                console.error("Failed to load saved papers");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSavedPapers();
    }, [savedIds, isLoaded]);

    return (
        <main className="min-h-screen bg-black">
            <PageHeader title="Bookmarks" subtitle={`${savedIds.size} Papers`} />

            {/* Content */}
            <div className="max-w-150 mx-auto border-x border-[#2f3336] min-h-screen">
                {isLoading && (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                )}

                {!isLoading && papers.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
                        <h2 className="text-[31px] font-bold text-[#e7e9ea] mb-2">
                            Save Papers for later
                        </h2>
                        <p className="text-[15px] text-[#71767b] max-w-[320px]">
                            Bookmark Papers to easily find them again in the future.
                        </p>
                    </div>
                )}

                {!isLoading &&
                    papers.length > 0 &&
                    papers.map((paper) => (
                        <PaperCard
                            key={paper.id}
                            paper={paper}
                            isSaved={isSaved(paper.id)}
                            onToggleSave={toggleSave}
                        />
                    ))}
            </div>
        </main>
    );
}
