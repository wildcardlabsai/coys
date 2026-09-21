-- COYS Spurs Matchday Companion App
-- Initial Database Schema Migration
-- ============================================================

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE competition_type AS ENUM ('league', 'cup', 'international');
CREATE TYPE fixture_status AS ENUM ('scheduled', 'live', 'finished', 'postponed', 'cancelled');
CREATE TYPE fixture_event_type AS ENUM ('goal', 'card', 'substitution', 'var', 'penalty_missed');
CREATE TYPE guide_type AS ENUM ('home_matchday', 'away_day', 'general');
CREATE TYPE transport_type AS ENUM ('train', 'tube', 'bus', 'coach', 'car', 'walking', 'parking');
CREATE TYPE venue_section_type AS ENUM ('away', 'home', 'family', 'accessible', 'premium');
CREATE TYPE tip_type AS ENUM ('general', 'transport', 'food', 'safety', 'atmosphere');
CREATE TYPE moderation_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE place_type AS ENUM ('pub', 'restaurant', 'cafe', 'bar', 'hotel', 'parking', 'other');
CREATE TYPE article_category AS ENUM ('matchday_guide', 'away_guide', 'pub_guide', 'travel', 'stadium', 'tips', 'features', 'news');
CREATE TYPE vote_type AS ENUM ('up', 'down');

-- ============================================================
-- 1. PROFILES
-- ============================================================

