-- COYS Spurs Matchday Companion App
-- Seed Data
-- ============================================================

-- ============================================================
-- COMPETITIONS
-- ============================================================

INSERT INTO competitions (external_id, name, short_name, slug, country, type, season) VALUES
(39, 'Premier League', 'PL', 'premier-league', 'England', 'league', '2024-25'),
(45, 'FA Cup', 'FA', 'fa-cup', 'England', 'cup', '2024-25'),
(48, 'League Cup', 'EFL', 'league-cup', 'England', 'cup', '2024-25'),
(2, 'UEFA Champions League', 'UCL', 'champions-league', 'Europe', 'cup', '2024-25');

-- ============================================================
-- VENUES
-- ============================================================

INSERT INTO venues (external_id, name, slug, city, country, address, latitude, longitude, capacity, surface, image_url, is_home_ground) VALUES
-- Tottenham
(593, 'Tottenham Hotspur Stadium', 'tottenham-hotspur-stadium', 'London', 'England', '782 High Road, Tottenham, London N17 0BX', 51.6042, -0.0662, 62850, 'Grass', '/images/venues/tottenham-hotspur-stadium.jpg', true),
-- Arsenal
(494, 'Emirates Stadium', 'emirates-stadium', 'London', 'England', 'Hornsey Rd, London N7 7AJ', 51.5549, -0.1084, 60704, 'Grass', '/images/venues/emirates-stadium.jpg', false),
-- Aston Villa
(495, 'Villa Park', 'villa-park', 'Birmingham', 'England', 'Trinity Rd, Birmingham B6 6HE', 52.5092, -1.8847, 42657, 'Grass', '/images/venues/villa-park.jpg', false),
-- Bournemouth
(504, 'Vitality Stadium', 'vitality-stadium', 'Bournemouth', 'England', 'Dean Court, Kings Park, Bournemouth BH7 7AF', 50.7352, -1.8384, 11364, 'Grass', '/images/venues/vitality-stadium.jpg', false),
-- Brentford
(10503, 'Gtech Community Stadium', 'gtech-community-stadium', 'London', 'England', '166 Lionel Rd N, Brentford TW8 9QT', 51.4907, -0.2888, 17250, 'Grass', '/images/venues/gtech-community-stadium.jpg', false),
-- Brighton
(508, 'American Express Stadium', 'amex-stadium', 'Brighton', 'England', 'Village Way, Brighton BN1 9BL', 50.8617, -0.0832, 31876, 'Grass', '/images/venues/amex-stadium.jpg', false),
-- Chelsea
(519, 'Stamford Bridge', 'stamford-bridge', 'London', 'England', 'Fulham Rd, London SW6 1HS', 51.4817, -0.1910, 40341, 'Grass', '/images/venues/stamford-bridge.jpg', false),
-- Crystal Palace
(525, 'Selhurst Park', 'selhurst-park', 'London', 'England', 'Whitehorse Ln, London SE25 6PU', 51.3983, -0.0855, 25486, 'Grass', '/images/venues/selhurst-park.jpg', false),
-- Everton
(8560, 'Everton Stadium', 'everton-stadium', 'Liverpool', 'England', 'Bramley-Moore Dock, Regent Road, Liverpool L3 0BZ', 53.4270, -2.9950, 52888, 'Grass', '/images/venues/everton-stadium.jpg', false),
-- Fulham
(536, 'Craven Cottage', 'craven-cottage', 'London', 'England', 'Stevenage Rd, London SW6 6HH', 51.4749, -0.2217, 25700, 'Grass', '/images/venues/craven-cottage.jpg', false),
-- Ipswich Town
(1073, 'Portman Road', 'portman-road', 'Ipswich', 'England', 'Portman Rd, Ipswich IP1 2DA', 52.0545, 1.1447, 30311, 'Grass', '/images/venues/portman-road.jpg', false),
-- Leicester City
(547, 'King Power Stadium', 'king-power-stadium', 'Leicester', 'England', 'Filbert Way, Leicester LE2 7FL', 52.6203, -1.1422, 32312, 'Grass', '/images/venues/king-power-stadium.jpg', false),
-- Liverpool
(550, 'Anfield', 'anfield', 'Liverpool', 'England', 'Anfield Rd, Liverpool L4 0TH', 53.4308, -2.9609, 61276, 'Grass', '/images/venues/anfield.jpg', false),
-- Manchester City
(555, 'Etihad Stadium', 'etihad-stadium', 'Manchester', 'England', 'Ashton New Rd, Manchester M11 3FF', 53.4831, -2.2004, 53400, 'Grass', '/images/venues/etihad-stadium.jpg', false),
-- Manchester United
(556, 'Old Trafford', 'old-trafford', 'Manchester', 'England', 'Sir Matt Busby Way, Stretford, Manchester M16 0RA', 53.4631, -2.2913, 74310, 'Grass', '/images/venues/old-trafford.jpg', false),
-- Newcastle United
(562, 'St James'' Park', 'st-james-park', 'Newcastle upon Tyne', 'England', 'St James'' Park, Barrack Rd, Newcastle upon Tyne NE1 4ST', 54.9756, -1.6217, 52305, 'Grass', '/images/venues/st-james-park.jpg', false),
-- Nottingham Forest
(566, 'City Ground', 'city-ground', 'Nottingham', 'England', 'Pavilion Rd, West Bridgford, Nottingham NG2 5FJ', 52.9400, -1.1328, 30445, 'Grass', '/images/venues/city-ground.jpg', false),
-- Southampton
(585, 'St Mary''s Stadium', 'st-marys-stadium', 'Southampton', 'England', 'Britannia Rd, Southampton SO14 5FP', 50.9058, -1.3910, 32384, 'Grass', '/images/venues/st-marys-stadium.jpg', false),
-- West Ham United
(10505, 'London Stadium', 'london-stadium', 'London', 'England', 'Queen Elizabeth Olympic Park, London E20 2ST', 51.5387, -0.0166, 62500, 'Grass', '/images/venues/london-stadium.jpg', false),
-- Wolverhampton Wanderers
(600, 'Molineux Stadium', 'molineux-stadium', 'Wolverhampton', 'England', 'Waterloo Rd, Wolverhampton WV1 4QR', 52.5906, -2.1306, 32050, 'Grass', '/images/venues/molineux-stadium.jpg', false);

