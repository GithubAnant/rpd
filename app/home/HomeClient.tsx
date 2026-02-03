'use client';

import { useState, useCallback } from 'react';
import { SessionProvider } from 'next-auth/react';
import { InfiniteScroll } from '@/components/InfiniteScroll';
import { useSavedPapers } from '@/hooks/useSavedPapers';
import Link from 'next/link';

interface HomeClientProps {
    userName?: string | null;
    userImage?: string | null;
    isGuest: boolean;
}

const TABS = [
    { id: 'for-you', label: 'For you', category: 'cs.AI' },
    { id: 'ml', label: 'ML', category: 'cs.LG' },
    { id: 'nlp', label: 'NLP', category: 'cs.CL' },
    { id: 'cv', label: 'Vision', category: 'cs.CV' },
    { id: 'robotics', label: 'Robotics', category: 'cs.RO' },
] as const;

export function HomeClient({ userName, userImage, isGuest }: HomeClientProps) {
    const [activeTab, setActiveTab] = useState<string>('for-you');
    const [refreshKey, setRefreshKey] = useState(0);
    const { savedIds } = useSavedPapers();

    const activeCategory = TABS.find(t => t.id === activeTab)?.category || 'cs.AI';

    const handleTabChange = useCallback((tabId: string) => {
        setActiveTab(tabId);
        setRefreshKey((k) => k + 1);
    }, []);

    return (
        <SessionProvider>
            <div className="min-h-screen bg-black flex">
                {/* Sidebar - hidden on mobile */}
                <aside className="hidden lg:flex flex-col w-[275px] px-3 border-r border-[#2f3336]">
                    {/* Logo */}
                    <div className="p-3 mt-1">
                        <Link href="/home" className="inline-block">
                            <svg className="w-8 h-8 text-[#e7e9ea]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM12 17.5a5.5 5.5 0 110-11 5.5 5.5 0 010 11z" />
                            </svg>
                        </Link>
                    </div>

                    {/* Nav items */}
                    <nav className="flex-1 mt-1">
                        <NavItem href="/home" icon="home" label="Home" active />
                        <NavItem href="/saved" icon="bookmark" label="Bookmarks" count={savedIds.size} />
                        <NavItem href="/" icon="logout" label="Sign out" />
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
                                    {isGuest ? 'G' : userName?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            )}

                            <span className="text-[17px] font-bold text-[#e7e9ea]">Arxiv</span>

                            <Link href="/saved" className="relative p-2">
                                <svg className="w-5 h-5 text-[#e7e9ea]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
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
                        <div className="flex border-b border-[#2f3336]">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`flex-1 px-4 py-4 text-[15px] font-medium transition-colors relative hover-bg ${activeTab === tab.id ? 'text-[#e7e9ea]' : 'text-[#71767b]'
                                        }`}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#1d9bf0] rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>
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
                    <div className="sticky top-4 pt-3">
                        {/* Search */}
                        <div className="bg-[#16181c] rounded-full px-4 py-3 flex items-center gap-3 mb-4">
                            <svg className="w-5 h-5 text-[#71767b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search papers"
                                className="bg-transparent text-[15px] text-[#e7e9ea] placeholder-[#71767b] outline-none w-full"
                            />
                        </div>

                        {/* Trending topics */}
                        <div className="bg-[#16181c] rounded-2xl overflow-hidden">
                            <h2 className="px-4 py-3 text-xl font-bold text-[#e7e9ea]">Trending in Research</h2>
                            <TrendingItem label="Large Language Models" count="5.2K papers" />
                            <TrendingItem label="Diffusion Models" count="3.8K papers" />
                            <TrendingItem label="Reinforcement Learning" count="2.1K papers" />
                            <TrendingItem label="Vision Transformers" count="1.9K papers" />
                        </div>
                    </div>
                </aside>

                {/* Bottom nav - mobile only */}
                <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-[#2f3336] flex items-center justify-around py-2 lg:hidden safe-bottom">
                    <Link href="/home" className="p-3">
                        <svg className="w-7 h-7 text-[#e7e9ea]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5A2.5 2.5 0 005.5 22h13a2.5 2.5 0 002.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
                        </svg>
                    </Link>
                    <Link href="/saved" className="p-3 relative">
                        <svg className="w-7 h-7 text-[#e7e9ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        {savedIds.size > 0 && (
                            <span className="absolute top-1 right-1 bg-[#1d9bf0] text-white text-[11px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                {savedIds.size > 9 ? '9+' : savedIds.size}
                            </span>
                        )}
                    </Link>
                    {isGuest ? (
                        <Link href="/" className="p-3">
                            <svg className="w-7 h-7 text-[#e7e9ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </Link>
                    ) : (
                        <Link href="/" className="p-3">
                            <img src={userImage || ''} alt="" className="w-7 h-7 rounded-full" />
                        </Link>
                    )}
                </nav>
            </div>
        </SessionProvider>
    );
}

function NavItem({ href, icon, label, active, count }: { href: string; icon: string; label: string; active?: boolean; count?: number }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-5 px-3 py-3 rounded-full hover-bg transition-colors"
        >
            {icon === 'home' && (
                <svg className="w-7 h-7 text-[#e7e9ea]" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )}
            {icon === 'bookmark' && (
                <svg className="w-7 h-7 text-[#e7e9ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            )}
            {icon === 'logout' && (
                <svg className="w-7 h-7 text-[#e7e9ea]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
            )}
            <span className={`text-xl ${active ? 'font-bold' : ''} text-[#e7e9ea]`}>{label}</span>
            {count !== undefined && count > 0 && (
                <span className="text-sm text-[#71767b]">{count}</span>
            )}
        </Link>
    );
}

function TrendingItem({ label, count }: { label: string; count: string }) {
    return (
        <div className="px-4 py-3 hover-bg transition-colors cursor-pointer">
            <p className="text-[13px] text-[#71767b]">Trending in Research</p>
            <p className="text-[15px] font-bold text-[#e7e9ea] mt-0.5">{label}</p>
            <p className="text-[13px] text-[#71767b] mt-0.5">{count}</p>
        </div>
    );
}
