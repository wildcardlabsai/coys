import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { type LucideIcon, Inbox } from 'lucide-react';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-6 py-12 text-center',
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <Icon className="h-7 w-7 text-[#6B7280]" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 max-w-xs text-sm text-[#6B7280]">
          {description}
        </p>
      )}
      {action && (
        <Button
          variant="primary"
          size="sm"
          onClick={action.onClick}
          className="mt-4"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}

export { EmptyState };
