"use client";

import { useState, useEffect, useCallback } from "react";

export function useLikedPapers() {
  const [likedIds, setLikedIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem("likedPapers");
      if (stored) {
        return new Set(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load liked papers:", e);
    }
    return new Set();
  });

  // Save to localStorage whenever likedIds changes
  useEffect(() => {
    try {
      localStorage.setItem("likedPapers", JSON.stringify([...likedIds]));
    } catch (e) {
      console.error("Failed to save liked papers:", e);
    }
  }, [likedIds]);

  const toggleLike = useCallback((paperId: string) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(paperId)) {
        next.delete(paperId);
      } else {
        next.add(paperId);
      }
      return next;
    });
  }, []);

  const isLiked = useCallback(
    (paperId: string) => likedIds.has(paperId),
    [likedIds],
  );

  return { likedIds, toggleLike, isLiked };
}
