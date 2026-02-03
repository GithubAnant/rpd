"use client";

import { useState, useEffect, useCallback } from "react";

export function useSavedPapers() {
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("savedPapers");
      if (stored) {
        setSavedIds(new Set(JSON.parse(stored)));
      }
    } catch (e) {
      console.error("Failed to load saved papers:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever savedIds changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("savedPapers", JSON.stringify([...savedIds]));
      } catch (e) {
        console.error("Failed to save papers:", e);
      }
    }
  }, [savedIds, isLoaded]);

  const toggleSave = useCallback((paperId: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(paperId)) {
        next.delete(paperId);
      } else {
        next.add(paperId);
      }
      return next;
    });
  }, []);

  const isSaved = useCallback(
    (paperId: string) => savedIds.has(paperId),
    [savedIds],
  );

  return { savedIds, toggleSave, isSaved, isLoaded };
}
