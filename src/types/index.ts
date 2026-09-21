// =============================================================================
// COYS - Spurs Matchday Companion App
// Core Type Definitions
// =============================================================================

// -----------------------------------------------------------------------------
// Common / Shared Types
// -----------------------------------------------------------------------------

export type UUID = string;
export type ISODateString = string;
export type URL = string;

export interface Timestamps {
  created_at: ISODateString;
  updated_at: ISODateString;
}

export interface SoftDeletable {
  deleted_at: ISODateString | null;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// -----------------------------------------------------------------------------
// Database Types
// -----------------------------------------------------------------------------

export interface User extends Timestamps {
  id: UUID;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  provider: 'email' | 'google' | 'apple' | 'twitter';
  provider_id: string | null;
  is_active: boolean;
  last_login_at: ISODateString | null;
  onboarding_completed: boolean;
  push_token: string | null;
}

export interface Profile extends Timestamps {
  id: UUID;
  user_id: UUID;
  username: string;
  bio: string | null;
  favourite_player: string | null;
  first_match: string | null;
  season_ticket_holder: boolean;
  membership_type: 'none' | 'one_hotspur' | 'one_hotspur_plus' | 'season_ticket' | 'premium';
  home_location: string | null;
  notification_preferences: NotificationPreferences;
  privacy_settings: PrivacySettings;
}

export interface NotificationPreferences {
  match_reminders: boolean;
  score_updates: boolean;
  lineup_announcements: boolean;
  transfer_news: boolean;
  community_updates: boolean;
  away_guide_alerts: boolean;
  push_enabled: boolean;
  email_enabled: boolean;
}

export interface PrivacySettings {
  profile_public: boolean;
  show_matches_attended: boolean;
  show_grounds_visited: boolean;
  show_badges: boolean;
}

export interface Team extends Timestamps {
  id: UUID;
  external_id: number;
  name: string;
  short_name: string;
  code: string | null;
  logo_url: string | null;
  country: string;
  founded: number | null;
  venue_id: UUID | null;
  is_spurs: boolean;
}

export interface Competition extends Timestamps {
  id: UUID;
  external_id: number;
  name: string;
  short_name: string;
  code: string;
  type: 'league' | 'cup' | 'super_cup' | 'friendly';
  country: string | null;
  logo_url: string | null;
  is_active: boolean;
}

export interface Season extends Timestamps {
  id: UUID;
  competition_id: UUID;
  external_id: number;
  year: number;
  start_date: ISODateString;
  end_date: ISODateString;
  is_current: boolean;
}

export type FixtureStatus =
  | 'scheduled'
  | 'timed'
  | 'in_play'
  | 'halftime'
  | 'extra_time'
  | 'penalties'
  | 'finished'
  | 'finished_aet'
  | 'finished_pen'
  | 'postponed'
  | 'cancelled'
  | 'suspended'
  | 'abandoned'
  | 'not_played'
  | 'walkover';

export interface Fixture extends Timestamps {
  id: UUID;
  external_id: number;
  competition_id: UUID;
  season_id: UUID;
  matchday: number | null;
  round: string | null;
  home_team_id: UUID;
  away_team_id: UUID;
  venue_id: UUID | null;
  kickoff: ISODateString;
  status: FixtureStatus;
  home_score: number | null;
  away_score: number | null;
  home_score_ht: number | null;
  away_score_ht: number | null;
  home_score_et: number | null;
  away_score_et: number | null;
  home_score_pen: number | null;
  away_score_pen: number | null;
  attendance: number | null;
  referee: string | null;
  last_synced_at: ISODateString | null;
}

export type FixtureEventType =
  | 'goal'
  | 'own_goal'
  | 'penalty_scored'
  | 'penalty_missed'
  | 'yellow_card'
  | 'second_yellow'
  | 'red_card'
  | 'substitution'
  | 'var_decision';

export interface FixtureEvent extends Timestamps {
  id: UUID;
  fixture_id: UUID;
  team_id: UUID;
  player_name: string;
  assist_name: string | null;
  event_type: FixtureEventType;
  minute: number;
  extra_minute: number | null;
  detail: string | null;
}

export interface FixtureStatistics extends Timestamps {
  id: UUID;
  fixture_id: UUID;
  team_id: UUID;
  possession: number | null;
  shots_total: number | null;
  shots_on_target: number | null;
  shots_off_target: number | null;
  shots_blocked: number | null;
  corners: number | null;
  offsides: number | null;
  fouls: number | null;
  passes_total: number | null;
  passes_accurate: number | null;
  pass_accuracy: number | null;
  tackles: number | null;
  interceptions: number | null;
  saves: number | null;
  expected_goals: number | null;
}

export interface Venue extends Timestamps {
  id: UUID;
  external_id: number | null;
  name: string;
  city: string;
  country: string;
  address: string | null;
  capacity: number | null;
  surface: string | null;
  image_url: string | null;
  coordinates: Coordinates | null;
}

export interface VenueGuide extends Timestamps {
  id: UUID;
  venue_id: UUID;
  away_end_info: string | null;
  accessibility_info: string | null;
  family_info: string | null;
  bag_policy: string | null;
  parking_info: string | null;
  entry_info: string | null;
  concourse_info: string | null;
  atmosphere_rating: number | null;
  view_rating: number | null;
  facilities_rating: number | null;
  overall_tips: string | null;
  last_verified_at: ISODateString | null;
}

export type TransportMode = 'train' | 'tube' | 'bus' | 'tram' | 'car' | 'walk' | 'coach' | 'ferry';

export interface VenueTransport extends Timestamps {
  id: UUID;
  venue_id: UUID;
  mode: TransportMode;
  name: string;
  description: string;
  distance_from_venue: string | null;
  walk_time_minutes: number | null;
  directions: string | null;
  tips: string | null;
  sort_order: number;
}

export interface VenueSection extends Timestamps {
  id: UUID;
  venue_id: UUID;
  name: string;
  description: string | null;
  is_away_section: boolean;
  image_url: string | null;
  view_quality: number | null;
  legroom_rating: number | null;
  tips: string | null;
}

export interface VenueTip extends Timestamps {
  id: UUID;
  venue_id: UUID;
  user_id: UUID;
  category: 'general' | 'transport' | 'food_drink' | 'seating' | 'parking' | 'safety' | 'accessibility';
  content: string;
  upvotes: number;
  downvotes: number;
  is_verified: boolean;
  is_active: boolean;
}

export type PlaceType = 'pub' | 'restaurant' | 'hotel' | 'attraction' | 'parking' | 'shop';

export interface Place extends Timestamps {
  id: UUID;
  venue_id: UUID | null;
  type: PlaceType;
  name: string;
  description: string | null;
  address: string;
  city: string;
  postcode: string | null;
  country: string;
  phone: string | null;
  website: string | null;
  email: string | null;
  coordinates: Coordinates | null;
  image_url: string | null;
  is_spurs_friendly: boolean;
  accepts_away_fans: boolean;
  price_level: 1 | 2 | 3 | 4 | null;
  rating: number | null;
  rating_count: number;
  distance_from_venue_meters: number | null;
  walk_time_minutes: number | null;
  opening_hours: Record<string, string> | null;
  is_active: boolean;
  is_verified: boolean;
}

export interface Pub extends Place {
  type: 'pub';
  shows_football: boolean;
  has_beer_garden: boolean;
  serves_food: boolean;
  real_ale: boolean;
  matchday_busy_level: 'quiet' | 'moderate' | 'busy' | 'packed' | null;
}

export interface Restaurant extends Place {
  type: 'restaurant';
  cuisine: string | null;
  booking_required: boolean;
  booking_url: string | null;
  dietary_options: string[];
}

export interface Hotel extends Place {
  type: 'hotel';
  star_rating: number | null;
  booking_url: string | null;
  price_per_night_from: number | null;
  currency: string;
  has_parking: boolean;
  distance_to_station: string | null;
}

export interface TransportOption extends Timestamps {
  id: UUID;
  venue_id: UUID;
  name: string;
  mode: TransportMode;
  from_location: string;
  to_location: string;
  operator: string | null;
  typical_duration_minutes: number | null;
  typical_cost: string | null;
  booking_url: string | null;
  frequency: string | null;
  matchday_notes: string | null;
  tips: string | null;
  sort_order: number;
}

export interface AwayGuide extends Timestamps {
  id: UUID;
  fixture_id: UUID | null;
  venue_id: UUID;
  competition_id: UUID | null;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  ticket_info: string | null;
  allocation_info: string | null;
  travel_summary: string | null;
  meeting_points: string | null;
  safety_info: string | null;
  published_at: ISODateString | null;
  is_published: boolean;
  author_id: UUID | null;
  featured_image_url: string | null;
  view_count: number;
}

export interface MatchdayGuide extends Timestamps {
  id: UUID;
  fixture_id: UUID;
  title: string;
  slug: string;
  content: string;
  pre_match_info: string | null;
  in_match_info: string | null;
  post_match_info: string | null;
  weather_forecast: WeatherForecast | null;
  published_at: ISODateString | null;
  is_published: boolean;
  author_id: UUID | null;
}

export interface WeatherForecast {
  temperature_celsius: number;
  feels_like_celsius: number;
  description: string;
  icon: string;
  wind_speed_mph: number;
  rain_probability: number;
  fetched_at: ISODateString;
}

export type ArticleCategory = 'news' | 'match_preview' | 'match_report' | 'transfer' | 'opinion' | 'history' | 'away_day' | 'guide';

export interface Article extends Timestamps, SoftDeletable {
  id: UUID;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: ArticleCategory;
  author_id: UUID | null;
  author_name: string | null;
  featured_image_url: string | null;
  tags: string[];
  fixture_id: UUID | null;
  published_at: ISODateString | null;
  is_published: boolean;
  is_featured: boolean;
  view_count: number;
  read_time_minutes: number | null;
}

export interface Category extends Timestamps {
  id: UUID;
  name: string;
  slug: string;
  description: string | null;
  parent_id: UUID | null;
  sort_order: number;
  is_active: boolean;
}

export interface SavedPlace extends Timestamps {
  id: UUID;
  user_id: UUID;
  place_id: UUID;
  notes: string | null;
}

export interface SavedFixture extends Timestamps {
  id: UUID;
  user_id: UUID;
  fixture_id: UUID;
  attending: boolean;
  ticket_status: 'none' | 'applied' | 'secured' | 'purchased';
  transport_mode: TransportMode | null;
  notes: string | null;
  reminder_set: boolean;
}

export interface UserMatch extends Timestamps {
  id: UUID;
  user_id: UUID;
  fixture_id: UUID;
  attended: boolean;
  rating: number | null;
  notes: string | null;
  photo_urls: string[];
  seat_info: string | null;
}

export interface UserGround extends Timestamps {
  id: UUID;
  user_id: UUID;
  venue_id: UUID;
  first_visit_date: ISODateString | null;
  visit_count: number;
  rating: number | null;
  notes: string | null;
  photo_url: string | null;
}

export type BadgeCategory = 'matches' | 'grounds' | 'away_days' | 'streaks' | 'special' | 'community';

export interface UserBadge extends Timestamps {
  id: UUID;
  user_id: UUID;
  badge_id: string;
  badge_name: string;
  badge_description: string;
  badge_icon: string;
  badge_category: BadgeCategory;
  awarded_at: ISODateString;
  progress: number;
  target: number;
  is_complete: boolean;
}

export interface UserStats extends Timestamps {
  id: UUID;
  user_id: UUID;
  season_id: UUID | null;
  matches_attended: number;
  home_matches: number;
  away_matches: number;
  european_matches: number;
  cup_matches: number;
  grounds_visited: number;
  total_miles_travelled: number;
  wins_seen: number;
  draws_seen: number;
  losses_seen: number;
  goals_seen: number;
  clean_sheets_seen: number;
  badges_earned: number;
  current_streak: number;
  longest_streak: number;
}

export interface Review extends Timestamps, SoftDeletable {
  id: UUID;
  user_id: UUID;
  reviewable_type: 'place' | 'venue' | 'away_guide';
  reviewable_id: UUID;
  rating: number;
  title: string | null;
  content: string | null;
  visit_date: ISODateString | null;
  is_verified: boolean;
  upvote_count: number;
  downvote_count: number;
  is_flagged: boolean;
  moderation_status: 'pending' | 'approved' | 'rejected';
}

export interface ReviewVote extends Timestamps {
  id: UUID;
  review_id: UUID;
  user_id: UUID;
  vote: 'up' | 'down';
}

export interface AffiliatePartner extends Timestamps {
  id: UUID;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  website_url: string;
  partner_type: 'travel' | 'tickets' | 'merchandise' | 'food_drink' | 'accommodation' | 'transport' | 'other';
  commission_rate: number | null;
  is_active: boolean;
  sort_order: number;
}

export interface AffiliateLink extends Timestamps {
  id: UUID;
  partner_id: UUID;
  url: string;
  tracking_code: string;
  label: string;
  description: string | null;
  place_id: UUID | null;
  venue_id: UUID | null;
  fixture_id: UUID | null;
  is_active: boolean;
  click_count: number;
}

export interface AffiliateClick extends Timestamps {
  id: UUID;
  link_id: UUID;
  user_id: UUID | null;
  ip_hash: string | null;
  user_agent: string | null;
  referrer: string | null;
}

export type NotificationType =
  | 'match_reminder'
  | 'kickoff'
  | 'goal'
  | 'halftime'
  | 'fulltime'
  | 'lineup'
  | 'score_update'
  | 'away_guide_published'
  | 'badge_earned'
  | 'community'
  | 'system';

export interface Notification extends Timestamps {
  id: UUID;
  user_id: UUID;
  type: NotificationType;
  title: string;
  body: string;
  data: Record<string, unknown> | null;
  fixture_id: UUID | null;
  is_read: boolean;
  read_at: ISODateString | null;
  sent_at: ISODateString | null;
  delivery_status: 'pending' | 'sent' | 'delivered' | 'failed';
}

export interface AppSetting extends Timestamps {
  id: UUID;
  key: string;
  value: string;
  value_type: 'string' | 'number' | 'boolean' | 'json';
  description: string | null;
  is_public: boolean;
  group: string | null;
}

// -----------------------------------------------------------------------------
// Football API Provider Types (provider-agnostic abstraction)
// -----------------------------------------------------------------------------

export interface FootballFixture {
  id: number;
  referee: string | null;
  timezone: string;
  date: ISODateString;
  timestamp: number;
  status: {
    long: string;
    short: string;
    elapsed: number | null;
    extra: number | null;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string | null;
    flag: string | null;
    season: number;
    round: string | null;
  };
  teams: {
    home: FootballTeamInfo;
    away: FootballTeamInfo;
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: { home: number | null; away: number | null };
    fulltime: { home: number | null; away: number | null };
    extratime: { home: number | null; away: number | null };
    penalty: { home: number | null; away: number | null };
  };
  venue: {
    id: number | null;
    name: string | null;
    city: string | null;
  };
}

export interface FootballTeamInfo {
  id: number;
  name: string;
  logo: string | null;
  winner: boolean | null;
}

export interface FootballTeam {
  id: number;
  name: string;
  code: string | null;
  country: string;
  founded: number | null;
  national: boolean;
  logo: string | null;
  venue: FootballVenue | null;
}

export interface FootballStanding {
  rank: number;
  team: FootballTeamInfo;
  points: number;
  goalsDiff: number;
  group: string | null;
  form: string | null;
  status: string | null;
  description: string | null;
  all: FootballStandingRecord;
  home: FootballStandingRecord;
  away: FootballStandingRecord;
}

export interface FootballStandingRecord {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: {
    for: number;
    against: number;
  };
}

export interface FootballEvent {
  time: {
    elapsed: number;
    extra: number | null;
  };
  team: FootballTeamInfo;
  player: {
    id: number | null;
    name: string;
  };
  assist: {
    id: number | null;
    name: string | null;
  };
  type: 'Goal' | 'Card' | 'subst' | 'Var';
  detail: string;
  comments: string | null;
}

export interface FootballLineupPlayer {
  id: number | null;
  name: string;
  number: number;
  pos: 'G' | 'D' | 'M' | 'F' | null;
  grid: string | null;
}

export interface FootballLineup {
  team: FootballTeamInfo;
  formation: string | null;
  startXI: FootballLineupPlayer[];
  substitutes: FootballLineupPlayer[];
  coach: {
    id: number | null;
    name: string;
    photo: string | null;
  } | null;
}

export interface FootballStatistic {
  team: FootballTeamInfo;
  statistics: FootballStatisticItem[];
}

export interface FootballStatisticItem {
  type: string;
  value: number | string | null;
}

export interface FootballCompetition {
  id: number;
  name: string;
  type: string;
  logo: string | null;
  country: {
    name: string;
    code: string | null;
    flag: string | null;
  };
  seasons: FootballSeason[];
}

export interface FootballSeason {
  year: number;
  start: ISODateString;
  end: ISODateString;
  current: boolean;
}

export interface FootballVenue {
  id: number;
  name: string;
  address: string | null;
  city: string | null;
  country: string | null;
  capacity: number | null;
  surface: string | null;
  image: string | null;
}

// -----------------------------------------------------------------------------
// Football Provider Abstraction
// -----------------------------------------------------------------------------

export interface FootballDataProvider {
  getFixtures(params: FixtureQueryParams): Promise<FootballFixture[]>;
  getFixtureById(id: number): Promise<FootballFixture | null>;
  getFixtureEvents(fixtureId: number): Promise<FootballEvent[]>;
  getFixtureLineups(fixtureId: number): Promise<FootballLineup[]>;
  getFixtureStatistics(fixtureId: number): Promise<FootballStatistic[]>;
  getStandings(leagueId: number, season: number): Promise<FootballStanding[]>;
  getTeam(teamId: number): Promise<FootballTeam | null>;
  getCompetitions(): Promise<FootballCompetition[]>;
  getLiveFixtures(): Promise<FootballFixture[]>;
}

export interface FixtureQueryParams {
  teamId?: number;
  leagueId?: number;
  season?: number;
  date?: string;
  from?: string;
  to?: string;
  status?: string;
  round?: string;
  last?: number;
  next?: number;
  timezone?: string;
}

// -----------------------------------------------------------------------------
// UI Types
// -----------------------------------------------------------------------------

export interface NavItem {
  key: string;
  label: string;
  icon: string;
  route: string;
  badge?: number | null;
  requiresAuth: boolean;
}

export interface Tab {
  key: string;
  label: string;
  icon?: string;
  badge?: number | null;
  disabled?: boolean;
}

export interface FilterChip {
  key: string;
  label: string;
  value: string;
  isActive: boolean;
  count?: number;
}

export type SearchResultType = 'fixture' | 'venue' | 'place' | 'article' | 'away_guide' | 'team';

export interface SearchResult {
  id: UUID;
  type: SearchResultType;
  title: string;
  subtitle: string | null;
  imageUrl: string | null;
  route: string;
  relevance: number;
}

export interface MapLocation {
  id: UUID;
  name: string;
  description: string | null;
  coordinates: Coordinates;
  type: PlaceType | 'venue' | 'transport';
  icon: string;
  color: string;
  metadata?: Record<string, unknown>;
}

// -----------------------------------------------------------------------------
// API Response Types
// -----------------------------------------------------------------------------

export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: ISODateString;
}

