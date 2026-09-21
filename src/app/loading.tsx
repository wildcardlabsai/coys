export default function Loading() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-navy/20 border-t-navy dark:border-light-blue/20 dark:border-t-light-blue" />
        <p className="text-sm text-muted animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
