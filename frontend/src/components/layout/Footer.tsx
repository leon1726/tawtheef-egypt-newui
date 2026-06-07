import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Platform: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Career Advice", href: "/career-advice" },
    { label: "Post a Job", href: "/post-job" },
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
        background: "var(--primary)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
      aria-label="Site footer"
    >
      <div className="max-w-[1280px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Brand */}
          <div className="space-y-4 max-w-sm">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Tawtheef Egypt home">
              <Image
                src="/logo.png"
                alt="Tawtheef Egypt"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="font-bold text-lg text-white">
                Tawtheef <span style={{ color: "var(--tertiary-fixed-dim)" }}>Egypt</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              Egypt&apos;s leading job board. Find your next opportunity or hire qualified
              professionals across Cairo, Giza, Alexandria and all of Egypt.
            </p>
            <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>
              توظيف مصر — وظائف مصر
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <div className="grid grid-cols-3 gap-10">
              {Object.entries(footerLinks).map(([section, links]) => (
                <div key={section} className="space-y-4">
                  <h2
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: "rgba(255,255,255,0.40)" }}
                  >
                    {section}
                  </h2>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm transition-colors hover:text-white"
                          style={{ color: "rgba(255,255,255,0.62)" }}
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
          style={{ borderColor: "rgba(255,255,255,0.10)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            © {new Date().getFullYear()} Tawtheef Egypt. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            Jobs sourced from Wuzzuf.net
          </p>
        </div>
      </div>
    </footer>
  );
}
