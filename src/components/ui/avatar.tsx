'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'default' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  default: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

function Avatar({
  src,
  alt = '',
  fallback,
  size = 'default',
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  const initials = React.useMemo(() => {
    if (fallback) return fallback.slice(0, 2).toUpperCase();
    if (alt) {
      return alt
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    }
    return '?';
  }, [fallback, alt]);

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#132257] text-white dark:bg-[#8DB7E0] dark:text-[#0B1428]',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="font-semibold leading-none">{initials}</span>
      )}
    </div>
  );
}

export { Avatar };
