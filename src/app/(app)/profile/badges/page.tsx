import Link from 'next/link';
import { ChevronLeft, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Badges | COYS',
  description: 'Your achievements and milestones as a Spurs supporter.',
  openGraph: {
    title: 'My Badges | COYS',
    description: 'Achievements and milestones.',
  },
};

const badges = [
  {
    id: 1,
    name: 'First Match',
    description: 'Attend your first Spurs match',
    icon: '🏟️',
    earned: true,
    earnedDate: '2018-08-11',
  },
  {
    id: 2,
    name: 'Home Bird',
    description: 'Attend 10 home matches',
    icon: '🏠',
    earned: true,
    earnedDate: '2019-12-07',
  },
  {
    id: 3,
    name: 'Away Day',
    description: 'Attend your first away match',
    icon: '🚌',
    earned: true,
    earnedDate: '2019-01-13',
  },
  {
    id: 4,
    name: 'Ground Hopper',
    description: 'Visit 10 different grounds',
    icon: '🗺️',
    earned: true,
    earnedDate: '2023-11-06',
  },
  {
    id: 5,
    name: 'European Night',
    description: 'Attend a European away match',
    icon: '⭐',
    earned: true,
    earnedDate: '2019-05-08',
  },
  {
    id: 6,
    name: 'Loyal Supporter',
    description: 'Attend matches in 5 consecutive seasons',
    icon: '💙',
    earned: true,
    earnedDate: '2023-08-19',
  },
  {
    id: 7,
    name: 'Century Club',
    description: 'Attend 100 Spurs matches',
    icon: '💯',
    earned: false,
    requirement: '13 more matches to unlock',
  },
  {
    id: 8,
    name: 'Globe Trotter',
    description: 'Watch Spurs in 5 different countries',
    icon: '🌍',
    earned: false,
    requirement: '1 more country to unlock',
  },
  {
    id: 9,
    name: 'Derby Day',
    description: 'Attend a North London Derby',
    icon: '🔥',
    earned: true,
    earnedDate: '2024-03-12',
  },
  {
    id: 10,
    name: 'Cup Final',
    description: 'Attend a cup final at Wembley',
    icon: '🏆',
    earned: false,
    requirement: 'Attend a cup final',
  },
  {
    id: 11,
    name: 'All Weathers',
    description: 'Attend matches in every month of the year',
    icon: '☔',
    earned: false,
    requirement: '2 more months to complete',
  },
  {
    id: 12,
    name: 'Full Set',
    description: 'Visit every Premier League ground in a season',
    icon: '✅',
    earned: false,
    requirement: '8 more grounds this season',
  },
];

export default function BadgesPage() {
  const earnedCount = badges.filter((b) => b.earned).length;

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
            My Badges
          </h1>
          <p className="text-xs text-[#6B7280] dark:text-gray-400">
            {earnedCount} of {badges.length} badges earned
          </p>
        </div>
      </div>

      {/* Badges grid */}
      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge) => (
          <Card
            key={badge.id}
            className={cn(
              'text-center transition-shadow',
              badge.earned
                ? 'border-[#132257]/20 dark:border-[#8DB7E0]/20'
                : 'opacity-50'
            )}
          >
            <CardContent className="p-3">
              <div
                className={cn(
                  'mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full text-2xl',
                  badge.earned
                    ? 'bg-[#132257]/10 dark:bg-[#8DB7E0]/10'
                    : 'bg-gray-100 dark:bg-gray-800'
                )}
              >
                {badge.earned ? (
                  badge.icon
                ) : (
                  <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                )}
              </div>
              <p
                className={cn(
                  'text-xs font-semibold leading-tight',
                  badge.earned
                    ? 'text-gray-900 dark:text-gray-100'
                    : 'text-gray-500 dark:text-gray-400'
                )}
              >
                {badge.name}
              </p>
              <p className="mt-0.5 text-[10px] text-[#6B7280] dark:text-gray-400 leading-tight">
                {badge.earned
                  ? badge.earnedDate
                  : badge.requirement || badge.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
