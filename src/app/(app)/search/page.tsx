'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  BookOpen,
  Building2,
  Ticket,
  Clock,
  TrendingUp,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const searchableItems = [
  // Clubs
  { type: 'club', name: 'Arsenal', detail: 'Emirates Stadium, London', href: '/away-days/arsenal' },
  { type: 'club', name: 'Chelsea', detail: 'Stamford Bridge, London', href: '/away-days/chelsea' },
  { type: 'club', name: 'Liverpool', detail: 'Anfield, Liverpool', href: '/away-days/liverpool' },
  { type: 'club', name: 'Manchester City', detail: 'Etihad Stadium, Manchester', href: '/away-days/manchester-city' },
  { type: 'club', name: 'Manchester United', detail: 'Old Trafford, Manchester', href: '/away-days/manchester-united' },
  { type: 'club', name: 'Newcastle United', detail: "St James' Park, Newcastle", href: '/away-days/newcastle' },
  // Stadiums
  { type: 'stadium', name: 'Tottenham Hotspur Stadium', detail: 'London N17', href: '/explore/complete-guide-tottenham-stadium' },
  { type: 'stadium', name: 'Anfield', detail: 'Liverpool L4', href: '/away-days/liverpool' },
  { type: 'stadium', name: 'Old Trafford', detail: 'Manchester M16', href: '/away-days/manchester-united' },
  // Pubs
  { type: 'pub', name: 'The Bricklayers Arms', detail: '0.6 miles, 10 min walk', href: '/pubs/bricklayers-arms' },
  { type: 'pub', name: 'The Beehive', detail: '0.4 miles, 6 min walk', href: '/pubs/the-beehive' },
  { type: 'pub', name: 'Number 8', detail: '0.5 miles, 8 min walk', href: '/pubs/number-8' },
  { type: 'pub', name: 'The Antelope', detail: '0.7 miles, 12 min walk', href: '/pubs/the-antelope' },
  // Guides
  { type: 'guide', name: 'The Complete Guide to Tottenham Hotspur Stadium', detail: 'Matchday Guide', href: '/explore/complete-guide-tottenham-stadium' },
  { type: 'guide', name: '10 Must-Visit Spurs Pubs', detail: 'Pub Guide', href: '/explore/10-must-visit-spurs-pubs' },
  { type: 'guide', name: 'Away Day Tips: First Time Travelling', detail: 'Tips', href: '/explore/away-day-tips-first-time' },
  { type: 'guide', name: 'European Away Days: The Ultimate List', detail: 'Away Guide', href: '/explore/european-away-days-ultimate-list' },
  // Fixtures
  { type: 'fixture', name: 'Spurs vs Arsenal', detail: 'Premier League, 15 Sep 2024', href: '/matchday' },
  { type: 'fixture', name: 'Chelsea vs Spurs', detail: 'Premier League, 11 Aug 2024', href: '/matchday' },
];

const popularSearches = [
  'Tottenham Hotspur Stadium',
  'Best pubs near ground',
  'Arsenal away',
  'Stadium tour',
  'European away days',
  'Pre-match food',
];

const typeConfig: Record<string, { label: string; icon: typeof MapPin; color: string }> = {
  club: { label: 'Clubs', icon: Building2, color: 'text-blue-500' },
  stadium: { label: 'Stadiums', icon: MapPin, color: 'text-emerald-500' },
  pub: { label: 'Pubs', icon: MapPin, color: 'text-amber-500' },
  guide: { label: 'Guides', icon: BookOpen, color: 'text-purple-500' },
  fixture: { label: 'Fixtures', icon: Ticket, color: 'text-rose-500' },
};

export default function SearchPage() {
  const [query, setQuery] = React.useState('');
  const [recentSearches, setRecentSearches] = React.useState<string[]>([
    'The Bricklayers Arms',
    'Arsenal',
    'Stadium guide',
  ]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = query.length >= 2
    ? searchableItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.detail.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const groupedResults = results.reduce<Record<string, typeof searchableItems>>(
    (acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    },
    {}
  );

  function handleSearch(term: string) {
    setQuery(term);
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s !== term);
      return [term, ...filtered].slice(0, 5);
    });
  }

  function clearRecent(term: string) {
    setRecentSearches((prev) => prev.filter((s) => s !== term));
  }

  const showResults = query.length >= 2;

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6">
      {/* Search input */}
      <div className="mb-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6B7280]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search clubs, stadiums, pubs, guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={cn(
              'flex h-12 w-full rounded-xl border border-[#E5E7EB] bg-white pl-11 pr-10 text-sm text-gray-900 placeholder:text-[#6B7280] transition-colors',
              'focus:border-[#132257] focus:outline-none focus:ring-2 focus:ring-[#132257]/20',
              'dark:border-gray-700 dark:bg-[#0B1428] dark:text-gray-100 dark:placeholder:text-gray-500',
              'dark:focus:border-[#8DB7E0] dark:focus:ring-[#8DB7E0]/20'
            )}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-gray-900 dark:hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {showResults ? (
        <>
          {/* Results */}
          {Object.keys(groupedResults).length > 0 ? (
            <div className="flex flex-col gap-5">
              {Object.entries(groupedResults).map(([type, items]) => {
                const config = typeConfig[type];
                return (
                  <div key={type}>
                    <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
                      {config.label}
                    </h2>
                    <div className="flex flex-col gap-1">
                      {items.map((item) => (
                        <Link
                          key={item.name + item.href}
                          href={item.href}
                          className="block"
                          onClick={() => handleSearch(item.name)}
                        >
                          <div className="flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60">
                            <config.icon
                              className={cn('h-4 w-4 shrink-0', config.color)}
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                                {item.name}
                              </p>
                              <p className="text-xs text-[#6B7280] dark:text-gray-400 line-clamp-1">
                                {item.detail}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                No results found
              </p>
              <p className="mt-1 text-xs text-[#6B7280] dark:text-gray-400">
                Try a different search term.
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
                Recent Searches
              </h2>
              <div className="flex flex-col gap-0.5">
                {recentSearches.map((term) => (
                  <div
                    key={term}
                    className="flex items-center justify-between rounded-lg p-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60"
                  >
                    <button
                      onClick={() => handleSearch(term)}
                      className="flex items-center gap-3 min-w-0 flex-1 text-left"
                    >
                      <Clock className="h-4 w-4 shrink-0 text-[#6B7280]" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1">
                        {term}
                      </span>
                    </button>
                    <button
                      onClick={() => clearRecent(term)}
                      className="ml-2 shrink-0 text-[#6B7280] hover:text-gray-900 dark:hover:text-gray-200"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Popular searches */}
          <div>
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#6B7280] dark:text-gray-400">
              Popular Searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <TrendingUp className="h-3 w-3" />
                  {term}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
