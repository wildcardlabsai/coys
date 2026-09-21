'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronLeft, MapPin, Globe, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const sampleGrounds = [
  { id: 1, name: 'Tottenham Hotspur Stadium', team: 'Tottenham Hotspur', city: 'London', country: 'England', visited: true, visitDate: '2024-08-17' },
  { id: 2, name: 'Emirates Stadium', team: 'Arsenal', city: 'London', country: 'England', visited: true, visitDate: '2024-03-12' },
  { id: 3, name: 'Stamford Bridge', team: 'Chelsea', city: 'London', country: 'England', visited: true, visitDate: '2023-11-06' },
  { id: 4, name: 'Anfield', team: 'Liverpool', city: 'Liverpool', country: 'England', visited: true, visitDate: '2024-05-05' },
  { id: 5, name: 'Old Trafford', team: 'Manchester United', city: 'Manchester', country: 'England', visited: true, visitDate: '2024-01-14' },
  { id: 6, name: 'Etihad Stadium', team: 'Manchester City', city: 'Manchester', country: 'England', visited: true, visitDate: '2023-12-03' },
  { id: 7, name: 'Villa Park', team: 'Aston Villa', city: 'Birmingham', country: 'England', visited: true, visitDate: '2024-03-10' },
  { id: 8, name: "St James' Park", team: 'Newcastle United', city: 'Newcastle', country: 'England', visited: true, visitDate: '2024-04-13' },
  { id: 9, name: 'Selhurst Park', team: 'Crystal Palace', city: 'London', country: 'England', visited: true, visitDate: '2024-02-24' },
  { id: 10, name: 'London Stadium', team: 'West Ham', city: 'London', country: 'England', visited: true, visitDate: '2024-04-02' },
  { id: 11, name: 'Craven Cottage', team: 'Fulham', city: 'London', country: 'England', visited: true, visitDate: '2024-01-28' },
  { id: 12, name: 'Gtech Community Stadium', team: 'Brentford', city: 'London', country: 'England', visited: true, visitDate: '2023-12-26' },
  { id: 13, name: 'Amex Stadium', team: 'Brighton', city: 'Brighton', country: 'England', visited: false },
  { id: 14, name: 'Molineux', team: 'Wolverhampton', city: 'Wolverhampton', country: 'England', visited: false },
  { id: 15, name: 'King Power Stadium', team: 'Leicester City', city: 'Leicester', country: 'England', visited: false },
  { id: 16, name: 'Johan Cruyff Arena', team: 'Ajax', city: 'Amsterdam', country: 'Netherlands', visited: true, visitDate: '2019-05-08' },
];

export default function GroundsPage() {
  const [grounds, setGrounds] = React.useState(sampleGrounds);

  const visitedCount = grounds.filter((g) => g.visited).length;
  const countries = new Set(grounds.filter((g) => g.visited).map((g) => g.country)).size;
  const totalCount = grounds.length;
  const progressPercent = Math.round((visitedCount / totalCount) * 100);

  function toggleVisited(id: number) {
    setGrounds((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, visited: !g.visited, visitDate: !g.visited ? new Date().toISOString().split('T')[0] : undefined }
          : g
      )
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6">
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <Link
          href="/profile"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            My Grounds
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-gray-400">
            Track the grounds you have visited
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-5 flex gap-3">
        <Card className="flex-1">
          <CardContent className="flex items-center gap-3 p-3">
            <MapPin className="h-5 w-5 text-[#132257] dark:text-[#8DB7E0]" />
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {visitedCount}
              </p>
              <p className="text-[10px] text-[#6B7280] dark:text-gray-400">
                Grounds visited
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardContent className="flex items-center gap-3 p-3">
            <Globe className="h-5 w-5 text-[#132257] dark:text-[#8DB7E0]" />
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {countries}
              </p>
              <p className="text-[10px] text-[#6B7280] dark:text-gray-400">
                Countries
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress bar */}
      <div className="mb-5">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium text-gray-700 dark:text-gray-300">Progress</span>
          <span className="text-[#6B7280] dark:text-gray-400">
            {visitedCount} / {totalCount} ({progressPercent}%)
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full rounded-full bg-[#132257] transition-all duration-500 dark:bg-[#8DB7E0]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Map placeholder */}
      <Card className="mb-5 overflow-hidden">
        <div className="flex h-40 items-center justify-center bg-gradient-to-br from-[#132257]/5 to-[#132257]/10 dark:from-[#8DB7E0]/5 dark:to-[#8DB7E0]/10">
          <div className="text-center">
            <MapPin className="mx-auto mb-2 h-8 w-8 text-[#132257]/30 dark:text-[#8DB7E0]/30" />
            <p className="text-xs font-medium text-[#6B7280] dark:text-gray-400">
              Map of visited grounds
            </p>
          </div>
        </div>
      </Card>

      {/* Grounds list */}
      <div className="flex flex-col gap-2">
        {grounds.map((ground) => (
          <Card
            key={ground.id}
            className={cn(
              'transition-colors',
              ground.visited
                ? 'border-[#132257]/20 dark:border-[#8DB7E0]/20'
                : 'opacity-75'
            )}
          >
            <CardContent className="flex items-center gap-3 p-3">
              <button
                onClick={() => toggleVisited(ground.id)}
                className="shrink-0 focus:outline-none"
                aria-label={ground.visited ? 'Mark as not visited' : 'Mark as visited'}
              >
                {ground.visited ? (
                  <CheckCircle2 className="h-6 w-6 text-[#132257] dark:text-[#8DB7E0]" />
                ) : (
                  <Circle className="h-6 w-6 text-gray-300 dark:text-gray-600" />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    'text-sm font-semibold',
                    ground.visited
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-500 dark:text-gray-400'
                  )}
                >
                  {ground.name}
                </p>
                <p className="text-xs text-[#6B7280] dark:text-gray-400">
                  {ground.team} &middot; {ground.city}
                </p>
              </div>
              {ground.visited && ground.visitDate && (
                <Badge variant="secondary" className="shrink-0 text-[10px]">
                  {ground.visitDate}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
