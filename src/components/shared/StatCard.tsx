import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

export interface StatCardProps {
  value: number | string;
  label: string;
  icon?: LucideIcon;
  className?: string;
}

function StatCard({ value, label, icon: Icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm',
        'dark:border-gray-800 dark:bg-[#0B1428]',
        className
      )}
    >
      {Icon && (
        <Icon className="mb-2 h-5 w-5 text-[#132257] dark:text-[#8DB7E0]" />
      )}
      <span className="text-2xl font-bold text-[#132257] dark:text-[#8DB7E0]">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </span>
      <span className="mt-1 text-xs text-[#6B7280] text-center">{label}</span>
    </div>
  );
}

export { StatCard };
