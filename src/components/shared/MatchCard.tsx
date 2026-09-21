'use client';

import { cn } from '@/lib/utils';
import { formatMatchDate, formatTime } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Countdown } from './Countdown';
import { Calendar, MapPin } from 'lucide-react';
import type { FixtureWithTeams } from '@/types';

export interface MatchCardProps {
  fixture: FixtureWithTeams;
  variant?: 'hero' | 'compact' | 'list';
  className?: string;
}

function TeamCrest({
  name,
  shortName,
  logoUrl,
  size = 'default',
}: {
  name: string;
  shortName: string;
  logoUrl?: string | null;
  size?: 'sm' | 'default' | 'lg';
}) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    default: 'h-12 w-12 text-sm',
    lg: 'h-16 w-16 text-lg',
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-white/20 font-bold',
          sizeClasses[size]
        )}
      >
        {logoUrl ? (
          <img src={logoUrl} alt={name} className="h-full w-full rounded-full object-contain p-1" />
        ) : (
          <span>{shortName.slice(0, 3).toUpperCase()}</span>
        )}
      </div>
      <span
        className={cn(
          'font-medium text-center leading-tight',
          size === 'sm' ? 'text-xs max-w-[60px]' : 'text-sm max-w-[80px]'
        )}
      >
        {shortName}
      </span>
    </div>
  );
}

function MatchCard({ fixture, variant = 'compact', className }: MatchCardProps) {
  const isScheduled = ['scheduled', 'timed'].includes(fixture.status);
  const isLive = ['in_play', 'halftime', 'extra_time', 'penalties'].includes(
    fixture.status
  );
  const isFinished = fixture.status.startsWith('finished');

  if (variant === 'hero') {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#132257] to-[#1a2d6d] p-6 text-white shadow-lg',
          'dark:from-[#0B1428] dark:to-[#132257]',
          className
        )}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <Badge variant="outline" className="border-white/30 text-white/80 text-xs">
              {fixture.competition.short_name}
            </Badge>
            {isLive && (
              <Badge className="animate-pulse bg-red-500 text-white">
                LIVE
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <TeamCrest
              name={fixture.home_team.name}
              shortName={fixture.home_team.short_name}
              logoUrl={fixture.home_team.logo_url}
              size="lg"
            />

            <div className="flex flex-col items-center gap-2">
              {isScheduled && (
                <>
                  <span className="text-2xl font-bold tracking-wider">
                    {formatTime(fixture.kickoff)}
                  </span>
                  <span className="text-xs text-white/70">
                    {formatMatchDate(fixture.kickoff)}
                  </span>
                </>
              )}
              {(isLive || isFinished) && (
                <span className="text-3xl font-bold tracking-wider">
                  {fixture.home_score} - {fixture.away_score}
                </span>
              )}
              <span className="text-lg font-light text-white/50">vs</span>
            </div>

            <TeamCrest
              name={fixture.away_team.name}
              shortName={fixture.away_team.short_name}
              logoUrl={fixture.away_team.logo_url}
              size="lg"
            />
          </div>

          {fixture.venue && (
            <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-white/60">
              <MapPin className="h-3 w-3" />
              <span>{fixture.venue.name}</span>
            </div>
          )}

          {isScheduled && (
            <div className="mt-4">
              <Countdown targetDate={fixture.kickoff} />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div
        className={cn(
          'flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
          'dark:border-gray-800 dark:bg-[#0B1428]',
          className
        )}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6B7280]">
              {fixture.competition.short_name}
            </span>
            {isLive && (
              <Badge className="animate-pulse bg-red-500 text-white text-[10px] px-1.5 py-0">
                LIVE
              </Badge>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
            <span>{fixture.home_team.short_name}</span>
            {(isLive || isFinished) ? (
              <span className="text-[#132257] dark:text-[#8DB7E0]">
                {fixture.home_score} - {fixture.away_score}
              </span>
            ) : (
              <span className="text-[#6B7280]">vs</span>
            )}
            <span>{fixture.away_team.short_name}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {formatTime(fixture.kickoff)}
          </div>
          <div className="text-xs text-[#6B7280]">
            {formatMatchDate(fixture.kickoff)}
          </div>
        </div>
      </div>
    );
  }

  // compact (default)
  return (
    <div
      className={cn(
        'rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition-shadow hover:shadow-md',
        'dark:border-gray-800 dark:bg-[#0B1428]',
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <Badge variant="secondary" className="text-xs">
          {fixture.competition.short_name}
        </Badge>
        {isLive && (
          <Badge className="animate-pulse bg-red-500 text-white">LIVE</Badge>
        )}
        {isScheduled && (
          <div className="flex items-center gap-1 text-xs text-[#6B7280]">
            <Calendar className="h-3 w-3" />
            {formatMatchDate(fixture.kickoff)}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <TeamCrest
          name={fixture.home_team.name}
          shortName={fixture.home_team.short_name}
          logoUrl={fixture.home_team.logo_url}
        />

        <div className="flex flex-col items-center">
          {isScheduled ? (
            <span className="text-xl font-bold text-[#132257] dark:text-[#8DB7E0]">
              {formatTime(fixture.kickoff)}
            </span>
          ) : (
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {fixture.home_score} - {fixture.away_score}
            </span>
          )}
        </div>

        <TeamCrest
          name={fixture.away_team.name}
          shortName={fixture.away_team.short_name}
          logoUrl={fixture.away_team.logo_url}
        />
      </div>

      {fixture.venue && (
        <div className="mt-3 flex items-center justify-center gap-1 text-xs text-[#6B7280]">
          <MapPin className="h-3 w-3" />
          <span>{fixture.venue.name}</span>
        </div>
      )}
    </div>
  );
}

export { MatchCard };
