import * as React from 'react';
import Link from 'next/link';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AwayGuideSectionItem {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

interface AwayGuideSectionProps {
  items: AwayGuideSectionItem[];
  className?: string;
}

export function AwayGuideSection({ items, className }: AwayGuideSectionProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item) => {
        const content = (
          <div className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white p-4 transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-[#0B1428] dark:hover:bg-gray-800/60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#132257]/10 dark:bg-[#8DB7E0]/10">
              <item.icon className="h-5 w-5 text-[#132257] dark:text-[#8DB7E0]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {item.title}
              </p>
              <p className="text-xs text-[#6B7280] dark:text-gray-400 line-clamp-1">
                {item.description}
              </p>
            </div>
            {item.href && (
              <ChevronRight className="h-4 w-4 shrink-0 text-[#6B7280] dark:text-gray-500" />
            )}
          </div>
        );

        if (item.href) {
          return (
            <Link key={item.title} href={item.href} className="block">
              {content}
            </Link>
          );
        }

        return (
          <div key={item.title}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
