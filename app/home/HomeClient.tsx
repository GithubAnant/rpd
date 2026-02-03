"use client";

import { useState, useCallback } from "react";
import { InfiniteScroll } from "@/components/InfiniteScroll";
import { useSavedPapers } from "@/hooks/useSavedPapers";
import Link from "next/link";

// Feature components
import { SignOutButton } from "@/features/auth";
import { FeedTabs, SearchBox, TrendingTopics } from "@/features/feed";

// Shared UI components
import { ArxivLogo } from "@/components/ui/arxiv-logo";
import { NavItem } from "@/components/ui/nav-item";
import { HomeIcon, BookmarkIcon, UserIcon } from "@/components/ui/icons";

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
            {/* Sidebar - hidden on mobile */}
            <aside className="hidden lg:flex flex-col w-[275px] px-3 border-r border-[#2f3336]">
                {/* Logo */}
                <div className="p-3 mt-1">
                    <Link href="/home" className="inline-block text-[#e7e9ea]">
                        <ArxivLogo size="md" />
                    </Link>
                </div>

                {/* Nav items */}
                <nav className="flex-1 mt-1">
                    <NavItem
                        href="/home"
                        icon={<HomeIcon className="text-[#e7e9ea]" fill />}
                        label="Home"
                        active
                    />
                    <NavItem
                        href="/saved"
                        icon={<BookmarkIcon className="text-[#e7e9ea]" />}
                        label="Bookmarks"
                        count={savedIds.size}
                    />
                    {/* Only show sign out for authenticated users, not guests */}
                    {!isGuest && <SignOutButton />}
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 min-w-0 border-r border-[#2f3336] max-w-[600px]">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#2f3336]">
                    {/* Title row - mobile */}
                    <div className="flex items-center justify-between px-4 py-3 lg:hidden">
                        {/* Profile pic */}
                        {userImage ? (
                            <img src={userImage} alt="" className="w-8 h-8 rounded-full" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-[#16181c] flex items-center justify-center text-[#e7e9ea] text-sm font-bold">
                                {isGuest ? "G" : userName?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}

                        <ArxivLogo size="md" className="text-[#e7e9ea]" />

                        <Link href="/saved" className="relative p-2">
                            <BookmarkIcon className="w-5 h-5 text-[#e7e9ea]" />
                            {savedIds.size > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#1d9bf0] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {savedIds.size}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Desktop title */}
                    <div className="hidden lg:flex items-center px-4 py-3">
                        <h1 className="text-xl font-bold text-[#e7e9ea]">Home</h1>
                    </div>

                    {/* Tabs */}
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
                    {/* Search */}
                    <SearchBox />

                    {/* Trending topics */}
                    <TrendingTopics />
                </div>
            </aside>

            {/* Bottom nav - mobile only */}
            <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-[#2f3336] flex items-center justify-around py-2 lg:hidden safe-bottom">
                <Link href="/home" className="p-3">
                    <HomeIcon className="text-[#e7e9ea]" fill />
                </Link>
                <Link href="/saved" className="p-3 relative">
                    <BookmarkIcon className="text-[#e7e9ea]" />
                    {savedIds.size > 0 && (
                        <span className="absolute top-1 right-1 bg-[#1d9bf0] text-white text-[11px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                            {savedIds.size > 9 ? "9+" : savedIds.size}
                        </span>
                    )}
                </Link>
                {isGuest ? (
                    <Link href="/" className="p-3">
                        <UserIcon className="text-[#e7e9ea]" />
                    </Link>
                ) : (
                    <Link href="/" className="p-3">
                        <img
                            src={userImage || ""}
                            alt=""
                            className="w-7 h-7 rounded-full"
                        />
                    </Link>
                )}
            </nav>
        </div>
    );
}
