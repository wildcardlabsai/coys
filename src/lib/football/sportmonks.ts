/**
 * Sportmonks API implementation of the FootballDataProvider.
 *
 * Uses in-memory TTL caching and basic rate-limit handling.
 * All errors are caught and logged — methods return null on failure.
 */

import { TTLCache } from "@/lib/utils";
import type {
  FootballDataProvider,
  Fixture,
  FixtureStatus,
  StandingsEntry,
  Team,
  Venue,
  Lineup,
  LineupPlayer,
  MatchEvent,
  MatchEventType,
  MatchStatistics,
  StatisticsSet,
  FixtureScore,
} from "./provider";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const SPURS_TEAM_ID = 6;
const PL_LEAGUE_ID = 8;

const BASE_URL = "https://api.sportmonks.com/v3/football";

const CACHE_TTL = {
  FIXTURES: 5 * 60 * 1000, // 5 min
  FIXTURE: 5 * 60 * 1000,
  LIVE: 30 * 1000, // 30 sec
  STANDINGS: 15 * 60 * 1000, // 15 min
  TEAM: 60 * 60 * 1000, // 1 hour
  VENUE: 60 * 60 * 1000,
  LINEUP: 5 * 60 * 1000,
  EVENTS: 60 * 1000, // 1 min
  STATISTICS: 60 * 1000,
} as const;

// ---------------------------------------------------------------------------
// Rate limiter
// ---------------------------------------------------------------------------

class RateLimiter {
  private timestamps: number[] = [];

  constructor(
    private maxRequests: number,
    private windowMs: number
  ) {}

  async waitForSlot(): Promise<void> {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(
      (t) => now - t < this.windowMs
    );

    if (this.timestamps.length >= this.maxRequests) {
      const oldest = this.timestamps[0];
      const waitMs = this.windowMs - (now - oldest) + 50;
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }

    this.timestamps.push(Date.now());
  }
}

// ---------------------------------------------------------------------------
// Sportmonks provider
// ---------------------------------------------------------------------------

export class SportmonksProvider implements FootballDataProvider {
  private apiKey: string;
  private cache = new TTLCache<unknown>(CACHE_TTL.FIXTURES);
  private rateLimiter = new RateLimiter(180, 60_000); // 180 req/min

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // ---- Internal fetch ---------------------------------------------------

  private async request<T>(
    path: string,
    params: Record<string, string> = {}
  ): Promise<T | null> {
    await this.rateLimiter.waitForSlot();

    const url = new URL(`${BASE_URL}${path}`);
    url.searchParams.set("api_token", this.apiKey);
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }

