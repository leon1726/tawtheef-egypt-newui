import Link from "next/link";
import { MapPin, Clock, ExternalLink, ArrowUpRight } from "lucide-react";
import type { Job, ViewMode } from "@/types";
import { formatSalary, parseSkills, applyUrl } from "@/lib/api";
import BookmarkButton from "./BookmarkButton";

interface Props {
  job: Job;
  view?: ViewMode;
}

/** Deterministic pastel background from company name */
const AVATAR_COLORS = [
  ["#EBF4FF", "#1D6FCA"],
  ["#F0FDF4", "#166534"],
  ["#FFF7ED", "#9A3412"],
  ["#F5F3FF", "#5B21B6"],
  ["#FFF1F2", "#9F1239"],
  ["#F0F9FF", "#0369A1"],
  ["#FEFCE8", "#854D0E"],
  ["#FDF4FF", "#7E22CE"],
];

function companyAvatar(company: string) {
  const initials = company
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  const idx = company.charCodeAt(0) % AVATAR_COLORS.length;
  const [bg, fg] = AVATAR_COLORS[idx];
  return { initials, bg, fg };
}

export default function JobCard({ job, view = "grid" }: Props) {
  const salary    = formatSalary(job.salary);
  const skills    = parseSkills(job.skills).slice(0, 3);
  const applyHref = applyUrl(job);
  const avatar    = companyAvatar(job.company);

  /* ── List view ── */
  if (view === "list") {
    return (
      <article
        className="job-card flex items-center gap-4"
        aria-label={`${job.title} at ${job.company}`}
      >
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 select-none"
          style={{ background: avatar.bg, color: avatar.fg }}
          aria-hidden="true"
        >
          {avatar.initials}
        </div>

        {/* Title + company */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm leading-snug truncate hover:underline"
            style={{ color: "var(--primary)", textUnderlineOffset: "2px" }}>
            <Link href={`/jobs/${job.id}`}>{job.title}</Link>
          </h3>
          <p className="text-xs truncate mt-0.5" style={{ color: "var(--on-surface-variant)" }}>
            {job.company}
          </p>
        </div>

        {/* Badges */}
        <div className="hidden md:flex items-center gap-1.5 shrink-0">
          {job.category && (
            <span className="badge badge-blue">{job.category.split(" / ")[0]}</span>
          )}
          {job.experience && (
            <span className="badge badge-gray">{job.experience}</span>
          )}
        </div>

        {/* Location */}
        <div className="hidden lg:flex items-center gap-1 text-xs shrink-0"
          style={{ color: "var(--on-surface-muted)" }}>
          <MapPin size={11} aria-hidden="true" />
          <span className="truncate max-w-[120px]">{job.location.split(",")[0]}</span>
        </div>

        {/* Salary + date */}
        <div className="shrink-0 text-right min-w-[90px]">
          {salary ? (
            <span className="text-xs font-semibold block"
              style={{ color: "var(--primary)", fontVariantNumeric: "tabular-nums" }}>
              {salary.split(" To ")[0].split(" EGP")[0]}
            </span>
          ) : (
            <span className="text-xs" style={{ color: "var(--on-surface-muted)" }}>Confidential</span>
          )}
          <div className="flex items-center gap-1 text-xs justify-end mt-0.5"
            style={{ color: "var(--on-surface-muted)" }}>
            <Clock size={10} aria-hidden="true" />
            <span>{job.posted_date}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <BookmarkButton jobId={job.id} jobTitle={job.title} />
          <Link
            href={`/jobs/${job.id}`}
            className="btn-outline px-3 py-1.5 text-xs font-semibold"
            aria-label={`View ${job.title}`}
          >
            View
          </Link>
        </div>
      </article>
    );
  }

  /* ── Grid view ── */
  return (
    <article
      className="job-card flex flex-col gap-4"
      aria-label={`${job.title} at ${job.company}`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center text-sm font-bold select-none"
          style={{ background: avatar.bg, color: avatar.fg }}
          aria-hidden="true"
        >
          {avatar.initials}
        </div>
        <BookmarkButton jobId={job.id} jobTitle={job.title} />
      </div>

      {/* Title + company + location */}
      <div className="space-y-1 flex-1">
        <h3
          className="font-semibold text-[15px] leading-snug hover:underline"
          style={{ color: "var(--primary)", textUnderlineOffset: "2px" }}
        >
          <Link href={`/jobs/${job.id}`}>{job.title}</Link>
        </h3>
        <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
          {job.company}
        </p>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--on-surface-muted)" }}>
          <MapPin size={12} aria-hidden="true" />
          <span className="truncate">{job.location.split(",")[0]}</span>
        </div>
      </div>

      {/* Skill badges */}
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5" aria-label="Key skills">
          {skills.map((s) => (
            <span key={s} className="badge badge-gray">{s}</span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-4 mt-auto border-t"
        style={{ borderColor: "var(--outline-variant)" }}
      >
        <div className="space-y-0.5">
          {salary ? (
            <span
              className="text-sm font-bold block"
              style={{ color: "var(--primary)", fontVariantNumeric: "tabular-nums" }}
            >
              {salary.split(" To ")[0].split(" EGP")[0]}
            </span>
          ) : (
            <span className="text-xs" style={{ color: "var(--on-surface-muted)" }}>
              Confidential
            </span>
          )}
          <div className="flex items-center gap-1 text-xs" style={{ color: "var(--on-surface-muted)" }}>
            <Clock size={10} aria-hidden="true" />
            <span>{job.posted_date}</span>
          </div>
        </div>

        <a
          href={applyHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary px-4 py-2 text-xs font-semibold gap-1.5"
          aria-label={`Apply for ${job.title} at ${job.company}`}
        >
          Apply <ExternalLink size={11} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
