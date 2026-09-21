'use client';

import { useEffect, useState, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Radio, RefreshCw } from 'lucide-react';

interface LiveMatchEvent {
  minute: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'substitution';
  player: string;
  teamId: number;
  description?: string;
}

interface LiveMatchProps {
  fixtureId: number;
  homeTeam: string;
  awayTeam: string;
  homeTeamId: number;
  awayTeamId: number;
  initialHomeScore: number;
  initialAwayScore: number;
  initialMinute: number | null;
  status: 'live' | 'halftime';
  className?: string;
}

const EVENT_ICONS: Record<string, string> = {
  goal: '⚽',
  yellow_card: '🟨',
  red_card: '🟥',
  substitution: '🔄',
};

export function LiveMatch({
  fixtureId,
  homeTeam,
  awayTeam,
  homeTeamId,
  initialHomeScore,
  initialAwayScore,
  initialMinute,
  status: initialStatus,
  className,
}: LiveMatchProps) {
  const [homeScore, setHomeScore] = useState(initialHomeScore);
  const [awayScore, setAwayScore] = useState(initialAwayScore);
  const [minute, setMinute] = useState(initialMinute);
  const [status, setStatus] = useState(initialStatus);
  const [events, setEvents] = useState<LiveMatchEvent[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/football/live');
      if (res.ok) {
        const json = await res.json();
        const fixtures = json.data ?? json;
        const match = Array.isArray(fixtures)
          ? fixtures.find((f: { id: number }) => f.id === fixtureId)
          : null;

        if (match) {
          setHomeScore(match.homeScore ?? homeScore);
          setAwayScore(match.awayScore ?? awayScore);
          setMinute(match.minute ?? minute);
          if (match.status === 'halftime') setStatus('halftime');
          else if (match.status === 'live') setStatus('live');
          if (match.events && Array.isArray(match.events)) {
            setEvents(match.events);
          }
        }
      }
    } catch {
      // Silently handle - will retry on next interval
    } finally {
      setLastRefresh(new Date());
      setIsRefreshing(false);
    }
  }, [fixtureId, homeScore, awayScore, minute]);

  useEffect(() => {
    const interval = setInterval(refresh, 30_000);
    return () => clearInterval(interval);
  }, [refresh]);

  useEffect(() => {
    setHomeScore(initialHomeScore);
    setAwayScore(initialAwayScore);
    setMinute(initialMinute);
    setStatus(initialStatus);
  }, [initialHomeScore, initialAwayScore, initialMinute, initialStatus]);

  return (
    <div
      className={cn(
        'rounded-xl border-2 border-red-500/20 bg-red-50/50 dark:bg-red-950/10 dark:border-red-500/10 p-4',
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-red-500 animate-pulse" />
          <Badge className="bg-red-500 text-white text-[10px] uppercase tracking-wider">
            {status === 'halftime' ? 'Half Time' : 'Live'}
          </Badge>
          {minute !== null && status !== 'halftime' && (
            <span className="text-sm font-bold text-red-600 dark:text-red-400 tabular-nums">
              {minute}&apos;
            </span>
          )}
        </div>
        <button
          onClick={refresh}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          title="Refresh"
          disabled={isRefreshing}
        >
          <RefreshCw className={cn('w-4 h-4', isRefreshing && 'animate-spin')} />
        </button>
      </div>

      <div className="flex items-center justify-center gap-4 py-2">
        <div className="flex-1 text-right">
          <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
            {homeTeam}
          </span>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tabular-nums px-3">
          {homeScore} - {awayScore}
        </div>
        <div className="flex-1 text-left">
          <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
            {awayTeam}
          </span>
        </div>
      </div>

      {events.length > 0 && (
        <div className="mt-3 border-t border-red-200/50 dark:border-red-800/30 pt-3 space-y-1.5">
          {events.slice(-3).map((event, idx) => (
            <div
              key={idx}
              className={cn(
                'flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400',
                event.teamId === homeTeamId ? 'justify-start' : 'justify-end'
              )}
            >
              <span className="tabular-nums font-medium">{event.minute}&apos;</span>
              <span>{EVENT_ICONS[event.type] ?? ''}</span>
              <span>{event.player}</span>
            </div>
          ))}
        </div>
      )}

      <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center mt-3">
        Last updated: {lastRefresh.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </p>
    </div>
  );
}