    try {
      const response = await fetch(url.toString(), {
        headers: { Accept: "application/json" },
        next: { revalidate: 0 },
      });

      if (response.status === 429) {
        // Rate limited — wait and retry once
        const retryAfter =
          parseInt(response.headers.get("Retry-After") ?? "5", 10) * 1000;
        await new Promise((resolve) => setTimeout(resolve, retryAfter));
        return this.request<T>(path, params);
      }

      if (!response.ok) {
        console.error(
          `[Sportmonks] ${response.status} ${response.statusText} for ${path}`
        );
        return null;
      }

      const json = await response.json();
      return json.data as T;
    } catch (error) {
      console.error(`[Sportmonks] Request failed for ${path}:`, error);
      return null;
    }
  }

  private async cached<T>(
    key: string,
    ttl: number,
    fetcher: () => Promise<T | null>
  ): Promise<T | null> {
    const hit = this.cache.get(key) as T | null;
    if (hit !== null) return hit;

    const data = await fetcher();
    if (data !== null) {
      this.cache.set(key, data, ttl);
    }
    return data;
  }

  // ---- Mapping helpers --------------------------------------------------

  /* eslint-disable @typescript-eslint/no-explicit-any */

  private mapTeam(raw: any): Team {
    return {
      id: raw.id,
      name: raw.name,
      shortName: raw.short_code ?? raw.name,
      logo: raw.image_path ?? "",
      venueId: raw.venue_id ?? undefined,
    };
  }

  private mapVenue(raw: any): Venue {
    return {
      id: raw.id,
      name: raw.name,
      city: raw.city_name ?? raw.city ?? "",
      capacity: raw.capacity ?? 0,
      image: raw.image_path ?? undefined,
      latitude: raw.coordinates ? parseFloat(raw.coordinates.split(",")[0]) : undefined,
      longitude: raw.coordinates ? parseFloat(raw.coordinates.split(",")[1]) : undefined,
    };
  }

  private mapFixtureStatus(raw: any): FixtureStatus {
    const stateId = raw.state_id ?? raw.state?.id;
    // Sportmonks state IDs: 1=NS, 2=LIVE, 3=HT, 5=FT, 6=FT_PEN,
    // 7=CANCL, 8=POSTP, 9=INT, 10=ABAN, 13=AET
    switch (stateId) {
      case 1:
        return "scheduled";
      case 2:
      case 14: // Extra time
        return "live";
      case 3:
        return "halftime";
      case 5:
      case 6:
      case 13:
        return "finished";
      case 8:
        return "postponed";
      case 7:
      case 10:
        return "cancelled";
      default:
        return raw.result_info ? "finished" : "scheduled";
    }
  }

  private mapScore(raw: any): FixtureScore | null {
    const scores = raw.scores;
    if (!scores) return null;

    const ftHome = scores.find(
      (s: any) => s.description === "CURRENT" && s.score?.participant === "home"
    );
    const ftAway = scores.find(
      (s: any) => s.description === "CURRENT" && s.score?.participant === "away"
    );

    if (ftHome && ftAway) {
      return {
        home: ftHome.score.goals,
        away: ftAway.score.goals,
      };
    }
    return null;
  }

  private mapFixture(raw: any): Fixture {
    const participants = raw.participants ?? [];
    const homeRaw = participants.find(
      (p: any) => p.meta?.location === "home"
    );
    const awayRaw = participants.find(
      (p: any) => p.meta?.location === "away"
    );

    return {
      id: raw.id,
      homeTeam: homeRaw ? this.mapTeam(homeRaw) : { id: 0, name: "TBD", shortName: "TBD", logo: "" },
      awayTeam: awayRaw ? this.mapTeam(awayRaw) : { id: 0, name: "TBD", shortName: "TBD", logo: "" },
      venue: raw.venue ? this.mapVenue(raw.venue) : null,
      date: raw.starting_at,
      status: this.mapFixtureStatus(raw),
      score: this.mapScore(raw),
      minute: raw.minute ?? null,
      round: raw.round?.name ?? null,
      leagueId: raw.league_id ?? raw.league?.id ?? PL_LEAGUE_ID,
      leagueName: raw.league?.name ?? "Premier League",
      seasonId: raw.season_id ?? 0,
    };
  }

  private mapEventType(typeId: number): MatchEventType {
    // Sportmonks type IDs
    switch (typeId) {
      case 14:
        return "goal";
      case 15:
        return "own_goal";
      case 16:
        return "penalty_goal";
      case 17:
        return "penalty_miss";
      case 19:
        return "yellow_card";
      case 20:
        return "red_card";
      case 18:
        return "substitution";
      case 24:
        return "var";
      default:
        return "goal";
    }
  }

  private mapEvent(raw: any): MatchEvent {
    return {
      id: raw.id,
      minute: raw.minute ?? 0,
      extraMinute: raw.extra_minute ?? null,
      type: this.mapEventType(raw.type_id),
      teamId: raw.participant_id ?? 0,
      playerName: raw.player_name ?? raw.player?.display_name ?? "Unknown",
      relatedPlayerName:
        raw.related_player_name ?? raw.related_player?.display_name ?? null,
      description: raw.info ?? null,
    };
  }

  private mapLineupPlayer(raw: any): LineupPlayer {
    return {
      id: raw.player_id ?? raw.id,
      name: raw.player_name ?? raw.player?.display_name ?? "Unknown",
      number: raw.jersey_number ?? 0,
      position: raw.position?.name ?? raw.detail_position?.name ?? "",
      isCaptain: raw.captain === true,
    };
  }

  private mapStatisticsSet(stats: any[]): StatisticsSet {
    const get = (typeId: number): number => {
      const stat = stats.find((s: any) => s.type_id === typeId);
      return stat?.data?.value ?? 0;
    };

    return {
      possession: get(45),
      shots: get(42),
      shotsOnTarget: get(86),
      corners: get(34),
      fouls: get(56),
      offsides: get(37),
      yellowCards: get(84),
      redCards: get(83),
      passes: get(80),
      passAccuracy: get(81),
    };
  }

  /* eslint-enable @typescript-eslint/no-explicit-any */

  // ---- Public API --------------------------------------------------------

  async getFixtures(params?: {
    from?: string;
    to?: string;
    status?: FixtureStatus;
    limit?: number;
  }): Promise<Fixture[] | null> {
    const queryParams: Record<string, string> = {
      include:
        "participants;venue;scores;round;league;state",
      "filters[participant_ids]": String(SPURS_TEAM_ID),
      per_page: String(params?.limit ?? 50),
    };

    if (params?.from) queryParams["filters[fixtureStartingAtFrom]"] = params.from;
    if (params?.to) queryParams["filters[fixtureStartingAtTo]"] = params.to;

    const cacheKey = `fixtures:${JSON.stringify(params ?? {})}`;

    return this.cached(cacheKey, CACHE_TTL.FIXTURES, async () => {
      const raw = await this.request<unknown[]>("/fixtures", queryParams);
      if (!raw) return null;

      let fixtures = raw.map((f) => this.mapFixture(f));

      if (params?.status) {
        fixtures = fixtures.filter((f) => f.status === params.status);
      }

      return fixtures.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    });
  }

  async getFixture(fixtureId: number): Promise<Fixture | null> {
    const cacheKey = `fixture:${fixtureId}`;

    return this.cached(cacheKey, CACHE_TTL.FIXTURE, async () => {
      const raw = await this.request<unknown>(
        `/fixtures/${fixtureId}`,
        {
          include: "participants;venue;scores;round;league;state",
        }
      );
      if (!raw) return null;
      return this.mapFixture(raw);
    });
  }

  async getLiveFixtures(): Promise<Fixture[] | null> {
    return this.cached("live-fixtures", CACHE_TTL.LIVE, async () => {
      const raw = await this.request<unknown[]>("/livescores/inplay", {
        include: "participants;venue;scores;state",
        "filters[participant_ids]": String(SPURS_TEAM_ID),
      });
      if (!raw) return null;
      return raw.map((f) => this.mapFixture(f));
    });
  }

  async getStandings(leagueId?: number): Promise<StandingsEntry[] | null> {
    const lid = leagueId ?? PL_LEAGUE_ID;
    const cacheKey = `standings:${lid}`;

    return this.cached(cacheKey, CACHE_TTL.STANDINGS, async () => {
      const raw = await this.request<unknown[]>(
        `/standings/seasons/${lid}`, // The latest season will be resolved by the API
        { include: "participant;details;form" }
      );
      if (!raw) return null;

      return raw.map((entry: any) => ({
        position: entry.position ?? 0,
        team: this.mapTeam(entry.participant ?? {}),
        played: entry.details?.find((d: any) => d.type_id === 129)?.value ?? 0,
        won: entry.details?.find((d: any) => d.type_id === 130)?.value ?? 0,
        drawn: entry.details?.find((d: any) => d.type_id === 131)?.value ?? 0,
        lost: entry.details?.find((d: any) => d.type_id === 132)?.value ?? 0,
        goalsFor: entry.details?.find((d: any) => d.type_id === 133)?.value ?? 0,
        goalsAgainst: entry.details?.find((d: any) => d.type_id === 134)?.value ?? 0,
        goalDifference:
          (entry.details?.find((d: any) => d.type_id === 133)?.value ?? 0) -
          (entry.details?.find((d: any) => d.type_id === 134)?.value ?? 0),
        points: entry.points ?? 0,
        form: (entry.form ?? []).slice(-5).map((f: any) => {
          if (f.result === "W" || f.is_win) return "W";
          if (f.result === "D" || f.is_draw) return "D";
          return "L";
        }),
      }));
    });
  }

  async getTeam(teamId: number): Promise<Team | null> {
    const cacheKey = `team:${teamId}`;

    return this.cached(cacheKey, CACHE_TTL.TEAM, async () => {
      const raw = await this.request<unknown>(`/teams/${teamId}`);
      if (!raw) return null;
      return this.mapTeam(raw);
    });
  }

  async getVenue(venueId: number): Promise<Venue | null> {
    const cacheKey = `venue:${venueId}`;

    return this.cached(cacheKey, CACHE_TTL.VENUE, async () => {
      const raw = await this.request<unknown>(`/venues/${venueId}`);
      if (!raw) return null;
      return this.mapVenue(raw);
    });
  }

  async getLineup(
    fixtureId: number,
    teamId: number
  ): Promise<Lineup | null> {
    const cacheKey = `lineup:${fixtureId}:${teamId}`;

    return this.cached(cacheKey, CACHE_TTL.LINEUP, async () => {
      const raw = await this.request<unknown[]>(
        `/fixtures/${fixtureId}/lineups`,
        {
          include: "player;position;detailPosition",
          "filters[participant_id]": String(teamId),
        }
      );
      if (!raw || raw.length === 0) return null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const players = raw as any[];
      const starters = players
        .filter((p) => p.type_id === 11) // starting XI
        .map((p) => this.mapLineupPlayer(p));
      const subs = players
        .filter((p) => p.type_id === 12) // substitutes
        .map((p) => this.mapLineupPlayer(p));

      // Get formation from fixture
      const fixture = await this.getFixture(fixtureId);

      return {
        formation: (fixture as any)?.formation?.home ?? "4-3-3",
        startingXI: starters,
        substitutes: subs,
        coach:
          players.find((p) => p.type_id === 13)?.player_name ?? "Unknown",
      };
    });
  }

  async getEvents(fixtureId: number): Promise<MatchEvent[] | null> {
    const cacheKey = `events:${fixtureId}`;

    return this.cached(cacheKey, CACHE_TTL.EVENTS, async () => {
      const raw = await this.request<unknown[]>(
        `/fixtures/${fixtureId}/events`,
        { include: "player;relatedPlayer" }
      );
      if (!raw) return null;
      return raw
        .map((e) => this.mapEvent(e))
        .sort((a, b) => a.minute - b.minute || (a.extraMinute ?? 0) - (b.extraMinute ?? 0));
    });
  }

  async getStatistics(
    fixtureId: number
  ): Promise<MatchStatistics | null> {
    const cacheKey = `statistics:${fixtureId}`;

    return this.cached(cacheKey, CACHE_TTL.STATISTICS, async () => {
      const raw = await this.request<unknown[]>(
        `/fixtures/${fixtureId}/statistics`,
        { include: "type" }
      );
      if (!raw) return null;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const groups = raw as any[];
      const homeStats = groups.filter(
        (s) => s.location === "home"
      );
      const awayStats = groups.filter(
        (s) => s.location === "away"
      );

      return {
        fixtureId,
        home: this.mapStatisticsSet(homeStats),
        away: this.mapStatisticsSet(awayStats),
      };
    });
  }
}
