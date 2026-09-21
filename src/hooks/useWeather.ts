'use client';

import { useQuery } from '@tanstack/react-query';

interface WeatherData {
  temp: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  windDeg: number;
  clouds: number;
  rain?: number;
}

export function useWeather(lat: number, lng: number) {
  return useQuery<WeatherData>({
    queryKey: ['weather', lat, lng],
    queryFn: async () => {
      const res = await fetch(`/api/weather?lat=${lat}&lon=${lng}`);
      if (!res.ok) throw new Error('Failed to fetch weather');
      const json = await res.json();
      return json.data ?? json;
    },
    staleTime: 60 * 60 * 1000,
    enabled: !!(lat && lng),
  });
}
