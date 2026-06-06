import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/jobs/SearchBar";
import JobCard from "@/components/jobs/JobCard";
import { getFeaturedJobs, getStats } from "@/lib/api";
import { CATEGORY_LABELS, categoryColors, categoryIcon } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tawtheef Egypt — Find Jobs in Egypt",
  description:
    "Find your next job in Egypt. Browse thousands of opportunities across Cairo, Giza, Alexandria and beyond — updated daily.",
  openGraph: {
    title: "Tawtheef Egypt — Find Jobs in Egypt",
    description: "Egypt's leading job board. Thousands of opportunities updated daily.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Tawtheef Egypt" }],
  },
};

const TOP_CATEGORIES = [
  "IT / Software / Development",
  "Engineering / Construction / Civil / Architecture",
  "Marketing / PR / Advertising",
  "Medical / Healthcare",
  "Sales / Retail",
  "Accounting / Finance",
  "Human / Resources",
  "Creative / Design / Art",
];

const TRENDING = [
  "Software Engineer",
  "Marketing Manager",
  "Data Analyst",
  "Civil Engineer",
  "Financial Analyst",
  "Product Manager",
];

export default async function HomePage() {
  const [featuredJobs, stats] = await Promise.all([
    getFeaturedJobs(),
    getStats(),
  ]);

  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          className="relative min-h-[540px] flex items-center overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Background photo */}
          <Image
            src="/cairo-skyline.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            aria-hidden="true"
          />
          {/* Dark overlay — ensures text contrast regardless of image brightness */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(0,15,40,0.88) 0%, rgba(0,15,40,0.70) 55%, rgba(0,15,40,0.40) 100%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-10 py-20 md:py-28">
            <div className="max-w-[600px] flex flex-col gap-7">
              <div className="space-y-4">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Egypt&apos;s Professional Job Board
                </p>
                <h1
                  id="hero-heading"
                  className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.12] tracking-tight text-white"
                >
                  Find Your Next<br />
                  Job in Egypt
                </h1>
                <p
                  className="text-base md:text-[1.0625rem] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.72)", maxWidth: "460px" }}
                >
                  Thousands of opportunities across all industries, updated daily
                  from Egypt&apos;s top employers.
                </p>
              </div>

              <SearchBar />

              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="text-xs font-medium"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Popular:
                </span>
                {TRENDING.map((term) => (
                  <Link
                    key={term}
                    href={`/jobs?q=${encodeURIComponent(term)}`}
                    className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all hover:bg-white/10"
                    style={{
                      color: "rgba(255,255,255,0.78)",
                      borderColor: "rgba(255,255,255,0.22)",
                    }}
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ─────────────────────────────────────────────────────── */}
        <section
          className="border-y py-8 px-4"
          style={{
            background: "var(--surface-container-lowest)",
            borderColor: "var(--outline-variant)",
          }}
          aria-label="Platform statistics"
        >
          <div className="max-w-[1280px] mx-auto grid grid-cols-3 gap-4 md:gap-8">
            {[
              { value: stats.total_jobs.toLocaleString() + "+", label: "Active Jobs" },
              { value: stats.total_companies.toLocaleString() + "+", label: "Companies" },
              { value: stats.total_categories.toString(), label: "Categories" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center gap-1">
                <span
                  className="text-2xl md:text-3xl font-bold tabular-nums tracking-tight"
                  style={{ color: "var(--primary)" }}
                >
                  {s.value}
                </span>
                <span
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--on-surface-variant)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Browse by Category ─────────────────────────────────────────── */}
        <section className="py-16 px-4 max-w-[1280px] mx-auto" aria-labelledby="cats-heading">
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-1">
              <h2
                id="cats-heading"
                className="text-2xl font-bold tracking-tight"
                style={{ color: "var(--primary)" }}
              >
                Browse by Category
              </h2>
              <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
                Explore opportunities across Egypt&apos;s key industries.
              </p>
            </div>
            <Link
              href="/jobs"
              className="hidden md:flex items-center gap-1.5 text-sm font-semibold hover:opacity-70"
              style={{ color: "var(--primary-container)" }}
            >
              All categories <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TOP_CATEGORIES.map((cat) => {
              const [bg, fg] = categoryColors(cat);
              const initials = categoryIcon(cat);
              return (
                <Link
                  key={cat}
                  href={`/jobs?category=${encodeURIComponent(cat)}`}
                  className="flex flex-col items-center gap-3 p-5 rounded-2xl border text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    background: "var(--surface-container-lowest)",
                    borderColor: "var(--outline-variant)",
                  }}
                  aria-label={`Browse ${CATEGORY_LABELS[cat] ?? cat} jobs`}
                >
                  {/* Letter avatar — no emoji */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 select-none"
                    style={{ background: bg, color: fg }}
                    aria-hidden="true"
                  >
                    {initials}
                  </div>
                  <span
                    className="text-xs font-semibold leading-tight"
                    style={{ color: "var(--primary)" }}
                  >
                    {CATEGORY_LABELS[cat] ?? cat}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Featured Jobs ──────────────────────────────────────────────── */}
        <section
          className="py-16 px-4"
          style={{ background: "var(--surface-container-low)" }}
          aria-labelledby="featured-heading"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div className="space-y-1">
                <h2
                  id="featured-heading"
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: "var(--primary)" }}
                >
                  Latest Opportunities
                </h2>
                <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
                  Recent roles updated daily from Wuzzuf.
                </p>
              </div>
              <Link
                href="/jobs"
                className="hidden md:flex items-center gap-1.5 text-sm font-semibold hover:opacity-70"
                style={{ color: "var(--primary-container)" }}
              >
                View all <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/jobs"
                className="btn-secondary px-8 py-3 text-sm inline-flex items-center gap-2"
              >
                Browse all {stats.total_jobs.toLocaleString()}+ listings
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Employer CTA ───────────────────────────────────────────────── */}
        <section
          className="py-20 px-4"
          style={{ background: "var(--primary-container)" }}
          aria-label="Post a job"
        >
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-3 text-white max-w-xl text-center md:text-left">
              <h2 className="text-3xl font-bold leading-tight">
                Hire qualified talent in Egypt
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(214,227,255,0.78)" }}
              >
                Reach thousands of professionals across Egypt. Post a vacancy and
                start receiving applications today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/post-job"
                className="px-6 py-3 text-sm font-semibold rounded-xl text-center transition-all hover:opacity-95"
                style={{ background: "white", color: "var(--primary-container)" }}
              >
                Post a Job
              </Link>
              <Link
                href="/jobs"
                className="px-6 py-3 text-sm font-semibold rounded-xl border text-center text-white hover:bg-white/10 transition-all"
                style={{ borderColor: "rgba(255,255,255,0.28)" }}
              >
                Browse Jobs
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
