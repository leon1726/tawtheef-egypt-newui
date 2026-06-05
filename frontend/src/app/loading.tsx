export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-16"
      style={{ background: "var(--background)" }} aria-label="Loading" role="status">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "var(--primary-container)", borderTopColor: "transparent" }} />
        <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>Loading…</p>
      </div>
    </div>
  );
}
