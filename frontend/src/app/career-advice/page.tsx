import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Target, DollarSign, Globe } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Career Advice | Tawtheef Egypt",
  description:
    "Expert career advice, interview tips, resume guidance, and salary benchmarks for Egyptian professionals.",
};

const ARTICLES = [
  {
    category: "Resume Writing",
    icon: "📄",
    title: "How to Write a Resume That Gets Past ATS Systems in 2025",
    excerpt:
      "Applicant tracking systems reject up to 75% of resumes before a human ever sees them. Learn the exact formatting and keyword strategies that get you through.",
    readTime: "8 min read",
  },
  {
    category: "Interviews",
    icon: "🎯",
    title: "The 20 Most Common Interview Questions Asked in Egyptian Companies",
    excerpt:
      "From multinationals in Cairo to fast-growing startups, these are the questions that appear most frequently — with proven frameworks to answer each one.",
    readTime: "11 min read",
  },
  {
    category: "Salary",
    icon: "💰",
    title: "How to Negotiate Your Salary Without Losing the Offer",
    excerpt:
      "Salary negotiation is one of the most underutilized career skills. Discover when to bring it up and the exact phrases that open the conversation.",
    readTime: "9 min read",
  },
  {
    category: "LinkedIn",
    icon: "🔗",
    title: "Building a LinkedIn Profile That Attracts Recruiters in Egypt",
    excerpt:
      "LinkedIn is the primary sourcing tool for Egyptian recruiters. This guide breaks down every section and shows how to rank for the right searches.",
    readTime: "7 min read",
  },
  {
    category: "Remote Work",
    icon: "🌐",
    title: "How Egyptian Professionals Can Land Remote Jobs With International Companies",
    excerpt:
      "The global remote market is open to Egyptian talent like never before. We cover platforms, positioning strategies, and profile adjustments that lead to international offers.",
    readTime: "10 min read",
  },
  {
    category: "Career Change",
    icon: "🔄",
    title: "Making a Career Pivot at 30: A Practical Roadmap for Egyptian Professionals",
    excerpt:
      "Changing careers mid-way doesn't mean starting from zero. Learn how to transfer existing skills and build credibility in a new field within 6–12 months.",
    readTime: "13 min read",
  },
  {
    category: "Networking",
    icon: "🤝",
    title: "Professional Networking in Egypt: Building Relationships That Open Doors",
    excerpt:
      "In Egypt's relationship-driven market, who you know matters as much as what you know. Authentic networking strategies for Cairo, Alexandria, and online communities.",
    readTime: "8 min read",
  },
  {
    category: "Cover Letter",
    icon: "✉️",
    title: "Writing a Cover Letter That Hiring Managers Actually Read",
    excerpt:
      "Most cover letters say the same things. This guide shows you how to write an opening paragraph that creates genuine curiosity.",
    readTime: "6 min read",
  },
  {
    category: "First Job",
    icon: "🚀",
    title: "Fresh Graduate Survival Guide: Your First 90 Days at a New Job in Egypt",
    excerpt:
      "The first three months define how colleagues and managers perceive you for the rest of your tenure. Learn the unwritten rules that matter most.",
    readTime: "10 min read",
  },
  {
    category: "Leadership",
    icon: "👔",
    title: "From Individual Contributor to Manager: Making the Transition Successfully",
    excerpt:
      "The skills that made you a great performer won't automatically make you a great manager. This guide addresses the mindset shift and delegation challenges.",
    readTime: "12 min read",
  },
  {
    category: "Productivity",
    icon: "⏱️",
    title: "Time Management Strategies for the Ambitious Egyptian Professional",
    excerpt:
      "Between long commutes, family obligations, and a demanding job market, managing your time effectively is a competitive advantage.",
    readTime: "7 min read",
  },
  {
    category: "Personal Brand",
    icon: "⭐",
    title: "Building a Professional Personal Brand That Drives Inbound Opportunities",
    excerpt:
      "Professionals who actively shape how they're perceived online receive more unsolicited opportunities. A step-by-step personal branding framework.",
    readTime: "9 min read",
  },
];

