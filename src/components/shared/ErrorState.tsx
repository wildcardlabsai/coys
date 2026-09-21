import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AlertTriangle, type LucideIcon } from 'lucide-react';

export interface ErrorStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  retry?: () => void;
  className?: string;
}

function ErrorState({
  icon: Icon = AlertTriangle,
  title = 'Something went wrong',
  description = 'We couldn\'t load this content. Please try again.',
  retry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-6 py-12 text-center',
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20">
        <Icon className="h-7 w-7 text-red-500 dark:text-red-400" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 max-w-xs text-sm text-[#6B7280]">
          {description}
        </p>
      )}
      {retry && (
        <Button variant="secondary" size="sm" onClick={retry} className="mt-4">
          Try again
        </Button>
      )}
    </div>
  );
}

export { ErrorState };
