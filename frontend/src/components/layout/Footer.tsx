import Link from "next/link";
import Image from "next/image";

const LINKS = {
  "For Job Seekers": [
    { label: "Browse Jobs",      href: "/jobs" },
    { label: "Career Advice",    href: "/career-advice" },
    { label: "Saved Jobs",       href: "/saved" },
    { label: "Create Account",   href: "/signup" },
  ],
  "For Employers": [
    { label: "Post a Job",       href: "/post-job" },
    { label: "Browse Candidates",href: "/companies" },
  ],
  Company: [
    { label: "About",            href: "/about" },
    { label: "Contact",          href: "/contact" },
    { label: "Privacy Policy",   href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ background: "var(--primary)", borderColor: "rgba(255,255,255,0.08)" }}
      aria-label="Site footer"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-14 flex flex-col gap-12">

        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand */}
          <div className="space-y-4 max-w-xs">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Tawtheef Egypt">
              <Image src="/logo.png" alt="Tawtheef Egypt" width={32} height={32}
                className="rounded-md object-contain brightness-0 invert" />
              <span className="font-bold text-base text-white tracking-tight">
                Tawtheef Egypt
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(200,215,255,0.7)" }}>
              Egypt's leading job board connecting professionals with top employers across Cairo, Giza, Alexandria and beyond.
            </p>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer navigation">
            <div className="grid grid-cols-3 gap-10">
              {Object.entries(LINKS).map(([section, links]) => (
                <div key={section} className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                    {section}
                  </h3>
                  <ul className="space-y-2.5">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm transition-colors hover:text-white"
                          style={{ color: "rgba(200,215,255,0.65)" }}
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

        {/* Bottom */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-3 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(200,215,255,0.45)" }}
        >
          <p>© {new Date().getFullYear()} Tawtheef Egypt. All rights reserved.</p>
          <p>Jobs sourced from Wuzzuf.net</p>
        </div>
      </div>
    </footer>
  );
}
