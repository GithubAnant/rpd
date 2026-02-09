"use client";

interface Tab {
    id: string;
    label: string;
    category: string;
}

interface FeedTabsProps {
    tabs: readonly Tab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

/**
 * Category tabs for the feed
 */
export function FeedTabs({ tabs, activeTab, onTabChange }: FeedTabsProps) {
    return (
        <div className="flex border-b border-[#2f3336]">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex-1 px-4 py-4 text-[15px] font-medium transition-colors relative hover-bg whitespace-nowrap ${activeTab === tab.id ? "text-[#e7e9ea]" : "text-[#71767b]"
                        }`}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#1d9bf0] rounded-full" />
                    )}
                </button>
            ))}
        </div>
    );
}
