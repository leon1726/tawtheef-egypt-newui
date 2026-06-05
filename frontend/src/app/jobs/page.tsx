import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JobFilters from "@/components/jobs/JobFilters";
import JobsGrid from "@/components/jobs/JobsGrid";
import SearchBar from "@/components/jobs/SearchBar";
import { getJobs } from "@/lib/api";
import { parseSearchParams } from "@/lib/utils";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp      = await searchParams;
  const filters = parseSearchParams(sp);
  const q       = filters.q       ? `"${filters.q}" ` : "";
  const cat     = filters.category ? `in ${filters.category} ` : "";
  const title   = `${q}${cat}Jobs in Egypt | Tawtheef Egypt`;
  const desc    = `Browse ${q}${cat}jobs across Egypt. Find your next career on Tawtheef Egypt.`;
  return {
    title,
    description: desc,
    openGraph: { title, description: desc },
    alternates: { canonical: "/jobs" },
  };
}

export default async function JobsPage({ searchParams }: Props) {
  const sp      = await searchParams;
  const filters = parseSearchParams(sp);
  const page    = filters.page ?? 1;

  const result = await getJobs(filters, page);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <div className="py-10 px-4 border-b"
          style={{ background: "var(--surface-container-low)", borderColor: "var(--outline-variant)" }}>
          <div className="max-w-[1280px] mx-auto space-y-5">
            <div>
              <h1 className="text-3xl font-bold tracking-tight" style={{ color: "var(--primary)" }}>
                {filters.category
                  ? `${filters.category.split(" / ")[0]} Jobs in Egypt`
                  : "Browse Jobs in Egypt"}
              </h1>
              <p className="text-sm mt-1" style={{ color: "var(--on-surface-variant)" }}>
                {result.total.toLocaleString()} opportunities — updated daily from Wuzzuf.
              </p>
            </div>
            <SearchBar
              defaultQuery={filters.q ?? ""}
              defaultLocation={filters.location ?? ""}
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <Suspense fallback={<div className="w-64 h-96 rounded-2xl animate-pulse"
              style={{ background: "var(--surface-container-low)" }} />}>
              <JobFilters />
            </Suspense>

            <JobsGrid
              jobs={result.jobs}
              total={result.total}
              totalPages={result.total_pages}
              currentPage={page}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
