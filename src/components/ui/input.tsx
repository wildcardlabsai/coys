import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            'flex h-10 w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-[#6B7280] transition-colors',
            'focus:border-[#132257] focus:outline-none focus:ring-2 focus:ring-[#132257]/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'dark:border-gray-700 dark:bg-[#0B1428] dark:text-gray-100 dark:placeholder:text-gray-500',
            'dark:focus:border-[#8DB7E0] dark:focus:ring-[#8DB7E0]/20',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20 dark:border-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
