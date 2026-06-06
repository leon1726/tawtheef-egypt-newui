"use client";

import { useState } from "react";
import { SearchX } from "lucide-react";
import type { Job, ViewMode } from "@/types";
import JobCard from "./JobCard";
import JobsToolbar from "./JobsToolbar";
import Pagination from "./Pagination";

interface Props {
  jobs: Job[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export default function JobsGrid({ jobs, total, totalPages, currentPage }: Props) {
  const [view, setView] = useState<ViewMode>("grid");

  return (
    <div className="flex-1 min-w-0">
      <JobsToolbar
        total={total}
        showing={jobs.length}
        view={view}
        onViewChange={setView}
      />

      {jobs.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center text-center py-24 rounded-2xl border gap-4"
          style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}
          role="status"
          aria-live="polite"
        >
          <SearchX size={36} style={{ color: "var(--outline)" }} aria-hidden="true" />
          <div className="space-y-1">
            <p className="font-semibold text-lg" style={{ color: "var(--primary)" }}>No jobs found</p>
            <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
              Try adjusting your filters or search terms
            </p>
          </div>
        </div>
      ) : (
        <div
          className={view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 gap-5"
            : "flex flex-col gap-3"}
          aria-live="polite"
          aria-label={`${jobs.length} job listings`}
        >
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} view={view} />
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
