'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

export interface FilterChipOption {
  key: string;
  label: string;
  count?: number;
}

export interface FilterChipsProps {
  options: FilterChipOption[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

function FilterChips({ options, activeKey, onChange, className }: FilterChipsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className={cn(
        'flex gap-2 overflow-x-auto pb-1 scrollbar-none',
        '-mx-4 px-4 sm:mx-0 sm:px-0',
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.key === activeKey;
        return (
          <button
            key={option.key}
            onClick={() => onChange(option.key)}
            className={cn(
              'inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
              isActive
                ? 'bg-[#132257] text-white shadow-sm dark:bg-[#8DB7E0] dark:text-[#0B1428]'
                : 'bg-gray-100 text-[#6B7280] hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            )}
          >
            {option.label}
            {option.count !== undefined && (
              <span
                className={cn(
                  'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                  isActive
                    ? 'bg-white/20 text-white dark:bg-[#0B1428]/20 dark:text-[#0B1428]'
                    : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export { FilterChips };
