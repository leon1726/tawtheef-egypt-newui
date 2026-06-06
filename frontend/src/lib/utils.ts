import type { FilterState, SortOption } from "@/types";

type SPValue = string | string[] | undefined;

function getString(v: SPValue): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v))      return v[0] ?? "";
  return "";
}

/** Parse Next.js searchParams → FilterState */
export function parseSearchParams(sp: Record<string, SPValue>): Partial<FilterState> {
  return {
    q:          getString(sp.q),
    category:   getString(sp.category),
    location:   getString(sp.location),
    experience: getString(sp.experience),
    sort:       (getString(sp.sort) as SortOption) || "newest",
    page:       Number(getString(sp.page)) || 1,
  };
}

/** Serialise FilterState → URLSearchParams */
export function toSearchParams(f: Partial<FilterState>): URLSearchParams {
  const p = new URLSearchParams();
  if (f.q)          p.set("q",          f.q);
  if (f.category)   p.set("category",   f.category);
  if (f.location)   p.set("location",   f.location);
  if (f.experience) p.set("experience", f.experience);
  if (f.sort && f.sort !== "newest") p.set("sort", f.sort);
  if (f.page && f.page > 1)          p.set("page", String(f.page));
  return p;
}

/** Wuzzuf long category slug → short display label */
export const CATEGORY_LABELS: Record<string, string> = {
  "IT / Software / Development":                               "IT & Software",
  "Engineering / Construction / Civil / Architecture":         "Engineering",
  "Marketing / PR / Advertising":                              "Marketing",
  "Medical / Healthcare":                                      "Healthcare",
  "Sales / Retail":                                            "Sales",
  "Accounting / Finance":                                      "Finance",
  "Human / Resources":                                         "Human Resources",
  "Business / Development":                                    "Business Dev",
  "Creative / Design / Art":                                   "Design",
  "Hospitality / Hotels / Food / Services":                    "Hospitality",
  "Customer / Service":                                        "Customer Service",
  "Logistics / Supply / Chain":                                "Logistics",
  "Manufacturing / Production":                                "Manufacturing",
  "Project / Program / Management":                            "Project Mgmt",
  "R&D / Science":                                             "R&D & Science",
  "Administration":                                            "Administration",
  "Banking":                                                   "Banking",
  "Legal":                                                     "Legal",
  "Pharmaceutical":                                            "Pharmaceutical",
  "Quality":                                                   "Quality",
};

export function categoryLabel(cat: string): string {
  return CATEGORY_LABELS[cat] ?? cat;
}
