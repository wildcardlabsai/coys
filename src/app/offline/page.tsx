import Link from 'next/link';
import { WifiOff } from 'lucide-react';

export const metadata = {
  title: 'Offline | COYS',
};

export default function OfflinePage() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-background p-6">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-navy/10 dark:bg-light-blue/10">
          <WifiOff className="h-10 w-10 text-navy dark:text-light-blue" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">You&apos;re Offline</h1>
        <p className="text-muted mb-8">
          No internet connection. Check your connection and try again — we&apos;ll be
          here when you&apos;re back.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-navy text-white px-6 py-3 font-semibold hover:bg-navy/90 transition-colors"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
