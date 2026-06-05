"use client";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/lib/hooks";

interface Props {
  jobId: number;
  jobTitle: string;
  size?: "sm" | "md";
}

export default function BookmarkButton({ jobId, jobTitle, size = "sm" }: Props) {
  const { toggle, isBookmarked } = useBookmarks();
  const saved = isBookmarked(String(jobId));
  const sz = size === "sm" ? 17 : 20;

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(String(jobId)); }}
      className="p-1.5 rounded-lg transition-all hover:scale-110"
      style={{
        color: saved ? "var(--primary-container)" : "var(--outline)",
        background: saved ? "rgba(0,33,71,0.08)" : "transparent",
      }}
      aria-label={saved ? `Remove ${jobTitle} from saved jobs` : `Save ${jobTitle}`}
      aria-pressed={saved}
    >
      <Bookmark size={sz} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
