import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { GroundList, type GroundListItem } from '@/components/away-days/GroundList';

export const metadata: Metadata = {
  title: 'Away Days | COYS',
  description:
    'Guides for every away ground in the Premier League. Travel info, pubs, stadium guides and fan tips for Spurs supporters.',
  openGraph: {
    title: 'Away Days | COYS',
    description:
      'Guides for every away ground. Home or away, we are with you.',
  },
};

const grounds: GroundListItem[] = [
  { team: 'Arsenal', stadium: 'Emirates Stadium', city: 'London', slug: 'arsenal', competition: 'Premier League' },
  { team: 'Aston Villa', stadium: 'Villa Park', city: 'Birmingham', slug: 'aston-villa', competition: 'Premier League' },
  { team: 'Bournemouth', stadium: 'Vitality Stadium', city: 'Bournemouth', slug: 'bournemouth', competition: 'Premier League' },
  { team: 'Brentford', stadium: 'Gtech Community Stadium', city: 'London', slug: 'brentford', competition: 'Premier League' },
  { team: 'Brighton', stadium: 'Amex Stadium', city: 'Brighton', slug: 'brighton', competition: 'Premier League' },
  { team: 'Chelsea', stadium: 'Stamford Bridge', city: 'London', slug: 'chelsea', competition: 'Premier League' },
  { team: 'Crystal Palace', stadium: 'Selhurst Park', city: 'London', slug: 'crystal-palace', competition: 'Premier League' },
  { team: 'Everton', stadium: 'Everton Stadium', city: 'Liverpool', slug: 'everton', competition: 'Premier League' },
  { team: 'Fulham', stadium: 'Craven Cottage', city: 'London', slug: 'fulham', competition: 'Premier League' },
  { team: 'Ipswich Town', stadium: 'Portman Road', city: 'Ipswich', slug: 'ipswich', competition: 'Premier League' },
  { team: 'Leicester City', stadium: 'King Power Stadium', city: 'Leicester', slug: 'leicester', competition: 'Premier League' },
  { team: 'Liverpool', stadium: 'Anfield', city: 'Liverpool', slug: 'liverpool', competition: 'Premier League' },
  { team: 'Manchester City', stadium: 'Etihad Stadium', city: 'Manchester', slug: 'manchester-city', competition: 'Premier League' },
  { team: 'Manchester United', stadium: 'Old Trafford', city: 'Manchester', slug: 'manchester-united', competition: 'Premier League' },
  { team: 'Newcastle United', stadium: "St James' Park", city: 'Newcastle', slug: 'newcastle', competition: 'Premier League' },
  { team: 'Nottingham Forest', stadium: 'City Ground', city: 'Nottingham', slug: 'nottingham-forest', competition: 'Premier League' },
  { team: 'Southampton', stadium: "St Mary's Stadium", city: 'Southampton', slug: 'southampton', competition: 'Premier League' },
  { team: 'West Ham', stadium: 'London Stadium', city: 'London', slug: 'west-ham', competition: 'Premier League' },
  { team: 'Wolverhampton', stadium: 'Molineux', city: 'Wolverhampton', slug: 'wolves', competition: 'Premier League' },
];

export default function AwayDaysPage() {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="h-5 w-5 text-[#132257] dark:text-[#8DB7E0]" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Away Days
          </h1>
        </div>
        <p className="text-sm text-[#6B7280] dark:text-gray-400">
          Guides for every ground. Home or away, we&apos;re with you.
        </p>
      </div>

      {/* Ground list */}
      <GroundList grounds={grounds} basePath="/away-days" />
    </div>
  );
}
