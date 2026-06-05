import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin, Clock, Briefcase, ArrowLeft,
  Building2, GraduationCap, ExternalLink, Star,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JobCard from "@/components/jobs/JobCard";
import ApplyButton from "@/components/jobs/ApplyButton";
import BookmarkButton from "@/components/jobs/BookmarkButton";
import ShareButton from "@/components/jobs/ShareButton";
import { getJobById, getRelatedJobs, formatSalary, parseSkills, applyUrl } from "@/lib/api";
import { categoryIcon } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job     = await getJobById(id);
  if (!job) return {};

  const title       = `${job.title} at ${job.company} | Tawtheef Egypt`;
  const description = job.description
    ? job.description.slice(0, 155).replace(/\s+/g, " ").trim() + "…"
    : `${job.title} at ${job.company} in ${job.location}. Apply now on Tawtheef Egypt.`;

  const schema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: job.title,
    description: description,
    hiringOrganization: { "@type": "Organization", name: job.company },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "EG",
      },
    },
    datePosted: job.scraped_at ? job.scraped_at.split("T")[0] : undefined,
    employmentType: job.job_type?.toUpperCase().replace(/\s+/g, "_") || "FULL_TIME",
    ...(formatSalary(job.salary) ? { baseSalary: {
      "@type": "MonetaryAmount",
      currency: "EGP",
      value: { "@type": "QuantitativeValue", description: job.salary },
    }} : {}),
  };

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
    other: { "application-ld+json": JSON.stringify(schema) },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const [job, related] = await Promise.all([
    getJobById(id),
    getRelatedJobs(id),
  ]);

  if (!job) notFound();

  const salary    = formatSalary(job.salary);
  const skills    = parseSkills(job.skills);
  const icon      = categoryIcon(job.category);
  const applyHref = applyUrl(job);

  const chips = [
    job.job_type      && { icon: <Briefcase size={13} />, text: job.job_type },
    job.experience    && { icon: <Star size={13} />,      text: job.experience },
    job.location      && { icon: <MapPin size={13} />,    text: job.location.split(",")[0] },
    job.posted_date   && { icon: <Clock size={13} />,     text: `Posted ${job.posted_date}` },
    job.education     && job.education !== "Not Specified" && { icon: <GraduationCap size={13} />, text: job.education },
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

      {/* Schema.org JobPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
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
        }) }}
      />

      <main className="pt-16">
        {/* Breadcrumb */}
        <nav className="border-b px-4 py-3"
          style={{ background: "var(--surface-container-low)", borderColor: "var(--outline-variant)" }}
          aria-label="Breadcrumb">
          <ol className="max-w-[1280px] mx-auto flex flex-wrap items-center gap-1.5 text-xs list-none"
            style={{ color: "var(--on-surface-variant)" }}>
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/jobs" className="hover:underline">Jobs</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={`/jobs?category=${encodeURIComponent(job.category)}`} className="hover:underline">
              {job.category.split(" / ")[0]}
            </Link></li>
            <li aria-hidden="true">/</li>
            <li style={{ color: "var(--on-surface)" }} aria-current="page" className="truncate max-w-[200px]">
              {job.title}
            </li>
          </ol>
        </nav>

        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── Main Column ── */}
            <article className="flex-1 min-w-0 space-y-5">
              <Link href="/jobs"
                className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                style={{ color: "var(--primary-container)" }}>
                <ArrowLeft size={15} aria-hidden="true" /> Back to jobs
              </Link>

              {/* Header Card */}
              <div className="rounded-2xl border p-6 md:p-8"
                style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 select-none"
                    style={{ background: "var(--surface-container-low)" }} aria-hidden="true">
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl md:text-3xl font-bold leading-tight"
                      style={{ color: "var(--primary)" }}>{job.title}</h1>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Building2 size={13} style={{ color: "var(--on-surface-variant)" }} aria-hidden="true" />
                      <span className="text-sm font-medium" style={{ color: "var(--on-surface-variant)" }}>
                        {job.company}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <BookmarkButton jobId={job.id} jobTitle={job.title} size="md" />
                    <ShareButton title={`${job.title} at ${job.company}`} />
                  </div>
                </div>

                {/* Info chips */}
                <ul className="flex flex-wrap gap-2 mt-5 list-none" aria-label="Job details">
                  {chips.map((chip) => (
                    <li key={chip.text}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
                      style={{ borderColor: "var(--outline-variant)", color: "var(--on-surface-variant)", background: "var(--surface-container-low)" }}>
                      <span style={{ color: "var(--primary-container)" }} aria-hidden="true">{chip.icon}</span>
                      {chip.text}
                    </li>
                  ))}
                </ul>

                {/* Mobile apply */}
                <div className="mt-5 lg:hidden">
                  <ApplyButton job={job} />
                </div>
              </div>

              {/* Description */}
              {job.description && (
                <section className="rounded-2xl border p-6 md:p-8 space-y-4"
                  style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}
                  aria-labelledby="desc-heading">
                  <h2 id="desc-heading" className="text-lg font-semibold" style={{ color: "var(--primary)" }}>
                    Job Description
                  </h2>
                  <div className="text-sm leading-relaxed whitespace-pre-line"
                    style={{ color: "var(--on-surface-variant)" }}>
                    {job.description}
                  </div>
                </section>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <section className="rounded-2xl border p-6 md:p-8 space-y-4"
                  style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}
                  aria-labelledby="skills-heading">
                  <h2 id="skills-heading" className="text-lg font-semibold" style={{ color: "var(--primary)" }}>
                    Skills Required
                  </h2>
                  <ul className="flex flex-wrap gap-2 list-none" aria-label="Required skills">
                    {skills.map((s) => (
                      <li key={s}>
                        <Link
                          href={`/jobs?q=${encodeURIComponent(s)}`}
                          className="badge-location hover:opacity-80 transition-opacity"
                          aria-label={`Search jobs requiring ${s}`}>
                          {s}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </article>

            {/* ── Sidebar ── */}
            <aside className="w-full lg:w-80 flex-shrink-0" aria-label="Apply and job overview">
              <div className="rounded-2xl border p-6 sticky top-24 space-y-5"
                style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>

                {/* Salary */}
                {salary ? (
                  <div className="p-4 rounded-xl" style={{ background: "var(--gold-accent-light)" }}>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: "var(--on-tertiary-fixed-variant)" }}>Salary</p>
                    <p className="text-lg font-bold leading-snug"
                      style={{ color: "var(--primary)", fontFamily: "monospace" }}>{salary}</p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl" style={{ background: "var(--surface-container-low)" }}>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-1"
                      style={{ color: "var(--on-surface-variant)" }}>Salary</p>
                    <p className="text-sm font-semibold" style={{ color: "var(--outline)" }}>Confidential</p>
                  </div>
                )}

                {/* Primary CTA */}
                <a href={applyHref} target="_blank" rel="noopener noreferrer"
                  className="btn-primary w-full py-3 text-sm font-semibold flex items-center justify-center gap-2"
                  aria-label={`Apply for ${job.title} on Wuzzuf`}>
                  Apply on Wuzzuf <ExternalLink size={14} />
                </a>

                <ApplyButton job={job} label="Learn More & Apply"
                  className="btn-secondary w-full py-2.5 text-sm font-semibold" />

                <div className="flex gap-2">
                  <BookmarkButton jobId={job.id} jobTitle={job.title} size="md" />
                  <ShareButton title={`${job.title} at ${job.company}`} />
                </div>

                {/* Overview */}
                <dl className="pt-4 border-t space-y-3"
                  style={{ borderColor: "var(--outline-variant)" }} aria-label="Job overview">
                  {overviewRows.map(([label, value]) => (
                    <div key={label} className="flex justify-between items-start gap-3">
                      <dt className="text-xs flex-shrink-0" style={{ color: "var(--on-surface-variant)" }}>{label}</dt>
                      <dd className="text-xs font-semibold text-right" style={{ color: "var(--on-surface)" }}>{value}</dd>
                    </div>
                  ))}
                </dl>

                {/* Related searches */}
                <div className="pt-4 border-t space-y-2"
                  style={{ borderColor: "var(--outline-variant)" }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-3"
                    style={{ color: "var(--on-surface-variant)" }}>Find Related Jobs</p>
                  {[
                    { label: `All ${job.category.split(" / ")[0]} jobs`, href: `/jobs?category=${encodeURIComponent(job.category)}` },
                    { label: `${job.title.split(" ").slice(0, 3).join(" ")} in Egypt`, href: `/jobs?q=${encodeURIComponent(job.title.split(" ").slice(0, 3).join(" "))}` },
                    { label: `Jobs in ${job.location.split(",")[0]}`, href: `/jobs?location=${encodeURIComponent(job.location.split(",")[0])}` },
                  ].map((link) => (
                    <Link key={link.href} href={link.href}
                      className="block text-xs py-1.5 hover:underline"
                      style={{ color: "var(--primary-container)" }}>
                      → {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          {/* Related Jobs */}
          {related.length > 0 && (
            <section className="mt-16" aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-2xl font-bold tracking-tight mb-6"
                style={{ color: "var(--primary)" }}>Similar Opportunities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
