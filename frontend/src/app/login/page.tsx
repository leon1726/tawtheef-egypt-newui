import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Log In | Tawtheef Egypt",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen flex items-center justify-center px-4"
        style={{ background: "var(--background)" }}>
        <div className="w-full max-w-sm">
          <div className="rounded-xl border p-8 space-y-6"
            style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
            <div className="space-y-1.5 text-center">
              <h1 className="text-2xl font-bold" style={{ color: "var(--primary)" }}>Welcome back</h1>
              <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
                Log in to your Tawtheef Egypt account
              </p>
            </div>

            <div className="space-y-4">
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
                <input id="password" type="password" placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg border text-sm outline-none"
                  style={{ borderColor: "var(--outline-variant)", background: "var(--surface-container-low)", color: "var(--on-surface)" }} />
              </div>
              <button className="btn-primary w-full py-3 text-sm font-semibold">
                Log in
              </button>
            </div>

            <p className="text-center text-xs" style={{ color: "var(--on-surface-variant)" }}>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold hover:underline" style={{ color: "var(--accent)" }}>
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
