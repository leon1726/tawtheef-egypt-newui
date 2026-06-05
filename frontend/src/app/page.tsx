import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/jobs/SearchBar";
import JobCard from "@/components/jobs/JobCard";
import { getFeaturedJobs, getStats } from "@/lib/api";
import { CATEGORY_LABELS, categoryIcon } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tawtheef Egypt | توظيف مصر — Latest Jobs",
  description:
    "Tawtheef Egypt — Find jobs in Egypt. توظيف مصر - أحدث الوظائف في مصر. Thousands of opportunities across Cairo, Giza, Alexandria and beyond.",
  openGraph: {
    title: "Tawtheef Egypt | توظيف مصر",
    description: "Find your next career move in Egypt. Browse thousands of jobs.",
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
  "Software Engineer", "Marketing Manager", "Data Analyst",
  "Civil Engineer", "Financial Analyst", "Product Manager",
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
        {/* Hero */}
        <section
          className="relative py-20 md:py-28 px-4 overflow-hidden"
          style={{ background: "var(--background)" }}
          aria-labelledby="hero-heading"
        >
          <div className="absolute inset-0 -z-10"
            style={{ background: "radial-gradient(ellipse at 70% 0%, rgba(0,33,71,0.06) 0%, transparent 60%)" }} />
          <div className="hidden md:block absolute bottom-0 right-0 w-1/2 max-w-2xl -z-10 pointer-events-none select-none">
            <Image src="/cairo-skyline.png" alt="" width={900} height={400}
              className="w-full h-auto object-contain object-bottom opacity-30"
              priority sizes="(max-width: 768px) 0px, 50vw" />
          </div>

          <div className="max-w-[1280px] mx-auto flex flex-col items-center text-center gap-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
              style={{ background: "var(--gold-accent-light)", color: "var(--on-tertiary-fixed-variant)", borderColor: "rgba(166,132,64,0.25)" }}>
              🇪🇬 Egypt&apos;s #1 Job Board · لوحة وظائف مصر
            </div>

            <div className="space-y-4 max-w-3xl">
              <h1 id="hero-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
                style={{ color: "var(--primary)" }}>
                Find Your Next<br />
                <span style={{ color: "var(--primary-container)" }}>Job in Egypt</span>
              </h1>
              <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
                style={{ color: "var(--on-surface-variant)" }}>
                ابحث عن فرصتك القادمة في مصر — Thousands of opportunities across all industries, updated daily.
              </p>
            </div>

            <SearchBar />

            <div className="flex flex-wrap justify-center gap-2 items-center">
              <span className="text-xs font-medium" style={{ color: "var(--on-surface-variant)" }}>Popular:</span>
              {TRENDING.map((term) => (
                <Link key={term} href={`/jobs?q=${encodeURIComponent(term)}`}
                  className="text-xs px-3 py-1.5 rounded-full border transition-all hover:border-primary-container"
                  style={{ color: "var(--primary-container)", borderColor: "var(--outline-variant)", fontWeight: 500 }}>
                  {term}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-10 px-4" style={{ background: "var(--surface-container-low)" }}
          aria-label="Platform statistics">
          <div className="max-w-[1280px] mx-auto grid grid-cols-3 gap-4 md:gap-6">
            {[
              { value: stats.total_jobs.toLocaleString() + "+", label: "Active Jobs" },
              { value: stats.total_companies.toLocaleString() + "+", label: "Companies" },
              { value: stats.total_categories.toString(), label: "Categories" },
            ].map((s) => (
              <div key={s.label}
                className="flex flex-col items-center text-center py-5 px-4 rounded-2xl border gap-1"
                style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
                <span className="text-3xl md:text-4xl font-bold tracking-tight"
                  style={{ color: "var(--primary)", fontFamily: "monospace" }}>{s.value}</span>
                <span className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--on-surface-variant)" }}>{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Browse by Category */}
        <section className="py-16 px-4 max-w-[1280px] mx-auto" aria-labelledby="cats-heading">
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-1">
              <h2 id="cats-heading" className="text-2xl font-bold tracking-tight"
                style={{ color: "var(--primary)" }}>Browse by Category</h2>
              <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
                Explore opportunities across Egypt&apos;s key industries.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TOP_CATEGORIES.map((cat) => (
              <Link key={cat} href={`/jobs?category=${encodeURIComponent(cat)}`}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-all hover:-translate-y-0.5 hover:shadow-md group"
                style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}
                aria-label={`Browse ${CATEGORY_LABELS[cat] ?? cat} jobs`}>
                <span className="text-2xl" aria-hidden="true">{categoryIcon(cat)}</span>
                <span className="text-xs font-semibold" style={{ color: "var(--primary)" }}>
                  {CATEGORY_LABELS[cat] ?? cat}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-16 px-4 max-w-[1280px] mx-auto" aria-labelledby="featured-heading">
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-1">
              <h2 id="featured-heading" className="text-2xl font-bold tracking-tight"
                style={{ color: "var(--primary)" }}>Latest Opportunities</h2>
              <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
                Hand-picked recent roles updated daily from Wuzzuf.
              </p>
            </div>
            <Link href="/jobs" className="hidden md:flex items-center gap-1.5 text-sm font-semibold hover:opacity-70"
              style={{ color: "var(--primary-container)" }}>
              View All <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/jobs" className="btn-secondary px-8 py-3 text-sm inline-flex items-center gap-2">
              Show All {stats.total_jobs.toLocaleString()}+ Listings <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 relative overflow-hidden" style={{ background: "var(--primary-container)" }}
          aria-label="Post a job call to action">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-3 text-white max-w-xl text-center md:text-left">
              <h2 className="text-3xl font-bold leading-tight">Ready to hire elite talent in Egypt?</h2>
              <p style={{ color: "rgba(214,227,255,0.8)" }} className="text-base leading-relaxed">
                Access our curated network of professionals and reach thousands of qualified candidates instantly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/post-job"
                className="px-6 py-3 text-sm font-semibold rounded-xl text-center transition-all hover:-translate-y-0.5"
                style={{ background: "white", color: "var(--primary-container)" }}>
                Post a Job Now
              </Link>
              <Link href="/jobs"
                className="px-6 py-3 text-sm font-semibold rounded-xl border text-center text-white hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}>
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
