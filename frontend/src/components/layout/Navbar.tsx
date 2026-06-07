"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Bookmark, Briefcase } from "lucide-react";
import { useBookmarks } from "@/lib/hooks";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { bookmarks } = useBookmarks();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const navLinks = [
    { href: "/jobs",          label: "Browse Jobs" },
    { href: "/career-advice", label: "Career Advice" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className="fixed top-0 w-full z-50 transition-shadow duration-200"
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: "rgba(255,255,255,0.93)",
        borderBottom: "1px solid var(--outline-variant)",
        boxShadow: scrolled ? "0 2px 16px rgba(0,10,30,0.07)" : "none",
      }}
    >
      <nav
        className="flex justify-between items-center w-full px-4 md:px-10 max-w-[1280px] mx-auto h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            aria-label="Tawtheef Egypt home"
            className="flex items-center gap-2.5 select-none"
          >
            <Image
              src="/logo.png"
              alt="Tawtheef Egypt logo"
              width={34}
              height={34}
              className="rounded-lg object-contain"
              priority
            />
            <span
              className="font-bold text-base hidden sm:block"
              style={{ color: "var(--primary)", letterSpacing: "-0.01em" }}
            >
              Tawtheef{" "}
              <span style={{ color: "var(--primary-container)" }}>Egypt</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1" role="navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm transition-all"
                style={{
                  color: isActive(link.href)
                    ? "var(--primary-container)"
                    : "var(--on-surface-variant)",
                  background: isActive(link.href)
                    ? "rgba(0,33,71,0.06)"
                    : "transparent",
                  fontWeight: isActive(link.href) ? 600 : 500,
                }}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Saved jobs */}
          <Link
            href="/saved"
            className="relative p-2 rounded-lg transition-colors"
            style={{ color: "var(--on-surface-variant)" }}
            aria-label={`Saved jobs${bookmarks.size > 0 ? ` (${bookmarks.size})` : ""}`}
          >
            <Bookmark size={18} />
            {bookmarks.size > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ background: "var(--primary-container)" }}
                aria-hidden="true"
              >
                {bookmarks.size}
              </span>
            )}
          </Link>

          {/* Post a Job — desktop only */}
          <Link
            href="/post-job"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              color: "var(--on-surface-variant)",
            }}
            aria-label="Post a job vacancy"
          >
            <Briefcase size={15} />
            Post a Job
          </Link>

          <Link
            href="/login"
            className="text-sm font-medium hidden sm:block px-3 py-2 rounded-lg transition-colors hover:bg-black/5"
            style={{ color: "var(--on-surface-variant)" }}
            aria-label="Log in to your account"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="btn-primary px-4 py-2 text-sm hidden sm:block"
            aria-label="Create a free account"
          >
            Sign up
          </Link>

          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: "var(--on-surface-variant)" }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t px-4 py-4 flex flex-col gap-2 transition-all overflow-hidden
          ${mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
        style={{
          background: "rgba(255,255,255,0.98)",
          borderColor: "var(--outline-variant)",
        }}
        aria-hidden={!mobileOpen}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 py-2 rounded-lg text-sm font-medium"
            style={{
              color: isActive(link.href)
                ? "var(--primary-container)"
                : "var(--on-surface)",
              background: isActive(link.href) ? "rgba(0,33,71,0.06)" : "transparent",
              fontWeight: isActive(link.href) ? 600 : 500,
            }}
            aria-current={isActive(link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/post-job"
          className="px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          style={{ color: "var(--on-surface)" }}
        >
          <Briefcase size={15} /> Post a Job
        </Link>
        <div className="h-px my-1" style={{ background: "var(--outline-variant)" }} />
        <Link
          href="/login"
          className="px-3 py-2 rounded-lg text-sm font-medium"
          style={{ color: "var(--on-surface)" }}
        >
          Log in
        </Link>
        <Link href="/signup" className="btn-primary px-4 py-2 text-sm text-center">
          Sign up
        </Link>
      </div>
    </header>
  );
}
