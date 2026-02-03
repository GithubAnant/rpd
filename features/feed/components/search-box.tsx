"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/ui/icons";

interface SearchBoxProps {
    onSearch?: (query: string) => void;
    placeholder?: string;
}

/**
 * Search box component with functional search
 */
export function SearchBox({
    onSearch,
    placeholder = "Search papers",
}: SearchBoxProps) {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (query.trim()) {
                if (onSearch) {
                    onSearch(query.trim());
                } else {
                    // Default: navigate to search results
                    router.push(`/home?search=${encodeURIComponent(query.trim())}`);
                }
            }
        },
        [query, onSearch, router]
    );

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-[#16181c] rounded-full px-4 py-3 flex items-center gap-3 focus-within:ring-1 focus-within:ring-[var(--color-accent)] transition-all">
                <SearchIcon className="text-[#71767b]" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="bg-transparent text-[15px] text-[#e7e9ea] placeholder-[#71767b] outline-none w-full"
                />
            </div>
        </form>
    );
}
