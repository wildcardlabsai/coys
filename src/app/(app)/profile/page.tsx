import Link from 'next/link';
import {
  MapPin,
  Ticket,
  Globe,
  CalendarDays,
  ChevronRight,
  Bookmark,
  Settings,
  Trophy,
  Edit,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My COYS | Profile',
  description: 'Your COYS profile. Track your grounds, matches, badges, and saved items.',
  openGraph: {
    title: 'My COYS | Profile',
    description: 'Your COYS supporter profile.',
  },
};

const stats = [
  { label: 'Grounds', value: 12, icon: MapPin },
  { label: 'Matches', value: 87, icon: Ticket },
  { label: 'Countries', value: 4, icon: Globe },
  { label: 'Seasons', value: 6, icon: CalendarDays },
];

const menuItems = [
  {
    icon: MapPin,
    title: 'My Grounds',
    description: 'View and track your progress',
    href: '/profile/grounds',
  },
  {
    icon: Ticket,
    title: 'My Matches',
    description: 'Your matchday history',
    href: '/profile/matches',
  },
  {
    icon: Trophy,
    title: 'My Badges',
    description: 'Achievements and milestones',
    href: '/profile/badges',
  },
  {
    icon: Bookmark,
    title: 'Saved Items',
    description: 'Pubs, fixtures, and grounds',
    href: '/profile/saved',
  },
  {
    icon: Settings,
    title: 'Settings',
    description: 'Appearance, notifications & account',
    href: '/profile/settings',
  },
];

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6">
      {/* Profile header */}
      <div className="mb-6 flex items-center gap-4">
        <Avatar
          alt="Supporter"
          fallback="SP"
          size="xl"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Spurs Supporter
              </h1>
              <p className="text-xs text-[#6B7280] dark:text-gray-400">
                COYS since 2018
              </p>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="mb-6 grid grid-cols-4 gap-2">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="p-3">
              <stat.icon className="mx-auto mb-1 h-4 w-4 text-[#132257] dark:text-[#8DB7E0]" />
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </p>
              <p className="text-[10px] text-[#6B7280] dark:text-gray-400">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Menu sections */}
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link key={item.title} href={item.href} className="block">
            <Card className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#132257]/10 dark:bg-[#8DB7E0]/10">
                  <item.icon className="h-5 w-5 text-[#132257] dark:text-[#8DB7E0]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {item.title}
                  </p>
                  <p className="text-xs text-[#6B7280] dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-[#6B7280] dark:text-gray-500" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Bottom banner */}
      <div className="mt-8 rounded-xl bg-gradient-to-r from-[#132257] to-[#1a2d6d] p-5 text-center dark:from-[#0B1428] dark:to-[#132257]">
        <p className="text-sm font-semibold text-white">
          Home or away. Always together.
        </p>
        <p className="mt-1 text-xs text-white/70">COYS</p>
      </div>
    </div>
  );
}
