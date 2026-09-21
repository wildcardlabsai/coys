'use client';

import { useQuery } from '@tanstack/react-query';
import type { Fixture } from '@/types';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  const json = await res.json();
  return json.data ?? json;
}

export function useFixtures(season?: number) {
  return useQuery<Fixture[]>({
    queryKey: ['fixtures', season],
    queryFn: () =>
      fetchJson<Fixture[]>(
        `/api/football/fixtures${season ? `?season=${season}` : ''}`
      ),
  });
}

export function useFixture(id: string) {
  return useQuery<Fixture>({
    queryKey: ['fixture', id],
    queryFn: () => fetchJson<Fixture>(`/api/football/fixture/${id}`),
    enabled: !!id,
  });
}

export function useLiveFixtures() {
  return useQuery<Fixture[]>({
    queryKey: ['live-fixtures'],
    queryFn: () => fetchJson<Fixture[]>('/api/football/live'),
    refetchInterval: 30_000,
  });
}

export function useStandings<T = unknown>() {
  return useQuery<T[]>({
    queryKey: ['standings'],
    queryFn: () => fetchJson<T[]>('/api/football/standings'),
    staleTime: 15 * 60 * 1000,
  });
}
