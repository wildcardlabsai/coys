'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}

function SearchBar({
  value: controlledValue,
  onChange,
  placeholder = 'Search...',
  autoFocus = false,
  className,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(controlledValue ?? '');
  const inputRef = useRef<HTMLInputElement>(null);
  const displayValue = controlledValue ?? internalValue;

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (val: string) => {
    if (controlledValue === undefined) setInternalValue(val);
    onChange(val);
  };

  const handleClear = () => {
    handleChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
      <input
        ref={inputRef}
        type="text"
        value={displayValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'h-10 w-full rounded-xl border border-[#E5E7EB] bg-white pl-10 pr-9 text-sm text-gray-900 placeholder:text-[#6B7280] transition-colors',
          'focus:border-[#132257] focus:outline-none focus:ring-2 focus:ring-[#132257]/20',
          'dark:border-gray-700 dark:bg-[#0B1428] dark:text-gray-100 dark:placeholder:text-gray-500',
          'dark:focus:border-[#8DB7E0] dark:focus:ring-[#8DB7E0]/20'
        )}
      />
      {displayValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-[#6B7280] hover:text-gray-900 transition-colors dark:hover:text-gray-200"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

export { SearchBar };
