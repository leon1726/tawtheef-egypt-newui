import type { FilterState, SortOption } from "@/types";

type SearchParamValue = string | string[] | undefined;

function getString(v: SearchParamValue): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v))      return v[0] ?? "";
  return "";
}

/** Parse Next.js searchParams object → FilterState */
export function parseSearchParams(
  sp: Record<string, SearchParamValue>
): Partial<FilterState> {
  return {
    q:          getString(sp.q),
    category:   getString(sp.category),
    location:   getString(sp.location),
    experience: getString(sp.experience),
    sort:       (getString(sp.sort) as SortOption) || "newest",
    page:       Number(getString(sp.page)) || 1,
  };
}

/** Serialise FilterState → URLSearchParams for <Link> hrefs */
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

/** Category slug → display label (shorten long Wuzzuf category names) */
export const CATEGORY_LABELS: Record<string, string> = {
  "IT / Software / Development":                               "IT / Software",
  "Engineering / Construction / Civil / Architecture":         "Engineering",
  "Marketing / PR / Advertising":                              "Marketing",
  "Medical / Healthcare":                                      "Healthcare",
  "Sales / Retail":                                            "Sales",
  "Accounting / Finance":                                      "Finance",
  "Human / Resources":                                         "HR",
  "Business / Development":                                    "Business Dev",
  "Creative / Design / Art":                                   "Design",
  "Hospitality / Hotels / Food / Services":                    "Hospitality",
  "Customer / Service":                                        "Customer Svc",
  "Logistics / Supply / Chain":                                "Logistics",
  "Manufacturing / Production":                                "Manufacturing",
  "Project / Program / Management":                            "Project Mgmt",
  "R&D / Science":                                             "R&D / Science",
};

export function categoryLabel(cat: string): string {
  return CATEGORY_LABELS[cat] ?? cat;
}

/** Category → 2-letter abbreviation for icon slots */
export function categoryIcon(cat: string): string {
  const words = cat.split(/[/\s]+/).filter(Boolean);
  const a = words[0]?.[0]?.toUpperCase() ?? "";
  const b = words[1]?.[0]?.toUpperCase() ?? "";
  return a + b;
}

/** Category → background and text color pair for icon avatar */
const CAT_COLORS: Record<string, [string, string]> = {
  "IT / Software / Development":                       ["#EFF6FF", "#1D4ED8"],
  "Engineering / Construction / Civil / Architecture": ["#ECFDF5", "#065F46"],
  "Accounting / Finance":                              ["#FFFBEB", "#92400E"],
  "Marketing / PR / Advertising":                      ["#FFF7ED", "#9A3412"],
  "Medical / Healthcare":                              ["#FFF1F2", "#9F1239"],
  "Sales / Retail":                                    ["#F0FDF4", "#166534"],
  "Human / Resources":                                 ["#F5F3FF", "#5B21B6"],
  "Creative / Design / Art":                           ["#FDF4FF", "#7E22CE"],
  "Hospitality / Hotels / Food / Services":            ["#FEF3C7", "#92400E"],
  "Banking":                                           ["#EFF6FF", "#1E40AF"],
  "Legal":                                             ["#F1F5F9", "#334155"],
  "Pharmaceutical":                                    ["#ECFEFF", "#155E75"],
  "Administration":                                    ["#F8FAFC", "#475569"],
  "Logistics / Supply / Chain":                        ["#FFF7ED", "#C2410C"],
  "Manufacturing / Production":                        ["#F9FAFB", "#374151"],
  "R&D / Science":                                     ["#EFF6FF", "#1E40AF"],
  "Business / Development":                            ["#FAFAF9", "#57534E"],
  "Customer / Service":                                ["#ECFDF5", "#047857"],
  "Project / Program / Management":                    ["#FDF4FF", "#6B21A8"],
  "Quality":                                           ["#F0FDF4", "#15803D"],
};

export function categoryColors(cat: string): [string, string] {
  return CAT_COLORS[cat] ?? ["#F1F5F9", "#475569"];
}
