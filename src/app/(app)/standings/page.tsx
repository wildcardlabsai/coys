'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StandingRow {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  form: string[];
}

function FormBadge({ result }: { result: string }) {
  const colors: Record<string, string> = {
    W: 'bg-green-500 text-white',
    D: 'bg-amber-400 text-white',
    L: 'bg-red-500 text-white',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold',
        colors[result] || 'bg-gray-300 text-gray-700'
      )}
    >
      {result}
    </span>
  );
}

export default function StandingsPage() {
  const { data: standings, isLoading, error } = useQuery<StandingRow[]>({
    queryKey: ['standings'],
    queryFn: async () => {
      const res = await fetch('/api/football/standings');
      if (!res.ok) throw new Error('Failed to fetch standings');
      const json = await res.json();
      return json.data ?? json;
    },
    staleTime: 15 * 60 * 1000,
  });

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-[#132257]/10 dark:bg-[#132257]/30">
          <Trophy className="h-5 w-5 text-[#132257] dark:text-[#8DB7E0]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Premier League</h1>
          <p className="text-sm text-muted">2025/26 Season</p>
        </div>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="p-4 space-y-3">
            {Array.from({ length: 20 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </CardContent>
        </Card>
      ) : error ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted">Unable to load standings.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted uppercase tracking-wider">
                    <th className="text-left py-3 px-3 w-8">#</th>
                    <th className="text-left py-3 px-2">Team</th>
                    <th className="text-center py-3 px-1.5 hidden sm:table-cell">P</th>
                    <th className="text-center py-3 px-1.5 hidden sm:table-cell">W</th>
                    <th className="text-center py-3 px-1.5 hidden sm:table-cell">D</th>
                    <th className="text-center py-3 px-1.5 hidden sm:table-cell">L</th>
                    <th className="text-center py-3 px-1.5 hidden md:table-cell">GD</th>
                    <th className="text-center py-3 px-2 font-bold">Pts</th>
                    <th className="text-center py-3 px-2 hidden sm:table-cell">Form</th>
                  </tr>
                </thead>
                <tbody>
                  {standings?.map((row) => {
                    const isSpurs = row.team === 'Tottenham Hotspur';

                    return (
                      <tr
                        key={row.position}
                        className={cn(
                          'border-b border-border/50 last:border-0 transition-colors',
                          isSpurs
                            ? 'bg-[#132257]/5 dark:bg-[#132257]/20 font-semibold'
                            : 'hover:bg-gray-50/50 dark:hover:bg-gray-800/20'
                        )}
                      >
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1">
                            <span className={cn(
                              'text-xs tabular-nums',
                              row.position <= 4 ? 'text-blue-600 dark:text-blue-400' :
                              row.position >= 18 ? 'text-red-600 dark:text-red-400' : ''
                            )}>
                              {row.position}
                            </span>
                            {row.position <= 4 && (
                              <TrendingUp className="w-3 h-3 text-blue-500 hidden sm:block" />
                            )}
                            {row.position >= 18 && (
                              <TrendingDown className="w-3 h-3 text-red-500 hidden sm:block" />
                            )}
                            {row.position > 4 && row.position < 18 && (
                              <Minus className="w-3 h-3 text-gray-400 hidden sm:block" />
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <div
                              className={cn(
                                'w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0',
                                isSpurs ? 'bg-[#132257]' : 'bg-gray-400'
                              )}
                            >
                              {row.team.slice(0, 2).toUpperCase()}
                            </div>
                            <span className={cn(
                              'truncate',
                              isSpurs ? 'text-[#132257] dark:text-[#8DB7E0]' : 'text-foreground'
                            )}>
                              {row.team}
                            </span>
                          </div>
                        </td>
                        <td className="text-center py-3 px-1.5 tabular-nums text-muted hidden sm:table-cell">
                          {row.played}
                        </td>
                        <td className="text-center py-3 px-1.5 tabular-nums text-muted hidden sm:table-cell">
                          {row.won}
                        </td>
                        <td className="text-center py-3 px-1.5 tabular-nums text-muted hidden sm:table-cell">
                          {row.drawn}
                        </td>
                        <td className="text-center py-3 px-1.5 tabular-nums text-muted hidden sm:table-cell">
                          {row.lost}
                        </td>
                        <td className={cn(
                          'text-center py-3 px-1.5 tabular-nums hidden md:table-cell',
                          row.gd > 0 ? 'text-green-600 dark:text-green-400' :
                          row.gd < 0 ? 'text-red-600 dark:text-red-400' : 'text-muted'
                        )}>
                          {row.gd > 0 ? `+${row.gd}` : row.gd}
                        </td>
                        <td className="text-center py-3 px-2 tabular-nums font-bold text-foreground">
                          {row.points}
                        </td>
                        <td className="text-center py-3 px-2 hidden sm:table-cell">
                          <div className="flex items-center justify-center gap-0.5">
                            {row.form?.slice(-5).map((r, i) => (
                              <FormBadge key={i} result={r} />
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          Champions League
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          Europa League
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          Relegation
        </div>
      </div>
    </div>
  );
}
