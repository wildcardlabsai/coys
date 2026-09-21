import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Train,
  Beer,
  Landmark,
  ChevronRight,
  Calendar,
  MapPin,
  Clock,
  CloudSun,
  Thermometer,
  Wind,
  ArrowLeft,
  Users,
  ShieldCheck,
  UtensilsCrossed,
  ParkingCircle,
  DoorOpen,
  Wifi,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MatchdayHero } from '@/components/matchday/MatchdayHero';
import { MatchdayTimeline } from '@/components/matchday/MatchdayTimeline';
import {
  getFixtureBySlug,
  getFixtureSlug,
} from '@/lib/football/sample-provider';
import { formatMatchDate, formatTime } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fixture = getFixtureBySlug(slug);
  if (!fixture) {
    return { title: 'Fixture Not Found | COYS' };
  }

  const title = `${fixture.homeTeam.shortName} vs ${fixture.awayTeam.shortName} | COYS Matchday`;
  const description = `Matchday guide for ${fixture.homeTeam.name} vs ${fixture.awayTeam.name}. ${fixture.leagueName}, ${formatMatchDate(fixture.date)}.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

// ---------------------------------------------------------------------------
// Transport summary for a venue
// ---------------------------------------------------------------------------

function getTransportSummary(venueName: string | null) {
  // Venue-specific transport data
  const data: Record<string, Array<{ mode: string; name: string; detail: string }>> = {
    'Tottenham Hotspur Stadium': [
      { mode: 'Rail', name: 'White Hart Lane', detail: '5 min walk from the ground' },
      { mode: 'Tube', name: 'Seven Sisters (Victoria)', detail: '20 min walk or shuttle bus' },
      { mode: 'Tube', name: 'Tottenham Hale (Victoria)', detail: '15 min walk' },
      { mode: 'Bus', name: 'Routes 149, 259, 279', detail: 'Stops on High Road' },
    ],
    'Emirates Stadium': [
      { mode: 'Tube', name: 'Arsenal (Piccadilly)', detail: '5 min walk' },
      { mode: 'Tube', name: 'Holloway Road (Piccadilly)', detail: '10 min walk' },
      { mode: 'Rail', name: 'Drayton Park', detail: '5 min walk' },
    ],
    'Etihad Stadium': [
      { mode: 'Tram', name: 'Etihad Campus', detail: '5 min walk' },
      { mode: 'Rail', name: 'Manchester Piccadilly', detail: '20 min walk or bus' },
      { mode: 'Bus', name: 'Shuttle from Piccadilly', detail: 'Runs on matchdays' },
    ],
    'Anfield': [
      { mode: 'Rail', name: 'Liverpool Lime Street', detail: 'Then bus 917 to ground' },
      { mode: 'Bus', name: 'Soccerbus from Sandhills', detail: 'Merseyrail to Sandhills' },
    ],
    'Stamford Bridge': [
      { mode: 'Tube', name: 'Fulham Broadway (District)', detail: '5 min walk' },
      { mode: 'Bus', name: 'Routes 14, 211, 414', detail: 'Stops on Fulham Road' },
    ],
    'Old Trafford': [
      { mode: 'Tram', name: 'Old Trafford (Metrolink)', detail: '5 min walk' },
      { mode: 'Rail', name: 'Manchester Piccadilly', detail: 'Then tram to ground' },
    ],
  };

  if (!venueName || !data[venueName]) {
    return [
      { mode: 'Rail', name: 'Local train station', detail: 'Check National Rail for times' },
      { mode: 'Car', name: 'Matchday parking', detail: 'Limited spaces, book in advance' },
    ];
  }

  return data[venueName];
}

// ---------------------------------------------------------------------------
// Nearby pubs
// ---------------------------------------------------------------------------

function getNearbyPubs(venueName: string | null) {
  const data: Record<string, Array<{ name: string; distance: string; vibe: string }>> = {
    'Tottenham Hotspur Stadium': [
      { name: 'The Bricklayers Arms', distance: '0.3 mi', vibe: 'Traditional Spurs pub' },
      { name: 'No. 8 Tottenham', distance: '0.4 mi', vibe: 'Craft beer bar' },
      { name: 'The Beehive', distance: '0.2 mi', vibe: 'Classic matchday pub' },
    ],
    'Emirates Stadium': [
      { name: 'The Tollington', distance: '0.2 mi', vibe: 'Near the away end' },
      { name: 'The Corner Flag', distance: '0.3 mi', vibe: 'Sports bar' },
    ],
  };

  return data[venueName ?? ''] ?? [
    { name: 'Search for nearby pubs', distance: '', vibe: 'Check local listings' },
  ];
}

// ---------------------------------------------------------------------------
// Stadium info
// ---------------------------------------------------------------------------

const STADIUM_FEATURES = [
  { icon: Users, label: 'Capacity', value: '62,850' },
  { icon: DoorOpen, label: 'Gates', value: '2 hrs before KO' },
  { icon: UtensilsCrossed, label: 'Food', value: 'Multiple outlets' },
  { icon: Wifi, label: 'WiFi', value: 'Free stadium WiFi' },
  { icon: ParkingCircle, label: 'Parking', value: 'Very limited' },
  { icon: ShieldCheck, label: 'Security', value: 'Bag check required' },
];

// ---------------------------------------------------------------------------
// Tabs config
// ---------------------------------------------------------------------------

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'travel', label: 'Travel' },
  { key: 'pubs', label: 'Pubs' },
  { key: 'stadium', label: 'Stadium' },
] as const;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function FixtureMatchdayPage({ params }: PageProps) {
  const { slug } = await params;
  const fixture = getFixtureBySlug(slug);

  if (!fixture) {
    notFound();
  }

  const isHome = fixture.homeTeam.shortName === 'Spurs';
  const venueName = fixture.venue?.name ?? null;
  const transport = getTransportSummary(venueName);
  const pubs = getNearbyPubs(venueName);
  const fixtureSlug = getFixtureSlug(fixture);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0e1a]">
      {/* Back navigation */}
      <div className="px-4 pt-4">
        <div className="max-w-lg mx-auto">
          <Link
            href="/matchday"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#132257] dark:text-[#8DB7E0] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Matchday
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="px-4 pt-3 pb-2">
        <div className="max-w-lg mx-auto">
          <MatchdayHero
            homeTeam={fixture.homeTeam.name}
            awayTeam={fixture.awayTeam.name}
            competition={`${fixture.leagueName}${fixture.round ? ` • ${fixture.round}` : ''}`}
            date={fixture.date}
            venue={venueName ?? 'TBC'}
            status={fixture.status}
            homeScore={fixture.score?.home}
            awayScore={fixture.score?.away}
            minute={fixture.minute}
          />
        </div>
      </section>

      {/* Tab-style section headers */}
      <section className="px-4 py-4">
        <div className="max-w-lg mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {TABS.map((tab) => (
              <span
                key={tab.key}
                className={
                  tab.key === 'overview'
                    ? 'px-4 py-2 rounded-full text-sm font-semibold bg-[#132257] text-white dark:bg-[#8DB7E0] dark:text-[#0B1428] shrink-0'
                    : 'px-4 py-2 rounded-full text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 shrink-0 cursor-default'
                }
              >
                {tab.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Overview: Getting There */}
      <section className="px-4 py-2">
        <div className="max-w-lg mx-auto">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Train className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Getting There
                </h3>
                <Link
                  href={`/matchday/${fixtureSlug}/travel`}
                  className="text-xs font-semibold text-[#132257] dark:text-[#8DB7E0] hover:underline flex items-center gap-0.5"
                >
                  Full guide <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-2.5">
                {transport.slice(0, 3).map((t, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Badge variant="outline" className="text-[10px] shrink-0 mt-0.5">
                      {t.mode}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Overview: Recommended Pubs */}
      <section className="px-4 py-2">
        <div className="max-w-lg mx-auto">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Beer className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Recommended Pubs
                </h3>
                <Link
                  href="/pubs"
                  className="text-xs font-semibold text-[#132257] dark:text-[#8DB7E0] hover:underline flex items-center gap-0.5"
                >
                  All pubs <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="space-y-2.5">
                {pubs.map((pub, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-1">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center shrink-0">
                      <Beer className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {pub.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {pub.distance ? `${pub.distance} • ` : ''}{pub.vibe}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Overview: Stadium Info */}
      {isHome && (
        <section className="px-4 py-2">
          <div className="max-w-lg mx-auto">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                  <Landmark className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Tottenham Hotspur Stadium
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {STADIUM_FEATURES.map((feature) => (
                    <div key={feature.label} className="text-center">
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 mb-1">
                        <feature.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        {feature.label}
                      </p>
                      <p className="text-xs font-medium text-gray-900 dark:text-white">
                        {feature.value}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Timeline */}
      <section className="px-4 py-2">
        <div className="max-w-lg mx-auto">
          <Card>
            <CardContent className="p-4">
              <MatchdayTimeline kickoffTime={fixture.date} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Weather */}
      <section className="px-4 py-2 pb-8">
        <div className="max-w-lg mx-auto">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-3">
                <CloudSun className="w-4 h-4 text-[#132257] dark:text-[#8DB7E0]" />
                Weather at {fixture.venue?.city ?? 'Venue'}
              </h3>
              <div className="flex items-center gap-4">
                <CloudSun className="w-10 h-10 text-amber-500 shrink-0" />
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
        </div>
      </section>
    </div>
  );
}
