/**
 * Convenience helpers for page-level data access.
 *
 * These call the canonical getFootballProvider() under the hood,
 * or directly reference SAMPLE_FIXTURES for slug-based lookups.
 */

import type { Fixture } from './provider';
import { SAMPLE_FIXTURES, SPURS } from './sample-data';
import { getFootballProvider } from './index';

// Re-export getFootballProvider for convenience
export { getFootballProvider } from './index';

const SPURS_SHORT_NAME = SPURS.shortName; // "Spurs"

function isSpurs(team: { shortName: string }): boolean {
  return team.shortName === SPURS_SHORT_NAME;
}

export async function getNextFixture(): Promise<Fixture | null> {
  const provider = getFootballProvider();
  const fixtures = await provider.getFixtures({ status: 'scheduled', limit: 1 });
  return fixtures?.[0] ?? null;
}

export async function getRecentResults(count: number): Promise<Fixture[]> {
  const provider = getFootballProvider();
  const fixtures = await provider.getFixtures({ status: 'finished' });
  if (!fixtures) return [];
  // Sort newest first
  return fixtures
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export async function getUpcomingFixtures(count: number): Promise<Fixture[]> {
  const provider = getFootballProvider();
  const fixtures = await provider.getFixtures({ status: 'scheduled', limit: count });
  return fixtures ?? [];
}

export function getFixtureSlug(fixture: Fixture): string {
  const home = fixture.homeTeam.shortName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const away = fixture.awayTeam.shortName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${home}-v-${away}-${fixture.id}`;
}

export function getFixtureBySlug(slug: string): Fixture | null {
  // Try to extract ID from end of slug (e.g. "spurs-v-arsenal-200005")
  const parts = slug.split('-');
  const idPart = parts[parts.length - 1];
  const id = parseInt(idPart, 10);

  if (!isNaN(id)) {
    const found = SAMPLE_FIXTURES.find((f) => f.id === id);
    if (found) return found;
  }

  // Fallback: match by team names in slug
  for (const f of SAMPLE_FIXTURES) {
    const candidateSlug = getFixtureSlug(f);
    if (candidateSlug === slug) return f;
  }

  // Fallback: partial match without ID
  const slugWithoutId = parts.slice(0, -1).join('-');
  for (const f of SAMPLE_FIXTURES) {
    const candidateSlug = getFixtureSlug(f);
    const candidateWithoutId = candidateSlug.split('-').slice(0, -1).join('-');
    if (candidateWithoutId === slugWithoutId || candidateWithoutId === slug) return f;
  }

  return null;
}

export function getAllFixtureSlugs(): string[] {
  return SAMPLE_FIXTURES.map(getFixtureSlug);
}
