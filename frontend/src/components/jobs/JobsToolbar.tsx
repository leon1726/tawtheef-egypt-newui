"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { LayoutGrid, List } from "lucide-react";
import type { ViewMode, SortOption } from "@/types";

interface Props {
  total: number;
  showing: number;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
}

export default function JobsToolbar({ total, showing, view, onViewChange }: Props) {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const [, start]    = useTransition();
  const sort         = (searchParams.get("sort") ?? "newest") as SortOption;

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "newest") params.delete("sort");
    else params.set("sort", value);
    params.delete("page");
    start(() => router.push(`/jobs?${params.toString()}`, { scroll: false }));
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
        Showing{" "}
        <span className="font-semibold" style={{ color: "var(--on-surface)" }}>{showing}</span>{" "}
        of{" "}
        <span className="font-semibold" style={{ color: "var(--on-surface)" }}>{total.toLocaleString()}</span>{" "}
        results
      </p>

      <div className="flex items-center gap-3">
        <label htmlFor="sort-select" className="sr-only">Sort jobs by</label>
        <select id="sort-select" value={sort} onChange={(e) => handleSort(e.target.value)}
          className="text-sm px-3 py-2 rounded-lg border bg-transparent cursor-pointer"
          style={{ borderColor: "var(--outline-variant)", color: "var(--on-surface)" }}>
          <option value="newest">Newest First</option>
          <option value="salary">Highest Salary</option>
        </select>

        <div className="hidden md:flex items-center gap-1 rounded-lg border p-1"
          style={{ borderColor: "var(--outline-variant)" }}
          role="group" aria-label="View mode">
          {(["grid", "list"] as ViewMode[]).map((v) => (
            <button key={v} onClick={() => onViewChange(v)}
              className="p-1.5 rounded-md transition-colors"
              style={{ background: view === v ? "var(--surface-container-low)" : "transparent" }}
              aria-label={`${v} view`} aria-pressed={view === v}>
              {v === "grid"
                ? <LayoutGrid size={16} style={{ color: view === "grid" ? "var(--primary)" : "var(--outline)" }} />
                : <List      size={16} style={{ color: view === "list" ? "var(--primary)" : "var(--outline)" }} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
