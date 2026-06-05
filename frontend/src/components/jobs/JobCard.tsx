import Link from "next/link";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import type { Job, ViewMode } from "@/types";
import { formatSalary, parseSkills, applyUrl } from "@/lib/api";
import { categoryIcon } from "@/lib/utils";
import BookmarkButton from "./BookmarkButton";

interface Props {
  job: Job;
  view?: ViewMode;
}

export default function JobCard({ job, view = "grid" }: Props) {
  const salary    = formatSalary(job.salary);
  const skills    = parseSkills(job.skills).slice(0, 3);
  const icon      = categoryIcon(job.category);
  const applyHref = applyUrl(job);

  if (view === "list") {
    return (
      <article
        className="job-card flex items-center gap-4 group"
        aria-label={`${job.title} at ${job.company}`}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 select-none"
          style={{ background: "var(--surface-container-low)" }}
          aria-hidden="true"
        >
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm leading-snug truncate group-hover:underline"
            style={{ color: "var(--primary)", textDecorationColor: "var(--primary-container)" }}>
            <Link href={`/jobs/${job.id}`}>{job.title}</Link>
          </h3>
          <p className="text-xs truncate" style={{ color: "var(--on-surface-variant)" }}>
            {job.company}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-shrink-0">
          <span className="badge-type">{job.category.split(" / ")[0]}</span>
          {job.experience && <span className="badge-location">{job.experience}</span>}
        </div>

        <div className="hidden lg:flex items-center gap-1 text-xs flex-shrink-0"
          style={{ color: "var(--outline)" }}>
          <MapPin size={11} aria-hidden="true" />
          <span className="truncate max-w-32">{job.location.split(",")[0]}</span>
        </div>

        <div className="flex-shrink-0 text-right min-w-[80px]">
          {salary ? (
            <span className="text-xs font-bold block"
              style={{ color: "var(--primary-container)", fontFamily: "monospace" }}>
              {salary.split(" ").slice(0, 3).join(" ")}
            </span>
          ) : (
            <span className="text-xs" style={{ color: "var(--outline)" }}>Confidential</span>
          )}
          <div className="flex items-center gap-1 text-xs justify-end mt-0.5" style={{ color: "var(--outline)" }}>
            <Clock size={10} aria-hidden="true" />
            <span>{job.posted_date}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <BookmarkButton jobId={job.id} jobTitle={job.title} />
          <Link href={`/jobs/${job.id}`}
            className="btn-primary px-3 py-1.5 text-xs font-semibold"
            aria-label={`View ${job.title}`}>
            View
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article
      className="job-card flex flex-col gap-4 group"
      aria-label={`${job.title} at ${job.company}`}
    >
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl select-none"
          style={{ background: "var(--surface-container-low)" }} aria-hidden="true">
          {icon}
        </div>
        <BookmarkButton jobId={job.id} jobTitle={job.title} />
      </div>

      <div className="space-y-1 flex-1">
        <h3 className="font-semibold text-base leading-snug group-hover:underline"
          style={{ color: "var(--primary)", textDecorationColor: "var(--primary-container)" }}>
          <Link href={`/jobs/${job.id}`}>{job.title}</Link>
        </h3>
        <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>{job.company}</p>
        <div className="flex items-center gap-1 text-xs" style={{ color: "var(--outline)" }}>
          <MapPin size={12} aria-hidden="true" />
          <span className="truncate">{job.location.split(",")[0]}</span>
        </div>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-1.5" aria-label="Key skills">
          {skills.map((s) => (
            <span key={s} className="badge-location text-[11px]">{s}</span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between pt-4 border-t"
        style={{ borderColor: "var(--outline-variant)" }}>
        <div className="space-y-0.5">
          {salary ? (
            <span className="text-sm font-bold block"
              style={{ color: "var(--primary-container)", fontFamily: "monospace" }}>
              {salary.split(" To ")[0].split(" EGP")[0]}
            </span>
          ) : (
            <span className="text-xs" style={{ color: "var(--outline)" }}>Confidential</span>
          )}
          <div className="flex items-center gap-1 text-xs" style={{ color: "var(--outline)" }}>
            <Clock size={10} aria-hidden="true" />
            <span>{job.posted_date}</span>
          </div>
        </div>
        <a href={applyHref} target="_blank" rel="noopener noreferrer"
          className="btn-primary px-4 py-2 text-xs font-semibold inline-flex items-center gap-1"
          aria-label={`Apply for ${job.title} at ${job.company} on Wuzzuf`}>
          Apply <ExternalLink size={11} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