-- ============================================================
-- TEAMS
-- ============================================================

INSERT INTO teams (external_id, name, short_name, slug, city, country, venue_id, is_primary) VALUES
(47, 'Tottenham Hotspur', 'Spurs', 'tottenham-hotspur', 'London', 'England', (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'), true),
(42, 'Arsenal', 'Arsenal', 'arsenal', 'London', 'England', (SELECT id FROM venues WHERE slug = 'emirates-stadium'), false),
(66, 'Aston Villa', 'Villa', 'aston-villa', 'Birmingham', 'England', (SELECT id FROM venues WHERE slug = 'villa-park'), false),
(35, 'AFC Bournemouth', 'Bournemouth', 'bournemouth', 'Bournemouth', 'England', (SELECT id FROM venues WHERE slug = 'vitality-stadium'), false),
(55, 'Brentford', 'Brentford', 'brentford', 'London', 'England', (SELECT id FROM venues WHERE slug = 'gtech-community-stadium'), false),
(51, 'Brighton & Hove Albion', 'Brighton', 'brighton', 'Brighton', 'England', (SELECT id FROM venues WHERE slug = 'amex-stadium'), false),
(49, 'Chelsea', 'Chelsea', 'chelsea', 'London', 'England', (SELECT id FROM venues WHERE slug = 'stamford-bridge'), false),
(52, 'Crystal Palace', 'Palace', 'crystal-palace', 'London', 'England', (SELECT id FROM venues WHERE slug = 'selhurst-park'), false),
(45, 'Everton', 'Everton', 'everton', 'Liverpool', 'England', (SELECT id FROM venues WHERE slug = 'everton-stadium'), false),
(36, 'Fulham', 'Fulham', 'fulham', 'London', 'England', (SELECT id FROM venues WHERE slug = 'craven-cottage'), false),
(57, 'Ipswich Town', 'Ipswich', 'ipswich-town', 'Ipswich', 'England', (SELECT id FROM venues WHERE slug = 'portman-road'), false),
(46, 'Leicester City', 'Leicester', 'leicester-city', 'Leicester', 'England', (SELECT id FROM venues WHERE slug = 'king-power-stadium'), false),
(40, 'Liverpool', 'Liverpool', 'liverpool', 'Liverpool', 'England', (SELECT id FROM venues WHERE slug = 'anfield'), false),
(50, 'Manchester City', 'Man City', 'manchester-city', 'Manchester', 'England', (SELECT id FROM venues WHERE slug = 'etihad-stadium'), false),
(33, 'Manchester United', 'Man Utd', 'manchester-united', 'Manchester', 'England', (SELECT id FROM venues WHERE slug = 'old-trafford'), false),
(34, 'Newcastle United', 'Newcastle', 'newcastle-united', 'Newcastle upon Tyne', 'England', (SELECT id FROM venues WHERE slug = 'st-james-park'), false),
(65, 'Nottingham Forest', 'Forest', 'nottingham-forest', 'Nottingham', 'England', (SELECT id FROM venues WHERE slug = 'city-ground'), false),
(41, 'Southampton', 'Southampton', 'southampton', 'Southampton', 'England', (SELECT id FROM venues WHERE slug = 'st-marys-stadium'), false),
(48, 'West Ham United', 'West Ham', 'west-ham-united', 'London', 'England', (SELECT id FROM venues WHERE slug = 'london-stadium'), false),
(39, 'Wolverhampton Wanderers', 'Wolves', 'wolverhampton-wanderers', 'Wolverhampton', 'England', (SELECT id FROM venues WHERE slug = 'molineux-stadium'), false);

-- Back-link venue team_id references
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'tottenham-hotspur') WHERE slug = 'tottenham-hotspur-stadium';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'arsenal') WHERE slug = 'emirates-stadium';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'aston-villa') WHERE slug = 'villa-park';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'bournemouth') WHERE slug = 'vitality-stadium';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'brentford') WHERE slug = 'gtech-community-stadium';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'brighton') WHERE slug = 'amex-stadium';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'chelsea') WHERE slug = 'stamford-bridge';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'crystal-palace') WHERE slug = 'selhurst-park';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'everton') WHERE slug = 'everton-stadium';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'fulham') WHERE slug = 'craven-cottage';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'ipswich-town') WHERE slug = 'portman-road';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'leicester-city') WHERE slug = 'king-power-stadium';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'liverpool') WHERE slug = 'anfield';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'manchester-city') WHERE slug = 'etihad-stadium';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'manchester-united') WHERE slug = 'old-trafford';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'newcastle-united') WHERE slug = 'st-james-park';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'nottingham-forest') WHERE slug = 'city-ground';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'southampton') WHERE slug = 'st-marys-stadium';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'west-ham-united') WHERE slug = 'london-stadium';
UPDATE venues SET team_id = (SELECT id FROM teams WHERE slug = 'wolverhampton-wanderers') WHERE slug = 'molineux-stadium';

