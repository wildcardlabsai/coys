import { cn } from '@/lib/utils';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  Wind,
  Droplets,
  Thermometer,
} from 'lucide-react';
import type { WeatherForecast } from '@/types';

export interface WeatherCardProps {
  weather: WeatherForecast;
  className?: string;
}

function getWeatherIcon(description: string) {
  const desc = description.toLowerCase();
  if (desc.includes('thunder') || desc.includes('lightning')) return CloudLightning;
  if (desc.includes('snow') || desc.includes('sleet')) return CloudSnow;
  if (desc.includes('drizzle')) return CloudDrizzle;
  if (desc.includes('rain') || desc.includes('shower')) return CloudRain;
  if (desc.includes('fog') || desc.includes('mist') || desc.includes('haze')) return CloudFog;
  if (desc.includes('cloud') || desc.includes('overcast')) return Cloud;
  return Sun;
}

function WeatherCard({ weather, className }: WeatherCardProps) {
  const WeatherIcon = getWeatherIcon(weather.description);

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-sm',
        'dark:border-gray-800 dark:bg-[#0B1428]',
        className
      )}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#A3D1F5]/20 dark:bg-[#8DB7E0]/10">
        <WeatherIcon className="h-6 w-6 text-[#132257] dark:text-[#8DB7E0]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {Math.round(weather.temperature_celsius)}°
          </span>
          <span className="text-sm text-[#6B7280] capitalize">
            {weather.description}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-3 text-xs text-[#6B7280]">
          <span className="flex items-center gap-1">
            <Thermometer className="h-3 w-3" />
            Feels {Math.round(weather.feels_like_celsius)}°
          </span>
          <span className="flex items-center gap-1">
            <Droplets className="h-3 w-3" />
            {Math.round(weather.rain_probability)}%
          </span>
          <span className="flex items-center gap-1">
            <Wind className="h-3 w-3" />
            {Math.round(weather.wind_speed_mph)} mph
          </span>
        </div>
      </div>
    </div>
  );
}

export { WeatherCard };
