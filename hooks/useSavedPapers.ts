"use client";

import { useState, useEffect, useCallback } from "react";

interface SavedPaperMeta {
  id: string;
  thumbnail?: string;
}

export function useSavedPapers() {
  const [savedPapers, setSavedPapers] = useState<Map<string, SavedPaperMeta>>(() => {
    try {
      const stored = localStorage.getItem("savedPapers");
      if (stored) {
        const parsed = JSON.parse(stored) as SavedPaperMeta[];
        return new Map(parsed.map(p => [p.id, p]));
      }
    } catch (e) {
      console.error("Failed to load saved papers:", e);
    }
    return new Map();
  });

  // Save to localStorage whenever savedPapers changes
  useEffect(() => {
    try {
      localStorage.setItem("savedPapers", JSON.stringify(Array.from(savedPapers.values())));
    } catch (e) {
      console.error("Failed to save papers:", e);
    }
  }, [savedPapers]);

  const toggleSave = useCallback((paperId: string, thumbnail?: string) => {
    setSavedPapers((prev) => {
      const next = new Map(prev);
      if (next.has(paperId)) {
        next.delete(paperId);
      } else {
        next.set(paperId, { id: paperId, thumbnail });
      }
      return next;
    });
  }, []);

  const isSaved = useCallback(
    (paperId: string) => savedPapers.has(paperId),
    [savedPapers],
  );

  const getSavedPaper = useCallback(
    (paperId: string) => savedPapers.get(paperId),
    [savedPapers],
  );

  return { savedPapers, toggleSave, isSaved, getSavedPaper };
}
