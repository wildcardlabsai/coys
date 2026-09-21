import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Train,
  Beer,
  Car,
  Bus,
  Footprints,
  MapPin,
  Users,
  DoorOpen,
  Lightbulb,
  ExternalLink,
  Camera,
  Bed,
  UtensilsCrossed,
  ThumbsUp,
  Landmark,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GroundInfo {
  team: string;
  stadium: string;
  city: string;
  country: string;
  capacity: number;
  address: string;
  coordinates: { lat: number; lng: number };
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
  restaurants: {
    name: string;
    cuisine: string;
    distance: string;
  }[];
  hotels: {
    name: string;
    description: string;
    distance: string;
  }[];
  tips: string[];
}

const groundsMap: Record<string, GroundInfo> = {
  arsenal: {
    team: 'Arsenal',
    stadium: 'Emirates Stadium',
    city: 'London',
    country: 'England',
    capacity: 60704,
    address: 'Hornsey Road, London N7 7AJ',
    coordinates: { lat: 51.5549, lng: -0.1084 },
    awayEnd: 'South East corner, lower and upper tiers. Allocation of up to 3,000.',
    awayEntrance: 'Turnstiles via Drayton Park. Enter from the south side of the stadium.',
    transport: [
      { mode: 'tube', name: 'Arsenal Station', description: 'Piccadilly line. Closest station, 5 minute walk.', walkTime: '5 mins' },
      { mode: 'tube', name: 'Holloway Road', description: 'Piccadilly line. Short walk to the ground.', walkTime: '8 mins' },
      { mode: 'train', name: 'Drayton Park', description: 'Great Northern services from Moorgate.', walkTime: '3 mins' },
      { mode: 'bus', name: 'Bus Routes', description: 'Routes 4, 19, 29, 43, 153, 236, 263, 271 all serve the area.', walkTime: 'Varies' },
    ],
    pubs: [
      { name: 'The Drayton Arms', description: 'Traditional pub near Drayton Park station.', awayFriendly: true, distance: '0.2 miles' },
      { name: 'The Bakehouse', description: 'Craft beer spot on Holloway Road.', awayFriendly: true, distance: '0.4 miles' },
      { name: 'The Famous Cock', description: 'Large pub on Highbury Corner with screens.', awayFriendly: true, distance: '0.6 miles' },
    ],
    restaurants: [
      { name: 'Piebury Corner', cuisine: 'British pies', distance: '0.3 miles' },
      { name: 'La Porchetta', cuisine: 'Italian', distance: '0.5 miles' },
    ],
    hotels: [
      { name: 'Holiday Inn Express', description: 'Budget-friendly option near Highbury & Islington.', distance: '0.8 miles' },
      { name: 'Premier Inn Islington', description: 'Reliable chain hotel within walking distance.', distance: '1.0 miles' },
    ],
    tips: [
      'Arrive early as the area around the stadium gets extremely congested.',
      'No bottles or cans allowed into the ground.',
      'The away end has a decent view but legroom can be tight in the lower tier.',
      'Arsenal station can be exit-only after the match. Use Holloway Road or Finsbury Park instead.',
    ],
  },
  'aston-villa': {
    team: 'Aston Villa',
    stadium: 'Villa Park',
    city: 'Birmingham',
    country: 'England',
    capacity: 42657,
    address: 'Trinity Road, Birmingham B6 6HE',
    coordinates: { lat: 52.5092, lng: -1.8847 },
    awayEnd: 'Doug Ellis Stand (North Stand), upper tier. Around 3,000 allocation.',
    awayEntrance: 'Witton Lane entrance for away supporters.',
    transport: [
      { mode: 'train', name: 'Witton Station', description: 'Short walk from the ground. Services from Birmingham New Street.', walkTime: '5 mins' },
      { mode: 'train', name: 'Aston Station', description: 'Alternative station, slightly further walk.', walkTime: '10 mins' },
      { mode: 'car', name: 'Driving', description: 'M6 J6 or A38(M). Limited street parking, use official car parks.', walkTime: 'N/A' },
    ],
    pubs: [
      { name: 'Cap N Gown', description: 'On the Lichfield Road, a good option for away fans.', awayFriendly: true, distance: '0.4 miles' },
    ],
    restaurants: [
      { name: 'Local eateries', cuisine: 'Various', distance: 'Varies' },
    ],
    hotels: [
      { name: 'Birmingham city centre hotels', description: 'Most options are in the city centre, a short train ride away.', distance: '3 miles' },
    ],
    tips: [
      'The upper tier of the Doug Ellis Stand offers a good view of the pitch.',
      'Street parking is very limited around Villa Park.',
      'Pubs close to the ground are predominantly home fans.',
    ],
  },
};

