"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSavedPapers } from "@/hooks/useSavedPapers";

// Layout components
import { Sidebar, MobileHeader, MobileBottomNav } from "@/components/layout";

// Feature components
import { FeedTabs, SearchBox, TrendingTopics } from "@/features/feed";
import { InfiniteScroll } from "@/components/InfiniteScroll";

interface HomeClientProps {
    userName?: string | null;
    userImage?: string | null;
    isGuest: boolean;
    searchQuery?: string;
}

const TABS = [
    { id: "for-you", label: "For you", category: "trending" },
    { id: "ml", label: "ML", category: "cs.LG" },
    { id: "nlp", label: "NLP", category: "cs.CL" },
    { id: "cv", label: "Vision", category: "cs.CV" },
    { id: "robotics", label: "Robotics", category: "cs.RO" },
] as const;

export function HomeClient({ userName, userImage, isGuest, searchQuery }: HomeClientProps) {
    const [activeTab, setActiveTab] = useState<string>("for-you");
    const [refreshKey, setRefreshKey] = useState(0);
    const { savedPapers } = useSavedPapers();
    const router = useRouter();

    const activeCategory =
        TABS.find((t) => t.id === activeTab)?.category || "trending";

    const handleTabChange = useCallback((tabId: string) => {
        setActiveTab(tabId);
        setRefreshKey((k) => k + 1);
        // Clear search when switching tabs
        if (searchQuery) {
            router.push("/home");
        }
    }, [searchQuery, router]);

    const handleClearSearch = useCallback(() => {
        router.push("/home");
    }, [router]);

    // Determine if we're in search mode
    const isSearchMode = Boolean(searchQuery);

    return (
        <div className="min-h-screen bg-black flex">
            <Sidebar savedCount={savedPapers.size} />

            {/* Main content */}
            <main className="flex-1 min-w-0 border-r border-[#2f3336] max-w-150">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#2f3336]">
                    <MobileHeader
                        savedCount={savedPapers.size}
                    />

                    {/* Desktop title */}
                    <div className="hidden lg:flex items-center px-4 py-3">
                        <h1 className="text-xl font-bold text-[#e7e9ea]">
                            {isSearchMode ? "Search Results" : "Home"}
                        </h1>
                    </div>

                    {/* Show search info or tabs */}
                    {isSearchMode ? (
                        <div className="px-4 py-3 flex items-center justify-between border-b border-[#2f3336]">
                            <div className="flex items-center gap-2">
                                <span className="text-[#71767b] text-sm">Results for:</span>
                                <span className="text-[#e7e9ea] font-medium">&quot;{searchQuery}&quot;</span>
                            </div>
                            <button
                                onClick={handleClearSearch}
                                className="text-[#1d9bf0] text-sm hover:underline"
                            >
                                Clear search
                            </button>
                        </div>
                    ) : (
                        <FeedTabs
                            tabs={TABS}
                            activeTab={activeTab}
                            onTabChange={handleTabChange}
                        />
                    )}
                </header>

                {/* Feed */}
                <div className="feed-container">
                    <InfiniteScroll
                        key={isSearchMode ? `search-${searchQuery}` : `${activeCategory}-${refreshKey}`}
                        initialCategory={activeCategory}
                        searchQuery={searchQuery}
                    />
                </div>
            </main>

            {/* Right sidebar - hidden on mobile */}
            <aside className="hidden xl:block w-87.5 px-6">
                <div className="sticky top-4 pt-3 flex flex-col gap-4">
                    <SearchBox />
                    <TrendingTopics />
                </div>
            </aside>

            <MobileBottomNav
                savedCount={savedPapers.size}
            />
        </div>
    );
}

