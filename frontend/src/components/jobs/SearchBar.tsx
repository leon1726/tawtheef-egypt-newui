"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, X } from "lucide-react";

interface Props {
  defaultQuery?: string;
  defaultLocation?: string;
}

export default function SearchBar({ defaultQuery = "", defaultLocation = "" }: Props) {
  const [query, setQuery] = useState(defaultQuery);
  const [location, setLocation] = useState(defaultLocation);
  const router = useRouter();

  // Sync when defaults change (e.g. navigating back with different params)
  useEffect(() => { setQuery(defaultQuery); }, [defaultQuery]);
  useEffect(() => { setLocation(defaultLocation); }, [defaultLocation]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location.trim()) params.set("location", location.trim());
    router.push(`/jobs${params.toString() ? `?${params}` : ""}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-4xl flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-0 p-3 rounded-2xl border"
      style={{
        background: "var(--surface-container-lowest)",
        borderColor: "var(--outline-variant)",
        boxShadow: "0 4px 24px rgba(0, 10, 30, 0.08)",
      }}
      role="search"
      aria-label="Job search"
    >
      {/* Keyword input */}
      <div
        className="flex items-center flex-1 px-4 gap-3 md:border-r"
        style={{ borderColor: "var(--outline-variant)" }}
      >
        <Search size={18} style={{ color: "var(--outline)", flexShrink: 0 }} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Job title, keywords, or company"
          className="w-full bg-transparent text-sm outline-none py-2"
          style={{ color: "var(--on-surface)" }}
          aria-label="Search by job title, keywords, or company"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="p-0.5 rounded hover:opacity-70"
            style={{ color: "var(--outline)" }}
            aria-label="Clear search query"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Location input */}
      <div className="flex items-center flex-1 px-4 gap-3">
        <MapPin size={18} style={{ color: "var(--outline)", flexShrink: 0 }} aria-hidden="true" />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City or District in Egypt"
          className="w-full bg-transparent text-sm outline-none py-2"
          style={{ color: "var(--on-surface)" }}
          aria-label="Filter by location"
        />
        {location && (
          <button
            type="button"
            onClick={() => setLocation("")}
            className="p-0.5 rounded hover:opacity-70"
            style={{ color: "var(--outline)" }}
            aria-label="Clear location"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn-primary px-6 py-3 text-sm font-semibold md:ml-2 rounded-xl"
        style={{ whiteSpace: "nowrap" }}
        aria-label="Search for jobs"
      >
        Find Jobs
      </button>
    </form>
  );
}
