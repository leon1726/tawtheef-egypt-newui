/**
 * mock.ts — offline development fallback.
 * Only imported when NEXT_PUBLIC_API_URL is not set AND NODE_ENV !== production.
 * Uses the real DB column names so components work identically against live data.
 */

import type { Job, JobsResponse, StatsResponse, CategoriesResponse } from "@/types";

const NOW = new Date().toISOString();

export const MOCK_JOBS: Job[] = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Global Tech Solutions",
    location: "New Cairo, Cairo, Egypt",
    link: "https://www.wuzzuf.net/jobs/example-1",
    category: "IT / Software / Development",
    posted_date: "2 days ago",
    scraped_at: NOW,
    description:
      "We are looking for a Senior Frontend Developer to lead development of our flagship web platform serving 500,000+ users across Egypt and the MENA region. You will architect scalable React applications, mentor junior developers, and own the frontend roadmap.",
    skills: "React, TypeScript, Next.js, CSS, REST APIs, Git",
    job_type: "Full Time",
    experience: "5 To 8 Years",
    career_level: "Senior Management (CEO, GM, Director, Head)",
    education: "Bachelor's Degree",
    salary: "45,000 To 60,000 EGP Per Month",
    details_scraped: 1,
  },
  {
    id: 2,
    title: "Financial Analyst",
    company: "Nile Banking Group",
    location: "Dokki, Giza, Egypt",
    link: "https://www.wuzzuf.net/jobs/example-2",
    category: "Accounting / Finance",
    posted_date: "1 day ago",
    scraped_at: NOW,
    description:
      "Nile Banking Group is seeking a sharp Financial Analyst to join our corporate finance division. You will analyze financial data, build models, and support key business decisions across our retail banking portfolio.",
    skills: "Excel, Financial Modeling, Bloomberg, SQL, PowerPoint",
    job_type: "Full Time",
    experience: "3 To 5 Years",
    career_level: "Experienced (Non-Manager)",
    education: "Bachelor's Degree in Finance or Economics",
    salary: "30,000 To 40,000 EGP Per Month",
    details_scraped: 1,
  },
  {
    id: 3,
    title: "Marketing Manager",
    company: "Egypt Retail Hub",
    location: "New Cairo, Cairo, Egypt",
    link: "https://www.wuzzuf.net/jobs/example-3",
    category: "Marketing / PR / Advertising",
    posted_date: "3 days ago",
    scraped_at: NOW,
    description:
      "Egypt Retail Hub is the country's fastest-growing retail aggregator. We're looking for a Marketing Manager to own and drive our brand strategy across digital and offline channels.",
    skills: "Digital Marketing, SEO, Content Strategy, Paid Media, Arabic Copywriting",
    job_type: "Full Time",
    experience: "5 To 8 Years",
    career_level: "Manager",
    education: "Bachelor's Degree",
    salary: "Confidential",
    details_scraped: 1,
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "Cloud Nile Systems",
    location: "Sidi Gaber, Alexandria, Egypt",
    link: "https://www.wuzzuf.net/jobs/example-4",
    category: "IT / Software / Development",
    posted_date: "5 hours ago",
    scraped_at: NOW,
    description:
      "Cloud Nile Systems is Egypt's leading cloud services provider. Join our infrastructure team and help us scale our platform to handle millions of requests per day.",
    skills: "AWS, Kubernetes, Docker, Terraform, CI/CD, GitHub Actions",
    job_type: "Full Time",
    experience: "3 To 6 Years",
    career_level: "Experienced (Non-Manager)",
    education: "Bachelor's Degree in Computer Science",
    salary: "50,000 EGP Per Month",
    details_scraped: 1,
  },
  {
    id: 5,
    title: "Head of Clinical Operations",
    company: "PharmaCore Egypt",
    location: "6th of October, Giza, Egypt",
    link: "https://www.wuzzuf.net/jobs/example-5",
    category: "Medical / Healthcare",
    posted_date: "1 week ago",
    scraped_at: NOW,
    description:
      "PharmaCore Egypt is seeking an experienced Head of Clinical Operations to lead our clinical trials division and oversee all operational aspects of drug development programs.",
    skills: "Clinical Trials, Regulatory Affairs, GCP, Leadership, Project Management",
    job_type: "Full Time",
    experience: "10+ Years",
    career_level: "Senior Management (CEO, GM, Director, Head)",
    education: "PhD or MD preferred",
    salary: "Confidential",
    details_scraped: 1,
  },
  {
    id: 6,
    title: "UI/UX Designer",
    company: "Creative Flow Studio",
    location: "Maadi, Cairo, Egypt",
    link: "https://www.wuzzuf.net/jobs/example-6",
    category: "Creative / Design / Art",
    posted_date: "4 days ago",
    scraped_at: NOW,
    description:
      "Creative Flow Studio is a leading product design agency. We're looking for a UI/UX Designer to craft beautiful, intuitive digital experiences for Egypt's top startups.",
    skills: "Figma, User Research, Prototyping, Design Systems, Usability Testing",
    job_type: "Full Time",
    experience: "3 To 5 Years",
    career_level: "Experienced (Non-Manager)",
    education: "Bachelor's Degree",
    salary: "25,000 To 35,000 EGP Per Month",
    details_scraped: 1,
  },
  {
    id: 7,
    title: "Sales Director – FMCG",
    company: "Delta Consumer Goods",
    location: "Heliopolis, Cairo, Egypt",
    link: "https://www.wuzzuf.net/jobs/example-7",
    category: "Sales / Retail",
    posted_date: "2 days ago",
    scraped_at: NOW,
    description:
      "Delta Consumer Goods is one of Egypt's top FMCG companies. We are hiring a Sales Director to lead our national sales force and drive revenue growth across all channels.",
    skills: "Sales Management, FMCG, Distribution, Negotiation, Team Leadership, KPIs",
    job_type: "Full Time",
    experience: "10+ Years",
    career_level: "Senior Management (CEO, GM, Director, Head)",
    education: "Bachelor's Degree in Business",
    salary: "60,000 To 80,000 EGP Per Month",
    details_scraped: 1,
  },
  {
    id: 8,
    title: "Data Scientist",
    company: "Sphinx Analytics",
    location: "Downtown, Cairo, Egypt",
    link: "https://www.wuzzuf.net/jobs/example-8",
    category: "IT / Software / Development",
    posted_date: "1 day ago",
    scraped_at: NOW,
    description:
      "Sphinx Analytics is Egypt's fastest-growing data consultancy working on cutting-edge ML projects for major Egyptian enterprises and government agencies.",
    skills: "Python, PyTorch, TensorFlow, SQL, NLP, Pandas, Scikit-learn",
    job_type: "Full Time",
    experience: "3 To 5 Years",
    career_level: "Experienced (Non-Manager)",
    education: "MSc or PhD in Computer Science or Statistics",
    salary: "40,000 To 55,000 EGP Per Month",
    details_scraped: 1,
  },
];

