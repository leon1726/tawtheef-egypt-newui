"use client";
import { useState } from "react";
import type { Job } from "@/types";
import ApplyModal from "./ApplyModal";

interface Props {
  job: Job;
  label?: string;
  className?: string;
}

export default function ApplyButton({ job, label = "Apply for this Position", className }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className ?? "btn-primary w-full py-3 text-sm font-semibold"}
        aria-haspopup="dialog"
        aria-label={`Apply for ${job.title} at ${job.company}`}
      >
        {label}
      </button>
      <ApplyModal job={job} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
