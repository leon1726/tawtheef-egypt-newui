import Link from "next/link";

const footerLinks = {
  Platform: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Post a Job", href: "/post-job" },
    { label: "Companies", href: "/companies" },
    { label: "Saved Jobs", href: "/saved" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Help Center", href: "/help" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="border-t py-16 px-4 md:px-10"
      style={{
        background: "var(--surface-container-high)",
        borderColor: "var(--outline-variant)",
      }}
      aria-label="Site footer"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Brand */}
          <div className="space-y-4 max-w-sm">
            <Link href="/" className="flex items-center gap-2" aria-label="Tawtheef Egypt home">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                style={{ background: "var(--primary-container)" }}
                aria-hidden="true"
              >
                T
              </div>
              <span className="font-bold text-lg" style={{ color: "var(--primary)" }}>
                Tawtheef Egypt
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "var(--on-surface-variant)" }}>
              The definitive professional recruitment ecosystem for Egypt&apos;s
              burgeoning job market. High-density, low-friction placement
              solutions for the modern enterprise.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <div className="grid grid-cols-3 gap-10">
              {Object.entries(footerLinks).map(([section, links]) => (
                <div key={section} className="space-y-4">
                  <h2
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "var(--primary)" }}
                  >
                    {section}
                  </h2>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm transition-colors hover:underline"
                          style={{ color: "var(--on-surface-variant)" }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div
          className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "var(--outline-variant)" }}
        >
          <p className="text-xs" style={{ color: "var(--on-surface-variant)" }}>
            © {new Date().getFullYear()} Tawtheef Egypt. Professional Recruitment Ecosystem.
          </p>
          <p className="text-xs" style={{ color: "var(--outline)" }}>
            Built for Egypt&apos;s growing professional community.
          </p>
        </div>
      </div>
    </footer>
  );
}
