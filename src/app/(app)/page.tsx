import Link from 'next/link';
import {
  Train,
  Beer,
  Landmark,
  Ticket,
  ChevronRight,
  MapPin,
  Calendar,
  Trophy,
  Compass,
  Clock,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MatchdayHero } from '@/components/matchday/MatchdayHero';
import {
  getNextFixture,
  getRecentResults,
  getUpcomingFixtures,
  getFixtureSlug,
} from '@/lib/football/sample-provider';
import { formatMatchDate, formatTime } from '@/lib/utils';
import type { Fixture } from '@/lib/football';

// ---------------------------------------------------------------------------
// Quick Actions
// ---------------------------------------------------------------------------

const QUICK_ACTIONS = [
  {
    icon: Train,
    label: 'Getting There',
    description: 'Transport & directions',
    href: '/matchday',
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
  },
  {
    icon: Beer,
    label: 'Pubs & Food',
    description: 'Pre-match spots',
    href: '/pubs',
    color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
  },
  {
    icon: Landmark,
    label: 'Stadium Info',
    description: 'Venue & seating',
    href: '/grounds',
    color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
  },
  {
    icon: Ticket,
    label: 'Tickets',
    description: 'Buying guide',
    href: '/explore',
    color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400',
  },
];

// ---------------------------------------------------------------------------
// Featured explore items
// ---------------------------------------------------------------------------

const EXPLORE_ITEMS = [
  {
    title: 'First Time at Tottenham Hotspur Stadium',
    description: 'Everything you need to know for your first visit to N17.',
    category: 'Guide',
    href: '/guides/first-time',
    icon: Compass,
  },
  {
    title: 'Matchday Food & Drink Guide',
    description: 'The best eats inside and around the stadium on matchday.',
    category: 'Guide',
    href: '/guides/food-drink',
    icon: Beer,
  },
  {
    title: 'Season Ticket Holder Tips',
    description: 'Make the most of your season ticket membership.',
    category: 'Guide',
    href: '/guides/season-ticket',
    icon: Ticket,
  },
];

// ---------------------------------------------------------------------------
// Featured pubs
// ---------------------------------------------------------------------------

const FEATURED_PUBS = [
  {
    name: 'The Bricklayers Arms',
    description: 'Traditional Spurs pub, 5 min walk from the ground.',
    distance: '0.3 miles',
    vibe: 'Lively',
    href: '/pubs/bricklayers-arms',
  },
  {
    name: 'No. 8 Tottenham',
    description: 'Modern bar with craft beers and street food.',
    distance: '0.4 miles',
    vibe: 'Relaxed',
    href: '/pubs/no-8-tottenham',
  },
  {
    name: 'The Beehive',
    description: 'Classic matchday boozer on Tottenham High Road.',
    distance: '0.2 miles',
    vibe: 'Packed',
    href: '/pubs/the-beehive',
  },
];

// ---------------------------------------------------------------------------
// Result card helper
// ---------------------------------------------------------------------------

