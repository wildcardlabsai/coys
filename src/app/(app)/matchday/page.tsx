import Link from 'next/link';
import {
  Train,
  Beer,
  Landmark,
  ChevronRight,
  Calendar,
  CloudSun,
  Thermometer,
  Wind,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MatchdayHero } from '@/components/matchday/MatchdayHero';
import { MatchdayTimeline } from '@/components/matchday/MatchdayTimeline';
import {
  getNextFixture,
  getUpcomingFixtures,
  getFixtureSlug,
} from '@/lib/football/sample-provider';
import { formatMatchDate, formatTime } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Matchday info cards
// ---------------------------------------------------------------------------

const INFO_CARDS = [
  {
    icon: Train,
    title: 'Getting There',
    description: 'Transport options, walking routes, and parking info for the stadium.',
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
    section: 'travel',
  },
  {
    icon: Beer,
    title: 'Pubs & Food',
    description: 'Pre-match pubs, restaurants, and food options near the ground.',
    color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
    section: 'pubs',
  },
  {
    icon: Landmark,
    title: 'The Stadium',
    description: 'Venue info, seating areas, entrances, and matchday facilities.',
    color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
    section: 'stadium',
  },
];

// ---------------------------------------------------------------------------
// Weather widget
// ---------------------------------------------------------------------------

function WeatherPreview() {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
          <CloudSun className="w-4 h-4 text-[#132257] dark:text-[#8DB7E0]" />
          Weather Forecast
        </h3>
        <div className="flex items-center gap-4">
          <div>
            <CloudSun className="w-10 h-10 text-amber-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                <Thermometer className="w-3.5 h-3.5" /> 14&deg;C
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                <Wind className="w-3.5 h-3.5" /> 12 mph
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Partly cloudy with a chance of light rain. Bring a jacket.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function MatchdayPage() {
  const [nextFixture, upcoming] = await Promise.all([
    getNextFixture(),
    getUpcomingFixtures(5),
  ]);

  if (!nextFixture) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e1a] flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              No Upcoming Fixtures
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Check back later for the next Spurs matchday.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const slug = getFixtureSlug(nextFixture);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e1a]">
      {/* Hero */}
      <section className="px-4 pt-6 pb-2">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#132257] dark:text-[#8DB7E0]" />
            Matchday
          </h1>
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
            matchdayLink={`/matchday/${slug}`}
          />
        </div>
      </section>

      {/* Info Cards */}
      <section className="px-4 py-5">
        <div className="max-w-lg mx-auto space-y-3">
          {INFO_CARDS.map((card) => (
            <Link key={card.title} href={`/matchday/${slug}/${card.section === 'travel' ? 'travel' : ''}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer mb-3">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl shrink-0 ${card.color}`}>
                    <card.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {card.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                      {card.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Timeline + Weather */}
      <section className="px-4 py-3">
        <div className="max-w-lg mx-auto space-y-4">
          <Card>
            <CardContent className="p-4">
              <MatchdayTimeline kickoffTime={nextFixture.date} />
            </CardContent>
          </Card>
          <WeatherPreview />
        </div>
      </section>

      {/* More Fixtures */}
      {upcoming.length > 1 && (
        <section className="px-4 py-3 pb-8">
          <div className="max-w-lg mx-auto">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-3">
              Upcoming Fixtures
            </h2>
            <div className="space-y-2.5">
              {upcoming.slice(1).map((fixture) => {
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
    </div>
  );
}