export interface PaginatedResponse<T> {
  data: T[];
  status: 'success' | 'error';
  message?: string;
  timestamp: ISODateString;
  pagination: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ApiError {
  status: 'error';
  message: string;
  code: string;
  details?: Record<string, string[]>;
  timestamp: ISODateString;
}

export interface FootballApiResponse<T> {
  get: string;
  parameters: Record<string, string>;
  errors: Record<string, string>;
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response: T[];
}

// -----------------------------------------------------------------------------
// Utility Types
// -----------------------------------------------------------------------------

export type WithRelations<T, R extends Record<string, unknown>> = T & R;

export type FixtureWithTeams = WithRelations<Fixture, {
  home_team: Team;
  away_team: Team;
  competition: Competition;
  venue: Venue | null;
}>;

export type FixtureWithDetails = WithRelations<FixtureWithTeams, {
  events: FixtureEvent[];
  statistics: FixtureStatistics[];
}>;

export type PlaceWithReviews = WithRelations<Place, {
  reviews: Review[];
  average_rating: number;
  review_count: number;
}>;

export type VenueWithGuide = WithRelations<Venue, {
  guide: VenueGuide | null;
  transport: VenueTransport[];
  sections: VenueSection[];
}>;

export type AwayGuideWithVenue = WithRelations<AwayGuide, {
  venue: Venue;
  fixture: Fixture | null;
  pubs: Place[];
  restaurants: Place[];
  hotels: Place[];
  transport_options: TransportOption[];
}>;
