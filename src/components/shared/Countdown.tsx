'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { differenceInSeconds, parseISO } from 'date-fns';

export interface CountdownProps {
  targetDate: string | Date;
  className?: string;
  compact?: boolean;
}

interface TimeLeft {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const totalSeconds = Math.max(0, differenceInSeconds(target, new Date()));
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    mins: Math.floor((totalSeconds % 3600) / 60),
    secs: totalSeconds % 60,
  };
}

function CountdownBlock({
  value,
  label,
  compact,
}: {
  value: number;
  label: string;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          'flex items-center justify-center rounded-lg bg-[#132257] font-bold tabular-nums text-white',
          'dark:bg-[#8DB7E0] dark:text-[#0B1428]',
          compact ? 'h-8 w-8 text-sm' : 'h-12 w-12 text-xl'
        )}
      >
        {String(value).padStart(2, '0')}
      </div>
      <span
        className={cn(
          'mt-1 uppercase tracking-wider text-white/60 dark:text-gray-400',
          compact ? 'text-[9px]' : 'text-[10px]'
        )}
      >
        {label}
      </span>
    </div>
  );
}

function Countdown({ targetDate, className, compact = false }: CountdownProps) {
  const target =
    typeof targetDate === 'string' ? parseISO(targetDate) : targetDate;

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(target)
  );

  const update = useCallback(() => {
    setTimeLeft(calculateTimeLeft(target));
  }, [target]);

  useEffect(() => {
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [update]);

  const isExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.mins === 0 &&
    timeLeft.secs === 0;

  if (isExpired) {
    return (
      <div className={cn('text-center text-sm font-semibold text-white/80', className)}>
        Kick off!
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {timeLeft.days > 0 && (
        <CountdownBlock value={timeLeft.days} label="Days" compact={compact} />
      )}
      <CountdownBlock value={timeLeft.hours} label="Hrs" compact={compact} />
      <CountdownBlock value={timeLeft.mins} label="Min" compact={compact} />
      <CountdownBlock value={timeLeft.secs} label="Sec" compact={compact} />
    </div>
  );
}

export { Countdown };
