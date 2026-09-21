'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(
  null
);

function useDropdownContext() {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(
      'DropdownMenu components must be used within a DropdownMenu'
    );
  }
  return context;
}

function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = () => {
      if (open) setOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

function DropdownMenuTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useDropdownContext();

  return (
    <button
      className={cn('outline-none', className)}
      onClick={(e) => {
        e.stopPropagation();
        setOpen(!open);
      }}
      aria-expanded={open}
      aria-haspopup="true"
      {...props}
    >
      {children}
    </button>
  );
}

function DropdownMenuContent({
  className,
  align = 'end',
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { align?: 'start' | 'end' }) {
  const { open } = useDropdownContext();

  if (!open) return null;

  return (
    <div
      className={cn(
        'absolute z-50 mt-1 min-w-[180px] overflow-hidden rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-[#0B1428]',
        align === 'end' ? 'right-0' : 'left-0',
        className
      )}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuItem({
  className,
  disabled,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { disabled?: boolean }) {
  const { setOpen } = useDropdownContext();

  return (
    <button
      className={cn(
        'flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      disabled={disabled}
      onClick={(e) => {
        props.onClick?.(e);
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'my-1 h-px bg-[#E5E7EB] dark:bg-gray-800',
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'px-3 py-2 text-xs font-semibold text-[#6B7280] uppercase tracking-wider',
        className
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
};
