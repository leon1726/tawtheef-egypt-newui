import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Create Account | Tawtheef Egypt",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen flex items-center justify-center px-4"
        style={{ background: "var(--background)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-xl border p-8 space-y-6"
            style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
            <div className="space-y-1.5 text-center">
              <h1 className="text-2xl font-bold" style={{ color: "var(--primary)" }}>Create an account</h1>
              <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
                Start finding jobs in Egypt today
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--on-surface)" }}>Full Name</label>
                <input id="name" type="text" placeholder="Ahmed Mohamed"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-low)", color: "var(--on-surface)" }} />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--on-surface)" }}>Email</label>
                <input id="email" type="email" placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-low)", color: "var(--on-surface)" }} />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "var(--on-surface)" }}>Password</label>
                <input id="password" type="password" placeholder="Min. 8 characters"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-low)", color: "var(--on-surface)" }} />
              </div>
              <button className="btn-primary w-full py-3 text-sm font-semibold">
                Create account
              </button>
            </div>

            <p className="text-center text-xs" style={{ color: "var(--on-surface-variant)" }}>
              Already have an account?{" "}
              <Link href="/login" className="font-semibold hover:underline" style={{ color: "var(--accent)" }}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
