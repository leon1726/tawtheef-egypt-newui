import Navbar from "@/components/layout/Navbar";

export default function JobDetailLoading() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="border-b px-4 py-3 animate-pulse"
          style={{ background: "var(--surface-container-low)", borderColor: "var(--outline-variant)" }}>
          <div className="max-w-[1280px] mx-auto h-4 w-64 rounded" style={{ background: "var(--surface-container)" }} />
        </div>
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8 animate-pulse">
            <div className="flex-1 space-y-5">
              <div className="h-4 w-24 rounded" style={{ background: "var(--surface-container-low)" }} />
              <div className="rounded-2xl border p-8 space-y-5"
                style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-2xl flex-shrink-0" style={{ background: "var(--surface-container-low)" }} />
                  <div className="flex-1 space-y-2">
                    <div className="h-6 rounded w-3/4" style={{ background: "var(--surface-container-low)" }} />
                    <div className="h-4 rounded w-1/2" style={{ background: "var(--surface-container-low)" }} />
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-7 w-28 rounded-full" style={{ background: "var(--surface-container-low)" }} />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border p-8 space-y-3"
                style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
                <div className="h-5 w-40 rounded" style={{ background: "var(--surface-container-low)" }} />
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-3 rounded" style={{ background: "var(--surface-container-low)", width: `${70 + Math.random() * 30}%` }} />
                ))}
              </div>
            </div>
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="rounded-2xl border p-6 space-y-4"
                style={{ background: "var(--surface-container-lowest)", borderColor: "var(--outline-variant)" }}>
                <div className="h-20 rounded-xl" style={{ background: "var(--surface-container-low)" }} />
                <div className="h-11 rounded-xl" style={{ background: "var(--surface-container-low)" }} />
                <div className="h-11 rounded-xl" style={{ background: "var(--surface-container-low)" }} />
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-3 w-20 rounded" style={{ background: "var(--surface-container-low)" }} />
                    <div className="h-3 w-24 rounded" style={{ background: "var(--surface-container-low)" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
