'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Clock, DoorOpen, Flame, Timer, Flag, PartyPopper } from 'lucide-react';

interface TimelineEvent {
  id: string;
  label: string;
  description: string;
  offsetMinutes: number; // relative to kickoff (negative = before)
  icon: React.ReactNode;
}

interface MatchdayTimelineProps {
  kickoffTime: string; // ISO date
  className?: string;
}

const MATCHDAY_EVENTS: TimelineEvent[] = [
  {
    id: 'gates',
    label: 'Gates Open',
    description: '2 hours before kickoff',
    offsetMinutes: -120,
    icon: <DoorOpen className="w-4 h-4" />,
  },
  {
    id: 'food',
    label: 'Concourse Opens',
    description: 'Food and drinks available',
    offsetMinutes: -90,
    icon: <Clock className="w-4 h-4" />,
  },
  {
    id: 'warmup',
    label: 'Warm Up',
    description: 'Players on the pitch',
    offsetMinutes: -30,
    icon: <Flame className="w-4 h-4" />,
  },
  {
    id: 'kickoff',
    label: 'Kickoff',
    description: 'The match begins',
    offsetMinutes: 0,
    icon: <Timer className="w-4 h-4" />,
  },
  {
    id: 'halftime',
    label: 'Half Time',
    description: 'Approximately 45 minutes',
    offsetMinutes: 48,
    icon: <Flag className="w-4 h-4" />,
  },
  {
    id: 'fulltime',
    label: 'Full Time',
    description: 'Approximately 95 minutes',
    offsetMinutes: 98,
    icon: <PartyPopper className="w-4 h-4" />,
  },
];

function getActiveIndex(kickoffTime: string): number {
  const kickoff = new Date(kickoffTime).getTime();
  const now = Date.now();

  for (let i = MATCHDAY_EVENTS.length - 1; i >= 0; i--) {
    const eventTime = kickoff + MATCHDAY_EVENTS[i].offsetMinutes * 60 * 1000;
    if (now >= eventTime) return i;
  }
  return -1;
}

export function MatchdayTimeline({ kickoffTime, className }: MatchdayTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(() => getActiveIndex(kickoffTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(getActiveIndex(kickoffTime));
    }, 30_000);
    return () => clearInterval(interval);
  }, [kickoffTime]);

  const kickoffDate = new Date(kickoffTime);

  return (
    <div className={cn('', className)}>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Matchday Timeline
      </h3>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-700" />

        <div className="space-y-0">
          {MATCHDAY_EVENTS.map((event, idx) => {
            const eventDate = new Date(
              kickoffDate.getTime() + event.offsetMinutes * 60 * 1000
            );
            const timeStr = eventDate.toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
            });

            const isPast = idx <= activeIndex;
            const isCurrent = idx === activeIndex;

            return (
              <div key={event.id} className="relative flex items-start gap-4 py-3">
                {/* Dot */}
                <div
                  className={cn(
                    'relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 shrink-0',
                    isCurrent
                      ? 'border-[#132257] bg-[#132257] text-white dark:border-[#8DB7E0] dark:bg-[#8DB7E0] dark:text-[#0B1428]'
                      : isPast
                        ? 'border-[#132257]/40 bg-[#132257]/10 text-[#132257] dark:border-[#8DB7E0]/40 dark:bg-[#8DB7E0]/10 dark:text-[#8DB7E0]'
                        : 'border-gray-200 bg-white text-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-500'
                  )}
                >
                  {event.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={cn(
                        'text-sm font-semibold',
                        isCurrent
                          ? 'text-[#132257] dark:text-[#8DB7E0]'
                          : isPast
                            ? 'text-gray-700 dark:text-gray-300'
                            : 'text-gray-400 dark:text-gray-500'
                      )}
                    >
                      {event.label}
                    </p>
                    <span
                      className={cn(
                        'text-xs tabular-nums shrink-0',
                        isCurrent
                          ? 'text-[#132257] font-semibold dark:text-[#8DB7E0]'
                          : 'text-gray-400 dark:text-gray-500'
                      )}
                    >
                      {timeStr}
                    </span>
                  </div>
                  <p
                    className={cn(
                      'text-xs mt-0.5',
                      isPast
                        ? 'text-gray-500 dark:text-gray-400'
                        : 'text-gray-400 dark:text-gray-500'
                    )}
                  >
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
