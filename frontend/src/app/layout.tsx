import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tawtheef.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tawtheef Egypt | توظيف مصر — Latest Jobs",
    template: "%s | Tawtheef Egypt",
  },
  description:
    "Tawtheef Egypt — Find jobs in Egypt. توظيف مصر. Browse thousands of opportunities across Cairo, Giza, Alexandria, and all of Egypt.",
  keywords: [
    "jobs egypt", "وظائف مصر", "توظيف", "recruitment egypt",
    "hiring cairo", "work egypt", "wuzzuf", "job board egypt",
  ],
  authors: [{ name: "Tawtheef Egypt" }],
  openGraph: {
    title: "Tawtheef Egypt | توظيف مصر",
    description: "Egypt's leading job board. Find thousands of opportunities across all industries.",
    type: "website",
    locale: "en_EG",
    siteName: "Tawtheef Egypt",
    images: [{
      url: "/logo.png",
      width: 512,
      height: 512,
      alt: "Tawtheef Egypt — Job Board",
    }],
  },
  twitter: {
    card: "summary",
    title: "Tawtheef Egypt | توظيف مصر",
    description: "Egypt's leading job board.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
