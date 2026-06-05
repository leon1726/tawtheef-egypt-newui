/**
 * api.ts — typed fetch client for the Tawtheef Egypt Flask backend.
 *
 * All server components call these functions directly (no CORS needed).
 * Client components that need live data use the /api/proxy/* Next.js routes.
 *
 * In development without NEXT_PUBLIC_API_URL set, we fall back to the
 * mock data in mock.ts so `npm run dev` works offline.
 */

import type {
  Job,
  JobsResponse,
  JobResponse,
  CategoriesResponse,
  StatsResponse,
  FilterState,
} from "@/types";

// ─── Environment ─────────────────────────────────────────────────────────────
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ??
  process.env.API_URL ??           // server-side only fallback (no NEXT_PUBLIC)
  "";

const IS_PROD  = process.env.NODE_ENV === "production";
// Use mock data when no API URL is configured (dev OR build-time static generation)
const USE_MOCK = !API_BASE;

// ─── Core fetch wrapper ───────────────────────────────────────────────────────
async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  if (USE_MOCK) {
    // Dynamic import so mock data is never bundled in production
    const mock = await import("./mock");
    return mock.mockFetch<T>(path);
  }

  const url = `${API_BASE}${path}`;
  const res  = await fetch(url, {
    ...options,
    next: { revalidate: 60 },   // ISR: re-fetch from Flask at most every 60s
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new ApiError(res.status, text, path);
  }

  return res.json() as Promise<T>;
}

// ─── Error type ───────────────────────────────────────────────────────────────
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly path: string
  ) {
    super(`API ${status} on ${path}: ${message}`);
    this.name = "ApiError";
  }
}

// ─── Public API functions ─────────────────────────────────────────────────────

export async function getJobs(
  filters: Partial<FilterState> = {},
  page = 1
): Promise<JobsResponse> {
  const params = new URLSearchParams();
  if (filters.q)          params.set("q",            filters.q);
  if (filters.category)   params.set("category",     filters.category);
  if (filters.location)   params.set("location",     filters.location);
  if (filters.experience) params.set("experience",   filters.experience);
  if (filters.sort && filters.sort !== "newest")
                          params.set("sort",          filters.sort);
  params.set("page",     String(page));
  params.set("per_page", "20");

  const qs = params.toString();
  return apiFetch<JobsResponse>(`/api/jobs${qs ? `?${qs}` : ""}`);
}

export async function getJobById(id: string | number): Promise<Job | null> {
  try {
    const data = await apiFetch<JobResponse>(`/api/jobs/${id}`);
    return data.job ?? null;
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null;
    throw e;
  }
}

export async function getFeaturedJobs(): Promise<Job[]> {
  const data = await apiFetch<{ jobs: Job[] }>("/api/jobs/featured");
  return data.jobs ?? [];
}

export async function getRelatedJobs(id: string | number): Promise<Job[]> {
  const data = await apiFetch<{ jobs: Job[] }>(`/api/jobs/${id}/related`);
  return data.jobs ?? [];
}

export async function getCategories(): Promise<CategoriesResponse> {
  return apiFetch<CategoriesResponse>("/api/categories");
}

export async function getStats(): Promise<StatsResponse> {
  return apiFetch<StatsResponse>("/api/stats");
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Skills are stored as "skill1, skill2, skill3" — split into an array */
export function parseSkills(skills: string): string[] {
  if (!skills) return [];
  return skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Normalise salary display — hide "Confidential", "Not specified", blank */
export function formatSalary(salary: string): string | null {
  if (!salary) return null;
  const s = salary.trim().toLowerCase();
  if (!s || s === "confidential" || s === "not specified" || s === "paid")
    return null;
  if (s.includes("kpi")) return null;
  return salary.trim();
}

/** Turn a Wuzzuf apply link into the Flask redirect URL */
export function applyUrl(job: Job): string {
  if (!API_BASE) return job.link;
  return `${API_BASE}/apply/${job.id}`;
}
