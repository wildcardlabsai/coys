'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ArrowLeft,
  Train,
  Beer,
  Landmark,
  Map,
  Bed,
  Lightbulb,
  MapPin,
  Car,
  Bus,
  Footprints,
  Users,
  DoorOpen,
  ThumbsUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  AwayGuideSection,
  type AwayGuideSectionItem,
} from '@/components/away-days/AwayGuideSection';

interface GroundData {
  team: string;
  stadium: string;
  city: string;
  country: string;
  slug: string;
  competition: string;
  capacity: number;
  address: string;
  awayEnd: string;
  awayEntrance: string;
  transport: {
    mode: string;
    name: string;
    description: string;
    walkTime: string;
  }[];
  pubs: {
    name: string;
    description: string;
    awayFriendly: boolean;
    distance: string;
  }[];
  tips: string[];
}

const groundsData: Record<string, GroundData> = {
  arsenal: {
    team: 'Arsenal',
    stadium: 'Emirates Stadium',
    city: 'London',
    country: 'England',
    slug: 'arsenal',
    competition: 'Premier League',
    capacity: 60704,
    address: 'Hornsey Road, London N7 7AJ',
    awayEnd: 'South East corner, lower and upper tiers. Allocation of up to 3,000.',
    awayEntrance: 'Turnstiles via Drayton Park. Enter from the south side of the stadium.',
    transport: [
      { mode: 'tube', name: 'Arsenal Station', description: 'Piccadilly line. Closest station, 5 minute walk.', walkTime: '5 mins' },
      { mode: 'tube', name: 'Holloway Road', description: 'Piccadilly line. Short walk to the ground.', walkTime: '8 mins' },
      { mode: 'train', name: 'Drayton Park', description: 'Great Northern services from Moorgate.', walkTime: '3 mins' },
      { mode: 'bus', name: 'Bus Routes', description: 'Routes 4, 19, 29, 43, 153, 236, 263, 271 all serve the area.', walkTime: 'Varies' },
    ],
    pubs: [
      { name: 'The Drayton Arms', description: 'Traditional pub near Drayton Park station. Can get busy on matchdays.', awayFriendly: true, distance: '0.2 miles' },
      { name: 'The Bakehouse', description: 'Craft beer spot on Holloway Road. Relaxed atmosphere pre-match.', awayFriendly: true, distance: '0.4 miles' },
      { name: 'The Famous Cock', description: 'Large pub on Highbury Corner. Serves food and has screens.', awayFriendly: true, distance: '0.6 miles' },
    ],
    tips: [
      'Arrive early as the area around the stadium gets extremely congested.',
      'No bottles or cans allowed into the ground. Drinks available inside.',
      'The away end has a decent view but legroom can be tight in the lower tier.',
      'Arsenal station can be exit-only after the match. Use Holloway Road or Finsbury Park instead.',
    ],
  },
  'aston-villa': {
    team: 'Aston Villa',
    stadium: 'Villa Park',
    city: 'Birmingham',
    country: 'England',
    slug: 'aston-villa',
    competition: 'Premier League',
    capacity: 42657,
    address: 'Trinity Road, Birmingham B6 6HE',
    awayEnd: 'Doug Ellis Stand (North Stand), upper tier. Around 3,000 allocation.',
    awayEntrance: 'Witton Lane entrance for away supporters.',
    transport: [
      { mode: 'train', name: 'Witton Station', description: 'Short walk from the ground. Services from Birmingham New Street.', walkTime: '5 mins' },
      { mode: 'train', name: 'Aston Station', description: 'Alternative station, slightly further walk.', walkTime: '10 mins' },
      { mode: 'car', name: 'Driving', description: 'M6 J6 or A38(M). Street parking limited, use official car parks.', walkTime: 'N/A' },
    ],
    pubs: [
      { name: 'The Witton Arms', description: 'Popular pub close to the ground. Gets packed on matchdays.', awayFriendly: false, distance: '0.1 miles' },
      { name: 'Cap N Gown', description: 'On the Lichfield Road, a good option for away fans.', awayFriendly: true, distance: '0.4 miles' },
    ],
    tips: [
      'The upper tier of the Doug Ellis Stand offers a good view of the pitch.',
      'Street parking is very limited around Villa Park. Consider park and ride.',
      'Pubs close to the ground are predominantly home fans. Head further out for a calmer pint.',
    ],
  },
};

