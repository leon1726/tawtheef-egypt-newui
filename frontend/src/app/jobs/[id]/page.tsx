import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin, Clock, Briefcase, ArrowLeft,
  Building2, GraduationCap, ExternalLink, Star, ChevronRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JobCard from "@/components/jobs/JobCard";
import ApplyButton from "@/components/jobs/ApplyButton";
import BookmarkButton from "@/components/jobs/BookmarkButton";
import ShareButton from "@/components/jobs/ShareButton";
import { getJobById, getRelatedJobs, formatSalary, parseSkills, applyUrl } from "@/lib/api";

interface Props {
  params: Promise<{ id: string }>;
}

/* Same deterministic avatar logic as JobCard */
const AVATAR_COLORS = [
  ["#EBF4FF", "#1D6FCA"], ["#F0FDF4", "#166534"], ["#FFF7ED", "#9A3412"],
  ["#F5F3FF", "#5B21B6"], ["#FFF1F2", "#9F1239"], ["#F0F9FF", "#0369A1"],
  ["#FEFCE8", "#854D0E"], ["#FDF4FF", "#7E22CE"],
];
function companyAvatar(company: string) {
  const initials = company.split(/\s+/).filter(Boolean).slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "").join("");
  const [bg, fg] = AVATAR_COLORS[company.charCodeAt(0) % AVATAR_COLORS.length];
  return { initials, bg, fg };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job     = await getJobById(id);
  if (!job) return {};

  const title = `${job.title} at ${job.company} | Tawtheef Egypt`;
  const description = job.description
    ? job.description.slice(0, 155).replace(/\s+/g, " ").trim() + "…"
    : `${job.title} at ${job.company} — ${job.location}. Apply on Tawtheef Egypt.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: "/logo.png", width: 512, height: 512, alt: "Tawtheef Egypt" }],
    },
    twitter: { card: "summary", title, description },
    alternates: { canonical: `/jobs/${id}` },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const [job, related] = await Promise.all([getJobById(id), getRelatedJobs(id)]);
  if (!job) notFound();

  const salary    = formatSalary(job.salary);
  const skills    = parseSkills(job.skills);
  const applyHref = applyUrl(job);
  const avatar    = companyAvatar(job.company);

  const chips = [
    job.job_type    && { icon: <Briefcase size={13} />, text: job.job_type },
    job.experience  && { icon: <Star size={13} />,      text: job.experience },
    job.location    && { icon: <MapPin size={13} />,    text: job.location.split(",")[0] },
    job.posted_date && { icon: <Clock size={13} />,     text: `Posted ${job.posted_date}` },
    job.education && job.education !== "Not Specified" && {
      icon: <GraduationCap size={13} />, text: job.education,
    },
  ].filter(Boolean) as { icon: React.ReactNode; text: string }[];

  const overviewRows = [
    ["Category",     job.category],
    ["Location",     job.location],
    ["Experience",   job.experience],
    ["Career Level", job.career_level],
    ["Education",    job.education !== "Not Specified" ? job.education : null],
    ["Job Type",     job.job_type],
    ["Posted",       job.posted_date],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <>
      <Navbar />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            title: job.title,
            description: job.description?.slice(0, 500) || job.title,
            hiringOrganization: { "@type": "Organization", name: job.company },
            jobLocation: {
              "@type": "Place",
              address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "EG" },
            },
            datePosted: job.scraped_at?.split("T")[0],
            employmentType: "FULL_TIME",
          }),
        }}
      />

      <main className="pt-16">
        {/* Breadcrumb */}
        <nav
          className="border-b px-4 md:px-8 py-3"
          style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}
          aria-label="Breadcrumb"
        >
          <ol className="max-w-[1280px] mx-auto flex flex-wrap items-center gap-1 text-xs list-none"
            style={{ color: "var(--on-surface-muted)" }}>
            <li><Link href="/" className="hover:underline" style={{ color: "var(--on-surface-variant)" }}>Home</Link></li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li><Link href="/jobs" className="hover:underline" style={{ color: "var(--on-surface-variant)" }}>Jobs</Link></li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li>
              <Link
                href={`/jobs?category=${encodeURIComponent(job.category)}`}
                className="hover:underline"
                style={{ color: "var(--on-surface-variant)" }}
              >
                {job.category.split(" / ")[0]}
              </Link>
            </li>
            <li aria-hidden="true"><ChevronRight size={12} /></li>
            <li className="truncate max-w-[180px]" aria-current="page" style={{ color: "var(--on-surface)" }}>
              {job.title}
            </li>
          </ol>
        </nav>

        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── Main ── */}
            <article className="flex-1 min-w-0 space-y-5">
              <Link
                href="/jobs"
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                style={{ color: "var(--accent)" }}
              >
                <ArrowLeft size={15} aria-hidden="true" /> Back to jobs
              </Link>

              {/* Header card */}
              <div
                className="rounded-xl border p-6 md:p-8"
                style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  {/* Company avatar */}
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold shrink-0 select-none"
                    style={{ background: avatar.bg, color: avatar.fg }}
                    aria-hidden="true"
                  >
                    {avatar.initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl md:text-[1.75rem] font-bold leading-snug"
                      style={{ color: "var(--primary)" }}>
                      {job.title}
                    </h1>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Building2 size={13} style={{ color: "var(--on-surface-muted)" }} aria-hidden="true" />
                      <span className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
                        {job.company}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start">
                    <BookmarkButton jobId={job.id} jobTitle={job.title} size="md" />
                    <ShareButton title={`${job.title} at ${job.company}`} />
                  </div>
                </div>

                {/* Info chips */}
                <ul className="flex flex-wrap gap-2 mt-5 list-none" aria-label="Job details">
                  {chips.map((chip) => (
                    <li
                      key={chip.text}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border"
                      style={{
                        borderColor: "var(--outline-variant)",
                        color: "var(--on-surface-variant)",
                        background: "var(--surface-container-low)",
                      }}
                    >
                      <span style={{ color: "var(--accent)" }} aria-hidden="true">{chip.icon}</span>
                      {chip.text}
                    </li>
                  ))}
                </ul>

                {/* Mobile CTA */}
                <div className="mt-5 lg:hidden">
                  <ApplyButton job={job} />
                </div>
              </div>

              {/* Description */}
              {job.description && (
                <section
                  className="rounded-xl border p-6 md:p-8 space-y-4"
                  style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}
                  aria-labelledby="desc-heading"
                >
                  <h2 id="desc-heading" className="text-base font-semibold"
                    style={{ color: "var(--primary)" }}>
                    Job Description
                  </h2>
                  <div
                    className="text-sm leading-[1.75] whitespace-pre-line"
                    style={{ color: "var(--on-surface-variant)" }}
                  >
                    {job.description}
                  </div>
                </section>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <section
                  className="rounded-xl border p-6 md:p-8 space-y-4"
                  style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}
                  aria-labelledby="skills-heading"
                >
                  <h2 id="skills-heading" className="text-base font-semibold"
                    style={{ color: "var(--primary)" }}>
                    Skills Required
                  </h2>
                  <ul className="flex flex-wrap gap-2 list-none">
                    {skills.map((s) => (
                      <li key={s}>
                        <Link
                          href={`/jobs?q=${encodeURIComponent(s)}`}
                          className="badge badge-gray hover:opacity-75 transition-opacity"
                          style={{ textDecoration: "none" }}
                        >
                          {s}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </article>

            {/* ── Sidebar ── */}
            <aside className="w-full lg:w-72 shrink-0" aria-label="Apply and overview">
              <div
                className="rounded-xl border p-6 sticky top-24 space-y-5"
                style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}
              >
                {/* Salary */}
                <div
                  className="p-4 rounded-lg"
                  style={{
                    background: salary ? "var(--accent-light)" : "var(--surface-container-low)",
                  }}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                    style={{ color: "var(--on-surface-muted)" }}>Salary</p>
                  <p className="text-lg font-bold"
                    style={{
                      color: salary ? "var(--primary)" : "var(--on-surface-muted)",
                      fontVariantNumeric: "tabular-nums",
                    }}>
                    {salary ?? "Confidential"}
                  </p>
                </div>

                {/* Primary apply */}
                <a
                  href={applyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-3 text-sm gap-2"
                  aria-label={`Apply for ${job.title} on Wuzzuf`}
                >
                  Apply on Wuzzuf <ExternalLink size={14} />
                </a>

                <ApplyButton
                  job={job}
                  label="Save & Apply Later"
                  className="btn-secondary w-full py-2.5 text-sm font-semibold"
                />

                <div className="flex gap-2">
                  <BookmarkButton jobId={job.id} jobTitle={job.title} size="md" />
                  <ShareButton title={`${job.title} at ${job.company}`} />
                </div>

                {/* Details table */}
                <dl
                  className="pt-4 border-t space-y-3"
                  style={{ borderColor: "var(--outline-variant)" }}
                  aria-label="Job overview"
                >
                  {overviewRows.map(([label, value]) => (
                    <div key={label} className="flex justify-between items-start gap-3">
                      <dt className="text-xs shrink-0" style={{ color: "var(--on-surface-muted)" }}>{label}</dt>
                      <dd className="text-xs font-medium text-right" style={{ color: "var(--on-surface)" }}>{value}</dd>
                    </div>
                  ))}
                </dl>

                {/* Related searches */}
                <div className="pt-4 border-t space-y-1.5" style={{ borderColor: "var(--outline-variant)" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "var(--on-surface-muted)" }}>Related Searches</p>
                  {[
                    { label: `${job.category.split(" / ")[0]} Jobs`, href: `/jobs?category=${encodeURIComponent(job.category)}` },
                    { label: `${job.title.split(" ").slice(0, 3).join(" ")}`, href: `/jobs?q=${encodeURIComponent(job.title.split(" ").slice(0, 3).join(" "))}` },
                    { label: `Jobs in ${job.location.split(",")[0]}`, href: `/jobs?location=${encodeURIComponent(job.location.split(",")[0])}` },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-xs py-1 hover:underline"
                      style={{ color: "var(--accent)" }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Related jobs */}
          {related.length > 0 && (
            <section className="mt-16" aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-xl font-bold tracking-tight mb-6"
                style={{ color: "var(--primary)" }}>
                Similar Roles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((rj) => <JobCard key={rj.id} job={rj} />)}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
