'use client';

import { useState, useEffect, useCallback } from 'react';

// 20 curated color themes - maximally distinct colors
const THEMES = [
    // Core Blues
    { id: "twitter-blue", name: "Twitter Blue", accent: "#1d9bf0", bg: "#000000" },
    { id: "cyan", name: "Cyan", accent: "#06b6d4", bg: "#000000" },

    // Greens
    { id: "emerald", name: "Emerald", accent: "#10b981", bg: "#000000" },
    { id: "lime", name: "Lime", accent: "#84cc16", bg: "#000000" },

    // Purples
    { id: "violet", name: "Violet", accent: "#8b5cf6", bg: "#000000" },
    { id: "magenta", name: "Magenta", accent: "#e879f9", bg: "#000000" },

    // Pinks & Warm
    { id: "pink", name: "Pink", accent: "#ec4899", bg: "#000000" },
    { id: "coral", name: "Coral", accent: "#fb7185", bg: "#000000" },

    // Oranges & Yellows
    { id: "amber", name: "Amber", accent: "#f59e0b", bg: "#000000" },
    { id: "gold", name: "Gold", accent: "#eab308", bg: "#000000" },

    // Neutrals
    { id: "silver", name: "Silver", accent: "#94a3b8", bg: "#000000" },
    { id: "white", name: "White", accent: "#e2e8f0", bg: "#000000" },

    // Special backgrounds
    { id: "midnight", name: "Midnight", accent: "#818cf8", bg: "#0f0f23" },
    { id: "ocean", name: "Ocean", accent: "#22d3ee", bg: "#0c1222" },
    { id: "forest", name: "Forest", accent: "#4ade80", bg: "#0a1410" },
    { id: "grape", name: "Grape", accent: "#c084fc", bg: "#1a0a20" },
    { id: "sunset", name: "Sunset", accent: "#fb923c", bg: "#1c1210" },
    { id: "mint", name: "Mint", accent: "#2dd4bf", bg: "#0a1412" },
    { id: "berry", name: "Berry", accent: "#f472b6", bg: "#1a0a14" },
    { id: "electric", name: "Electric", accent: "#38bdf8", bg: "#0c1525" },
] as const;

type ThemeId = typeof THEMES[number]['id'];

export function ThemeToggle() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTheme, setCurrentTheme] = useState<ThemeId>('twitter-blue');
    const [mounted, setMounted] = useState(false);

    // Load saved theme on mount
    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem('theme');
        if (saved && THEMES.find(t => t.id === saved)) {
            setCurrentTheme(saved as ThemeId);
            applyTheme(saved as ThemeId);
        }
    }, []);

    const applyTheme = useCallback((themeId: ThemeId) => {
        const theme = THEMES.find(t => t.id === themeId);
        if (!theme) return;

        const root = document.documentElement;
        root.style.setProperty('--color-accent', theme.accent);
        root.style.setProperty('--color-accent-hover', adjustBrightness(theme.accent, -15));
        root.style.setProperty('--color-bg', theme.bg);

        // Update secondary bg based on main bg
        const secondaryBg = adjustBrightness(theme.bg, 10);
        root.style.setProperty('--color-bg-secondary', secondaryBg);
    }, []);

    const handleThemeChange = useCallback((themeId: ThemeId) => {
        setCurrentTheme(themeId);
        localStorage.setItem('theme', themeId);
        applyTheme(themeId);
    }, [applyTheme]);

    if (!mounted) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Theme picker popup */}
            {isOpen && (
                <div className="absolute bottom-14 right-0 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl p-4 shadow-2xl w-72 max-h-[70vh] overflow-y-auto">
                    <h3 className="text-[var(--color-text-primary)] font-bold text-sm mb-3">Choose Theme</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {THEMES.map((theme) => (
                            <button
                                key={theme.id}
                                onClick={() => handleThemeChange(theme.id)}
                                className={`group relative w-full aspect-square rounded-xl transition-all hover:scale-110 ${currentTheme === theme.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[var(--color-bg-secondary)]' : ''
                                    }`}
                                style={{ backgroundColor: theme.accent }}
                                title={theme.name}
                            >
                                {/* Show background color as inner circle */}
                                <div
                                    className="absolute inset-2 rounded-lg"
                                    style={{ backgroundColor: theme.bg }}
                                />
                                {/* Checkmark for selected */}
                                {currentTheme === theme.id && (
                                    <svg className="absolute inset-0 m-auto w-4 h-4 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                    {/* Theme name */}
                    <p className="text-[var(--color-text-secondary)] text-xs mt-3 text-center">
                        {THEMES.find(t => t.id === currentTheme)?.name}
                    </p>
                </div>
            )}

            {/* Toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ backgroundColor: 'var(--color-accent)' }}
                aria-label="Toggle theme picker"
            >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            </button>
        </div>
    );
}

// Helper to darken/lighten a hex color
function adjustBrightness(hex: string, percent: number): string {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
}
