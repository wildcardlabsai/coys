'use client';

import { useQuery } from '@tanstack/react-query';
import type { Place } from '@/types';

export function useNearbyPlaces(
  lat: number,
  lng: number,
  type?: string,
  radius?: number
) {
  return useQuery<Place[]>({
    queryKey: ['places', lat, lng, type, radius],
    queryFn: async () => {
      const params = new URLSearchParams({
        lat: String(lat),
        lng: String(lng),
        ...(type && { type }),
        ...(radius && { radius: String(radius) }),
      });
      const res = await fetch(`/api/places/nearby?${params}`);
      if (!res.ok) throw new Error('Failed to fetch places');
      const json = await res.json();
      return json.data ?? json;
    },
    staleTime: 24 * 60 * 60 * 1000,
    enabled: !!(lat && lng),
  });
}
