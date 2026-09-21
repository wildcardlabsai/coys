'use client';

import { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

export interface AffiliateCTAProps {
  partnerName: string;
  label: string;
  description?: string;
  url: string;
  trackingCode: string;
  variant?: 'button' | 'card';
  className?: string;
  onTrackClick?: (trackingCode: string) => void;
}

function AffiliateCTA({
  partnerName,
  label,
  description,
  url,
  trackingCode,
  variant = 'button',
  className,
  onTrackClick,
}: AffiliateCTAProps) {
  const handleClick = useCallback(() => {
    onTrackClick?.(trackingCode);
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [url, trackingCode, onTrackClick]);

  if (variant === 'card') {
    return (
      <div
        className={cn(
          'flex items-center justify-between gap-4 rounded-xl border border-[#C4A44A]/30 bg-[#C4A44A]/5 p-4',
          'dark:border-[#C4A44A]/20 dark:bg-[#C4A44A]/5',
          className
        )}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C4A44A]">
              Partner
            </span>
            <span className="text-xs text-[#6B7280]">{partnerName}</span>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
            {label}
          </p>
          {description && (
            <p className="mt-0.5 text-xs text-[#6B7280]">{description}</p>
          )}
        </div>
        <button
          onClick={handleClick}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#C4A44A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#b39643] active:scale-[0.98]"
        >
          View
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  // button variant
  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg bg-[#C4A44A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#b39643] active:scale-[0.98]',
        className
      )}
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" />
    </button>
  );
}

export { AffiliateCTA };
