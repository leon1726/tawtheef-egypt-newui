"use client";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/lib/hooks";
import Link from "next/link";

export default function SavedJobs() {
  const { bookmarks, hydrated } = useBookmarks();

  if (!hydrated)
    return (
      <div className="animate-pulse space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 rounded-xl" style={{ background: "var(--surface-container-low)" }} />
        ))}
      </div>
    );

  if (bookmarks.size === 0)
    return (
      <div
        className="flex flex-col items-center justify-center text-center py-20 rounded-xl border gap-4"
        style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}
      >
        <Bookmark size={40} style={{ color: "var(--outline)" }} aria-hidden="true" />
        <div className="space-y-1">
          <p className="font-semibold" style={{ color: "var(--primary)" }}>No saved jobs yet</p>
          <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
            Bookmark jobs while browsing to save them here.
          </p>
        </div>
        <Link href="/jobs" className="btn-primary px-6 py-2.5 text-sm font-semibold">
          Browse Jobs
        </Link>
      </div>
    );

  return (
    <div className="space-y-3">
      <p className="text-sm mb-4" style={{ color: "var(--on-surface-variant)" }}>
        {bookmarks.size} saved job{bookmarks.size !== 1 ? "s" : ""}
      </p>
      {[...bookmarks].map((id) => (
        <div key={id} className="job-card flex items-center justify-between gap-4 py-4">
          <p className="text-sm font-medium" style={{ color: "var(--primary)" }}>Job #{id}</p>
          <Link href={`/jobs/${id}`} className="btn-primary px-4 py-2 text-xs font-semibold">View</Link>
        </div>
      ))}
    </div>
  );
}
