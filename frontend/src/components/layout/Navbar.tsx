"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Bookmark, ChevronDown } from "lucide-react";
import { useBookmarks } from "@/lib/hooks";

const NAV_LINKS = [
  { href: "/jobs",          label: "Browse Jobs" },
  { href: "/career-advice", label: "Career Advice" },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { bookmarks }          = useBookmarks();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className="fixed top-0 w-full z-50 transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: `1px solid ${scrolled ? "var(--outline-variant)" : "transparent"}`,
        boxShadow: scrolled ? "0 1px 12px rgba(0,26,60,0.06)" : "none",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* Left: logo + nav */}
        <div className="flex items-center gap-8">
          <Link href="/" aria-label="Tawtheef Egypt" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo.png"
              alt="Tawtheef Egypt"
              width={30}
              height={30}
              className="rounded-md object-contain"
              priority
            />
            <span
              className="font-bold text-[15px] hidden sm:block tracking-tight"
              style={{ color: "var(--primary)" }}
            >
              Tawtheef <span style={{ color: "var(--accent)" }}>Egypt</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: isActive(link.href)
                    ? "var(--primary-mid)"
                    : "var(--on-surface-variant)",
                  background: isActive(link.href)
                    ? "var(--accent-light)"
                    : "transparent",
                  fontWeight: isActive(link.href) ? 600 : 500,
                }}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: auth + actions */}
        <div className="flex items-center gap-2">
          {/* Saved jobs */}
          <Link
            href="/saved"
            className="relative p-2 rounded-lg btn-ghost"
            aria-label={`Saved jobs${bookmarks.size > 0 ? ` (${bookmarks.size})` : ""}`}
          >
            <Bookmark size={18} />
            {bookmarks.size > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white px-1"
                style={{ background: "var(--primary-mid)" }}
                aria-hidden="true"
              >
                {bookmarks.size}
              </span>
            )}
          </Link>

          {/* Login — desktop */}
          <Link
            href="/login"
            className="hidden sm:inline-flex btn-ghost px-4 py-2 text-sm"
            aria-label="Log in to your account"
          >
            Log in
          </Link>

          {/* Sign Up — desktop */}
          <Link
            href="/signup"
            className="hidden sm:inline-flex btn-primary px-4 py-2 text-sm"
            aria-label="Create a free account"
          >
            Sign up
          </Link>

          {/* Post a Job — desktop only shown on non-auth pages */}
          <Link
            href="/post-job"
            className="hidden lg:inline-flex btn-outline px-4 py-2 text-sm"
            aria-label="Post a job listing"
          >
            Post a Job
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg btn-ghost"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-all duration-200 ${
          open ? "max-h-[400px]" : "max-h-0"
        }`}
        style={{ borderTop: open ? "1px solid var(--outline-variant)" : "none" }}
        aria-hidden={!open}
      >
        <div className="px-4 py-4 flex flex-col gap-1" style={{ background: "#fff" }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2.5 rounded-lg text-sm font-medium"
              style={{
                color: isActive(link.href) ? "var(--primary-mid)" : "var(--on-surface)",
                background: isActive(link.href) ? "var(--accent-light)" : "transparent",
                fontWeight: isActive(link.href) ? 600 : 500,
              }}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}

          <div className="my-2 divider" />

          <Link href="/login" className="px-3 py-2.5 rounded-lg text-sm font-medium"
            style={{ color: "var(--on-surface)" }}>
            Log in
          </Link>
          <Link href="/signup" className="btn-primary px-4 py-2.5 text-sm text-center">
            Sign up free
          </Link>
          <Link href="/post-job" className="btn-outline px-4 py-2.5 text-sm text-center mt-1">
            Post a Job
          </Link>
        </div>
      </div>
    </header>
  );
}
