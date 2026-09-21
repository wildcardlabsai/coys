'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft, Plus, Calendar, MapPin, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sampleMatches = [
  {
    id: 1,
    homeTeam: 'Tottenham Hotspur',
    awayTeam: 'Arsenal',
    homeScore: 2,
    awayScore: 1,
    date: '2024-09-15',
    venue: 'Tottenham Hotspur Stadium',
    competition: 'Premier League',
    result: 'W' as const,
  },
  {
    id: 2,
    homeTeam: 'Tottenham Hotspur',
    awayTeam: 'Liverpool',
    homeScore: 1,
    awayScore: 1,
    date: '2024-09-01',
    venue: 'Tottenham Hotspur Stadium',
    competition: 'Premier League',
    result: 'D' as const,
  },
  {
    id: 3,
    homeTeam: 'Manchester City',
    awayTeam: 'Tottenham Hotspur',
    homeScore: 0,
    awayScore: 2,
    date: '2024-08-17',
    venue: 'Etihad Stadium',
    competition: 'Premier League',
    result: 'W' as const,
  },
  {
    id: 4,
    homeTeam: 'Tottenham Hotspur',
    awayTeam: 'Qarabag',
    homeScore: 3,
    awayScore: 0,
    date: '2024-09-19',
    venue: 'Tottenham Hotspur Stadium',
    competition: 'Europa League',
    result: 'W' as const,
  },
  {
    id: 5,
    homeTeam: 'Chelsea',
    awayTeam: 'Tottenham Hotspur',
    homeScore: 2,
    awayScore: 0,
    date: '2024-08-11',
    venue: 'Stamford Bridge',
    competition: 'Premier League',
    result: 'L' as const,
  },
  {
    id: 6,
    homeTeam: 'Tottenham Hotspur',
    awayTeam: 'Everton',
    homeScore: 4,
    awayScore: 0,
    date: '2024-08-25',
    venue: 'Tottenham Hotspur Stadium',
    competition: 'Premier League',
    result: 'W' as const,
  },
  {
    id: 7,
    homeTeam: 'Newcastle United',
    awayTeam: 'Tottenham Hotspur',
    homeScore: 1,
    awayScore: 2,
    date: '2024-04-13',
    venue: "St James' Park",
    competition: 'Premier League',
    result: 'W' as const,
  },
  {
    id: 8,
    homeTeam: 'Ajax',
    awayTeam: 'Tottenham Hotspur',
    homeScore: 2,
    awayScore: 3,
    date: '2019-05-08',
    venue: 'Johan Cruyff Arena',
    competition: 'Champions League',
    result: 'W' as const,
  },
];

const resultColors = {
  W: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  D: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  L: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

const resultLabels = { W: 'Win', D: 'Draw', L: 'Loss' };

export default function MatchesPage() {
  const wins = sampleMatches.filter((m) => m.result === 'W').length;
  const draws = sampleMatches.filter((m) => m.result === 'D').length;
  const losses = sampleMatches.filter((m) => m.result === 'L').length;

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              My Matches
            </h1>
            <p className="text-xs text-[#6B7280] dark:text-gray-400">
              {sampleMatches.length} matches attended
            </p>
          </div>
        </div>
        <Button size="sm" className="gap-1">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {/* Record summary */}
      <div className="mb-5 flex gap-2">
        <Card className="flex-1 text-center">
          <CardContent className="p-3">
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{wins}</p>
            <p className="text-[10px] text-[#6B7280] dark:text-gray-400">Wins</p>
          </CardContent>
        </Card>
        <Card className="flex-1 text-center">
          <CardContent className="p-3">
            <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{draws}</p>
            <p className="text-[10px] text-[#6B7280] dark:text-gray-400">Draws</p>
          </CardContent>
        </Card>
        <Card className="flex-1 text-center">
          <CardContent className="p-3">
            <p className="text-lg font-bold text-red-600 dark:text-red-400">{losses}</p>
            <p className="text-[10px] text-[#6B7280] dark:text-gray-400">Losses</p>
          </CardContent>
        </Card>
      </div>

      {/* Matches list */}
      <div className="flex flex-col gap-2">
        {sampleMatches.map((match) => (
          <Card key={match.id} className="transition-shadow hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="text-[10px]">
                  {match.competition}
                </Badge>
                <Badge className={cn('text-[10px]', resultColors[match.result])}>
                  {resultLabels[match.result]}
                </Badge>
              </div>

              {/* Score */}
              <div className="flex items-center justify-center gap-3 py-2">
                <span
                  className={cn(
                    'flex-1 text-right text-sm font-semibold',
                    match.homeTeam.includes('Tottenham')
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  {match.homeTeam.replace('Tottenham Hotspur', 'Spurs')}
                </span>
                <span className="flex items-center gap-1 text-lg font-bold text-gray-900 dark:text-gray-100">
                  {match.homeScore}
                  <span className="text-[#6B7280]">-</span>
                  {match.awayScore}
                </span>
                <span
                  className={cn(
                    'flex-1 text-left text-sm font-semibold',
                    match.awayTeam.includes('Tottenham')
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  {match.awayTeam.replace('Tottenham Hotspur', 'Spurs')}
                </span>
              </div>

              {/* Meta */}
              <div className="mt-1 flex items-center justify-center gap-4 text-xs text-[#6B7280] dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {match.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {match.venue.length > 20
                    ? match.venue.slice(0, 20) + '...'
                    : match.venue}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