-- ============================================================
-- SEASONS
-- ============================================================

INSERT INTO seasons (competition_id, name, year, is_current) VALUES
((SELECT id FROM competitions WHERE slug = 'premier-league'), '2024-25', 2024, true),
((SELECT id FROM competitions WHERE slug = 'fa-cup'), '2024-25', 2024, true),
((SELECT id FROM competitions WHERE slug = 'league-cup'), '2024-25', 2024, true),
((SELECT id FROM competitions WHERE slug = 'champions-league'), '2024-25', 2024, true);

-- ============================================================
-- VENUE TRANSPORT (Tottenham Hotspur Stadium)
-- ============================================================

INSERT INTO venue_transport (venue_id, transport_type, name, description, distance, walking_time, details, sort_order) VALUES
(
    (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'),
    'train',
    'White Hart Lane Station',
    'The closest station to the stadium, served by Greater Anglia services from Liverpool Street. On matchdays, expect significant crowding post-match. Consider walking to Northumberland Park for a less congested departure.',
    '0.3 miles',
    '5 minutes',
    '{"line": "Greater Anglia", "from": "Liverpool Street", "frequency": "Every 15 minutes", "matchday_service": "Enhanced service on matchdays"}'::jsonb,
    1
),
(
    (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'),
    'train',
    'Northumberland Park Station',
    'Served by Greater Anglia services. A slightly longer walk than White Hart Lane but often less crowded on matchdays. Follow the signposted walking route along the High Road.',
    '0.6 miles',
    '10 minutes',
    '{"line": "Greater Anglia", "from": "Liverpool Street", "frequency": "Every 15 minutes"}'::jsonb,
    2
),
(
    (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'),
    'tube',
    'Seven Sisters Station',
    'Victoria line station with a bus connection or walk to the stadium. The most popular Tube option. Bus routes 149, 259, and 279 run from here to the stadium. Walking takes around 20 minutes via the High Road.',
    '1.5 miles',
    '20 minutes',
    '{"line": "Victoria Line", "zone": 3, "bus_connections": ["149", "259", "279"]}'::jsonb,
    3
),
(
    (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'),
    'tube',
    'Tottenham Hale Station',
    'Victoria line and Greater Anglia interchange. Walk or catch a bus to the ground. Slightly less busy than Seven Sisters on matchdays.',
    '1.3 miles',
    '18 minutes',
    '{"line": "Victoria Line", "zone": 3, "also_serves": "Greater Anglia"}'::jsonb,
    4
),
(
    (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'),
    'bus',
    'Bus Routes',
    'Several bus routes serve the High Road near the stadium. The 149, 259, 279, and 349 all stop within walking distance.',
    'Varies',
    '2-5 minutes from stop',
    '{"routes": ["149", "259", "279", "349", "W3"], "nearest_stop": "Tottenham Hotspur Stadium"}'::jsonb,
    5
),
(
    (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'),
    'car',
    'Driving & Parking',
    'There is no official stadium parking for general admission on matchdays. A Controlled Parking Zone (CPZ) operates within a wide area around the stadium on matchdays. Blue Badge holders can pre-book accessible parking via the club.',
    'N/A',
    'N/A',
    '{"cpz": true, "cpz_hours": "Matchday enforcement", "recommendation": "Public transport strongly recommended", "accessible_parking": "Pre-book via the club"}'::jsonb,
    6
);

-- ============================================================
-- VENUE SECTIONS (Tottenham Hotspur Stadium)
-- ============================================================

INSERT INTO venue_sections (venue_id, section_type, name, description, entrance, notes) VALUES
(
    (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'),
    'home',
    'South Stand (Park Lane End)',
    'The famous single-tier stand holding 17,500 fans. The heart of the atmosphere and home to the most vocal supporters. General admission standing (safe standing with rail seats).',
    'Entrance via Park Lane',
    'This is the largest single-tier stand in the UK. Arriving early is recommended for the best positions.'
),
(
    (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'),
    'away',
    'North Stand (Paxton Road End)',
    'Away supporters are housed in the north-east corner of the stadium. Allocation is typically around 3,000 seats depending on competition.',
    'Dedicated away entrance on Paxton Road',
    'Away fans enter via a separate entrance. No re-entry once you leave the stadium.'
),
(
    (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'),
    'family',
    'Family Area',
    'Designated family-friendly sections located in the West Stand lower tier. Junior members and families are allocated seats in this area.',
    'West Stand entrances',
    'Family tickets available through the club. Under-18s must be accompanied by an adult.'
),
(
    (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'),
    'accessible',
    'Accessible Seating',
    'Wheelchair platforms and amenity seats available in all stands. Personal assistants seated alongside. Sensory room available for supporters with autism or sensory needs.',
    'All entrances have step-free access',
    'Pre-booking essential. Contact the Accessible Ticket Line. Audio descriptive commentary available.'
),
(
    (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'),
    'premium',
    'Premium & Hospitality',
    'H Club, The Lodge, Tunnel Club, and various hospitality lounges throughout the stadium offering premium matchday experiences.',
    'Dedicated premium entrances',
    'Hospitality packages include food, drink, and exclusive views. Tunnel Club offers a unique behind-the-scenes experience.'
);

-- ============================================================
-- BADGES
-- ============================================================

INSERT INTO badges (name, slug, description, icon, requirement_type, requirement_value, category, sort_order) VALUES
('First Match', 'first-match', 'Attended your first Spurs match. Welcome to the Lane!', 'trophy', 'matches_attended', 1, 'milestones', 1),
('First Away Day', 'first-away-day', 'Made the trip for your first away match. COYS on the road!', 'map-pin', 'away_matches', 1, 'milestones', 2),
('10 Matches', 'ten-matches', 'A regular at the Lane. 10 matches and counting!', 'star', 'matches_attended', 10, 'milestones', 3),
('50 Matches', 'fifty-matches', 'A true Lilywhite. 50 matches attended!', 'award', 'matches_attended', 50, 'milestones', 4),
('10 Grounds', 'ten-grounds', 'Visited 10 different football grounds. Proper away day supporter!', 'map', 'grounds_visited', 10, 'grounds', 5),
('25 Grounds', 'twenty-five-grounds', 'A quarter century of grounds. 25 stadiums visited!', 'globe', 'grounds_visited', 25, 'grounds', 6),
('European Away Day', 'european-away-day', 'Followed Spurs on a European away day. Continental Yid!', 'plane', 'european_aways', 1, 'special', 7),
('North London Derby', 'north-london-derby', 'Witnessed a North London Derby live. The biggest match of the season!', 'shield', 'nld_attended', 1, 'special', 8),
('London Derby', 'london-derby', 'Attended a London derby match against any London rival.', 'landmark', 'london_derby', 1, 'special', 9),
('Cup Final', 'cup-final', 'Been to a cup final at Wembley or beyond. What a day!', 'medal', 'cup_finals', 1, 'special', 10);

-- ============================================================
-- PLACES (pubs near Tottenham Hotspur Stadium)
-- ============================================================

INSERT INTO places (venue_id, name, slug, place_type, address, city, country, latitude, longitude, distance_from_venue, walking_time, description, rating, review_count, is_spurs_friendly, is_family_friendly, is_matchday_recommended, is_pre_match, is_post_match, is_verified, tags) VALUES
(
    (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'),
    'The Bricklayers Arms',
    'the-bricklayers-arms',
    'pub',
    '789 High Road, Tottenham, London N17 0BX',
    'London',
    'England',
    51.6035,
    -0.0680,
    '0.1 miles',
    '2 minutes',
    'A traditional pub right on the High Road, just steps from the stadium. Popular with home fans before and after matches. Serves a good selection of ales and standard pub grub. Gets very busy on matchdays so arrive early to grab a spot. Friendly atmosphere with plenty of pre-match banter.',
    4.2,
    48,
    true,
    false,
    true,
    true,
    true,
    true,
    ARRAY['real-ale', 'traditional', 'pre-match', 'close-to-stadium', 'pub-grub']
),
(
    (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'),
    'The Beehive',
    'the-beehive',
    'pub',
    'Stoneleigh Road, Tottenham, London N17 9BQ',
    'London',
    'England',
    51.5990,
    -0.0655,
    '0.5 miles',
    '8 minutes',
    'A spacious pub with a large beer garden, located a short walk from the stadium. Popular with families and groups before the match. Offers a range of beers on tap, food menu, and large screens showing build-up coverage. One of the more relaxed pre-match options in the area.',
    4.0,
    35,
    true,
    true,
    true,
    true,
    false,
    true,
    ARRAY['beer-garden', 'family-friendly', 'food', 'screens', 'spacious']
),
(
    (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'),
    'Bill Nicholson',
    'bill-nicholson',
    'pub',
    '74 Northumberland Park, Tottenham, London N17 0TX',
    'London',
    'England',
    51.6050,
    -0.0630,
    '0.2 miles',
    '3 minutes',
    'Named after the legendary Spurs manager, this pub is a must-visit for any Tottenham fan. Walls adorned with Spurs memorabilia and history. Great atmosphere on matchdays with fans gathering for pre-match build-up. Decent beer selection and hearty food. A Spurs institution near the ground.',
    4.5,
    62,
    true,
    false,
    true,
    true,
    true,
    true,
    ARRAY['spurs-themed', 'memorabilia', 'atmosphere', 'traditional', 'iconic', 'pre-match']
);

-- ============================================================
-- ARTICLES
-- ============================================================

INSERT INTO articles (title, slug, excerpt, content, category, tags, is_published, is_featured, published_at) VALUES
(
    'The Ultimate Matchday Guide to Tottenham Hotspur Stadium',
    'ultimate-matchday-guide-tottenham-hotspur-stadium',
    'Everything you need to know for your visit to the Tottenham Hotspur Stadium, from travel and arrival to food, drink, and atmosphere.',
    E'# The Ultimate Matchday Guide to Tottenham Hotspur Stadium\n\nWhether it''s your first visit or your five-hundredth, matchday at the Tottenham Hotspur Stadium is always special. This guide covers everything you need to know to make the most of your day.\n\n## Getting There\n\nThe stadium is located on the High Road in Tottenham, North London (N17 0BX). The best options for getting there:\n\n**By Train:** White Hart Lane station is the closest, just a 5-minute walk. Northumberland Park is slightly further but often less crowded after the match. Both are served by Greater Anglia from Liverpool Street.\n\n**By Tube:** Seven Sisters (Victoria line) is the nearest Underground station. From there, take the 149, 259, or 279 bus, or walk for about 20 minutes up the High Road.\n\n**By Car:** Strongly discouraged. A Controlled Parking Zone operates on matchdays within a wide radius. There is no general stadium parking.\n\n## Arrival & Entry\n\nGates typically open 2 hours before kickoff. The stadium uses mobile ticketing through the official Spurs app. Have your ticket ready on your phone before you reach the turnstiles.\n\n## Food & Drink\n\nThe stadium boasts some of the best food and drink options in English football:\n\n- **Beavertown Brewery Bar** on the South Stand concourse\n- **Goal Line Bar** with views of the pitch\n- Cheese toasties from **The Cheese Bar**\n- The famous **chicken balti pie**\n\n## The Atmosphere\n\nThe South Stand (Park Lane) is the heart of the atmosphere, holding 17,500 in the largest single-tier stand in the UK. If you want to be part of the noise, this is where to be.\n\n## After the Match\n\nThe area around the stadium has plenty of options. The Bricklayers Arms and Bill Nicholson pub are popular post-match spots. Seven Sisters Road also has a good selection of restaurants and bars.\n\nCOYS!',
    'matchday_guide',
    ARRAY['matchday', 'stadium-guide', 'tottenham-hotspur-stadium', 'getting-there', 'food-and-drink'],
    true,
    true,
    '2024-08-01 10:00:00+00'
),
(
    'Away Day Guide: What to Know Before Visiting Emirates Stadium',
    'away-day-guide-emirates-stadium',
    'Your complete guide to visiting the Emirates Stadium for the North London Derby. Travel, pubs, tips, and everything a Spurs fan needs to know.',
    E'# Away Day Guide: Emirates Stadium\n\nThe North London Derby. The biggest fixture in the calendar. Here''s everything you need to know for the trip across North London.\n\n## Getting There\n\n**By Tube:** Arsenal station (Piccadilly line) is right next to the ground -- the clue is in the name. Holloway Road (also Piccadilly) is also close but is often exit-only on matchdays. Finsbury Park (Piccadilly and Victoria lines, plus National Rail) is a 10-minute walk and often less congested.\n\n**By Bus:** Routes 4, 19, 29, 43, 153, 236, 253, and 271 all pass nearby.\n\n## Away Section\n\nSpurs fans are located in the upper tier of the Clock End (away section). Allocation is typically around 3,000 for league matches. Entry is via a dedicated away entrance on Drayton Park.\n\n## Before the Match\n\nThe area around the Emirates has limited pub options that welcome away fans. Many Spurs supporters meet at pubs near Finsbury Park station before walking to the ground. Avoid wearing colours in residential areas and follow steward directions.\n\n## Key Tips\n\n- **Arrive early** -- queues at the away entrance can be long\n- **Mobile tickets only** -- have your phone charged\n- **No re-entry** once you leave the ground\n- **Segregation is strict** -- stick to designated areas\n- Police presence is heavy around the ground\n\n## The Atmosphere\n\nNothing beats the noise from the away end at a North London Derby. Be loud, be proud, COYS!\n\n## After the Match\n\nStewards will hold away fans for 15-20 minutes after the final whistle. Follow police directions back to the station. Arsenal station and Finsbury Park will be the best options for departure.\n\nCome On You Spurs!',
    'away_guide',
    ARRAY['away-day', 'emirates-stadium', 'arsenal', 'north-london-derby', 'nld'],
    true,
    false,
    '2024-09-15 12:00:00+00'
);

-- ============================================================
-- APP SETTINGS
-- ============================================================

INSERT INTO app_settings (key, value, description) VALUES
('primary_team_slug', '"tottenham-hotspur"'::jsonb, 'The primary team this app is built around'),
('current_season', '"2024-25"'::jsonb, 'The current active season'),
('api_football_enabled', 'true'::jsonb, 'Whether the API-Football integration is active'),
('matchday_notification_hours_before', '24'::jsonb, 'Hours before kickoff to send matchday notification'),
('kickoff_notification_minutes_before', '60'::jsonb, 'Minutes before kickoff to send kickoff reminder'),
('review_auto_approve', 'false'::jsonb, 'Whether user reviews are auto-approved'),
('affiliate_tracking_enabled', 'true'::jsonb, 'Whether affiliate link tracking is enabled');

-- ============================================================
-- VENUE GUIDE (Tottenham Hotspur Stadium home matchday guide)
-- ============================================================

INSERT INTO venue_guides (venue_id, title, content, guide_type, is_published) VALUES
(
    (SELECT id FROM venues WHERE slug = 'tottenham-hotspur-stadium'),
    'Matchday at Tottenham Hotspur Stadium',
    'Your complete guide to matchday at the Tottenham Hotspur Stadium. Gates open 2 hours before kickoff. The stadium uses contactless mobile ticketing via the official Spurs app. Food highlights include the Cheese Bar toasties and the famous chicken balti pie. The Beavertown Brewery bar on the South Stand concourse is the go-to for craft beer. The South Stand (Park Lane) is the loudest section. Arrive early for the best atmosphere.',
    'home_matchday',
    true
);