const RESOURCES = [
  { icon: "📋", label: "CV Templates", desc: "ATS-optimized, designed for the Egyptian and regional market.", cta: "Download Free" },
  { icon: "✉️", label: "Cover Letter Guide", desc: "A complete framework for writing cover letters that distinguish you.", cta: "Read Guide" },
  { icon: "✅", label: "Interview Checklist", desc: "Step-by-step preparation from 48 hours before the interview to follow-up.", cta: "Get Checklist" },
  { icon: "📅", label: "Career Planning", desc: "A 5-year career planning worksheet with milestone tracking and skills gap analysis.", cta: "Start Planning" },
  { icon: "🤝", label: "Networking Guide", desc: "Build meaningful professional relationships in Egypt's business community.", cta: "Read Guide" },
  { icon: "🔗", label: "LinkedIn Optimization", desc: "Build a LinkedIn profile that consistently attracts recruiter outreach.", cta: "Optimize Now" },
];

const SECTORS = [
  { name: "Technology", tag: "High Growth", demand: 92, desc: "Egypt's tech sector is experiencing exceptional growth. Software developers, data engineers, and cybersecurity professionals are in sustained high demand.", color: "#1D4ED8", bg: "#EFF6FF" },
  { name: "Finance & Banking", tag: "Growing", demand: 78, desc: "Financial services remain one of Egypt's most stable employment sectors. Digital banking transformation is creating new roles in fintech and risk management.", color: "#065F46", bg: "#ECFDF5" },
  { name: "Healthcare", tag: "Strong", demand: 85, desc: "Healthcare professionals experience strong demand across public and private sectors, driven by expansion of private hospital networks.", color: "#9F1239", bg: "#FFF1F2" },
  { name: "Sales & Business Dev", tag: "Stable", demand: 82, desc: "Sales roles remain highly abundant, with particularly strong demand in B2B technology sales, pharmaceutical sales, and real estate.", color: "#92400E", bg: "#FFFBEB" },
  { name: "Customer Service", tag: "High Volume", demand: 88, desc: "Egypt's BPO and customer service industry is among the largest in the region. English-speaking agents enjoy strong bargaining power.", color: "#047857", bg: "#ECFDF5" },
  { name: "Remote Work", tag: "Expanding", demand: 74, desc: "Remote-first opportunities for Egyptian professionals are growing significantly, especially in software development and digital marketing.", color: "#7E22CE", bg: "#F5F3FF" },
];

const SALARIES = [
  { role: "Software Engineer", range: "6,000 – 30,000", unit: "EGP / month", levels: [{ label: "Junior (0–2 yrs)", val: "6k–10k" }, { label: "Mid-level (3–5 yrs)", val: "12k–20k" }, { label: "Senior (6+ yrs)", val: "22k–30k+" }], badge: "High Demand", badgeColor: "#1D4ED8" },
  { role: "Accountant", range: "4,000 – 18,000", unit: "EGP / month", levels: [{ label: "Junior (0–2 yrs)", val: "4k–7k" }, { label: "Mid-level (3–5 yrs)", val: "8k–13k" }, { label: "Senior (6+ yrs)", val: "14k–18k+" }], badge: "Stable Sector", badgeColor: "#065F46" },
  { role: "Sales Executive", range: "5,000 – 25,000", unit: "EGP / month", levels: [{ label: "Junior (0–2 yrs)", val: "5k–9k" }, { label: "Mid-level (3–5 yrs)", val: "10k–16k" }, { label: "Senior (6+ yrs)", val: "18k–25k+" }], badge: "Commission Upside", badgeColor: "#92400E" },
  { role: "Digital Marketer", range: "5,000 – 22,000", unit: "EGP / month", levels: [{ label: "Junior (0–2 yrs)", val: "5k–8k" }, { label: "Mid-level (3–5 yrs)", val: "9k–15k" }, { label: "Senior (6+ yrs)", val: "16k–22k+" }], badge: "Growing Demand", badgeColor: "#7E22CE" },
  { role: "Customer Support", range: "5,000 – 15,000", unit: "EGP / month", levels: [{ label: "Entry Level", val: "5k–8k" }, { label: "Specialist", val: "9k–12k" }, { label: "Team Lead", val: "12k–15k+" }], badge: "High Availability", badgeColor: "#047857" },
  { role: "Graphic Designer", range: "4,500 – 20,000", unit: "EGP / month", levels: [{ label: "Junior (0–2 yrs)", val: "4.5k–7k" }, { label: "Mid-level (3–5 yrs)", val: "8k–14k" }, { label: "Senior (6+ yrs)", val: "15k–20k+" }], badge: "Creative Sector", badgeColor: "#9A3412" },
];

