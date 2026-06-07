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
          className="relative min-h-[580px] flex items-center overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Background photo — uploaded hero image */}
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            className="object-cover object-top"
            priority
            sizes="100vw"
            aria-hidden="true"
          />
          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(0,10,30,0.92) 0%, rgba(0,15,45,0.78) 50%, rgba(0,10,30,0.55) 100%)",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-10 py-20 md:py-28">
            <div className="max-w-[620px] flex flex-col gap-7">
              {/* Logo badge */}
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="Tawtheef Egypt"
                  width={44}
                  height={44}
                  className="rounded-xl"
                />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.15em]"
                  style={{ color: "rgba(255,255,255,0.60)" }}
                >
                  Egypt&apos;s Professional Job Board
                </span>
              </div>

              <div className="space-y-4">
                <h1
                  id="hero-heading"
                  className="text-4xl md:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] tracking-tight text-white"
                >
                  Find Your Next<br />
                  <span style={{ color: "var(--tertiary-fixed-dim)" }}>
                    Job in Egypt
                  </span>
                </h1>
                <p
                  className="text-base md:text-[1.075rem] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.72)", maxWidth: "480px" }}
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
                  style={{ color: "var(--primary-container)" }}
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
                  Recent roles updated daily from top Egyptian employers.
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

        {/* ── Career Advice CTA ──────────────────────────────────────────── */}
        <section
          className="py-16 px-4"
          style={{ background: "var(--surface-container-lowest)" }}
          aria-label="Career advice"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="rounded-2xl overflow-hidden border grid md:grid-cols-2"
              style={{ borderColor: "var(--outline-variant)" }}>
              <div className="p-10 flex flex-col justify-center gap-5"
                style={{ background: "var(--surface-container-lowest)" }}>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--gold-accent)" }}>
                    Career Resource Center
                  </span>
                  <h2 className="text-2xl font-bold mt-2 leading-tight"
                    style={{ color: "var(--primary)" }}>
                    Expert Advice for Egyptian Professionals
                  </h2>
                  <p className="text-sm mt-3 leading-relaxed"
                    style={{ color: "var(--on-surface-variant)" }}>
                    Resume guides, interview tips, salary benchmarks, and career strategies
                    tailored for Egypt&apos;s job market.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Resume Writing", "Interview Prep", "Salary Insights", "Career Change"].map(tag => (
                    <span key={tag}
                      className="text-xs px-3 py-1.5 rounded-full font-medium"
                      style={{ background: "var(--gold-accent-light)", color: "var(--gold-accent)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href="/career-advice"
                  className="btn-primary px-6 py-3 text-sm font-semibold self-start inline-flex items-center gap-2">
                  Explore Career Guides <ArrowRight size={15} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3 p-6"
                style={{ background: "var(--surface-container-low)" }}>
                {[
                  { icon: "📄", label: "ATS-optimized resume tips", category: "Resume" },
                  { icon: "🎯", label: "20 most common interview questions", category: "Interview" },
                  { icon: "💰", label: "Egypt salary benchmarks 2025", category: "Salary" },
                  { icon: "🌐", label: "Land remote jobs internationally", category: "Remote" },
                ].map((item) => (
                  <Link key={item.label} href="/career-advice"
                    className="rounded-xl p-4 flex flex-col gap-2 border transition-all hover:shadow-sm hover:-translate-y-0.5"
                    style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-semibold uppercase tracking-wide"
                      style={{ color: "var(--gold-accent)" }}>
                      {item.category}
                    </span>
                    <p className="text-xs leading-snug font-medium"
                      style={{ color: "var(--on-surface)" }}>
                      {item.label}
                    </p>
                  </Link>
                ))}
              </div>
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
