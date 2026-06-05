// ─── Real DB columns from tawtheef-egypt (Wuzzuf scrape) ───────────────────
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  link: string;            // external Wuzzuf apply URL
  category: string;
  posted_date: string;     // human-readable e.g. "2 days ago"
  scraped_at: string;      // ISO timestamp
  description: string;
  skills: string;          // comma-separated string
  job_type: string;
  experience: string;
  career_level: string;
  education: string;
  salary: string;
  details_scraped: number;
}

// ─── API response envelopes ─────────────────────────────────────────────────
export interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface JobResponse {
  job: Job;
}

export interface CategoryCount {
  category: string;
  count: number;
}

export interface CategoriesResponse {
  categories: CategoryCount[];
}

export interface StatsResponse {
  total_jobs: number;
  total_categories: number;
  total_companies: number;
}

// ─── UI state types ──────────────────────────────────────────────────────────
export type SortOption = "newest" | "salary";
export type ViewMode   = "grid" | "list";

export interface FilterState {
  q: string;
  category: string;
  location: string;
  experience: string;
  sort: SortOption;
  page: number;
}