export default function CareerAdvicePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* ── Hero ── */}
        <section
          className="py-16 px-4 border-b"
          style={{ background: "var(--primary-container)", borderColor: "rgba(255,255,255,0.1)" }}
          aria-labelledby="career-heading"
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="max-w-2xl space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--tertiary-fixed-dim)" }}>
                Career Resource Center
              </span>
              <h1
                id="career-heading"
                className="text-4xl md:text-5xl font-bold leading-tight text-white"
              >
                Career Advice<br />
                <span style={{ color: "var(--tertiary-fixed-dim)" }}>النصائح المهنية</span>
              </h1>
              <p className="text-base leading-relaxed" style={{ color: "rgba(214,227,255,0.80)" }}>
                Expert guidance, market insights, and practical strategies to help professionals
                across Egypt navigate their career journey.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 pt-2">
                {[
                  { value: "50+", label: "Career Guides" },
                  { value: "100+", label: "Interview Tips" },
                  { value: "25+", label: "Salary Insights" },
                  { value: "10k+", label: "Monthly Readers" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col gap-0.5">
                    <span className="text-2xl font-bold text-white tabular-nums">{s.value}</span>
                    <span className="text-xs font-medium" style={{ color: "rgba(214,227,255,0.65)" }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Feature badges ── */}
        <div className="border-b px-4 py-3" style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
          <div className="max-w-[1280px] mx-auto flex flex-wrap gap-3">
            {["Expert-curated", "Egypt focused", "Updated weekly", "Free to access"].map((b) => (
              <span key={b} className="text-xs font-medium px-3 py-1 rounded-full"
                style={{ background: "var(--surface-container-low)", color: "var(--on-surface-variant)" }}>
                ✓ {b}
              </span>
            ))}
          </div>
        </div>

        {/* ── Featured Guide ── */}
        <section className="py-14 px-4" style={{ background: "var(--surface-container-low)" }}>
          <div className="max-w-[1280px] mx-auto">
            <div className="rounded-2xl overflow-hidden border grid md:grid-cols-5"
              style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-lowest)" }}>
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center gap-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: "var(--gold-accent-light)", color: "var(--gold-accent)" }}>
                    Editor&apos;s Pick This Month
                  </span>
                  <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>Career Strategy · 12 min read</span>
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight" style={{ color: "var(--primary)" }}>
                    The Complete Guide to Navigating Your Career in Egypt&apos;s Evolving Job Market
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>
                    Egypt&apos;s professional landscape is transforming rapidly. From the rise of remote-first companies
                    to the increasing demand for bilingual talent, understanding market dynamics can be the difference
                    between stagnation and accelerated career growth.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: "var(--primary-container)" }}>CE</div>
                  <div>
                    <p className="text-xs font-semibold" style={{ color: "var(--on-surface)" }}>Career Experts Team</p>
                    <p className="text-xs" style={{ color: "var(--on-surface-variant)" }}>June 1, 2025 · Updated regularly</p>
                  </div>
                </div>
                <Link href="/career-advice"
                  className="btn-primary px-6 py-3 text-sm font-semibold self-start inline-flex items-center gap-2">
                  Read Full Guide <ArrowRight size={15} />
                </Link>
              </div>
              <div className="md:col-span-2 p-8 flex flex-col justify-center gap-4"
                style={{ background: "var(--surface-container-low)" }}>
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--on-surface-variant)" }}>
                  What you&apos;ll learn
                </p>
                {[
                  "Reading Egypt's job market signals",
                  "Positioning yourself for remote roles",
                  "Building bilingual career capital",
                  "Negotiating in the Egyptian market",
                  "Networking with purpose",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-xs font-bold" style={{ color: "var(--gold-accent)" }}>✓</span>
                    <span className="text-sm" style={{ color: "var(--on-surface)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Articles Grid ── */}
        <section className="py-14 px-4" style={{ background: "var(--background)" }}>
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-8 space-y-1">
              <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--primary)" }}>
                Latest Articles
              </h2>
              <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
                Practical, expert-written guides to help you grow professionally in the Egyptian market.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ARTICLES.map((article) => (
                <div
                  key={article.title}
                  className="job-card flex flex-col gap-3 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: "var(--gold-accent-light)", color: "var(--gold-accent)" }}>
                      {article.category}
                    </span>
                    <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>{article.readTime}</span>
                  </div>
                  <div className="text-2xl">{article.icon}</div>
                  <h3 className="text-sm font-bold leading-snug" style={{ color: "var(--primary)" }}>
                    {article.title}
                  </h3>
                  <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--on-surface-variant)" }}>
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: "var(--primary-container)" }}>
                    Read article <ArrowRight size={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Resources ── */}
        <section className="py-14 px-4" style={{ background: "var(--surface-container-low)" }}>
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-8 space-y-1">
              <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--primary)" }}>
                Tools &amp; Templates
              </h2>
              <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
                Professional-grade resources to give you a practical edge in the Egyptian job market.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RESOURCES.map((r) => (
                <div key={r.label}
                  className="rounded-2xl border p-6 flex flex-col gap-3 transition-all hover:shadow-sm hover:-translate-y-0.5"
                  style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
                  <div className="text-2xl">{r.icon}</div>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: "var(--primary)" }}>{r.label}</h3>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>{r.desc}</p>
                  </div>
                  <span className="text-xs font-semibold self-start mt-auto inline-flex items-center gap-1"
                    style={{ color: "var(--gold-accent)" }}>
                    {r.cta} <ArrowRight size={12} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Market Intelligence ── */}
        <section className="py-14 px-4" style={{ background: "var(--background)" }}>
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-8 space-y-1">
              <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--primary)" }}>
                Egypt Job Market Insights
              </h2>
              <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
                Sector-by-sector analysis of Egypt&apos;s most dynamic industries, updated quarterly.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SECTORS.map((s) => (
                <div key={s.name}
                  className="rounded-2xl border p-6 flex flex-col gap-3"
                  style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold" style={{ color: "var(--primary)" }}>{s.name}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: s.bg, color: s.color }}>
                      {s.tag}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>{s.desc}</p>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>Demand Level</span>
                      <span className="text-xs font-bold" style={{ color: s.color }}>{s.demand}%</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "var(--surface-container-high)" }}>
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${s.demand}%`, background: s.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Salary Benchmarks ── */}
        <section className="py-14 px-4" style={{ background: "var(--surface-container-low)" }}>
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-8 space-y-1">
              <h2 className="text-2xl font-bold tracking-tight" style={{ color: "var(--primary)" }}>
                Egypt Salary Benchmarks
              </h2>
              <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
                Monthly salary ranges for key roles across entry, mid, and senior levels.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SALARIES.map((s) => (
                <div key={s.role}
                  className="rounded-2xl border p-6 flex flex-col gap-4"
                  style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold" style={{ color: "var(--primary)" }}>{s.role}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0"
                      style={{ background: "var(--gold-accent-light)", color: "var(--gold-accent)" }}>
                      {s.badge}
                    </span>
                  </div>
                  <div>
                    <p className="text-xl font-bold tabular-nums" style={{ color: "var(--primary-container)" }}>
                      {s.range}
                    </p>
                    <p className="text-xs" style={{ color: "var(--on-surface-variant)" }}>{s.unit}</p>
                  </div>
                  <div className="space-y-2">
                    {s.levels.map((l) => (
                      <div key={l.label} className="flex justify-between items-center">
                        <span className="text-xs" style={{ color: "var(--on-surface-variant)" }}>{l.label}</span>
                        <span className="text-xs font-semibold tabular-nums" style={{ color: "var(--on-surface)" }}>{l.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-16 px-4"
          style={{ background: "var(--primary-container)" }}
        >
          <div className="max-w-[700px] mx-auto text-center space-y-5">
            <h2 className="text-3xl font-bold text-white">Ready to find your next role?</h2>
            <p className="text-base" style={{ color: "rgba(214,227,255,0.78)" }}>
              Browse thousands of opportunities across Egypt, updated daily from top employers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/jobs"
                className="px-8 py-3 text-sm font-semibold rounded-xl text-center transition-all hover:opacity-95"
                style={{ background: "white", color: "var(--primary-container)" }}>
                Browse Jobs
              </Link>
              <Link href="/jobs"
                className="px-8 py-3 text-sm font-semibold rounded-xl border text-center text-white hover:bg-white/10 transition-all"
                style={{ borderColor: "rgba(255,255,255,0.28)" }}>
                View All Categories
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
