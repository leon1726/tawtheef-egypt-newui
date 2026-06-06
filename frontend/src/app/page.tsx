import Link from "next/link";
import Image from "next/image";
import { ArrowRight, TrendingUp, Users, Briefcase } from "lucide-react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/jobs/SearchBar";
import JobCard from "@/components/jobs/JobCard";
import { getFeaturedJobs, getStats } from "@/lib/api";
import { CATEGORY_LABELS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tawtheef Egypt — Find Jobs in Egypt",
  description:
    "Find your next job in Egypt. Browse thousands of opportunities across Cairo, Giza, Alexandria and beyond — updated daily from top Egyptian employers.",
  openGraph: {
    title: "Tawtheef Egypt — Find Jobs in Egypt",
    description: "Egypt's leading job board. Thousands of opportunities updated daily.",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "Tawtheef Egypt" }],
  },
};

/* Category data — SVG-based icons, no emoji */
const TOP_CATEGORIES: { key: string; icon: React.ReactNode }[] = [
  {
    key: "IT / Software / Development",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    key: "Engineering / Construction / Civil / Architecture",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20M4 20V10l8-6 8 6v10"/><path d="M10 20v-5h4v5"/>
      </svg>
    ),
  },
  {
    key: "Accounting / Finance",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
  },
  {
    key: "Marketing / PR / Advertising",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
  },
  {
    key: "Medical / Healthcare",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 19H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-3"/><polyline points="12 15 12 9"/><line x1="9" y1="12" x2="15" y2="12"/>
      </svg>
    ),
  },
  {
    key: "Sales / Retail",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-10 2a2 2 0 100 4 2 2 0 000-4z"/>
      </svg>
    ),
  },
  {
    key: "Human / Resources",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    key: "Creative / Design / Art",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
      </svg>
    ),
  },
];

const TRENDING = [
  "Software Engineer",
  "Marketing Manager",
  "Data Analyst",
  "Civil Engineer",
  "Financial Analyst",
  "Sales Manager",
  "HR Specialist",
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

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section
          className="relative min-h-[520px] md:min-h-[580px] flex items-center overflow-hidden"
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
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(0,26,60,0.88) 0%, rgba(0,26,60,0.72) 50%, rgba(0,26,60,0.45) 100%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-8 py-20">
            <div className="max-w-2xl flex flex-col gap-7">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest mb-3"
                  style={{ color: "rgba(255,255,255,0.6)" }}>
                  Egypt's Leading Job Board
                </p>
                <h1
                  id="hero-heading"
                  className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] tracking-tight text-white"
                >
                  Find Your Next<br />
                  <span style={{ color: "#7eb3ff" }}>Career in Egypt</span>
                </h1>
              </div>

              <p className="text-base md:text-lg leading-relaxed"
                style={{ color: "rgba(255,255,255,0.78)", maxWidth: "480px" }}>
                Thousands of opportunities across all industries — updated daily
                from Egypt's top employers.
              </p>

              <SearchBar variant="hero" />

              {/* Trending searches */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Trending:
                </span>
                {TRENDING.map((term) => (
                  <Link
                    key={term}
                    href={`/jobs?q=${encodeURIComponent(term)}`}
                    className="text-xs px-3 py-1.5 rounded-full border font-medium transition-all hover:bg-white hover:text-gray-900"
                    style={{ color: "rgba(255,255,255,0.8)", borderColor: "rgba(255,255,255,0.25)" }}
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
          className="border-b"
          style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}
          aria-label="Platform statistics"
        >
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-8 grid grid-cols-3 divide-x divide-gray-200">
            {[
              { value: stats.total_jobs.toLocaleString() + "+", label: "Active Jobs", icon: <Briefcase size={18} /> },
              { value: stats.total_companies.toLocaleString() + "+", label: "Companies", icon: <Users size={18} /> },
              { value: stats.total_categories.toString(), label: "Categories", icon: <TrendingUp size={18} /> },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center px-4 py-2 gap-1">
                <div className="mb-1" style={{ color: "var(--accent)" }} aria-hidden="true">{s.icon}</div>
                <span
                  className="text-2xl md:text-3xl font-bold tabular-nums"
                  style={{ color: "var(--primary)", letterSpacing: "-0.03em" }}
                >
                  {s.value}
                </span>
                <span className="text-xs font-medium" style={{ color: "var(--on-surface-muted)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Browse by Category ────────────────────────────────────────── */}
        <section className="py-16 px-4 md:px-8 max-w-[1280px] mx-auto" aria-labelledby="cats-heading">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 id="cats-heading" className="text-2xl font-bold tracking-tight"
                style={{ color: "var(--primary)" }}>
                Browse by Category
              </h2>
              <p className="text-sm mt-1.5" style={{ color: "var(--on-surface-variant)" }}>
                Explore opportunities across Egypt's key industries.
              </p>
            </div>
            <Link href="/jobs" className="hidden md:flex items-center gap-1.5 text-sm font-semibold"
              style={{ color: "var(--accent)" }}>
              All Categories <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TOP_CATEGORIES.map(({ key, icon }) => (
              <Link
                key={key}
                href={`/jobs?category=${encodeURIComponent(key)}`}
                className="flex flex-col items-center gap-3 p-5 rounded-xl border text-center transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 group"
                style={{
                  background: "var(--surface-container-lowest)",
                  borderColor: "var(--outline-variant)",
                }}
                aria-label={`Browse ${CATEGORY_LABELS[key] ?? key} jobs`}
              >
                <span
                  className="transition-colors"
                  style={{ color: "var(--on-surface-variant)" }}
                  aria-hidden="true"
                >
                  {icon}
                </span>
                <span className="text-xs font-semibold leading-tight"
                  style={{ color: "var(--primary)" }}>
                  {CATEGORY_LABELS[key] ?? key}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Featured Jobs ─────────────────────────────────────────────── */}
        <section
          className="py-16 px-4 md:px-8"
          style={{ background: "var(--surface-container-low)" }}
          aria-labelledby="featured-heading"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 id="featured-heading" className="text-2xl font-bold tracking-tight"
                  style={{ color: "var(--primary)" }}>
                  Latest Opportunities
                </h2>
                <p className="text-sm mt-1.5" style={{ color: "var(--on-surface-variant)" }}>
                  Recent roles updated daily from Wuzzuf.
                </p>
              </div>
              <Link
                href="/jobs"
                className="hidden md:flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: "var(--accent)" }}
              >
                View all <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* ── Employer CTA ──────────────────────────────────────────────── */}
        <section
          className="py-20 px-4 md:px-8"
          style={{ background: "var(--primary)" }}
          aria-label="Post a job"
        >
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <h2 className="text-3xl font-bold text-white leading-tight">
                Hire top talent in Egypt
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "rgba(200,215,255,0.85)" }}>
                Reach thousands of qualified professionals across Egypt.
                Post a vacancy and start receiving applications today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/post-job"
                className="px-7 py-3 text-sm font-semibold rounded-lg text-center transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "white", color: "var(--primary)" }}
              >
                Post a Job
              </Link>
              <Link
                href="/jobs"
                className="px-7 py-3 text-sm font-semibold rounded-lg border text-center text-white hover:bg-white/10 transition-all"
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
