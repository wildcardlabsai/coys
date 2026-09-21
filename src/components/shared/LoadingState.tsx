import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export interface LoadingStateProps {
  variant?: 'cards' | 'list' | 'detail';
  count?: number;
  className?: string;
}

function LoadingState({
  variant = 'cards',
  count = 3,
  className,
}: LoadingStateProps) {
  if (variant === 'list') {
    return (
      <div className={cn('space-y-3', className)}>
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white p-4 dark:border-gray-800 dark:bg-[#0B1428]"
          >
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'detail') {
    return (
      <div className={cn('space-y-6', className)}>
        <Skeleton className="h-48 w-full rounded-2xl" />
        <div className="space-y-3 px-4">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
        </div>
        <div className="grid grid-cols-2 gap-3 px-4">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      </div>
    );
  }

  // cards (default)
  return (
    <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', className)}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white dark:border-gray-800 dark:bg-[#0B1428]"
        >
          <Skeleton className="aspect-[16/9] w-full" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export { LoadingState };
