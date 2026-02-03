"use client";

import { useRef, useCallback, TouchEvent } from "react";

interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

interface SwipeResult {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
  swipeOffset: number;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
}: SwipeHandlers): SwipeResult {
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number>(0);
  const swipeOffsetRef = useRef<number>(0);

  const onTouchStart = useCallback((e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (touchStartX.current === null) return;
    touchCurrentX.current = e.touches[0].clientX;
    swipeOffsetRef.current = touchCurrentX.current - touchStartX.current;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (touchStartX.current === null) return;

    const diff = touchCurrentX.current - touchStartX.current;
    const threshold = 80; // Minimum swipe distance

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (diff < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    }

    touchStartX.current = null;
    swipeOffsetRef.current = 0;
  }, [onSwipeLeft, onSwipeRight]);

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    swipeOffset: swipeOffsetRef.current,
  };
}
