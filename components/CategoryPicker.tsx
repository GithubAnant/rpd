'use client';

import { ARXIV_CATEGORIES } from '@/lib/arxiv';

interface CategoryPickerProps {
    selected: string;
    onSelect: (category: string) => void;
}

export function CategoryPicker({ selected, onSelect }: CategoryPickerProps) {
    return (
        <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 px-4 py-3 min-w-max">
                {ARXIV_CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selected === cat.id
                                ? 'bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25'
                                : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