function getDefaultGround(slug: string): GroundInfo {
  const defaults: Record<string, { team: string; stadium: string; city: string; capacity: number; address: string; lat: number; lng: number }> = {
    bournemouth: { team: 'Bournemouth', stadium: 'Vitality Stadium', city: 'Bournemouth', capacity: 11307, address: 'Dean Court, Kings Park, Bournemouth BH7 7AF', lat: 50.7352, lng: -1.8384 },
    brentford: { team: 'Brentford', stadium: 'Gtech Community Stadium', city: 'London', capacity: 17250, address: 'Lionel Road South, Brentford TW8 0RU', lat: 51.4907, lng: -0.2887 },
    brighton: { team: 'Brighton', stadium: 'Amex Stadium', city: 'Brighton', capacity: 31876, address: 'Village Way, Brighton BN1 9BL', lat: 50.8616, lng: -0.0837 },
    chelsea: { team: 'Chelsea', stadium: 'Stamford Bridge', city: 'London', capacity: 40343, address: 'Fulham Road, London SW6 1HS', lat: 51.4816, lng: -0.191 },
    'crystal-palace': { team: 'Crystal Palace', stadium: 'Selhurst Park', city: 'London', capacity: 25486, address: 'Whitehorse Lane, London SE25 6PU', lat: 51.3983, lng: -0.0855 },
    everton: { team: 'Everton', stadium: 'Everton Stadium', city: 'Liverpool', capacity: 52888, address: 'Bramley-Moore Dock, Liverpool L3 0EL', lat: 53.4275, lng: -2.9968 },
    fulham: { team: 'Fulham', stadium: 'Craven Cottage', city: 'London', capacity: 29600, address: 'Stevenage Road, London SW6 6HH', lat: 51.475, lng: -0.2217 },
    ipswich: { team: 'Ipswich Town', stadium: 'Portman Road', city: 'Ipswich', capacity: 30311, address: 'Portman Road, Ipswich IP1 2DA', lat: 52.0545, lng: 1.1447 },
    leicester: { team: 'Leicester City', stadium: 'King Power Stadium', city: 'Leicester', capacity: 32312, address: 'Filbert Way, Leicester LE2 7FL', lat: 52.6204, lng: -1.1422 },
    liverpool: { team: 'Liverpool', stadium: 'Anfield', city: 'Liverpool', capacity: 61276, address: 'Anfield Road, Liverpool L4 0TH', lat: 53.4308, lng: -2.9608 },
    'manchester-city': { team: 'Manchester City', stadium: 'Etihad Stadium', city: 'Manchester', capacity: 53600, address: 'Ashton New Road, Manchester M11 3FF', lat: 53.4831, lng: -2.2004 },
    'manchester-united': { team: 'Manchester United', stadium: 'Old Trafford', city: 'Manchester', capacity: 74310, address: 'Sir Matt Busby Way, Old Trafford M16 0RA', lat: 53.4631, lng: -2.2913 },
    newcastle: { team: 'Newcastle United', stadium: "St James' Park", city: 'Newcastle', capacity: 52305, address: "St James' Park, Newcastle upon Tyne NE1 4ST", lat: 54.9756, lng: -1.6217 },
    'nottingham-forest': { team: 'Nottingham Forest', stadium: 'City Ground', city: 'Nottingham', capacity: 30445, address: 'Pavilion Road, Nottingham NG2 5FJ', lat: 52.94, lng: -1.1325 },
    southampton: { team: 'Southampton', stadium: "St Mary's Stadium", city: 'Southampton', capacity: 32384, address: 'Britannia Road, Southampton SO14 5FP', lat: 50.9058, lng: -1.3909 },
    'west-ham': { team: 'West Ham', stadium: 'London Stadium', city: 'London', capacity: 62500, address: 'Queen Elizabeth Olympic Park, London E20 2ST', lat: 51.5387, lng: -0.0166 },
    wolves: { team: 'Wolverhampton', stadium: 'Molineux', city: 'Wolverhampton', capacity: 31750, address: 'Waterloo Road, Wolverhampton WV1 4QR', lat: 52.5902, lng: -2.1306 },
  };

  const info = defaults[slug];
  if (!info) {
    return {
      team: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      stadium: 'Stadium',
      city: 'Unknown',
      country: 'England',
      capacity: 0,
      address: 'Address not available',
      coordinates: { lat: 51.5074, lng: -0.1278 },
      awayEnd: 'Information not yet available.',
      awayEntrance: 'Information not yet available.',
      transport: [],
      pubs: [],
      restaurants: [],
      hotels: [],
      tips: ['Check the official club website for the latest information.'],
    };
  }

  return {
    team: info.team,
    stadium: info.stadium,
    city: info.city,
    country: 'England',
    capacity: info.capacity,
    address: info.address,
    coordinates: { lat: info.lat, lng: info.lng },
    awayEnd: 'Away allocation details will be confirmed closer to the fixture.',
    awayEntrance: 'Check your ticket for the correct entrance and turnstile number.',
    transport: [
      { mode: 'train', name: 'Train', description: `Services to ${info.city}. Check National Rail for times and fares.`, walkTime: 'Varies' },
      { mode: 'car', name: 'Driving', description: 'Check the club website for parking information and directions.', walkTime: 'N/A' },
    ],
    pubs: [
      { name: 'Local Options', description: 'Check community recommendations for away-friendly pubs near the ground.', awayFriendly: true, distance: 'Varies' },
    ],
    restaurants: [],
    hotels: [],
    tips: [
      'Always check the official club website for the latest away supporter information.',
      'Arrive in good time to allow for security checks at the turnstiles.',
    ],
  };
}

