import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-background p-6">
      <div className="text-center max-w-md">
        <div className="text-6xl font-bold font-heading text-navy dark:text-light-blue mb-4">
          404
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
        <p className="text-muted mb-8">
          Looks like this page has gone to the away end. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-navy text-white px-6 py-3 font-semibold hover:bg-navy/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