const MOCK_CATEGORIES = [
  { category: "IT / Software / Development", count: 420 },
  { category: "Accounting / Finance", count: 210 },
  { category: "Marketing / PR / Advertising", count: 180 },
  { category: "Sales / Retail", count: 160 },
  { category: "Engineering / Construction / Civil / Architecture", count: 140 },
  { category: "Medical / Healthcare", count: 120 },
  { category: "Administration", count: 110 },
  { category: "Human / Resources", count: 90 },
  { category: "Customer / Service", count: 80 },
  { category: "Creative / Design / Art", count: 75 },
];

export async function mockFetch<T>(path: string): Promise<T> {
  await new Promise((r) => setTimeout(r, 40)); // simulate network latency

  // /api/stats
  if (path === "/api/stats") {
    return {
      total_jobs: 1742,
      total_categories: 26,
      total_companies: 500,
    } as unknown as T;
  }

  // /api/categories
  if (path === "/api/categories") {
    return { categories: MOCK_CATEGORIES } as unknown as T;
  }

  // /api/jobs/featured
  if (path === "/api/jobs/featured") {
    return { jobs: MOCK_JOBS.slice(0, 6) } as unknown as T;
  }

  // /api/jobs/:id/related
  const relatedMatch = path.match(/^\/api\/jobs\/(\d+)\/related/);
  if (relatedMatch) {
    const id = Number(relatedMatch[1]);
    const source = MOCK_JOBS.find((j) => j.id === id);
    const related = source
      ? MOCK_JOBS.filter((j) => j.id !== id && j.category === source.category).slice(0, 3)
      : [];
    return { jobs: related } as unknown as T;
  }

  // /api/jobs/:id
  const detailMatch = path.match(/^\/api\/jobs\/(\d+)$/);
  if (detailMatch) {
    const id = Number(detailMatch[1]);
    const job = MOCK_JOBS.find((j) => j.id === id) ?? null;
    if (!job) throw Object.assign(new Error("Not found"), { status: 404 });
    return { job } as unknown as T;
  }

  // /api/jobs  (with optional ?q=&category=&page= etc.)
  if (path.startsWith("/api/jobs")) {
    const url    = new URL(`http://x${path}`);
    const q      = url.searchParams.get("q")?.toLowerCase() ?? "";
    const cat    = url.searchParams.get("category") ?? "";
    const page   = Number(url.searchParams.get("page") ?? 1);
    const perPg  = Number(url.searchParams.get("per_page") ?? 20);

    let filtered = MOCK_JOBS;
    if (q)   filtered = filtered.filter((j) =>
      j.title.toLowerCase().includes(q) ||
      j.company.toLowerCase().includes(q) ||
      j.skills.toLowerCase().includes(q)
    );
    if (cat) filtered = filtered.filter((j) => j.category === cat);

    const total      = filtered.length;
    const totalPages = Math.ceil(total / perPg) || 1;
    const jobs       = filtered.slice((page - 1) * perPg, page * perPg);

    return { jobs, total, page, per_page: perPg, total_pages: totalPages } as unknown as T;
  }

  throw new Error(`mockFetch: unhandled path ${path}`);
}