const allSlugs = [
  'arsenal', 'aston-villa', 'bournemouth', 'brentford', 'brighton',
  'chelsea', 'crystal-palace', 'everton', 'fulham', 'ipswich',
  'leicester', 'liverpool', 'manchester-city', 'manchester-united',
  'newcastle', 'nottingham-forest', 'southampton', 'west-ham', 'wolves',
];

export function generateStaticParams() {
  return allSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Metadata {
  // We cannot await in generateMetadata synchronously for static params,
  // so we use the slug lookup directly
  return {
    title: 'Ground Guide | COYS',
    description: 'Full ground guide with stadium details, transport options, nearby pubs, restaurants, hotels, and fan tips.',
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

export default async function GroundPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ground = groundsMap[slug] || getDefaultGround(slug);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${ground.coordinates.lat},${ground.coordinates.lng}`;

  return (
    <div className="mx-auto w-full max-w-lg">
      {/* Hero */}
      <div className="relative h-52 w-full bg-gradient-to-br from-[#132257] to-[#0B1428] flex flex-col items-center justify-center gap-2">
        <Landmark className="h-14 w-14 text-white/20" />
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-xl font-bold text-white">{ground.stadium}</h1>
          <p className="text-sm text-white/70">{ground.team}</p>
        </div>
        <Link
          href="/grounds"
          className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      <div className="px-4 pb-8">
        {/* Quick info bar */}
        <div className="-mt-5 mb-6 flex gap-3">
          <div className="flex-1 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-center shadow-sm dark:border-gray-800 dark:bg-[#0B1428]">
            <p className="text-xs text-[#6B7280] dark:text-gray-400">Capacity</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {ground.capacity > 0 ? ground.capacity.toLocaleString() : 'TBC'}
            </p>
          </div>
          <div className="flex-1 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-center shadow-sm dark:border-gray-800 dark:bg-[#0B1428]">
            <p className="text-xs text-[#6B7280] dark:text-gray-400">City</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {ground.city}
            </p>
          </div>
          <div className="flex-1 rounded-xl border border-[#E5E7EB] bg-white px-3 py-2.5 text-center shadow-sm dark:border-gray-800 dark:bg-[#0B1428]">
            <p className="text-xs text-[#6B7280] dark:text-gray-400">Country</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {ground.country}
            </p>
          </div>
        </div>

        {/* Address + Google Maps */}
        <div className="mb-6 rounded-xl border border-[#E5E7EB] bg-white p-4 dark:border-gray-800 dark:bg-[#0B1428]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#132257]/10 dark:bg-[#8DB7E0]/10">
                <MapPin className="h-4 w-4 text-[#132257] dark:text-[#8DB7E0]" />
              </div>
              <div>
                <p className="text-xs text-[#6B7280] dark:text-gray-400">Address</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {ground.address}
                </p>
              </div>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 shrink-0 items-center gap-1 rounded-lg bg-[#132257]/10 px-3 text-xs font-semibold text-[#132257] transition-colors hover:bg-[#132257]/20 dark:bg-[#8DB7E0]/10 dark:text-[#8DB7E0] dark:hover:bg-[#8DB7E0]/20"
            >
              <ExternalLink className="h-3 w-3" />
              Map
            </a>
          </div>
        </div>

        {/* Transport Options */}
        <section className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#6B7280] dark:text-gray-500">
            Transport
          </h2>
          <div className="flex flex-col gap-2">
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
        </section>

        {/* Away Section Info */}
        <section className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#6B7280] dark:text-gray-500">
            Away Section
          </h2>
          <div className="rounded-xl border border-[#E5E7EB] bg-white dark:border-gray-800 dark:bg-[#0B1428]">
            <div className="flex items-start gap-3 border-b border-[#E5E7EB] p-4 dark:border-gray-800">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#132257]/10 dark:bg-[#8DB7E0]/10">
                <Users className="h-4 w-4 text-[#132257] dark:text-[#8DB7E0]" />
              </div>
              <div>
                <p className="text-xs text-[#6B7280] dark:text-gray-400">Away End</p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {ground.awayEnd}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#132257]/10 dark:bg-[#8DB7E0]/10">
                <DoorOpen className="h-4 w-4 text-[#132257] dark:text-[#8DB7E0]" />
              </div>
              <div>
                <p className="text-xs text-[#6B7280] dark:text-gray-400">
                  Away Entrance
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {ground.awayEntrance}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Nearby Places */}
        <section className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#6B7280] dark:text-gray-500">
            Nearby Places
          </h2>

          {/* Pubs */}
          {ground.pubs.length > 0 && (
            <div className="mb-3">
              <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-gray-900 dark:text-gray-100">
                <Beer className="h-3.5 w-3.5 text-[#132257] dark:text-[#8DB7E0]" />
                Pubs
              </h3>
              <div className="flex flex-col gap-2">
                {ground.pubs.map((pub) => (
                  <div
                    key={pub.name}
                    className="rounded-xl border border-[#E5E7EB] bg-white p-3 dark:border-gray-800 dark:bg-[#0B1428]"
                  >
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
                ))}
              </div>
            </div>
          )}

          {/* Restaurants */}
          {ground.restaurants.length > 0 && (
            <div className="mb-3">
              <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-gray-900 dark:text-gray-100">
                <UtensilsCrossed className="h-3.5 w-3.5 text-[#132257] dark:text-[#8DB7E0]" />
                Restaurants
              </h3>
              <div className="flex flex-col gap-2">
                {ground.restaurants.map((restaurant) => (
                  <div
                    key={restaurant.name}
                    className="rounded-xl border border-[#E5E7EB] bg-white p-3 dark:border-gray-800 dark:bg-[#0B1428]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {restaurant.name}
                      </p>
                      <span className="text-xs text-[#6B7280] dark:text-gray-400">
                        {restaurant.distance}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#6B7280] dark:text-gray-400">
                      {restaurant.cuisine}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hotels */}
          {ground.hotels.length > 0 && (
            <div>
              <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-gray-900 dark:text-gray-100">
                <Bed className="h-3.5 w-3.5 text-[#132257] dark:text-[#8DB7E0]" />
                Hotels
              </h3>
              <div className="flex flex-col gap-2">
                {ground.hotels.map((hotel) => (
                  <div
                    key={hotel.name}
                    className="rounded-xl border border-[#E5E7EB] bg-white p-3 dark:border-gray-800 dark:bg-[#0B1428]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {hotel.name}
                      </p>
                      <span className="text-xs text-[#6B7280] dark:text-gray-400">
                        {hotel.distance}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#6B7280] dark:text-gray-400">
                      {hotel.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Photo Gallery Placeholder */}
        <section className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#6B7280] dark:text-gray-500">
            Photos
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-[#E5E7EB] bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
              >
                <Camera className="h-5 w-5 text-[#6B7280]/40 dark:text-gray-600" />
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-[#6B7280] dark:text-gray-400">
            Community photos coming soon
          </p>
        </section>

        {/* Fan Tips */}
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#6B7280] dark:text-gray-500">
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
        </section>
      </div>
    </div>
  );
}
