"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, X } from "lucide-react";

interface Props {
  defaultQuery?: string;
  defaultLocation?: string;
  variant?: "default" | "hero";
}

export default function SearchBar({
  defaultQuery = "",
  defaultLocation = "",
  variant = "default",
}: Props) {
  const [query, setQuery]       = useState(defaultQuery);
  const [location, setLocation] = useState(defaultLocation);
  const router                  = useRouter();

  useEffect(() => { setQuery(defaultQuery); },    [defaultQuery]);
  useEffect(() => { setLocation(defaultLocation); }, [defaultLocation]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim())    params.set("q", query.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(`/jobs${params.toString() ? `?${params}` : ""}`);
  };

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-[640px] flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0 p-2 rounded-xl"
      style={{
        background: isHero ? "rgba(255,255,255,0.96)" : "var(--surface-container-lowest)",
        border: isHero ? "none" : "1px solid var(--outline-variant)",
        boxShadow: isHero
          ? "0 8px 32px rgba(0,0,0,0.24)"
          : "0 2px 12px rgba(0,26,60,0.06)",
      }}
      role="search"
      aria-label="Job search"
    >
      {/* Keyword */}
      <div className="flex items-center flex-1 px-3 gap-2.5 sm:border-r" style={{ borderColor: "var(--outline-variant)" }}>
        <Search size={17} className="shrink-0" style={{ color: "var(--on-surface-muted)" }} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Job title, keywords, or company"
          className="flex-1 bg-transparent text-sm outline-none py-2.5"
          style={{ color: "var(--on-surface)" }}
          aria-label="Search by job title, keywords, or company"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")}
            className="p-0.5 rounded hover:opacity-60 shrink-0"
            style={{ color: "var(--outline)" }} aria-label="Clear query">
            <X size={13} />
          </button>
        )}
      </div>

      {/* Location */}
      <div className="flex items-center flex-1 px-3 gap-2.5">
        <MapPin size={17} className="shrink-0" style={{ color: "var(--on-surface-muted)" }} aria-hidden="true" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or district in Egypt"
          className="flex-1 bg-transparent text-sm outline-none py-2.5"
          style={{ color: "var(--on-surface)" }}
          aria-label="Filter by location"
        />
        {location && (
          <button type="button" onClick={() => setLocation("")}
            className="p-0.5 rounded hover:opacity-60 shrink-0"
            style={{ color: "var(--outline)" }} aria-label="Clear location">
            <X size={13} />
          </button>
        )}
      </div>

      <button
        type="submit"
        className="btn-primary px-6 py-2.5 text-sm font-semibold shrink-0 sm:ml-1"
        aria-label="Search jobs"
      >
        Search
      </button>
    </form>
  );
}
