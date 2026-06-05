import type { MetadataRoute } from "next";
import { getJobs, getCategories } from "@/lib/api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tawtheef.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/jobs`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
  ];

  // Add a page per category
  try {
    const { categories } = await getCategories();
    for (const cat of categories) {
      entries.push({
        url: `${SITE_URL}/jobs?category=${encodeURIComponent(cat.category)}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.7,
      });
    }
  } catch {}

  // Add individual job pages (first page only — up to 20)
  try {
    const { jobs } = await getJobs({}, 1);
    for (const job of jobs) {
      entries.push({
        url: `${SITE_URL}/jobs/${job.id}`,
        lastModified: new Date(job.scraped_at || Date.now()),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  } catch {}

  return entries;
}
