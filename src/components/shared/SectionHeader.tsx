import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

function SectionHeader({
  title,
  subtitle,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-end justify-between gap-4', className)}>
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-0.5 text-sm text-[#6B7280]">{subtitle}</p>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="flex shrink-0 items-center gap-0.5 text-sm font-medium text-[#132257] transition-colors hover:text-[#1a2d6d] dark:text-[#8DB7E0] dark:hover:text-[#A3D1F5]"
        >
          {action.label}
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export { SectionHeader };
