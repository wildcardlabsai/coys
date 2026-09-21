/**
 * Abstract football data provider interface.
 *
 * All methods return null on failure rather than throwing,
 * so UI components can handle missing data gracefully.
 */

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

export interface Team {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  venueId?: number;
}

export interface Venue {
  id: number;
  name: string;
  city: string;
  capacity: number;
  image?: string;
  latitude?: number;
  longitude?: number;
}

export type FixtureStatus =
  | "scheduled"
  | "live"
  | "halftime"
  | "finished"
  | "postponed"
  | "cancelled";

export interface FixtureScore {
  home: number;
  away: number;
}

export interface Fixture {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  venue: Venue | null;
  date: string; // ISO 8601
  status: FixtureStatus;
  score: FixtureScore | null;
  minute: number | null;
  round: string | null;
  leagueId: number;
  leagueName: string;
  seasonId: number;
}

export interface StandingsEntry {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[]; // e.g. ["W","W","D","L","W"]
}

export interface LineupPlayer {
  id: number;
  name: string;
  number: number;
  position: string;
  isCaptain: boolean;
}

export interface Lineup {
  formation: string;
  startingXI: LineupPlayer[];
  substitutes: LineupPlayer[];
  coach: string;
}

export type MatchEventType =
  | "goal"
  | "own_goal"
  | "penalty_goal"
  | "penalty_miss"
  | "yellow_card"
  | "red_card"
  | "substitution"
  | "var";

export interface MatchEvent {
  id: number;
  minute: number;
  extraMinute: number | null;
  type: MatchEventType;
  teamId: number;
  playerName: string;
  relatedPlayerName: string | null; // assist or substituted player
  description: string | null;
}

export interface MatchStatistics {
  fixtureId: number;
  home: StatisticsSet;
  away: StatisticsSet;
}

export interface StatisticsSet {
  possession: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  fouls: number;
  offsides: number;
  yellowCards: number;
  redCards: number;
  passes: number;
  passAccuracy: number;
}

// ---------------------------------------------------------------------------
// Provider interface
// ---------------------------------------------------------------------------

export interface FootballDataProvider {
  /** Get fixtures for Tottenham, optionally filtered by date range. */
  getFixtures(params?: {
    from?: string;
    to?: string;
    status?: FixtureStatus;
    limit?: number;
  }): Promise<Fixture[] | null>;

  /** Get a single fixture by its ID. */
  getFixture(fixtureId: number): Promise<Fixture | null>;

  /** Get any currently live fixtures involving Tottenham. */
  getLiveFixtures(): Promise<Fixture[] | null>;

  /** Get current league standings. */
  getStandings(leagueId?: number): Promise<StandingsEntry[] | null>;

  /** Get team details. */
  getTeam(teamId: number): Promise<Team | null>;

  /** Get venue details. */
  getVenue(venueId: number): Promise<Venue | null>;

  /** Get lineup for a fixture and team. */
  getLineup(fixtureId: number, teamId: number): Promise<Lineup | null>;

  /** Get match events (goals, cards, subs) for a fixture. */
  getEvents(fixtureId: number): Promise<MatchEvent[] | null>;

  /** Get match statistics for a fixture. */
  getStatistics(fixtureId: number): Promise<MatchStatistics | null>;
}
