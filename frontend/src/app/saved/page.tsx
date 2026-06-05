import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SavedJobs from "./SavedJobs";
export const metadata: Metadata = {
  title: "Saved Jobs | Tawtheef Egypt",
  robots: { index: false, follow: false },
};
export default function SavedPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-[70vh]">
        <div className="max-w-[1280px] mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold mb-6" style={{ color: "var(--primary)" }}>Saved Jobs</h1>
          <SavedJobs />
        </div>
      </main>
      <Footer />
    </>
  );
}
