import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import {
  Train,
  Bus,
  Car,
  Footprints,
  TramFront,
  Ship,
  type LucideIcon,
} from 'lucide-react';
import type { TransportMode } from '@/types';

export interface TransportCardProps {
  mode: TransportMode;
  name: string;
  description: string;
  distance?: string | null;
  walkTimeMinutes?: number | null;
  tips?: string | null;
  className?: string;
  onClick?: () => void;
}

const modeIcons: Record<TransportMode, LucideIcon> = {
  train: Train,
  tube: Train,
  bus: Bus,
  tram: TramFront,
  car: Car,
  walk: Footprints,
  coach: Bus,
  ferry: Ship,
};

const modeColors: Record<TransportMode, string> = {
  train: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  tube: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  bus: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  tram: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  car: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  walk: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  coach: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  ferry: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
};

function TransportCard({
  mode,
  name,
  description,
  distance,
  walkTimeMinutes,
  tips,
  className,
  onClick,
}: TransportCardProps) {
  const Icon = modeIcons[mode];

  return (
    <Card
      className={cn(
        'transition-shadow hover:shadow-md cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-start gap-4 p-4">
        <div
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
            modeColors[mode]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {name}
          </h3>
          <p className="mt-0.5 text-sm text-[#6B7280] line-clamp-2">
            {description}
          </p>
          <div className="mt-2 flex items-center gap-3 text-xs text-[#6B7280]">
            {distance && <span>{distance} from venue</span>}
            {walkTimeMinutes !== null && walkTimeMinutes !== undefined && (
              <span className="flex items-center gap-1">
                <Footprints className="h-3 w-3" />
                {walkTimeMinutes} min walk
              </span>
            )}
          </div>
          {tips && (
            <p className="mt-2 text-xs italic text-[#6B7280]/80 line-clamp-1">
              Tip: {tips}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { TransportCard };
