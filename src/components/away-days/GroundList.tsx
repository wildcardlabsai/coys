'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface GroundListItem {
  team: string;
  stadium: string;
  city: string;
  slug: string;
  competition: string;
}

interface GroundListProps {
  grounds: GroundListItem[];
  basePath?: string;
}

const FILTER_OPTIONS = ['All', 'Premier League', 'England', 'Europe'] as const;

function getTeamInitials(team: string): string {
  return team
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

function getTeamColor(team: string): string {
  const colors: Record<string, string> = {
    Arsenal: '#EF0107',
    'Aston Villa': '#670E36',
    Bournemouth: '#DA291C',
    Brentford: '#E30613',
    Brighton: '#0057B8',
    Chelsea: '#034694',
    'Crystal Palace': '#1B458F',
    Everton: '#003399',
    Fulham: '#000000',
    'Ipswich Town': '#0044AA',
    'Leicester City': '#003090',
    Liverpool: '#C8102E',
    'Manchester City': '#6CABDD',
    'Manchester United': '#DA291C',
    'Newcastle United': '#241F20',
    'Nottingham Forest': '#DD0000',
    Southampton: '#D71920',
    'West Ham': '#7A263A',
    Wolverhampton: '#FDB913',
  };
  return colors[team] || '#6B7280';
}

export function GroundList({ grounds, basePath = '/away-days' }: GroundListProps) {
  const [search, setSearch] = React.useState('');
  const [activeFilter, setActiveFilter] = React.useState<string>('All');

  const filteredGrounds = React.useMemo(() => {
    let filtered = grounds;

    if (search.trim()) {
      const query = search.toLowerCase();
      filtered = filtered.filter(
        (g) =>
          g.team.toLowerCase().includes(query) ||
          g.stadium.toLowerCase().includes(query) ||
          g.city.toLowerCase().includes(query)
      );
    }

    if (activeFilter !== 'All') {
      if (activeFilter === 'Premier League') {
        filtered = filtered.filter((g) => g.competition === 'Premier League');
      } else if (activeFilter === 'England') {
        filtered = filtered.filter((g) => g.competition === 'Premier League');
      } else if (activeFilter === 'Europe') {
        filtered = filtered.filter((g) => g.competition !== 'Premier League');
      }
    }

    return filtered;
  }, [grounds, search, activeFilter]);

  const groupedGrounds = React.useMemo(() => {
    const groups: Record<string, GroundListItem[]> = {};
    for (const ground of filteredGrounds) {
      if (!groups[ground.competition]) {
        groups[ground.competition] = [];
      }
      groups[ground.competition].push(ground);
    }
    return groups;
  }, [filteredGrounds]);

  return (
    <div className="flex flex-col gap-4">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280] dark:text-gray-500" />
        <input
          type="text"
          placeholder="Search team or stadium..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cn(
            'w-full rounded-xl border border-[#E5E7EB] bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-[#6B7280]',
            'focus:border-[#132257] focus:outline-none focus:ring-2 focus:ring-[#132257]/20',
            'dark:border-gray-700 dark:bg-[#0B1428] dark:text-gray-100 dark:placeholder:text-gray-500',
            'dark:focus:border-[#8DB7E0] dark:focus:ring-[#8DB7E0]/20'
          )}
        />
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTER_OPTIONS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              'shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors',
              activeFilter === filter
                ? 'bg-[#132257] text-white dark:bg-[#8DB7E0] dark:text-[#0B1428]'
                : 'bg-gray-100 text-[#6B7280] hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Ground list */}
      {Object.keys(groupedGrounds).length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-[#6B7280] dark:text-gray-400">
            No grounds found matching your search.
          </p>
        </div>
      ) : (
        Object.entries(groupedGrounds).map(([competition, items]) => (
          <div key={competition}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#6B7280] dark:text-gray-500">
              {competition}
            </h3>
            <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white dark:border-gray-800 dark:bg-[#0B1428]">
              {items.map((ground, index) => (
                <Link
                  key={ground.slug}
                  href={`${basePath}/${ground.slug}`}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60',
                    index < items.length - 1 &&
                      'border-b border-[#E5E7EB] dark:border-gray-800'
                  )}
                >
                  {/* Team crest placeholder */}
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: getTeamColor(ground.team) }}
                  >
                    {getTeamInitials(ground.team)}
                  </div>

                  {/* Team and stadium info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {ground.team}
                    </p>
                    <p className="text-xs text-[#6B7280] dark:text-gray-400">
                      {ground.stadium}
                    </p>
                  </div>

                  {/* Chevron */}
                  <ChevronRight className="h-4 w-4 shrink-0 text-[#6B7280] dark:text-gray-500" />
                </Link>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
