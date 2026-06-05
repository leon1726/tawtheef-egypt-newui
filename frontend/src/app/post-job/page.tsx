import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export const metadata: Metadata = {
  title: "Post a Job | Tawtheef Egypt",
  description: "Reach thousands of qualified professionals in Egypt.",
};
export default function PostJobPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-[70vh]">
        <div className="max-w-[1280px] mx-auto px-4 py-16 text-center">
          <p className="text-4xl mb-6">📋</p>
          <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--primary)" }}>Post a Job</h1>
          <p className="text-base mb-8 max-w-xl mx-auto" style={{ color: "var(--on-surface-variant)" }}>
            Reach thousands of qualified professionals across Egypt. Contact us to list your vacancy.
          </p>
          <a href="mailto:jobs@tawtheef.com" className="btn-primary px-8 py-3 text-sm font-semibold">
            Contact Us to Post
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
