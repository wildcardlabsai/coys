import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-[#132257] text-white dark:bg-[#8DB7E0] dark:text-[#0B1428]',
        secondary:
          'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        outline:
          'border border-[#E5E7EB] text-[#132257] dark:border-gray-700 dark:text-[#8DB7E0]',
        success:
          'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
        warning:
          'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
        destructive:
          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
