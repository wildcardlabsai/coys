import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Users, ExternalLink } from 'lucide-react';
import type { Venue } from '@/types';

export interface VenueCardProps {
  venue: Venue;
  className?: string;
  onClick?: () => void;
}

function VenueCard({ venue, className, onClick }: VenueCardProps) {
  return (
    <Card
      className={cn(
        'overflow-hidden transition-shadow hover:shadow-md cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="aspect-[16/9] w-full bg-gradient-to-br from-[#132257]/10 to-[#8DB7E0]/20 dark:from-[#132257]/30 dark:to-[#8DB7E0]/10">
        {venue.image_url ? (
          <img
            src={venue.image_url}
            alt={venue.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <MapPin className="h-10 w-10 text-[#132257]/30 dark:text-[#8DB7E0]/30" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {venue.name}
        </h3>
        <div className="mt-1.5 flex items-center gap-1 text-sm text-[#6B7280]">
          <MapPin className="h-3.5 w-3.5" />
          <span>
            {venue.city}, {venue.country}
          </span>
        </div>
        {venue.capacity && (
          <div className="mt-1 flex items-center gap-1 text-sm text-[#6B7280]">
            <Users className="h-3.5 w-3.5" />
            <span>{venue.capacity.toLocaleString()} capacity</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { VenueCard };