function getDefaultGroundData(slug: string): GroundData {
  const teamNames: Record<string, { team: string; stadium: string; city: string; capacity: number; address: string }> = {
    bournemouth: { team: 'Bournemouth', stadium: 'Vitality Stadium', city: 'Bournemouth', capacity: 11307, address: 'Dean Court, Kings Park, Bournemouth BH7 7AF' },
    brentford: { team: 'Brentford', stadium: 'Gtech Community Stadium', city: 'London', capacity: 17250, address: 'Lionel Road South, Brentford TW8 0RU' },
    brighton: { team: 'Brighton', stadium: 'Amex Stadium', city: 'Brighton', capacity: 31876, address: 'Village Way, Brighton BN1 9BL' },
    chelsea: { team: 'Chelsea', stadium: 'Stamford Bridge', city: 'London', capacity: 40343, address: 'Fulham Road, London SW6 1HS' },
    'crystal-palace': { team: 'Crystal Palace', stadium: 'Selhurst Park', city: 'London', capacity: 25486, address: 'Whitehorse Lane, London SE25 6PU' },
    everton: { team: 'Everton', stadium: 'Everton Stadium', city: 'Liverpool', capacity: 52888, address: 'Bramley-Moore Dock, Liverpool L3 0EL' },
    fulham: { team: 'Fulham', stadium: 'Craven Cottage', city: 'London', capacity: 29600, address: 'Stevenage Road, London SW6 6HH' },
    ipswich: { team: 'Ipswich Town', stadium: 'Portman Road', city: 'Ipswich', capacity: 30311, address: 'Portman Road, Ipswich IP1 2DA' },
    leicester: { team: 'Leicester City', stadium: 'King Power Stadium', city: 'Leicester', capacity: 32312, address: 'Filbert Way, Leicester LE2 7FL' },
    liverpool: { team: 'Liverpool', stadium: 'Anfield', city: 'Liverpool', capacity: 61276, address: 'Anfield Road, Liverpool L4 0TH' },
    'manchester-city': { team: 'Manchester City', stadium: 'Etihad Stadium', city: 'Manchester', capacity: 53600, address: 'Ashton New Road, Manchester M11 3FF' },
    'manchester-united': { team: 'Manchester United', stadium: 'Old Trafford', city: 'Manchester', capacity: 74310, address: 'Sir Matt Busby Way, Old Trafford M16 0RA' },
    newcastle: { team: 'Newcastle United', stadium: "St James' Park", city: 'Newcastle', capacity: 52305, address: "St James' Park, Newcastle upon Tyne NE1 4ST" },
    'nottingham-forest': { team: 'Nottingham Forest', stadium: 'City Ground', city: 'Nottingham', capacity: 30445, address: 'Pavilion Road, Nottingham NG2 5FJ' },
    southampton: { team: 'Southampton', stadium: "St Mary's Stadium", city: 'Southampton', capacity: 32384, address: 'Britannia Road, Southampton SO14 5FP' },
    'west-ham': { team: 'West Ham', stadium: 'London Stadium', city: 'London', capacity: 62500, address: 'Queen Elizabeth Olympic Park, London E20 2ST' },
    wolves: { team: 'Wolverhampton', stadium: 'Molineux', city: 'Wolverhampton', capacity: 31750, address: 'Waterloo Road, Wolverhampton WV1 4QR' },
  };

  const info = teamNames[slug];
  if (!info) {
    return {
      team: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      stadium: 'Stadium',
      city: 'Unknown',
      country: 'England',
      slug,
      competition: 'Premier League',
      capacity: 0,
      address: 'Address not available',
      awayEnd: 'Information not yet available. Check back closer to matchday.',
      awayEntrance: 'Information not yet available.',
      transport: [],
      pubs: [],
      tips: ['Check the official club website for the latest away fan information.'],
    };
  }

  return {
    team: info.team,
    stadium: info.stadium,
    city: info.city,
    country: 'England',
    slug,
    competition: 'Premier League',
    capacity: info.capacity,
    address: info.address,
    awayEnd: 'Away allocation details will be confirmed closer to the fixture.',
    awayEntrance: 'Check your ticket for the correct entrance and turnstile number.',
    transport: [
      { mode: 'train', name: 'Train', description: `Services to ${info.city}. Check National Rail for times and fares.`, walkTime: 'Varies' },
      { mode: 'car', name: 'Driving', description: 'Check the club website for parking information and directions.', walkTime: 'N/A' },
    ],
    pubs: [
      { name: 'Local Options', description: 'Check the CAMRA Good Beer Guide or community recommendations for away-friendly pubs near the ground.', awayFriendly: true, distance: 'Varies' },
    ],
    tips: [
      'Always check the official club website for the latest away supporter information.',
      'Arrive in good time to allow for security checks at the turnstiles.',
    ],
  };
}

