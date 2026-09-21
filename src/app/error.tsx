'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background p-6">
      <div className="text-center max-w-md">
        <div className="text-5xl font-bold font-heading text-navy dark:text-light-blue mb-4">
          Oops
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Something went wrong</h1>
        <p className="text-muted mb-8">
          We hit a bad tackle there. Give it another go.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-xl bg-navy text-white px-6 py-3 font-semibold hover:bg-navy/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
