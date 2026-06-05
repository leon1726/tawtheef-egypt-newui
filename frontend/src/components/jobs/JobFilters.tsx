"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useState } from "react";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { CATEGORY_LABELS } from "@/lib/utils";

// Real categories from the Wuzzuf scrape
const CATEGORIES = [
  "IT / Software / Development",
  "Engineering / Construction / Civil / Architecture",
  "Marketing / PR / Advertising",
  "Medical / Healthcare",
  "Sales / Retail",
  "Accounting / Finance",
  "Administration",
  "Human / Resources",
  "Customer / Service",
  "Creative / Design / Art",
  "Hospitality / Hotels / Food / Services",
  "Banking",
  "Business / Development",
  "Legal",
  "Logistics / Supply / Chain",
  "Manufacturing / Production",
  "Pharmaceutical",
  "Project / Program / Management",
  "Quality",
  "R&D / Science",
];

const EXPERIENCE_OPTIONS = [
  "0 To 1 Years",
  "1 To 3 Years",
  "3 To 5 Years",
  "5 To 8 Years",
  "8 To 10 Years",
  "10+ Years",
];

const CAREER_LEVELS = [
  "Entry Level (Junior Level / Fresh Grad)",
  "Experienced (Non-Manager)",
  "Manager",
  "Senior Management (CEO, GM, Director, Head)",
  "Student (Undergrad / Postgrad)",
];

export default function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const current = (key: string) => searchParams.get(key) ?? "";

  const setParam = (key: string, value: string) => {
    const p = new URLSearchParams(searchParams.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    p.delete("page");
    startTransition(() => router.push(`/jobs?${p.toString()}`, { scroll: false }));
  };

  const clearAll = () => {
    const p = new URLSearchParams(searchParams.toString());
    ["category", "experience", "career_level"].forEach((k) => p.delete(k));
    p.delete("page");
    startTransition(() => router.push(`/jobs?${p.toString()}`, { scroll: false }));
  };

  const activeCount =
    (current("category") ? 1 : 0) +
    (current("experience") ? 1 : 0) +
    (current("career_level") ? 1 : 0);

  const toggle = (key: string) =>
    setCollapsed((c) => ({ ...c, [key]: !c[key] }));

  const RadioGroup = ({
    id, label, options, paramKey, labelFn,
  }: {
    id: string; label: string; options: string[]; paramKey: string;
    labelFn?: (v: string) => string;
  }) => {
    const selected = current(paramKey);
    const isCollapsed = collapsed[id];
    return (
      <div className="filter-section">
        <button
          onClick={() => toggle(id)}
          className="flex items-center justify-between w-full text-left mb-3"
          aria-expanded={!isCollapsed}
          aria-controls={`fg-${id}`}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--on-surface)" }}>
            {label}
            {selected && (
              <span className="ml-2 normal-case font-semibold tracking-normal"
                style={{ color: "var(--primary-container)" }}>(1)</span>
            )}
          </h3>
          <ChevronDown size={13}
            style={{ color: "var(--outline)", transform: isCollapsed ? "rotate(-90deg)" : "none", transition: "transform .15s" }}
            aria-hidden="true"
          />
        </button>
        <div id={`fg-${id}`}
          className={`space-y-2 overflow-hidden transition-all ${isCollapsed ? "max-h-0" : "max-h-[400px]"}`}>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="radio" name={paramKey} checked={!selected}
              onChange={() => setParam(paramKey, "")}
              className="w-4 h-4" aria-label={`Any ${label}`} />
            <span className="text-sm" style={{ color: !selected ? "var(--primary-container)" : "var(--on-surface-variant)", fontWeight: !selected ? 600 : 400 }}>
              Any
            </span>
          </label>
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name={paramKey} checked={selected === opt}
                onChange={() => setParam(paramKey, opt === selected ? "" : opt)}
                className="w-4 h-4" aria-label={`${label}: ${labelFn ? labelFn(opt) : opt}`} />
              <span className="text-sm" style={{
                color: selected === opt ? "var(--primary-container)" : "var(--on-surface-variant)",
                fontWeight: selected === opt ? 600 : 400,
              }}>
                {labelFn ? labelFn(opt) : opt}
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <aside className="w-full lg:w-64 flex-shrink-0" aria-label="Job filters">
      <div className="rounded-2xl border p-5 sticky top-24"
        style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>

        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={15} style={{ color: "var(--primary)" }} aria-hidden="true" />
            <h2 className="font-semibold text-sm" style={{ color: "var(--primary)" }}>Filters</h2>
            {activeCount > 0 && (
              <span className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center text-white"
                style={{ background: "var(--primary-container)" }} aria-label={`${activeCount} active`}>
                {activeCount}
              </span>
            )}
          </div>
          {activeCount > 0 && (
            <button onClick={clearAll}
              className="text-xs font-medium flex items-center gap-1 hover:underline"
              style={{ color: "var(--gold-accent)" }} aria-label="Clear all filters">
              <X size={11} /> Clear
            </button>
          )}
        </div>

        <RadioGroup
          id="category" label="Category" paramKey="category"
          options={CATEGORIES} labelFn={(v) => CATEGORY_LABELS[v] ?? v}
        />
        <RadioGroup
          id="experience" label="Experience" paramKey="experience"
          options={EXPERIENCE_OPTIONS}
        />
        <RadioGroup
          id="career_level" label="Career Level" paramKey="career_level"
          options={CAREER_LEVELS}
        />
      </div>
    </aside>
  );
}
