export default function PageLoader() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-warm-ivory" role="status">
      <span className="size-10 animate-spin rounded-full border-2 border-champagne border-t-taupe" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
