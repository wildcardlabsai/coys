/**
 * Football data provider factory.
 *
 * Returns a Sportmonks-backed provider when SPORTMONKS_API_KEY is set,
 * otherwise falls back to a sample-data provider for local development.
 */

import type {
  FootballDataProvider,
  Fixture,
  FixtureStatus,
  StandingsEntry,
  Team,
  Venue,
  Lineup,
  MatchEvent,
  MatchStatistics,
} from "./provider";
import { SportmonksProvider } from "./sportmonks";
import {
  SAMPLE_FIXTURES,
  SAMPLE_STANDINGS,
  SAMPLE_LINEUP,
  SAMPLE_EVENTS,
  SAMPLE_STATISTICS,
  getSampleTeam,
  getSampleVenue,
} from "./sample-data";

// Re-export types for convenience
export type {
  FootballDataProvider,
  Fixture,
  FixtureStatus,
  FixtureScore,
  StandingsEntry,
  Team,
  Venue,
  Lineup,
  LineupPlayer,
  MatchEvent,
  MatchEventType,
  MatchStatistics,
  StatisticsSet,
} from "./provider";

// ---------------------------------------------------------------------------
// Sample data fallback provider
// ---------------------------------------------------------------------------

class SampleDataProvider implements FootballDataProvider {
  async getFixtures(params?: {
    from?: string;
    to?: string;
    status?: FixtureStatus;
    limit?: number;
  }): Promise<Fixture[]> {
    let fixtures = [...SAMPLE_FIXTURES];

    if (params?.from) {
      const from = new Date(params.from).getTime();
      fixtures = fixtures.filter((f) => new Date(f.date).getTime() >= from);
    }
    if (params?.to) {
      const to = new Date(params.to).getTime();
      fixtures = fixtures.filter((f) => new Date(f.date).getTime() <= to);
    }
    if (params?.status) {
      fixtures = fixtures.filter((f) => f.status === params.status);
    }

    fixtures.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    if (params?.limit) {
      fixtures = fixtures.slice(0, params.limit);
    }

    return fixtures;
  }

  async getFixture(fixtureId: number): Promise<Fixture | null> {
    return SAMPLE_FIXTURES.find((f) => f.id === fixtureId) ?? null;
  }

  async getLiveFixtures(): Promise<Fixture[]> {
    return [];
  }

  async getStandings(): Promise<StandingsEntry[]> {
    return SAMPLE_STANDINGS;
  }

  async getTeam(teamId: number): Promise<Team | null> {
    return getSampleTeam(teamId);
  }

  async getVenue(venueId: number): Promise<Venue | null> {
    return getSampleVenue(venueId);
  }

  async getLineup(
    fixtureId: number,
    _teamId: number
  ): Promise<Lineup | null> {
    if (fixtureId === 100002) return SAMPLE_LINEUP;
    return null;
  }

  async getEvents(fixtureId: number): Promise<MatchEvent[] | null> {
    if (fixtureId === 100002) return SAMPLE_EVENTS;
    return null;
  }

  async getStatistics(fixtureId: number): Promise<MatchStatistics | null> {
    if (fixtureId === 100002) return SAMPLE_STATISTICS;
    return null;
  }
}

// ---------------------------------------------------------------------------
// Singleton factory
// ---------------------------------------------------------------------------

let provider: FootballDataProvider | null = null;

/**
 * Get the football data provider.
 *
 * Uses Sportmonks when SPORTMONKS_API_KEY is set in env,
 * otherwise returns a sample-data provider for development.
 */
export function getFootballProvider(): FootballDataProvider {
  if (provider) return provider;

  const apiKey = process.env.SPORTMONKS_API_KEY;

  if (apiKey) {
    console.log("[Football] Using Sportmonks provider");
    provider = new SportmonksProvider(apiKey);
  } else {
    console.log("[Football] Using sample data provider (no SPORTMONKS_API_KEY)");
    provider = new SampleDataProvider();
  }

  return provider;
}
