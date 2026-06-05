import Navbar from "@/components/layout/Navbar";

function SkeletonCard() {
  return (
    <div className="job-card flex flex-col gap-4 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="w-12 h-12 rounded-xl" style={{ background: "var(--surface-container-low)" }} />
        <div className="w-7 h-7 rounded-lg" style={{ background: "var(--surface-container-low)" }} />
      </div>
      <div className="space-y-2">
        <div className="h-4 rounded-lg w-3/4" style={{ background: "var(--surface-container-low)" }} />
        <div className="h-3 rounded-lg w-1/2" style={{ background: "var(--surface-container-low)" }} />
        <div className="h-3 rounded-lg w-2/5" style={{ background: "var(--surface-container-low)" }} />
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-20 rounded-full" style={{ background: "var(--surface-container-low)" }} />
        <div className="h-6 w-16 rounded-full" style={{ background: "var(--surface-container-low)" }} />
      </div>
      <div className="mt-auto flex justify-between pt-4 border-t items-center"
        style={{ borderColor: "var(--outline-variant)" }}>
        <div className="h-4 w-24 rounded" style={{ background: "var(--surface-container-low)" }} />
        <div className="h-8 w-20 rounded-xl" style={{ background: "var(--surface-container-low)" }} />
      </div>
    </div>
  );
}

export default function JobsLoading() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="py-10 px-4 border-b animate-pulse"
          style={{ background: "var(--surface-container-low)", borderColor: "var(--outline-variant)" }}>
          <div className="max-w-[1280px] mx-auto space-y-4">
            <div className="h-8 w-64 rounded-xl" style={{ background: "var(--surface-container)" }} />
            <div className="h-4 w-48 rounded" style={{ background: "var(--surface-container)" }} />
            <div className="h-14 rounded-2xl" style={{ background: "var(--surface-container)" }} />
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-64 flex-shrink-0 hidden lg:block">
              <div className="rounded-2xl border p-5 animate-pulse space-y-4"
                style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 rounded" style={{ background: "var(--surface-container-low)", width: `${60 + i * 5}%` }} />
                ))}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between mb-6 animate-pulse">
                <div className="h-4 w-40 rounded" style={{ background: "var(--surface-container-low)" }} />
                <div className="h-8 w-32 rounded-lg" style={{ background: "var(--surface-container-low)" }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5" aria-label="Loading jobs" role="status">
                {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
