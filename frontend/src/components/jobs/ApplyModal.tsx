"use client";
/**
 * ApplyModal — redirects to the real Wuzzuf apply link.
 * The backend's /apply/:id endpoint redirects to job.link.
 * We open it in a new tab; no form submission needed.
 */
import { useEffect } from "react";
import { X, ExternalLink } from "lucide-react";
import type { Job } from "@/types";
import { applyUrl } from "@/lib/api";

interface Props {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplyModal({ job, isOpen, onClose }: Props) {
  const href = applyUrl(job);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,10,30,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog" aria-modal="true" aria-labelledby="apply-title"
    >
      <div className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{ background: "var(--surface-container-lowest)", border: "1px solid var(--outline-variant)", boxShadow: "0 24px 64px rgba(0,10,30,0.2)" }}>

        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b"
          style={{ borderColor: "var(--outline-variant)" }}>
          <div>
            <h2 id="apply-title" className="font-semibold text-base" style={{ color: "var(--primary)" }}>
              Apply for this Position
            </h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--on-surface-variant)" }}>
              {job.title} · {job.company}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-surface-container"
            style={{ color: "var(--on-surface-variant)" }} aria-label="Close">
            <X size={17} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>
            This job is listed on <strong>Wuzzuf.net</strong>. Clicking Apply will open
            the official application page in a new tab where you can submit your CV directly to {job.company}.
          </p>

          {job.experience && (
            <div className="p-3 rounded-xl text-sm"
              style={{ background: "var(--surface-container-low)", color: "var(--on-surface-variant)" }}>
              <span className="font-semibold" style={{ color: "var(--on-surface)" }}>Experience required: </span>
              {job.experience}
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button onClick={onClose} className="btn-secondary flex-1 py-2.5 text-sm font-semibold">
              Cancel
            </button>
            <a href={href} target="_blank" rel="noopener noreferrer"
              onClick={onClose}
              className="btn-primary flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-2">
              Apply on Wuzzuf <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
