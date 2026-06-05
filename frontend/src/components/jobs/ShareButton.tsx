"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface Props {
  title: string;
  url?: string;
}

export default function ShareButton({ title, url }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
      } catch {
        // User cancelled or not supported
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-2.5 rounded-xl border transition-all hover:border-primary"
      style={{
        borderColor: "var(--outline-variant)",
        color: copied ? "var(--primary-container)" : "var(--outline)",
      }}
      aria-label={copied ? "Link copied!" : "Share this job"}
    >
      {copied ? <Check size={18} /> : <Share2 size={18} />}
    </button>
  );
}
