"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  totalPages: number;
  currentPage: number;
}

export default function Pagination({ totalPages, currentPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  if (totalPages <= 1) return null;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) params.delete("page");
    else params.set("page", String(page));
    startTransition(() =>
      router.push(`/jobs?${params.toString()}`, { scroll: true })
    );
  };

  // Build page numbers: always show first, last, current ±1, with ellipsis
  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2"
      aria-label="Job listing pagination"
    >
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-lg text-sm font-medium transition-all hover:opacity-80 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          border: "1px solid var(--outline-variant)",
          color: "var(--on-surface-variant)",
        }}
        aria-label="Go to previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, i) => (
        <button
          key={i}
          onClick={() => typeof page === "number" && goToPage(page)}
          disabled={page === "..."}
          className="w-9 h-9 rounded-lg text-sm font-medium transition-all hover:opacity-80 disabled:cursor-default"
          style={{
            background:
              page === currentPage ? "var(--primary-container)" : "transparent",
            color:
              page === currentPage ? "white" : "var(--on-surface-variant)",
            border:
              page === currentPage
                ? "none"
                : "1px solid var(--outline-variant)",
          }}
          aria-label={typeof page === "number" ? `Go to page ${page}` : undefined}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-lg text-sm font-medium transition-all hover:opacity-80 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          border: "1px solid var(--outline-variant)",
          color: "var(--on-surface-variant)",
        }}
        aria-label="Go to next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
