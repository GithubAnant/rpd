"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface TrendingTopic {
    label: string;
    searchQuery: string;
    paperCount: string;
}

const TRENDING_TOPICS: TrendingTopic[] = [
    { label: "Large Language Models", searchQuery: "large language model", paperCount: "" },
    { label: "Diffusion Models", searchQuery: "diffusion model", paperCount: "" },
    { label: "Reinforcement Learning", searchQuery: "reinforcement learning", paperCount: "" },
    { label: "Vision Transformers", searchQuery: "vision transformer ViT", paperCount: "" },
    { label: "Neural Networks", searchQuery: "neural network", paperCount: "" },
];

interface TrendingTopicItemProps {
    topic: TrendingTopic;
    onClick: (query: string) => void;
}

function TrendingTopicItem({ topic, onClick }: TrendingTopicItemProps) {
    return (
        <button
            onClick={() => onClick(topic.searchQuery)}
            className="w-full text-left px-4 py-3 hover-bg transition-colors cursor-pointer"
        >
            <p className="text-[13px] text-[#71767b]">Trending in Research</p>
            <p className="text-[15px] font-bold text-[#e7e9ea] mt-0.5">{topic.label}</p>
            {topic.paperCount && <p className="text-[13px] text-[#71767b] mt-0.5">{topic.paperCount}</p>}
        </button>
    );
}

interface TrendingTopicsProps {
    onTopicClick?: (query: string) => void;
}

/**
 * Trending topics panel with clickable topics that trigger search
 */
export function TrendingTopics({ onTopicClick }: TrendingTopicsProps) {
    const router = useRouter();

    const handleTopicClick = useCallback(
        (query: string) => {
            if (onTopicClick) {
                onTopicClick(query);
            } else {
                router.push(`/home?search=${encodeURIComponent(query)}`);
            }
        },
        [onTopicClick, router]
    );

    return (
        <div className="bg-[#16181c] rounded-2xl overflow-hidden">
            <h2 className="px-4 py-3 text-xl font-bold text-[#e7e9ea]">
                Trending in Research
            </h2>
            {TRENDING_TOPICS.map((topic) => (
                <TrendingTopicItem
                    key={topic.label}
                    topic={topic}
                    onClick={handleTopicClick}
                />
            ))}
        </div>
    );
}
