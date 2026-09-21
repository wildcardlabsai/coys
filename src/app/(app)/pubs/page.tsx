'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Star, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const samplePubs = [
  { id: 1, name: 'The Bricklayers Arms', slug: 'bricklayers-arms', type: 'pub' as const, distance: '0.6 miles', walkingTime: '10 min walk', rating: 4.7, reviewCount: 324, tags: ['Spurs friendly', 'Pre-match'], image: null },
  { id: 2, name: 'The Beehive', slug: 'the-beehive', type: 'pub' as const, distance: '0.4 miles', walkingTime: '6 min walk', rating: 4.5, reviewCount: 287, tags: ['Great atmosphere', 'Live games'], image: null },
  { id: 3, name: 'Number 8', slug: 'number-8', type: 'restaurant' as const, distance: '0.5 miles', walkingTime: '8 min walk', rating: 4.4, reviewCount: 198, tags: ['Food', 'Family friendly'], image: null },
  { id: 4, name: 'The Antelope', slug: 'the-antelope', type: 'pub' as const, distance: '0.7 miles', walkingTime: '12 min walk', rating: 4.3, reviewCount: 156, tags: ['Craft beer', 'Spurs fans'], image: null },
  { id: 5, name: 'The High Cross', slug: 'the-high-cross', type: 'pub' as const, distance: '0.8 miles', walkingTime: '14 min walk', rating: 4.4, reviewCount: 201, tags: ['Good food', 'Away fans'], image: null },
  { id: 6, name: 'Bricklayers Cafe', slug: 'bricklayers-cafe', type: 'cafe' as const, distance: '0.3 miles', walkingTime: '5 min walk', rating: 4.2, reviewCount: 89, tags: ['Coffee', 'Pre-match'], image: null },
];

type PlaceType = 'pub' | 'restaurant' | 'cafe' | 'bar';

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Pubs', value: 'pub' },
  { label: 'Food', value: 'restaurant' },
  { label: 'Cafes', value: 'cafe' },
  { label: 'Bars', value: 'bar' },
] as const;

const typeLabels: Record<PlaceType, string> = {
  pub: 'Pub',
  restaurant: 'Restaurant',
  cafe: 'Cafe',
  bar: 'Bar',
};

export default function PubsPage() {
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredPubs = samplePubs.filter((pub) => {
    const matchesFilter = activeFilter === 'all' || pub.type === activeFilter;
    const matchesSearch =
      searchQuery === '' ||
      pub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Pubs &amp; Food
        </h1>
        <p className="text-sm text-[#6B7280] dark:text-gray-400">
          Find the best spots near Tottenham Hotspur Stadium.
        </p>
      </div>

      {/* Filter chips */}
      <div className="mb-4 -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={cn(
                'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                activeFilter === option.value
                  ? 'bg-[#132257] text-white dark:bg-[#8DB7E0] dark:text-[#0B1428]'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search + filter button */}
      <div className="mb-5 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
          <Input
            placeholder="Search pubs, restaurants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="secondary" size="default" className="shrink-0 h-10 w-10 p-0">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Results count */}
      <p className="mb-3 text-xs font-medium text-[#6B7280] dark:text-gray-400">
        {filteredPubs.length} {filteredPubs.length === 1 ? 'place' : 'places'} found
      </p>

      {/* Place cards */}
      <div className="flex flex-col gap-3">
        {filteredPubs.map((pub) => (
          <Link key={pub.id} href={`/pubs/${pub.slug}`} className="block">
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="p-0">
                <div className="flex gap-3 p-3">
                  {/* Image placeholder */}
                  <div className="h-24 w-24 shrink-0 rounded-lg bg-gradient-to-br from-[#132257] to-[#1a2d6d] dark:from-[#0B1428] dark:to-[#132257]" />

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                          {pub.name}
                        </h3>
                        <Badge variant="secondary" className="shrink-0 text-[10px]">
                          {typeLabels[pub.type]}
                        </Badge>
                      </div>

                      {/* Rating */}
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                          {pub.rating}
                        </span>
                        <span className="text-xs text-[#6B7280] dark:text-gray-400">
                          ({pub.reviewCount})
                        </span>
                      </div>

                      {/* Distance */}
                      <div className="mt-1 flex items-center gap-3 text-xs text-[#6B7280] dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {pub.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {pub.walkingTime}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      {pub.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] px-2 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {filteredPubs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Search className="mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              No places found
            </p>
            <p className="mt-1 text-xs text-[#6B7280] dark:text-gray-400">
              Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
