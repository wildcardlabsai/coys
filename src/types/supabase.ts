// =============================================================================
// COYS - Supabase Database Type Definitions
// Generated schema types for Supabase client
// =============================================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          avatar_url: string | null;
          provider: 'email' | 'google' | 'apple' | 'twitter';
          provider_id: string | null;
          is_active: boolean;
          last_login_at: string | null;
          onboarding_completed: boolean;
          push_token: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          display_name?: string | null;
          avatar_url?: string | null;
          provider?: 'email' | 'google' | 'apple' | 'twitter';
          provider_id?: string | null;
          is_active?: boolean;
          last_login_at?: string | null;
          onboarding_completed?: boolean;
          push_token?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          provider?: 'email' | 'google' | 'apple' | 'twitter';
          provider_id?: string | null;
          is_active?: boolean;
          last_login_at?: string | null;
          onboarding_completed?: boolean;
          push_token?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'users_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          username: string;
          bio: string | null;
          favourite_player: string | null;
          first_match: string | null;
          season_ticket_holder: boolean;
          membership_type: 'none' | 'one_hotspur' | 'one_hotspur_plus' | 'season_ticket' | 'premium';
          home_location: string | null;
          notification_preferences: Json;
          privacy_settings: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          username: string;
          bio?: string | null;
          favourite_player?: string | null;
          first_match?: string | null;
          season_ticket_holder?: boolean;
          membership_type?: 'none' | 'one_hotspur' | 'one_hotspur_plus' | 'season_ticket' | 'premium';
          home_location?: string | null;
          notification_preferences?: Json;
          privacy_settings?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          username?: string;
          bio?: string | null;
          favourite_player?: string | null;
          first_match?: string | null;
          season_ticket_holder?: boolean;
          membership_type?: 'none' | 'one_hotspur' | 'one_hotspur_plus' | 'season_ticket' | 'premium';
          home_location?: string | null;
          notification_preferences?: Json;
          privacy_settings?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      teams: {
        Row: {
          id: string;
          external_id: number;
          name: string;
          short_name: string;
          code: string | null;
          logo_url: string | null;
          country: string;
          founded: number | null;
          venue_id: string | null;
          is_spurs: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          external_id: number;
          name: string;
          short_name: string;
          code?: string | null;
          logo_url?: string | null;
          country: string;
          founded?: number | null;
          venue_id?: string | null;
          is_spurs?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          external_id?: number;
          name?: string;
          short_name?: string;
          code?: string | null;
          logo_url?: string | null;
          country?: string;
          founded?: number | null;
          venue_id?: string | null;
          is_spurs?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'teams_venue_id_fkey';
            columns: ['venue_id'];
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          }
        ];
      };
      competitions: {
        Row: {
          id: string;
          external_id: number;
          name: string;
          short_name: string;
          code: string;
          type: 'league' | 'cup' | 'super_cup' | 'friendly';
          country: string | null;
          logo_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          external_id: number;
          name: string;
          short_name: string;
          code: string;
          type: 'league' | 'cup' | 'super_cup' | 'friendly';
          country?: string | null;
          logo_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          external_id?: number;
          name?: string;
          short_name?: string;
          code?: string;
          type?: 'league' | 'cup' | 'super_cup' | 'friendly';
          country?: string | null;
          logo_url?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      seasons: {
        Row: {
          id: string;
          competition_id: string;
          external_id: number;
          year: number;
          start_date: string;
          end_date: string;
          is_current: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          competition_id: string;
          external_id: number;
          year: number;
          start_date: string;
          end_date: string;
          is_current?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          competition_id?: string;
          external_id?: number;
          year?: number;
          start_date?: string;
          end_date?: string;
          is_current?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'seasons_competition_id_fkey';
            columns: ['competition_id'];
            referencedRelation: 'competitions';
            referencedColumns: ['id'];
          }
        ];
      };
      fixtures: {
        Row: {
          id: string;
          external_id: number;
          competition_id: string;
          season_id: string;
          matchday: number | null;
          round: string | null;
          home_team_id: string;
          away_team_id: string;
          venue_id: string | null;
          kickoff: string;
          status: 'scheduled' | 'timed' | 'in_play' | 'halftime' | 'extra_time' | 'penalties' | 'finished' | 'finished_aet' | 'finished_pen' | 'postponed' | 'cancelled' | 'suspended' | 'abandoned' | 'not_played' | 'walkover';
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
          last_synced_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          external_id: number;
          competition_id: string;
          season_id: string;
          matchday?: number | null;
          round?: string | null;
          home_team_id: string;
          away_team_id: string;
          venue_id?: string | null;
          kickoff: string;
          status?: 'scheduled' | 'timed' | 'in_play' | 'halftime' | 'extra_time' | 'penalties' | 'finished' | 'finished_aet' | 'finished_pen' | 'postponed' | 'cancelled' | 'suspended' | 'abandoned' | 'not_played' | 'walkover';
          home_score?: number | null;
          away_score?: number | null;
          home_score_ht?: number | null;
          away_score_ht?: number | null;
          home_score_et?: number | null;
          away_score_et?: number | null;
          home_score_pen?: number | null;
          away_score_pen?: number | null;
          attendance?: number | null;
          referee?: string | null;
          last_synced_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          external_id?: number;
          competition_id?: string;
          season_id?: string;
          matchday?: number | null;
          round?: string | null;
          home_team_id?: string;
          away_team_id?: string;
          venue_id?: string | null;
          kickoff?: string;
          status?: 'scheduled' | 'timed' | 'in_play' | 'halftime' | 'extra_time' | 'penalties' | 'finished' | 'finished_aet' | 'finished_pen' | 'postponed' | 'cancelled' | 'suspended' | 'abandoned' | 'not_played' | 'walkover';
          home_score?: number | null;
          away_score?: number | null;
          home_score_ht?: number | null;
          away_score_ht?: number | null;
          home_score_et?: number | null;
          away_score_et?: number | null;
          home_score_pen?: number | null;
          away_score_pen?: number | null;
          attendance?: number | null;
          referee?: string | null;
          last_synced_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fixtures_competition_id_fkey';
            columns: ['competition_id'];
            referencedRelation: 'competitions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fixtures_season_id_fkey';
            columns: ['season_id'];
            referencedRelation: 'seasons';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fixtures_home_team_id_fkey';
            columns: ['home_team_id'];
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fixtures_away_team_id_fkey';
            columns: ['away_team_id'];
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fixtures_venue_id_fkey';
            columns: ['venue_id'];
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          }
        ];
      };
      fixture_events: {
        Row: {
          id: string;
          fixture_id: string;
          team_id: string;
          player_name: string;
          assist_name: string | null;
          event_type: 'goal' | 'own_goal' | 'penalty_scored' | 'penalty_missed' | 'yellow_card' | 'second_yellow' | 'red_card' | 'substitution' | 'var_decision';
          minute: number;
          extra_minute: number | null;
          detail: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          fixture_id: string;
          team_id: string;
          player_name: string;
          assist_name?: string | null;
          event_type: 'goal' | 'own_goal' | 'penalty_scored' | 'penalty_missed' | 'yellow_card' | 'second_yellow' | 'red_card' | 'substitution' | 'var_decision';
          minute: number;
          extra_minute?: number | null;
          detail?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          fixture_id?: string;
          team_id?: string;
          player_name?: string;
          assist_name?: string | null;
          event_type?: 'goal' | 'own_goal' | 'penalty_scored' | 'penalty_missed' | 'yellow_card' | 'second_yellow' | 'red_card' | 'substitution' | 'var_decision';
          minute?: number;
          extra_minute?: number | null;
          detail?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fixture_events_fixture_id_fkey';
            columns: ['fixture_id'];
            referencedRelation: 'fixtures';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fixture_events_team_id_fkey';
            columns: ['team_id'];
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          }
        ];
      };
      fixture_statistics: {
        Row: {
          id: string;
          fixture_id: string;
          team_id: string;
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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          fixture_id: string;
          team_id: string;
          possession?: number | null;
          shots_total?: number | null;
          shots_on_target?: number | null;
          shots_off_target?: number | null;
          shots_blocked?: number | null;
          corners?: number | null;
          offsides?: number | null;
          fouls?: number | null;
          passes_total?: number | null;
          passes_accurate?: number | null;
          pass_accuracy?: number | null;
          tackles?: number | null;
          interceptions?: number | null;
          saves?: number | null;
          expected_goals?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          fixture_id?: string;
          team_id?: string;
          possession?: number | null;
          shots_total?: number | null;
          shots_on_target?: number | null;
          shots_off_target?: number | null;
          shots_blocked?: number | null;
          corners?: number | null;
          offsides?: number | null;
          fouls?: number | null;
          passes_total?: number | null;
          passes_accurate?: number | null;
          pass_accuracy?: number | null;
          tackles?: number | null;
          interceptions?: number | null;
          saves?: number | null;
          expected_goals?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fixture_statistics_fixture_id_fkey';
            columns: ['fixture_id'];
            referencedRelation: 'fixtures';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'fixture_statistics_team_id_fkey';
            columns: ['team_id'];
            referencedRelation: 'teams';
            referencedColumns: ['id'];
          }
        ];
      };
      venues: {
        Row: {
          id: string;
          external_id: number | null;
          name: string;
          city: string;
          country: string;
          address: string | null;
          capacity: number | null;
          surface: string | null;
          image_url: string | null;
          latitude: number | null;
          longitude: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          external_id?: number | null;
          name: string;
          city: string;
          country: string;
          address?: string | null;
          capacity?: number | null;
          surface?: string | null;
          image_url?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          external_id?: number | null;
          name?: string;
          city?: string;
          country?: string;
          address?: string | null;
          capacity?: number | null;
          surface?: string | null;
          image_url?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      venue_guides: {
        Row: {
          id: string;
          venue_id: string;
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
          last_verified_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          venue_id: string;
          away_end_info?: string | null;
          accessibility_info?: string | null;
          family_info?: string | null;
          bag_policy?: string | null;
          parking_info?: string | null;
          entry_info?: string | null;
          concourse_info?: string | null;
          atmosphere_rating?: number | null;
          view_rating?: number | null;
          facilities_rating?: number | null;
          overall_tips?: string | null;
          last_verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          venue_id?: string;
          away_end_info?: string | null;
          accessibility_info?: string | null;
          family_info?: string | null;
          bag_policy?: string | null;
          parking_info?: string | null;
          entry_info?: string | null;
          concourse_info?: string | null;
          atmosphere_rating?: number | null;
          view_rating?: number | null;
          facilities_rating?: number | null;
          overall_tips?: string | null;
          last_verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'venue_guides_venue_id_fkey';
            columns: ['venue_id'];
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          }
        ];
      };
      venue_transport: {
        Row: {
          id: string;
          venue_id: string;
          mode: 'train' | 'tube' | 'bus' | 'tram' | 'car' | 'walk' | 'coach' | 'ferry';
          name: string;
          description: string;
          distance_from_venue: string | null;
          walk_time_minutes: number | null;
          directions: string | null;
          tips: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          venue_id: string;
          mode: 'train' | 'tube' | 'bus' | 'tram' | 'car' | 'walk' | 'coach' | 'ferry';
          name: string;
          description: string;
          distance_from_venue?: string | null;
          walk_time_minutes?: number | null;
          directions?: string | null;
          tips?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          venue_id?: string;
          mode?: 'train' | 'tube' | 'bus' | 'tram' | 'car' | 'walk' | 'coach' | 'ferry';
          name?: string;
          description?: string;
          distance_from_venue?: string | null;
          walk_time_minutes?: number | null;
          directions?: string | null;
          tips?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'venue_transport_venue_id_fkey';
            columns: ['venue_id'];
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          }
        ];
      };
      venue_sections: {
        Row: {
          id: string;
          venue_id: string;
          name: string;
          description: string | null;
          is_away_section: boolean;
          image_url: string | null;
          view_quality: number | null;
          legroom_rating: number | null;
          tips: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          venue_id: string;
          name: string;
          description?: string | null;
          is_away_section?: boolean;
          image_url?: string | null;
          view_quality?: number | null;
          legroom_rating?: number | null;
          tips?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          venue_id?: string;
          name?: string;
          description?: string | null;
          is_away_section?: boolean;
          image_url?: string | null;
          view_quality?: number | null;
          legroom_rating?: number | null;
          tips?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'venue_sections_venue_id_fkey';
            columns: ['venue_id'];
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          }
        ];
      };
      venue_tips: {
        Row: {
          id: string;
          venue_id: string;
          user_id: string;
          category: 'general' | 'transport' | 'food_drink' | 'seating' | 'parking' | 'safety' | 'accessibility';
          content: string;
          upvotes: number;
          downvotes: number;
          is_verified: boolean;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          venue_id: string;
          user_id: string;
          category: 'general' | 'transport' | 'food_drink' | 'seating' | 'parking' | 'safety' | 'accessibility';
          content: string;
          upvotes?: number;
          downvotes?: number;
          is_verified?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          venue_id?: string;
          user_id?: string;
          category?: 'general' | 'transport' | 'food_drink' | 'seating' | 'parking' | 'safety' | 'accessibility';
          content?: string;
          upvotes?: number;
          downvotes?: number;
          is_verified?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'venue_tips_venue_id_fkey';
            columns: ['venue_id'];
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'venue_tips_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      places: {
        Row: {
          id: string;
          venue_id: string | null;
          type: 'pub' | 'restaurant' | 'hotel' | 'attraction' | 'parking' | 'shop';
          name: string;
          description: string | null;
          address: string;
          city: string;
          postcode: string | null;
          country: string;
          phone: string | null;
          website: string | null;
          email: string | null;
          latitude: number | null;
          longitude: number | null;
          image_url: string | null;
          is_spurs_friendly: boolean;
          accepts_away_fans: boolean;
          price_level: number | null;
          rating: number | null;
          rating_count: number;
          distance_from_venue_meters: number | null;
          walk_time_minutes: number | null;
          opening_hours: Json | null;
          is_active: boolean;
          is_verified: boolean;
          shows_football: boolean | null;
          has_beer_garden: boolean | null;
          serves_food: boolean | null;
          real_ale: boolean | null;
          matchday_busy_level: string | null;
          cuisine: string | null;
          booking_required: boolean | null;
          booking_url: string | null;
          dietary_options: string[] | null;
          star_rating: number | null;
          price_per_night_from: number | null;
          currency: string | null;
          has_parking: boolean | null;
          distance_to_station: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          venue_id?: string | null;
          type: 'pub' | 'restaurant' | 'hotel' | 'attraction' | 'parking' | 'shop';
          name: string;
          description?: string | null;
          address: string;
          city: string;
          postcode?: string | null;
          country: string;
          phone?: string | null;
          website?: string | null;
          email?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          image_url?: string | null;
          is_spurs_friendly?: boolean;
          accepts_away_fans?: boolean;
          price_level?: number | null;
          rating?: number | null;
          rating_count?: number;
          distance_from_venue_meters?: number | null;
          walk_time_minutes?: number | null;
          opening_hours?: Json | null;
          is_active?: boolean;
          is_verified?: boolean;
          shows_football?: boolean | null;
          has_beer_garden?: boolean | null;
          serves_food?: boolean | null;
          real_ale?: boolean | null;
          matchday_busy_level?: string | null;
          cuisine?: string | null;
          booking_required?: boolean | null;
          booking_url?: string | null;
          dietary_options?: string[] | null;
          star_rating?: number | null;
          price_per_night_from?: number | null;
          currency?: string | null;
          has_parking?: boolean | null;
          distance_to_station?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          venue_id?: string | null;
          type?: 'pub' | 'restaurant' | 'hotel' | 'attraction' | 'parking' | 'shop';
          name?: string;
          description?: string | null;
          address?: string;
          city?: string;
          postcode?: string | null;
          country?: string;
          phone?: string | null;
          website?: string | null;
          email?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          image_url?: string | null;
          is_spurs_friendly?: boolean;
          accepts_away_fans?: boolean;
          price_level?: number | null;
          rating?: number | null;
          rating_count?: number;
          distance_from_venue_meters?: number | null;
          walk_time_minutes?: number | null;
          opening_hours?: Json | null;
          is_active?: boolean;
          is_verified?: boolean;
          shows_football?: boolean | null;
          has_beer_garden?: boolean | null;
          serves_food?: boolean | null;
          real_ale?: boolean | null;
          matchday_busy_level?: string | null;
          cuisine?: string | null;
          booking_required?: boolean | null;
          booking_url?: string | null;
          dietary_options?: string[] | null;
          star_rating?: number | null;
          price_per_night_from?: number | null;
          currency?: string | null;
          has_parking?: boolean | null;
          distance_to_station?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'places_venue_id_fkey';
            columns: ['venue_id'];
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          }
        ];
      };
      transport_options: {
        Row: {
          id: string;
          venue_id: string;
          name: string;
          mode: 'train' | 'tube' | 'bus' | 'tram' | 'car' | 'walk' | 'coach' | 'ferry';
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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          venue_id: string;
          name: string;
          mode: 'train' | 'tube' | 'bus' | 'tram' | 'car' | 'walk' | 'coach' | 'ferry';
          from_location: string;
          to_location: string;
          operator?: string | null;
          typical_duration_minutes?: number | null;
          typical_cost?: string | null;
          booking_url?: string | null;
          frequency?: string | null;
          matchday_notes?: string | null;
          tips?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          venue_id?: string;
          name?: string;
          mode?: 'train' | 'tube' | 'bus' | 'tram' | 'car' | 'walk' | 'coach' | 'ferry';
          from_location?: string;
          to_location?: string;
          operator?: string | null;
          typical_duration_minutes?: number | null;
          typical_cost?: string | null;
          booking_url?: string | null;
          frequency?: string | null;
          matchday_notes?: string | null;
          tips?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'transport_options_venue_id_fkey';
            columns: ['venue_id'];
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          }
        ];
      };
      away_guides: {
        Row: {
          id: string;
          fixture_id: string | null;
          venue_id: string;
          competition_id: string | null;
          title: string;
          slug: string;
          summary: string | null;
          content: string;
          ticket_info: string | null;
          allocation_info: string | null;
          travel_summary: string | null;
          meeting_points: string | null;
          safety_info: string | null;
          published_at: string | null;
          is_published: boolean;
          author_id: string | null;
          featured_image_url: string | null;
          view_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          fixture_id?: string | null;
          venue_id: string;
          competition_id?: string | null;
          title: string;
          slug: string;
          summary?: string | null;
          content: string;
          ticket_info?: string | null;
          allocation_info?: string | null;
          travel_summary?: string | null;
          meeting_points?: string | null;
          safety_info?: string | null;
          published_at?: string | null;
          is_published?: boolean;
          author_id?: string | null;
          featured_image_url?: string | null;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          fixture_id?: string | null;
          venue_id?: string;
          competition_id?: string | null;
          title?: string;
          slug?: string;
          summary?: string | null;
          content?: string;
          ticket_info?: string | null;
          allocation_info?: string | null;
          travel_summary?: string | null;
          meeting_points?: string | null;
          safety_info?: string | null;
          published_at?: string | null;
          is_published?: boolean;
          author_id?: string | null;
          featured_image_url?: string | null;
          view_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'away_guides_fixture_id_fkey';
            columns: ['fixture_id'];
            referencedRelation: 'fixtures';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'away_guides_venue_id_fkey';
            columns: ['venue_id'];
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'away_guides_competition_id_fkey';
            columns: ['competition_id'];
            referencedRelation: 'competitions';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'away_guides_author_id_fkey';
            columns: ['author_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      matchday_guides: {
        Row: {
          id: string;
          fixture_id: string;
          title: string;
          slug: string;
          content: string;
          pre_match_info: string | null;
          in_match_info: string | null;
          post_match_info: string | null;
          weather_forecast: Json | null;
          published_at: string | null;
          is_published: boolean;
          author_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          fixture_id: string;
          title: string;
          slug: string;
          content: string;
          pre_match_info?: string | null;
          in_match_info?: string | null;
          post_match_info?: string | null;
          weather_forecast?: Json | null;
          published_at?: string | null;
          is_published?: boolean;
          author_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          fixture_id?: string;
          title?: string;
          slug?: string;
          content?: string;
          pre_match_info?: string | null;
          in_match_info?: string | null;
          post_match_info?: string | null;
          weather_forecast?: Json | null;
          published_at?: string | null;
          is_published?: boolean;
          author_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'matchday_guides_fixture_id_fkey';
            columns: ['fixture_id'];
            referencedRelation: 'fixtures';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'matchday_guides_author_id_fkey';
            columns: ['author_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          category: 'news' | 'match_preview' | 'match_report' | 'transfer' | 'opinion' | 'history' | 'away_day' | 'guide';
          author_id: string | null;
          author_name: string | null;
          featured_image_url: string | null;
          tags: string[];
          fixture_id: string | null;
          published_at: string | null;
          is_published: boolean;
          is_featured: boolean;
          view_count: number;
          read_time_minutes: number | null;
          deleted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          category: 'news' | 'match_preview' | 'match_report' | 'transfer' | 'opinion' | 'history' | 'away_day' | 'guide';
          author_id?: string | null;
          author_name?: string | null;
          featured_image_url?: string | null;
          tags?: string[];
          fixture_id?: string | null;
          published_at?: string | null;
          is_published?: boolean;
          is_featured?: boolean;
          view_count?: number;
          read_time_minutes?: number | null;
          deleted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          category?: 'news' | 'match_preview' | 'match_report' | 'transfer' | 'opinion' | 'history' | 'away_day' | 'guide';
          author_id?: string | null;
          author_name?: string | null;
          featured_image_url?: string | null;
          tags?: string[];
          fixture_id?: string | null;
          published_at?: string | null;
          is_published?: boolean;
          is_featured?: boolean;
          view_count?: number;
          read_time_minutes?: number | null;
          deleted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'articles_author_id_fkey';
            columns: ['author_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'articles_fixture_id_fkey';
            columns: ['fixture_id'];
            referencedRelation: 'fixtures';
            referencedColumns: ['id'];
          }
        ];
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          parent_id: string | null;
          sort_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'categories_parent_id_fkey';
            columns: ['parent_id'];
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          }
        ];
      };
      saved_places: {
        Row: {
          id: string;
          user_id: string;
          place_id: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          place_id: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          place_id?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'saved_places_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'saved_places_place_id_fkey';
            columns: ['place_id'];
            referencedRelation: 'places';
            referencedColumns: ['id'];
          }
        ];
      };
      saved_fixtures: {
        Row: {
          id: string;
          user_id: string;
          fixture_id: string;
          attending: boolean;
          ticket_status: 'none' | 'applied' | 'secured' | 'purchased';
          transport_mode: string | null;
          notes: string | null;
          reminder_set: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          fixture_id: string;
          attending?: boolean;
          ticket_status?: 'none' | 'applied' | 'secured' | 'purchased';
          transport_mode?: string | null;
          notes?: string | null;
          reminder_set?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          fixture_id?: string;
          attending?: boolean;
          ticket_status?: 'none' | 'applied' | 'secured' | 'purchased';
          transport_mode?: string | null;
          notes?: string | null;
          reminder_set?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'saved_fixtures_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'saved_fixtures_fixture_id_fkey';
            columns: ['fixture_id'];
            referencedRelation: 'fixtures';
            referencedColumns: ['id'];
          }
        ];
      };
      user_matches: {
        Row: {
          id: string;
          user_id: string;
          fixture_id: string;
          attended: boolean;
          rating: number | null;
          notes: string | null;
          photo_urls: string[];
          seat_info: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          fixture_id: string;
          attended?: boolean;
          rating?: number | null;
          notes?: string | null;
          photo_urls?: string[];
          seat_info?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          fixture_id?: string;
          attended?: boolean;
          rating?: number | null;
          notes?: string | null;
          photo_urls?: string[];
          seat_info?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_matches_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_matches_fixture_id_fkey';
            columns: ['fixture_id'];
            referencedRelation: 'fixtures';
            referencedColumns: ['id'];
          }
        ];
      };
      user_grounds: {
        Row: {
          id: string;
          user_id: string;
          venue_id: string;
          first_visit_date: string | null;
          visit_count: number;
          rating: number | null;
          notes: string | null;
          photo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          venue_id: string;
          first_visit_date?: string | null;
          visit_count?: number;
          rating?: number | null;
          notes?: string | null;
          photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          venue_id?: string;
          first_visit_date?: string | null;
          visit_count?: number;
          rating?: number | null;
          notes?: string | null;
          photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_grounds_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_grounds_venue_id_fkey';
            columns: ['venue_id'];
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          }
        ];
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          badge_id: string;
          badge_name: string;
          badge_description: string;
          badge_icon: string;
          badge_category: 'matches' | 'grounds' | 'away_days' | 'streaks' | 'special' | 'community';
          awarded_at: string;
          progress: number;
          target: number;
          is_complete: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          badge_id: string;
          badge_name: string;
          badge_description: string;
          badge_icon: string;
          badge_category: 'matches' | 'grounds' | 'away_days' | 'streaks' | 'special' | 'community';
          awarded_at: string;
          progress?: number;
          target: number;
          is_complete?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          badge_id?: string;
          badge_name?: string;
          badge_description?: string;
          badge_icon?: string;
          badge_category?: 'matches' | 'grounds' | 'away_days' | 'streaks' | 'special' | 'community';
          awarded_at?: string;
          progress?: number;
          target?: number;
          is_complete?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_badges_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      user_stats: {
        Row: {
          id: string;
          user_id: string;
          season_id: string | null;
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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          season_id?: string | null;
          matches_attended?: number;
          home_matches?: number;
          away_matches?: number;
          european_matches?: number;
          cup_matches?: number;
          grounds_visited?: number;
          total_miles_travelled?: number;
          wins_seen?: number;
          draws_seen?: number;
          losses_seen?: number;
          goals_seen?: number;
          clean_sheets_seen?: number;
          badges_earned?: number;
          current_streak?: number;
          longest_streak?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          season_id?: string | null;
          matches_attended?: number;
          home_matches?: number;
          away_matches?: number;
          european_matches?: number;
          cup_matches?: number;
          grounds_visited?: number;
          total_miles_travelled?: number;
          wins_seen?: number;
          draws_seen?: number;
          losses_seen?: number;
          goals_seen?: number;
          clean_sheets_seen?: number;
          badges_earned?: number;
          current_streak?: number;
          longest_streak?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_stats_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'user_stats_season_id_fkey';
            columns: ['season_id'];
            referencedRelation: 'seasons';
            referencedColumns: ['id'];
          }
        ];
      };
      reviews: {
        Row: {
          id: string;
          user_id: string;
          reviewable_type: 'place' | 'venue' | 'away_guide';
          reviewable_id: string;
          rating: number;
          title: string | null;
          content: string | null;
          visit_date: string | null;
          is_verified: boolean;
          upvote_count: number;
          downvote_count: number;
          is_flagged: boolean;
          moderation_status: 'pending' | 'approved' | 'rejected';
          deleted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          reviewable_type: 'place' | 'venue' | 'away_guide';
          reviewable_id: string;
          rating: number;
          title?: string | null;
          content?: string | null;
          visit_date?: string | null;
          is_verified?: boolean;
          upvote_count?: number;
          downvote_count?: number;
          is_flagged?: boolean;
          moderation_status?: 'pending' | 'approved' | 'rejected';
          deleted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          reviewable_type?: 'place' | 'venue' | 'away_guide';
          reviewable_id?: string;
          rating?: number;
          title?: string | null;
          content?: string | null;
          visit_date?: string | null;
          is_verified?: boolean;
          upvote_count?: number;
          downvote_count?: number;
          is_flagged?: boolean;
          moderation_status?: 'pending' | 'approved' | 'rejected';
          deleted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      review_votes: {
        Row: {
          id: string;
          review_id: string;
          user_id: string;
          vote: 'up' | 'down';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          review_id: string;
          user_id: string;
          vote: 'up' | 'down';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          review_id?: string;
          user_id?: string;
          vote?: 'up' | 'down';
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'review_votes_review_id_fkey';
            columns: ['review_id'];
            referencedRelation: 'reviews';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'review_votes_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      affiliate_partners: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          logo_url: string | null;
          website_url: string;
          partner_type: 'travel' | 'tickets' | 'merchandise' | 'food_drink' | 'accommodation' | 'transport' | 'other';
          commission_rate: number | null;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          logo_url?: string | null;
          website_url: string;
          partner_type: 'travel' | 'tickets' | 'merchandise' | 'food_drink' | 'accommodation' | 'transport' | 'other';
          commission_rate?: number | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          logo_url?: string | null;
          website_url?: string;
          partner_type?: 'travel' | 'tickets' | 'merchandise' | 'food_drink' | 'accommodation' | 'transport' | 'other';
          commission_rate?: number | null;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      affiliate_links: {
        Row: {
          id: string;
          partner_id: string;
          url: string;
          tracking_code: string;
          label: string;
          description: string | null;
          place_id: string | null;
          venue_id: string | null;
          fixture_id: string | null;
          is_active: boolean;
          click_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          partner_id: string;
          url: string;
          tracking_code: string;
          label: string;
          description?: string | null;
          place_id?: string | null;
          venue_id?: string | null;
          fixture_id?: string | null;
          is_active?: boolean;
          click_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          partner_id?: string;
          url?: string;
          tracking_code?: string;
          label?: string;
          description?: string | null;
          place_id?: string | null;
          venue_id?: string | null;
          fixture_id?: string | null;
          is_active?: boolean;
          click_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'affiliate_links_partner_id_fkey';
            columns: ['partner_id'];
            referencedRelation: 'affiliate_partners';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'affiliate_links_place_id_fkey';
            columns: ['place_id'];
            referencedRelation: 'places';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'affiliate_links_venue_id_fkey';
            columns: ['venue_id'];
            referencedRelation: 'venues';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'affiliate_links_fixture_id_fkey';
            columns: ['fixture_id'];
            referencedRelation: 'fixtures';
            referencedColumns: ['id'];
          }
        ];
      };
      affiliate_clicks: {
        Row: {
          id: string;
          link_id: string;
          user_id: string | null;
          ip_hash: string | null;
          user_agent: string | null;
          referrer: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          link_id: string;
          user_id?: string | null;
          ip_hash?: string | null;
          user_agent?: string | null;
          referrer?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          link_id?: string;
          user_id?: string | null;
          ip_hash?: string | null;
          user_agent?: string | null;
          referrer?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'affiliate_clicks_link_id_fkey';
            columns: ['link_id'];
            referencedRelation: 'affiliate_links';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'affiliate_clicks_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: 'match_reminder' | 'kickoff' | 'goal' | 'halftime' | 'fulltime' | 'lineup' | 'score_update' | 'away_guide_published' | 'badge_earned' | 'community' | 'system';
          title: string;
          body: string;
          data: Json | null;
          fixture_id: string | null;
          is_read: boolean;
          read_at: string | null;
          sent_at: string | null;
          delivery_status: 'pending' | 'sent' | 'delivered' | 'failed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: 'match_reminder' | 'kickoff' | 'goal' | 'halftime' | 'fulltime' | 'lineup' | 'score_update' | 'away_guide_published' | 'badge_earned' | 'community' | 'system';
          title: string;
          body: string;
          data?: Json | null;
          fixture_id?: string | null;
          is_read?: boolean;
          read_at?: string | null;
          sent_at?: string | null;
          delivery_status?: 'pending' | 'sent' | 'delivered' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?: 'match_reminder' | 'kickoff' | 'goal' | 'halftime' | 'fulltime' | 'lineup' | 'score_update' | 'away_guide_published' | 'badge_earned' | 'community' | 'system';
          title?: string;
          body?: string;
          data?: Json | null;
          fixture_id?: string | null;
          is_read?: boolean;
          read_at?: string | null;
          sent_at?: string | null;
          delivery_status?: 'pending' | 'sent' | 'delivered' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'notifications_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notifications_fixture_id_fkey';
            columns: ['fixture_id'];
            referencedRelation: 'fixtures';
            referencedColumns: ['id'];
          }
        ];
      };
      app_settings: {
        Row: {
          id: string;
          key: string;
          value: string;
          value_type: 'string' | 'number' | 'boolean' | 'json';
          description: string | null;
          is_public: boolean;
          group: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          key: string;
          value: string;
          value_type?: 'string' | 'number' | 'boolean' | 'json';
          description?: string | null;
          is_public?: boolean;
          group?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          key?: string;
          value?: string;
          value_type?: 'string' | 'number' | 'boolean' | 'json';
          description?: string | null;
          is_public?: boolean;
          group?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      fixture_status: 'scheduled' | 'timed' | 'in_play' | 'halftime' | 'extra_time' | 'penalties' | 'finished' | 'finished_aet' | 'finished_pen' | 'postponed' | 'cancelled' | 'suspended' | 'abandoned' | 'not_played' | 'walkover';
      fixture_event_type: 'goal' | 'own_goal' | 'penalty_scored' | 'penalty_missed' | 'yellow_card' | 'second_yellow' | 'red_card' | 'substitution' | 'var_decision';
      transport_mode: 'train' | 'tube' | 'bus' | 'tram' | 'car' | 'walk' | 'coach' | 'ferry';
      place_type: 'pub' | 'restaurant' | 'hotel' | 'attraction' | 'parking' | 'shop';
      article_category: 'news' | 'match_preview' | 'match_report' | 'transfer' | 'opinion' | 'history' | 'away_day' | 'guide';
      membership_type: 'none' | 'one_hotspur' | 'one_hotspur_plus' | 'season_ticket' | 'premium';
      auth_provider: 'email' | 'google' | 'apple' | 'twitter';
      ticket_status: 'none' | 'applied' | 'secured' | 'purchased';
      badge_category: 'matches' | 'grounds' | 'away_days' | 'streaks' | 'special' | 'community';
      notification_type: 'match_reminder' | 'kickoff' | 'goal' | 'halftime' | 'fulltime' | 'lineup' | 'score_update' | 'away_guide_published' | 'badge_earned' | 'community' | 'system';
      delivery_status: 'pending' | 'sent' | 'delivered' | 'failed';
      moderation_status: 'pending' | 'approved' | 'rejected';
      vote_type: 'up' | 'down';
      partner_type: 'travel' | 'tickets' | 'merchandise' | 'food_drink' | 'accommodation' | 'transport' | 'other';
      venue_tip_category: 'general' | 'transport' | 'food_drink' | 'seating' | 'parking' | 'safety' | 'accessibility';
      competition_type: 'league' | 'cup' | 'super_cup' | 'friendly';
      setting_value_type: 'string' | 'number' | 'boolean' | 'json';
      reviewable_type: 'place' | 'venue' | 'away_guide';
    };
    CompositeTypes: {};
  };
}

// Convenience type helpers for Supabase client usage
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type InsertDto<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type UpdateDto<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];
