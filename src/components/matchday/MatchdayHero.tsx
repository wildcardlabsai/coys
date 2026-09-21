'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MatchdayHeroProps {
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  competition: string;
  date: string;
  venue: string;
  status: 'scheduled' | 'live' | 'halftime' | 'finished' | 'postponed' | 'cancelled';
  homeScore?: number | null;
  awayScore?: number | null;
  minute?: number | null;
  matchdayLink?: string;
  className?: string;
}

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    function calculate() {
      const target = new Date(targetDate).getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl sm:text-3xl font-bold tabular-nums text-white">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/60 mt-0.5">
        {label}
      </span>
    </div>
  );
}

export function MatchdayHero({
  homeTeam,
  awayTeam,
  competition,
  date,
  venue,
  status,
  homeScore,
  awayScore,
  minute,
  matchdayLink,
  className,
}: MatchdayHeroProps) {
  const countdown = useCountdown(date);
  const kickoffDate = new Date(date);
  const isUpcoming = status === 'scheduled';
  const isLive = status === 'live' || status === 'halftime';
  const isFinished = status === 'finished';

  const dateStr = kickoffDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const timeStr = kickoffDate.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#132257] via-[#1a2d6d] to-[#0B1428]',
        className
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/20 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="relative px-5 py-6 sm:px-8 sm:py-8">
        {/* Competition badge */}
        <div className="flex items-center justify-center mb-5">
          <Badge variant="outline" className="border-white/20 text-white/80 bg-white/5 text-xs">
            {competition}
          </Badge>
          {isLive && (
            <Badge className="ml-2 bg-red-500 text-white animate-pulse text-xs">
              LIVE {minute ? `${minute}'` : ''}
            </Badge>
          )}
        </div>

        {/* Teams & Score */}
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/10 flex items-center justify-center text-lg sm:text-xl font-bold text-white">
              {homeTeam.charAt(0)}
            </div>
            <span className="text-sm sm:text-base font-semibold text-white text-center leading-tight">
              {homeTeam}
            </span>
          </div>

          {/* Score or VS */}
          <div className="flex flex-col items-center min-w-[60px]">
            {isLive || isFinished ? (
              <div className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
                {homeScore ?? 0} - {awayScore ?? 0}
              </div>
            ) : (
              <div className="text-lg sm:text-xl font-bold text-white/40">VS</div>
            )}
            {isFinished && (
              <span className="text-xs text-white/60 mt-1">Full Time</span>
            )}
            {status === 'halftime' && (
              <span className="text-xs text-amber-400 mt-1">Half Time</span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white/10 flex items-center justify-center text-lg sm:text-xl font-bold text-white">
              {awayTeam.charAt(0)}
            </div>
            <span className="text-sm sm:text-base font-semibold text-white text-center leading-tight">
              {awayTeam}
            </span>
          </div>
        </div>

        {/* Match Info */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mt-5 text-xs sm:text-sm text-white/60">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {dateStr}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {timeStr}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {venue}
          </span>
        </div>

        {/* Countdown */}
        {isUpcoming && countdown && (
          <div className="mt-6">
            <p className="text-center text-xs uppercase tracking-widest text-white/40 mb-3">
              Kickoff in
            </p>
            <div className="flex items-center justify-center gap-3 sm:gap-5">
              <CountdownUnit value={countdown.days} label="Days" />
              <span className="text-xl text-white/30 font-light">:</span>
              <CountdownUnit value={countdown.hours} label="Hrs" />
              <span className="text-xl text-white/30 font-light">:</span>
              <CountdownUnit value={countdown.minutes} label="Min" />
              <span className="text-xl text-white/30 font-light">:</span>
              <CountdownUnit value={countdown.seconds} label="Sec" />
            </div>
          </div>
        )}

        {/* CTA */}
        {matchdayLink && (
          <div className="mt-6 flex justify-center">
            <Link href={matchdayLink}>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-[#132257] hover:bg-white/90 border-0 font-bold"
              >
                VIEW MATCHDAY GUIDE
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
