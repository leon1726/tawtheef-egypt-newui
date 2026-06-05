"use client";

import { useState, useEffect, useCallback } from "react";

const BOOKMARKS_KEY = "tawtheef_bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      if (stored) setBookmarks(new Set(JSON.parse(stored)));
    } catch {}
    setHydrated(true);
  }, []);

  const toggle = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem(BOOKMARKS_KEY, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => hydrated && bookmarks.has(id),
    [bookmarks, hydrated]
  );

  return { bookmarks, toggle, isBookmarked, hydrated };
}
