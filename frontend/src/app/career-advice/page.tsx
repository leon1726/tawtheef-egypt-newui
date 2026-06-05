import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export const metadata: Metadata = {
  title: "Career Advice | Tawtheef Egypt",
  description: "Expert career advice, interview tips, and resume guidance for Egyptian professionals.",
};
export default function CareerAdvicePage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-[70vh]">
        <div className="max-w-[1280px] mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-4" style={{ color: "var(--primary)" }}>Career Advice</h1>
          <p style={{ color: "var(--on-surface-variant)" }}>Expert guidance for Egyptian professionals. Coming soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
