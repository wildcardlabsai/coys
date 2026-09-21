import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#132257] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-[#132257] text-white shadow-sm hover:bg-[#1a2d6d] dark:bg-[#8DB7E0] dark:text-[#0B1428] dark:hover:bg-[#A3D1F5]',
        secondary:
          'border border-[#E5E7EB] bg-white text-[#132257] shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-[#0B1428] dark:text-[#8DB7E0] dark:hover:bg-gray-800',
        ghost:
          'text-[#132257] hover:bg-[#132257]/10 dark:text-[#8DB7E0] dark:hover:bg-[#8DB7E0]/10',
        destructive:
          'bg-red-600 text-white shadow-sm hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800',
        link: 'text-[#132257] underline-offset-4 hover:underline dark:text-[#8DB7E0] p-0 h-auto',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-md',
        default: 'h-10 px-5 py-2',
        lg: 'h-12 px-8 text-base rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
