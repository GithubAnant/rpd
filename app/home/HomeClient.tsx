"use client";

import { useState, useCallback } from "react";
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
}

const TABS = [
    { id: "for-you", label: "For you", category: "cs.AI" },
    { id: "ml", label: "ML", category: "cs.LG" },
    { id: "nlp", label: "NLP", category: "cs.CL" },
    { id: "cv", label: "Vision", category: "cs.CV" },
    { id: "robotics", label: "Robotics", category: "cs.RO" },
] as const;

export function HomeClient({ userName, userImage, isGuest }: HomeClientProps) {
    const [activeTab, setActiveTab] = useState<string>("for-you");
    const [refreshKey, setRefreshKey] = useState(0);
    const { savedIds } = useSavedPapers();

    const activeCategory =
        TABS.find((t) => t.id === activeTab)?.category || "cs.AI";

    const handleTabChange = useCallback((tabId: string) => {
        setActiveTab(tabId);
        setRefreshKey((k) => k + 1);
    }, []);

    return (
        <div className="min-h-screen bg-black flex">
            <Sidebar savedCount={savedIds.size} isGuest={isGuest} />

            {/* Main content */}
            <main className="flex-1 min-w-0 border-r border-[#2f3336] max-w-[600px]">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#2f3336]">
                    <MobileHeader
                        userName={userName}
                        userImage={userImage}
                        isGuest={isGuest}
                        savedCount={savedIds.size}
                    />

                    {/* Desktop title */}
                    <div className="hidden lg:flex items-center px-4 py-3">
                        <h1 className="text-xl font-bold text-[#e7e9ea]">Home</h1>
                    </div>

                    <FeedTabs
                        tabs={TABS}
                        activeTab={activeTab}
                        onTabChange={handleTabChange}
                    />
                </header>

                {/* Feed */}
                <div className="feed-container">
                    <InfiniteScroll
                        key={`${activeCategory}-${refreshKey}`}
                        initialCategory={activeCategory}
                    />
                </div>
            </main>

            {/* Right sidebar - hidden on mobile */}
            <aside className="hidden xl:block w-[350px] px-6">
                <div className="sticky top-4 pt-3 flex flex-col gap-4">
                    <SearchBox />
                    <TrendingTopics />
                </div>
            </aside>

            <MobileBottomNav
                userImage={userImage}
                isGuest={isGuest}
                savedCount={savedIds.size}
            />
        </div>
    );
}
