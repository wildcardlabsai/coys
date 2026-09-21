import { cn, formatDistance } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Footprints } from 'lucide-react';
import type { Place, PlaceType } from '@/types';

export interface PlaceCardProps {
  place: Place;
  className?: string;
  onClick?: () => void;
}

const categoryLabels: Record<PlaceType, string> = {
  pub: 'Pub',
  restaurant: 'Restaurant',
  hotel: 'Hotel',
  attraction: 'Attraction',
  parking: 'Parking',
  shop: 'Shop',
};

const categoryColors: Record<PlaceType, string> = {
  pub: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  restaurant: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  hotel: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  attraction: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  parking: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  shop: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
};

function RatingStars({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={cn(
            'h-3.5 w-3.5',
            i < Math.floor(rating)
              ? 'fill-[#C4A44A] text-[#C4A44A]'
              : i < rating
                ? 'fill-[#C4A44A]/50 text-[#C4A44A]'
                : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
          )}
        />
      ))}
    </div>
  );
}

function PlaceCard({ place, className, onClick }: PlaceCardProps) {
  const tags: string[] = [];
  if (place.is_spurs_friendly) tags.push('Spurs friendly');
  if (place.accepts_away_fans) tags.push('Away fans welcome');
  if ('serves_food' in place && (place as { serves_food: boolean }).serves_food)
    tags.push('Food');
  if ('has_beer_garden' in place && (place as { has_beer_garden: boolean }).has_beer_garden)
    tags.push('Beer garden');
  if ('shows_football' in place && (place as { shows_football: boolean }).shows_football)
    tags.push('Shows football');

  return (
    <Card
      className={cn(
        'overflow-hidden transition-shadow hover:shadow-md cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="aspect-[16/10] w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        {place.image_url ? (
          <img
            src={place.image_url}
            alt={place.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl">
            {place.type === 'pub'
              ? '\u{1F37A}'
              : place.type === 'restaurant'
                ? '\u{1F37D}'
                : place.type === 'hotel'
                  ? '\u{1F3E8}'
                  : '\u{1F4CD}'}
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
            {place.name}
          </h3>
          <Badge
            className={cn(
              'shrink-0 text-[10px]',
              categoryColors[place.type]
            )}
          >
            {categoryLabels[place.type]}
          </Badge>
        </div>

        <div className="mt-2 flex items-center gap-3">
          {place.rating !== null && (
            <div className="flex items-center gap-1.5">
              <RatingStars rating={place.rating} />
              <span className="text-xs text-[#6B7280]">
                ({place.rating_count})
              </span>
            </div>
          )}
        </div>

        <div className="mt-2 flex items-center gap-3 text-xs text-[#6B7280]">
          {place.distance_from_venue_meters !== null && (
            <span className="flex items-center gap-1">
              <Footprints className="h-3 w-3" />
              {formatDistance(place.distance_from_venue_meters)}
            </span>
          )}
          {place.walk_time_minutes !== null && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {place.walk_time_minutes} min walk
            </span>
          )}
        </div>

        {tags.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#132257]/5 px-2 py-0.5 text-[10px] font-medium text-[#132257] dark:bg-[#8DB7E0]/10 dark:text-[#8DB7E0]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { PlaceCard };
