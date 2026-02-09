"use client";

import { useEffect, useState } from "react";
import { Paper } from "@/types/paper";
import { PaperCard } from "@/components/paper/paper-card";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { useSavedPapers } from "@/hooks/useSavedPapers";
import { Sidebar, MobileHeader, MobileBottomNav } from "@/components/layout";

export default function SavedPage() {
    const { savedPapers, isSaved, toggleSave } = useSavedPapers();
    const [papers, setPapers] = useState<Paper[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSavedPapers = async () => {
            if (savedPapers.size === 0) {
                setPapers([]);
                setIsLoading(false);
                return;
            }

            try {
                const results = await Promise.all(
                    Array.from(savedPapers.values()).map(async (savedMeta) => {
                        const res = await fetch(`/api/paper/${savedMeta.id}`);
                        if (!res.ok) return null;
                        const paper = await res.json() as Paper;
                        // Use stored thumbnail if available
                        if (savedMeta.thumbnail && !paper.thumbnail) {
                            paper.thumbnail = savedMeta.thumbnail;
                        }
                        return paper;
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
    }, [savedPapers]);

    return (
        <div className="min-h-screen bg-black flex">
            <Sidebar savedCount={savedPapers.size} />

            <main className="flex-1 min-w-0 border-r border-[#2f3336] max-w-150">
                <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#2f3336]">
                    <MobileHeader />
                    <div className="hidden lg:flex items-center px-4 py-3">
                        <h1 className="text-xl font-bold text-[#e7e9ea]">Bookmarks</h1>
                    </div>
                </header>

                <div className="border-x border-[#2f3336] min-h-screen">
                    {isLoading && (
                        <div className="p-4 space-y-4">
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
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

            {/* Right sidebar shim to keep layout centered/consistent if needed, or just leave empty */}
            <aside className="hidden xl:block w-87.5 px-6" />

            <MobileBottomNav savedCount={savedPapers.size} />
        </div>
    );
}