CREATE TABLE profiles (
    id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    username text UNIQUE,
    display_name text,
    avatar_url text,
    bio text,
    coys_since text,
    favourite_player text,
    is_admin boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_profiles_username ON profiles (username);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read profiles"
    ON profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- ============================================================
-- 2. COMPETITIONS
-- ============================================================

CREATE TABLE competitions (
    id serial PRIMARY KEY,
    external_id integer UNIQUE,
    name text NOT NULL,
    short_name text,
    slug text UNIQUE NOT NULL,
    logo_url text,
    country text,
    type competition_type NOT NULL DEFAULT 'league',
    season text,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_competitions_slug ON competitions (slug);
CREATE INDEX idx_competitions_external_id ON competitions (external_id);

ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read competitions"
    ON competitions FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage competitions"
    ON competitions FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 3. SEASONS
-- ============================================================

CREATE TABLE seasons (
    id serial PRIMARY KEY,
    external_id integer UNIQUE,
    competition_id integer NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
    name text NOT NULL,
    year integer NOT NULL,
    is_current boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_seasons_competition_id ON seasons (competition_id);
CREATE INDEX idx_seasons_is_current ON seasons (is_current) WHERE is_current = true;

ALTER TABLE seasons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read seasons"
    ON seasons FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage seasons"
    ON seasons FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 4. VENUES
-- ============================================================

CREATE TABLE venues (
    id serial PRIMARY KEY,
    external_id integer UNIQUE,
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    city text,
    country text,
    address text,
    latitude decimal(10, 7),
    longitude decimal(10, 7),
    capacity integer,
    surface text,
    image_url text,
    official_website text,
    is_home_ground boolean NOT NULL DEFAULT false,
    team_id integer,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_venues_slug ON venues (slug);
CREATE INDEX idx_venues_external_id ON venues (external_id);
CREATE INDEX idx_venues_team_id ON venues (team_id);
CREATE INDEX idx_venues_is_home_ground ON venues (is_home_ground) WHERE is_home_ground = true;

ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read venues"
    ON venues FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage venues"
    ON venues FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 5. TEAMS
-- ============================================================

CREATE TABLE teams (
    id serial PRIMARY KEY,
    external_id integer UNIQUE,
    name text NOT NULL,
    short_name text,
    slug text UNIQUE NOT NULL,
    logo_url text,
    city text,
    country text,
    venue_id integer REFERENCES venues(id) ON DELETE SET NULL,
    competition_ids integer[],
    is_primary boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_teams_slug ON teams (slug);
CREATE INDEX idx_teams_external_id ON teams (external_id);
CREATE INDEX idx_teams_is_primary ON teams (is_primary) WHERE is_primary = true;

-- Now add the FK from venues back to teams
ALTER TABLE venues ADD CONSTRAINT fk_venues_team FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL;

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read teams"
    ON teams FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage teams"
    ON teams FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 6. FIXTURES
-- ============================================================

CREATE TABLE fixtures (
    id serial PRIMARY KEY,
    external_id integer UNIQUE,
    competition_id integer REFERENCES competitions(id) ON DELETE SET NULL,
    season_id integer REFERENCES seasons(id) ON DELETE SET NULL,
    home_team_id integer NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    away_team_id integer NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    venue_id integer REFERENCES venues(id) ON DELETE SET NULL,
    kickoff_at timestamptz,
    status fixture_status NOT NULL DEFAULT 'scheduled',
    home_score integer,
    away_score integer,
    round text,
    matchday integer,
    is_spurs_home boolean,
    slug text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_fixtures_slug ON fixtures (slug);
CREATE INDEX idx_fixtures_external_id ON fixtures (external_id);
CREATE INDEX idx_fixtures_kickoff_at ON fixtures (kickoff_at);
CREATE INDEX idx_fixtures_status ON fixtures (status);
CREATE INDEX idx_fixtures_home_team_id ON fixtures (home_team_id);
CREATE INDEX idx_fixtures_away_team_id ON fixtures (away_team_id);
CREATE INDEX idx_fixtures_competition_id ON fixtures (competition_id);
CREATE INDEX idx_fixtures_season_id ON fixtures (season_id);
CREATE INDEX idx_fixtures_venue_id ON fixtures (venue_id);
CREATE INDEX idx_fixtures_is_spurs_home ON fixtures (is_spurs_home);

ALTER TABLE fixtures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read fixtures"
    ON fixtures FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage fixtures"
    ON fixtures FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 7. FIXTURE EVENTS
-- ============================================================

CREATE TABLE fixture_events (
    id serial PRIMARY KEY,
    fixture_id integer NOT NULL REFERENCES fixtures(id) ON DELETE CASCADE,
    type fixture_event_type NOT NULL,
    minute integer,
    extra_minute integer,
    team_id integer REFERENCES teams(id) ON DELETE SET NULL,
    player_name text,
    assist_name text,
    detail text,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_fixture_events_fixture_id ON fixture_events (fixture_id);
CREATE INDEX idx_fixture_events_type ON fixture_events (type);

ALTER TABLE fixture_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read fixture events"
    ON fixture_events FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage fixture events"
    ON fixture_events FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 8. FIXTURE LINEUPS
-- ============================================================

CREATE TABLE fixture_lineups (
    id serial PRIMARY KEY,
    fixture_id integer NOT NULL REFERENCES fixtures(id) ON DELETE CASCADE,
    team_id integer NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    player_name text NOT NULL,
    player_number integer,
    position text,
    is_starter boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_fixture_lineups_fixture_id ON fixture_lineups (fixture_id);
CREATE INDEX idx_fixture_lineups_team_id ON fixture_lineups (team_id);

ALTER TABLE fixture_lineups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read fixture lineups"
    ON fixture_lineups FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage fixture lineups"
    ON fixture_lineups FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 9. FIXTURE STATISTICS
-- ============================================================

CREATE TABLE fixture_statistics (
    id serial PRIMARY KEY,
    fixture_id integer NOT NULL REFERENCES fixtures(id) ON DELETE CASCADE,
    team_id integer NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    stat_type text NOT NULL,
    stat_value text,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_fixture_statistics_fixture_id ON fixture_statistics (fixture_id);

ALTER TABLE fixture_statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read fixture statistics"
    ON fixture_statistics FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage fixture statistics"
    ON fixture_statistics FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 10. VENUE GUIDES
-- ============================================================

CREATE TABLE venue_guides (
    id serial PRIMARY KEY,
    venue_id integer NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    title text NOT NULL,
    content text,
    guide_type guide_type NOT NULL DEFAULT 'general',
    is_published boolean NOT NULL DEFAULT false,
    author_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_venue_guides_venue_id ON venue_guides (venue_id);
CREATE INDEX idx_venue_guides_guide_type ON venue_guides (guide_type);
CREATE INDEX idx_venue_guides_is_published ON venue_guides (is_published) WHERE is_published = true;

ALTER TABLE venue_guides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published venue guides"
    ON venue_guides FOR SELECT
    USING (is_published = true OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can manage venue guides"
    ON venue_guides FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 11. VENUE TRANSPORT
-- ============================================================

CREATE TABLE venue_transport (
    id serial PRIMARY KEY,
    venue_id integer NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    transport_type transport_type NOT NULL,
    name text NOT NULL,
    description text,
    distance text,
    walking_time text,
    details jsonb,
    sort_order integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_venue_transport_venue_id ON venue_transport (venue_id);

ALTER TABLE venue_transport ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read venue transport"
    ON venue_transport FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage venue transport"
    ON venue_transport FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 12. VENUE SECTIONS
-- ============================================================

CREATE TABLE venue_sections (
    id serial PRIMARY KEY,
    venue_id integer NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    section_type venue_section_type NOT NULL,
    name text NOT NULL,
    description text,
    entrance text,
    notes text,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_venue_sections_venue_id ON venue_sections (venue_id);

ALTER TABLE venue_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read venue sections"
    ON venue_sections FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage venue sections"
    ON venue_sections FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 13. VENUE TIPS
-- ============================================================

CREATE TABLE venue_tips (
    id serial PRIMARY KEY,
    venue_id integer NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content text NOT NULL,
    tip_type tip_type NOT NULL DEFAULT 'general',
    status moderation_status NOT NULL DEFAULT 'pending',
    upvotes integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_venue_tips_venue_id ON venue_tips (venue_id);
CREATE INDEX idx_venue_tips_user_id ON venue_tips (user_id);
CREATE INDEX idx_venue_tips_status ON venue_tips (status);

ALTER TABLE venue_tips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved venue tips"
    ON venue_tips FOR SELECT
    USING (status = 'approved' OR user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Authenticated users can insert venue tips"
    ON venue_tips FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pending tips"
    ON venue_tips FOR UPDATE
    USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Users can delete own tips"
    ON venue_tips FOR DELETE
    USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 14. PLACES
-- ============================================================

CREATE TABLE places (
    id serial PRIMARY KEY,
    venue_id integer REFERENCES venues(id) ON DELETE SET NULL,
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    place_type place_type NOT NULL DEFAULT 'other',
    address text,
    city text,
    country text,
    latitude decimal(10, 7),
    longitude decimal(10, 7),
    distance_from_venue text,
    walking_time text,
    description text,
    image_url text,
    rating decimal(3, 2),
    review_count integer NOT NULL DEFAULT 0,
    phone text,
    website text,
    booking_url text,
    google_place_id text,
    google_maps_url text,
    is_spurs_friendly boolean NOT NULL DEFAULT false,
    is_family_friendly boolean NOT NULL DEFAULT false,
    is_matchday_recommended boolean NOT NULL DEFAULT false,
    is_pre_match boolean,
    is_post_match boolean,
    is_verified boolean NOT NULL DEFAULT false,
    tags text[],
    opening_hours jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_places_slug ON places (slug);
CREATE INDEX idx_places_venue_id ON places (venue_id);
CREATE INDEX idx_places_place_type ON places (place_type);
CREATE INDEX idx_places_is_spurs_friendly ON places (is_spurs_friendly) WHERE is_spurs_friendly = true;
CREATE INDEX idx_places_is_matchday_recommended ON places (is_matchday_recommended) WHERE is_matchday_recommended = true;
CREATE INDEX idx_places_tags ON places USING gin (tags);

ALTER TABLE places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read places"
    ON places FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage places"
    ON places FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 15. AWAY GUIDES
-- ============================================================

CREATE TABLE away_guides (
    id serial PRIMARY KEY,
    venue_id integer REFERENCES venues(id) ON DELETE SET NULL,
    team_id integer REFERENCES teams(id) ON DELETE SET NULL,
    title text NOT NULL,
    slug text UNIQUE NOT NULL,
    content text,
    travel_summary text,
    away_section_info text,
    away_entrance_info text,
    parking_info text,
    fan_tips text,
    useful_links jsonb,
    is_published boolean NOT NULL DEFAULT false,
    author_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_away_guides_slug ON away_guides (slug);
CREATE INDEX idx_away_guides_venue_id ON away_guides (venue_id);
CREATE INDEX idx_away_guides_team_id ON away_guides (team_id);
CREATE INDEX idx_away_guides_is_published ON away_guides (is_published) WHERE is_published = true;

ALTER TABLE away_guides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published away guides"
    ON away_guides FOR SELECT
    USING (is_published = true OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can manage away guides"
    ON away_guides FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 16. ARTICLES
-- ============================================================

CREATE TABLE articles (
    id serial PRIMARY KEY,
    title text NOT NULL,
    slug text UNIQUE NOT NULL,
    excerpt text,
    content text,
    image_url text,
    category article_category NOT NULL DEFAULT 'news',
    tags text[],
    is_published boolean NOT NULL DEFAULT false,
    is_featured boolean NOT NULL DEFAULT false,
    author_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
    published_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_articles_slug ON articles (slug);
CREATE INDEX idx_articles_category ON articles (category);
CREATE INDEX idx_articles_is_published ON articles (is_published) WHERE is_published = true;
CREATE INDEX idx_articles_is_featured ON articles (is_featured) WHERE is_featured = true;
CREATE INDEX idx_articles_published_at ON articles (published_at DESC);
CREATE INDEX idx_articles_tags ON articles USING gin (tags);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published articles"
    ON articles FOR SELECT
    USING (is_published = true OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can manage articles"
    ON articles FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 17. SAVED PLACES
-- ============================================================

CREATE TABLE saved_places (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    place_id integer NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (user_id, place_id)
);

CREATE INDEX idx_saved_places_user_id ON saved_places (user_id);

ALTER TABLE saved_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own saved places"
    ON saved_places FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved places"
    ON saved_places FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved places"
    ON saved_places FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================
-- 18. SAVED FIXTURES
-- ============================================================

CREATE TABLE saved_fixtures (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    fixture_id integer NOT NULL REFERENCES fixtures(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (user_id, fixture_id)
);

CREATE INDEX idx_saved_fixtures_user_id ON saved_fixtures (user_id);

ALTER TABLE saved_fixtures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own saved fixtures"
    ON saved_fixtures FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved fixtures"
    ON saved_fixtures FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved fixtures"
    ON saved_fixtures FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================
-- 19. USER MATCHES
-- ============================================================

CREATE TABLE user_matches (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    fixture_id integer NOT NULL REFERENCES fixtures(id) ON DELETE CASCADE,
    attended boolean NOT NULL DEFAULT true,
    notes text,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (user_id, fixture_id)
);

CREATE INDEX idx_user_matches_user_id ON user_matches (user_id);
CREATE INDEX idx_user_matches_fixture_id ON user_matches (fixture_id);

ALTER TABLE user_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own matches"
    ON user_matches FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own matches"
    ON user_matches FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own matches"
    ON user_matches FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own matches"
    ON user_matches FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================
-- 20. USER GROUNDS
-- ============================================================

CREATE TABLE user_grounds (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    venue_id integer NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
    first_visited_at date,
    visit_count integer NOT NULL DEFAULT 1,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (user_id, venue_id)
);

CREATE INDEX idx_user_grounds_user_id ON user_grounds (user_id);

ALTER TABLE user_grounds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own grounds"
    ON user_grounds FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own grounds"
    ON user_grounds FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own grounds"
    ON user_grounds FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own grounds"
    ON user_grounds FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================
-- 21. BADGES
-- ============================================================

CREATE TABLE badges (
    id serial PRIMARY KEY,
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    description text,
    icon text,
    requirement_type text,
    requirement_value integer,
    category text,
    sort_order integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_badges_slug ON badges (slug);
CREATE INDEX idx_badges_category ON badges (category);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read badges"
    ON badges FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage badges"
    ON badges FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 22. USER BADGES
-- ============================================================

CREATE TABLE user_badges (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    badge_id integer NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    earned_at timestamptz NOT NULL DEFAULT now(),
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (user_id, badge_id)
);

CREATE INDEX idx_user_badges_user_id ON user_badges (user_id);

ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own badges"
    ON user_badges FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read all user badges"
    ON user_badges FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage user badges"
    ON user_badges FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 23. REVIEWS
-- ============================================================

CREATE TABLE reviews (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    place_id integer NOT NULL REFERENCES places(id) ON DELETE CASCADE,
    rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
    content text,
    status moderation_status NOT NULL DEFAULT 'pending',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_reviews_place_id ON reviews (place_id);
CREATE INDEX idx_reviews_user_id ON reviews (user_id);
CREATE INDEX idx_reviews_status ON reviews (status);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved reviews"
    ON reviews FOR SELECT
    USING (status = 'approved' OR user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Authenticated users can insert reviews"
    ON reviews FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews, admins can update status"
    ON reviews FOR UPDATE
    USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Users can delete own reviews"
    ON reviews FOR DELETE
    USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 24. REVIEW VOTES
-- ============================================================

CREATE TABLE review_votes (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    review_id integer NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    vote_type vote_type NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (user_id, review_id)
);

CREATE INDEX idx_review_votes_review_id ON review_votes (review_id);

ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read review votes"
    ON review_votes FOR SELECT
    USING (true);

CREATE POLICY "Users can insert own votes"
    ON review_votes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own votes"
    ON review_votes FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own votes"
    ON review_votes FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================
-- 25. AFFILIATE PARTNERS
-- ============================================================

CREATE TABLE affiliate_partners (
    id serial PRIMARY KEY,
    name text NOT NULL,
    slug text UNIQUE NOT NULL,
    logo_url text,
    category text,
    description text,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_affiliate_partners_slug ON affiliate_partners (slug);

ALTER TABLE affiliate_partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active affiliate partners"
    ON affiliate_partners FOR SELECT
    USING (is_active = true OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can manage affiliate partners"
    ON affiliate_partners FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 26. AFFILIATE LINKS
-- ============================================================

CREATE TABLE affiliate_links (
    id serial PRIMARY KEY,
    partner_id integer NOT NULL REFERENCES affiliate_partners(id) ON DELETE CASCADE,
    name text NOT NULL,
    destination_url text NOT NULL,
    tracking_params jsonb,
    category text,
    placement text,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_affiliate_links_partner_id ON affiliate_links (partner_id);

ALTER TABLE affiliate_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active affiliate links"
    ON affiliate_links FOR SELECT
    USING (is_active = true OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

CREATE POLICY "Admins can manage affiliate links"
    ON affiliate_links FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 27. AFFILIATE CLICKS
-- ============================================================

CREATE TABLE affiliate_clicks (
    id serial PRIMARY KEY,
    link_id integer NOT NULL REFERENCES affiliate_links(id) ON DELETE CASCADE,
    user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
    session_id text,
    page text,
    fixture_id integer REFERENCES fixtures(id) ON DELETE SET NULL,
    clicked_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_affiliate_clicks_link_id ON affiliate_clicks (link_id);
CREATE INDEX idx_affiliate_clicks_clicked_at ON affiliate_clicks (clicked_at);

ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert affiliate clicks"
    ON affiliate_clicks FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins can read affiliate clicks"
    ON affiliate_clicks FOR SELECT
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- 28. NOTIFICATIONS
-- ============================================================

CREATE TABLE notifications (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type text NOT NULL,
    title text NOT NULL,
    message text,
    data jsonb,
    is_read boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_user_id ON notifications (user_id);
CREATE INDEX idx_notifications_is_read ON notifications (user_id, is_read) WHERE is_read = false;

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notifications"
    ON notifications FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
    ON notifications FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notifications"
    ON notifications FOR DELETE
    USING (auth.uid() = user_id);

CREATE POLICY "System and admins can insert notifications"
    ON notifications FOR INSERT
    WITH CHECK (true);

-- ============================================================
-- 29. NOTIFICATION PREFERENCES
-- ============================================================

CREATE TABLE notification_preferences (
    id serial PRIMARY KEY,
    user_id uuid NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    fixture_reminders boolean NOT NULL DEFAULT true,
    kickoff_reminders boolean NOT NULL DEFAULT true,
    travel_updates boolean NOT NULL DEFAULT true,
    guide_published boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notification preferences"
    ON notification_preferences FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notification preferences"
    ON notification_preferences FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notification preferences"
    ON notification_preferences FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- 30. APP SETTINGS
-- ============================================================

CREATE TABLE app_settings (
    id serial PRIMARY KEY,
    key text UNIQUE NOT NULL,
    value jsonb,
    description text,
    updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read app settings"
    ON app_settings FOR SELECT
    USING (true);

CREATE POLICY "Admins can manage app settings"
    ON app_settings FOR ALL
    USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true));

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER set_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON venues FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON fixtures FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON venue_guides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON places FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON away_guides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON notification_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON app_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, display_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data->>'username',
        COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name'),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();
