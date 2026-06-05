import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <p className="text-7xl" aria-hidden="true">🔍</p>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold" style={{ color: "var(--primary)" }}>
              Page not found
            </h1>
            <p className="text-base" style={{ color: "var(--on-surface-variant)" }}>
              This page doesn&apos;t exist, or the job listing may have been removed.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/jobs" className="btn-primary px-6 py-3 text-sm font-semibold">
              Browse Jobs
            </Link>
            <Link href="/" className="btn-secondary px-6 py-3 text-sm font-semibold">
              Go Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