function ResultCard({ fixture }: { fixture: Fixture }) {
  const isSpursHome = fixture.homeTeam.shortName === 'Spurs';
  const spursScore = isSpursHome ? fixture.score?.home : fixture.score?.away;
  const opponentScore = isSpursHome ? fixture.score?.away : fixture.score?.home;
  const opponent = isSpursHome ? fixture.awayTeam : fixture.homeTeam;
  const resultLabel = isSpursHome ? 'H' : 'A';

  let resultColor = 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
  if (spursScore != null && opponentScore != null) {
    if (spursScore > opponentScore) {
      resultColor = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
    } else if (spursScore < opponentScore) {
      resultColor = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    } else {
      resultColor = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
    }
  }

  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex items-center justify-center w-6">
        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">
          {resultLabel}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
          vs {opponent.name}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {formatMatchDate(fixture.date)} &middot; {fixture.leagueName}
        </p>
      </div>

      <div className={`px-2.5 py-1 rounded-md text-sm font-bold tabular-nums ${resultColor}`}>
        {spursScore} - {opponentScore}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function HomePage() {
  const [nextFixture, recentResults, upcomingFixtures] = await Promise.all([
    getNextFixture(),
    getRecentResults(5),
    getUpcomingFixtures(5),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e1a]">
      {/* Hero Section */}
      <section className="px-4 pt-6 pb-2">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-5">
            <h1 className="text-2xl sm:text-3xl font-black text-[#132257] dark:text-white tracking-tight">
              COYS
            </h1>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mt-1">
              Your Spurs Matchday Companion
            </p>
          </div>

          {/* Next Match Hero */}
          {nextFixture && (
            <MatchdayHero
              homeTeam={nextFixture.homeTeam.name}
              awayTeam={nextFixture.awayTeam.name}
              competition={`${nextFixture.leagueName}${nextFixture.round ? ` • ${nextFixture.round}` : ''}`}
              date={nextFixture.date}
              venue={nextFixture.venue?.name ?? 'TBC'}
              status={nextFixture.status}
              homeScore={nextFixture.score?.home}
              awayScore={nextFixture.score?.away}
              minute={nextFixture.minute}
              matchdayLink={`/matchday/${getFixtureSlug(nextFixture)}`}
            />
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 py-5">
        <div className="max-w-lg mx-auto">
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <Link key={action.label} href={action.href}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${action.color}`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {action.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {action.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Results */}
      {recentResults.length > 0 && (
        <section className="px-4 py-3">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#132257] dark:text-[#8DB7E0]" />
                Latest Results
              </h2>
              <Link
                href="/matchday"
                className="text-xs font-semibold text-[#132257] dark:text-[#8DB7E0] hover:underline"
              >
                View all
              </Link>
            </div>
            <Card>
              <CardContent className="p-4">
                {recentResults.map((result) => (
                  <ResultCard key={result.id} fixture={result} />
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Upcoming Fixtures */}
      {upcomingFixtures.length > 1 && (
        <section className="px-4 py-3">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#132257] dark:text-[#8DB7E0]" />
                Coming Up
              </h2>
            </div>
            <div className="space-y-2.5">
              {upcomingFixtures.slice(1).map((fixture) => {
                const isHome = fixture.homeTeam.shortName === 'Spurs';
                const opponent = isHome ? fixture.awayTeam : fixture.homeTeam;

                return (
                  <Link
                    key={fixture.id}
                    href={`/matchday/${getFixtureSlug(fixture)}`}
                  >
                    <Card className="hover:shadow-md transition-shadow cursor-pointer mb-2.5">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-300 shrink-0">
                          {opponent.shortName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {isHome ? 'vs' : '@'} {opponent.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatMatchDate(fixture.date)} &middot; {formatTime(fixture.date)} &middot;{' '}
                            {fixture.leagueName}
                          </p>
                        </div>
                        <Badge variant={isHome ? 'default' : 'outline'} className="text-[10px] shrink-0">
                          {isHome ? 'HOME' : 'AWAY'}
                        </Badge>
                        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Away Days Preview */}
      <section className="px-4 py-3">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#132257] dark:text-[#8DB7E0]" />
              Away Days
            </h2>
            <Link
              href="/away-days"
              className="text-xs font-semibold text-[#132257] dark:text-[#8DB7E0] hover:underline"
            >
              View all
            </Link>
          </div>
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-[#132257] to-[#1a2d6d] p-5">
              <h3 className="text-base font-bold text-white mb-1">
                Plan Your Away Day
              </h3>
              <p className="text-sm text-white/70 mb-4">
                Guides, travel info, and local pubs for every away ground.
              </p>
              <Link href="/away-days">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  Explore Away Guides
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Explore Guides */}
      <section className="px-4 py-3">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#132257] dark:text-[#8DB7E0]" />
              Explore
            </h2>
            <Link
              href="/explore"
              className="text-xs font-semibold text-[#132257] dark:text-[#8DB7E0] hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-2.5">
            {EXPLORE_ITEMS.map((item) => (
              <Link key={item.title} href={item.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer mb-2.5">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0">
                      <item.icon className="w-5 h-5 text-[#132257] dark:text-[#8DB7E0]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Spurs Pubs */}
      <section className="px-4 py-3 pb-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Beer className="w-5 h-5 text-[#132257] dark:text-[#8DB7E0]" />
              Spurs Pubs
            </h2>
            <Link
              href="/pubs"
              className="text-xs font-semibold text-[#132257] dark:text-[#8DB7E0] hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="space-y-2.5">
            {FEATURED_PUBS.map((pub) => (
              <Link key={pub.name} href={pub.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer mb-2.5">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center shrink-0">
                      <Beer className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {pub.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {pub.distance} &middot; {pub.vibe}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