function getModeIcon(mode: string) {
  switch (mode) {
    case 'tube':
    case 'train':
      return Train;
    case 'bus':
      return Bus;
    case 'car':
      return Car;
    case 'walk':
      return Footprints;
    default:
      return Train;
  }
}

export default function AwayGroundGuidePage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const ground = groundsData[slug] || getDefaultGroundData(slug);

  const overviewItems: AwayGuideSectionItem[] = [
    {
      icon: Train,
      title: 'Getting There',
      description: `Transport options to ${ground.stadium}`,
    },
    {
      icon: Beer,
      title: 'Away Pubs',
      description: `Away-friendly pubs near ${ground.stadium}`,
    },
    {
      icon: Landmark,
      title: 'Stadium Guide',
      description: 'Capacity, away end info and facilities',
    },
    {
      icon: Map,
      title: 'Stadium Map',
      description: 'Interactive map and directions',
    },
    {
      icon: Bed,
      title: 'Where to Stay',
      description: `Accommodation options in ${ground.city}`,
    },
    {
      icon: Lightbulb,
      title: 'Fan Tips',
      description: 'Community tips from fellow Spurs supporters',
    },
  ];

  return (
    <div className="mx-auto w-full max-w-lg">
      {/* Hero */}
      <div className="relative h-48 w-full bg-gradient-to-br from-[#132257] to-[#0B1428] flex items-center justify-center">
        <Landmark className="h-16 w-16 text-white/20" />
        {/* Back button */}
        <Link
          href="/away-days"
          className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      <div className="px-4 pb-8">
        {/* Team and stadium info */}
        <div className="-mt-6 mb-4">
          <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-[#0B1428]">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {ground.team}
            </h1>
            <p className="text-sm font-medium text-[#132257] dark:text-[#8DB7E0]">
              {ground.stadium}
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs text-[#6B7280] dark:text-gray-400">
              <MapPin className="h-3 w-3" />
              <span>
                {ground.city}, {ground.country}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">
              Overview
            </TabsTrigger>
            <TabsTrigger value="travel" className="flex-1">
              Travel
            </TabsTrigger>
            <TabsTrigger value="pubs" className="flex-1">
              Pubs
            </TabsTrigger>
            <TabsTrigger value="stadium" className="flex-1">
              Stadium
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <AwayGuideSection items={overviewItems} className="mt-4" />
          </TabsContent>

          {/* Travel Tab */}
          <TabsContent value="travel">
            <div className="mt-4 flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Transport Options
              </h2>
              {ground.transport.length === 0 ? (
                <p className="rounded-xl border border-[#E5E7EB] bg-white p-4 text-sm text-[#6B7280] dark:border-gray-800 dark:bg-[#0B1428] dark:text-gray-400">
                  Transport information coming soon.
                </p>
              ) : (
                ground.transport.map((option) => {
                  const Icon = getModeIcon(option.mode);
                  return (
                    <div
                      key={option.name}
                      className="rounded-xl border border-[#E5E7EB] bg-white p-4 dark:border-gray-800 dark:bg-[#0B1428]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#132257]/10 dark:bg-[#8DB7E0]/10">
                          <Icon className="h-4 w-4 text-[#132257] dark:text-[#8DB7E0]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {option.name}
                            </p>
                            <span className="text-xs text-[#6B7280] dark:text-gray-400">
                              {option.walkTime}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-[#6B7280] dark:text-gray-400">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </TabsContent>

          {/* Pubs Tab */}
          <TabsContent value="pubs">
            <div className="mt-4 flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Nearby Pubs
              </h2>
              {ground.pubs.length === 0 ? (
                <p className="rounded-xl border border-[#E5E7EB] bg-white p-4 text-sm text-[#6B7280] dark:border-gray-800 dark:bg-[#0B1428] dark:text-gray-400">
                  Pub recommendations coming soon.
                </p>
              ) : (
                ground.pubs.map((pub) => (
                  <div
                    key={pub.name}
                    className="rounded-xl border border-[#E5E7EB] bg-white p-4 dark:border-gray-800 dark:bg-[#0B1428]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#132257]/10 dark:bg-[#8DB7E0]/10">
                        <Beer className="h-4 w-4 text-[#132257] dark:text-[#8DB7E0]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {pub.name}
                          </p>
                          <span className="text-xs text-[#6B7280] dark:text-gray-400">
                            {pub.distance}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-[#6B7280] dark:text-gray-400">
                          {pub.description}
                        </p>
                        {pub.awayFriendly && (
                          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                            <ThumbsUp className="h-2.5 w-2.5" />
                            Away friendly
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Stadium Tab */}
          <TabsContent value="stadium">
            <div className="mt-4 flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Stadium Info
              </h2>

              <div className="rounded-xl border border-[#E5E7EB] bg-white dark:border-gray-800 dark:bg-[#0B1428]">
                <div className="flex items-center gap-3 border-b border-[#E5E7EB] p-4 dark:border-gray-800">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#132257]/10 dark:bg-[#8DB7E0]/10">
                    <Landmark className="h-4 w-4 text-[#132257] dark:text-[#8DB7E0]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] dark:text-gray-400">
                      Capacity
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {ground.capacity > 0
                        ? ground.capacity.toLocaleString()
                        : 'TBC'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-b border-[#E5E7EB] p-4 dark:border-gray-800">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#132257]/10 dark:bg-[#8DB7E0]/10">
                    <MapPin className="h-4 w-4 text-[#132257] dark:text-[#8DB7E0]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] dark:text-gray-400">
                      Address
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {ground.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-b border-[#E5E7EB] p-4 dark:border-gray-800">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#132257]/10 dark:bg-[#8DB7E0]/10">
                    <Users className="h-4 w-4 text-[#132257] dark:text-[#8DB7E0]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] dark:text-gray-400">
                      Away Section
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {ground.awayEnd}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#132257]/10 dark:bg-[#8DB7E0]/10">
                    <DoorOpen className="h-4 w-4 text-[#132257] dark:text-[#8DB7E0]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#6B7280] dark:text-gray-400">
                      Away Entrance
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {ground.awayEntrance}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fan Tips */}
              <h2 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
                Fan Tips
              </h2>
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-4 dark:border-gray-800 dark:bg-[#0B1428]">
                {ground.tips.length === 0 ? (
                  <p className="text-sm text-[#6B7280] dark:text-gray-400">
                    No community tips yet. Be the first to add one.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {ground.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2.5">
                        <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
