'use client';

import { memo } from 'react';

export const SkeletonCard = memo(function SkeletonCard() {
    return (
        <div className="border-b border-[#2f3336] px-4 py-3">
            <div className="flex items-start gap-3">
                {/* Avatar skeleton */}
                <div className="w-10 h-10 rounded-full skeleton shrink-0" />

                <div className="flex-1">
                    {/* Header skeleton */}
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-4 w-24 skeleton rounded" />
                        <div className="h-4 w-12 skeleton rounded" />
                    </div>

                    {/* Title skeleton */}
                    <div className="space-y-2 mb-3">
                        <div className="h-4 w-full skeleton rounded" />
                        <div className="h-4 w-3/4 skeleton rounded" />
                    </div>

                    {/* Abstract skeleton */}
                    <div className="space-y-2 mb-3">
                        <div className="h-3.5 w-full skeleton rounded" />
                        <div className="h-3.5 w-full skeleton rounded" />
                        <div className="h-3.5 w-2/3 skeleton rounded" />
                    </div>

                    {/* Actions skeleton */}
                    <div className="flex items-center gap-12 mt-3">
                        <div className="h-8 w-8 skeleton rounded-full" />
                        <div className="h-8 w-8 skeleton rounded-full" />
                        <div className="h-8 w-8 skeleton rounded-full" />
                        <div className="h-8 w-8 skeleton rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
});
