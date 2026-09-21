/**
 * Google Places API service with 24-hour in-memory caching.
 *
 * All API calls are server-side only — the API key is never exposed to clients.
 * Returns null on failure instead of throwing.
 */

import { TTLCache } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PlaceResult {
  placeId: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number | null;
  userRatingsTotal: number | null;
  priceLevel: number | null;
  types: string[];
  openNow: boolean | null;
  photoReference: string | null;
  website: string | null;
  phoneNumber: string | null;
}

export interface PlaceSearchParams {
  query?: string;
  location: { lat: number; lng: number };
  radius: number; // meters
  type?: string; // e.g. "restaurant", "bar", "pub"
  keyword?: string;
  minRating?: number;
}

export interface PlaceDetails {
  placeId: string;
  name: string;
  address: string;
  location: { lat: number; lng: number };
  rating: number | null;
  userRatingsTotal: number | null;
  priceLevel: number | null;
  types: string[];
  openingHours: string[] | null;
  website: string | null;
  phoneNumber: string | null;
  reviews: PlaceReview[] | null;
  photos: string[];
}

export interface PlaceReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
}

// ---------------------------------------------------------------------------
// Cache
// ---------------------------------------------------------------------------

const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const searchCache = new TTLCache<PlaceResult[]>(CACHE_TTL_MS);
const detailsCache = new TTLCache<PlaceDetails>(CACHE_TTL_MS);

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const BASE_URL = "https://maps.googleapis.com/maps/api/place";

function getApiKey(): string | null {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    console.warn("[Places] GOOGLE_PLACES_API_KEY is not set");
    return null;
  }
  return key;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`[Places] HTTP ${response.status}: ${response.statusText}`);
      return null;
    }
    const data = await response.json();
    if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
      console.error(`[Places] API status: ${data.status} — ${data.error_message ?? ""}`);
      return null;
    }
    return data;
  } catch (error) {
    console.error("[Places] Fetch failed:", error);
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPlaceResult(raw: any): PlaceResult {
  return {
    placeId: raw.place_id,
    name: raw.name,
    address: raw.formatted_address ?? raw.vicinity ?? "",
    location: {
      lat: raw.geometry?.location?.lat ?? 0,
      lng: raw.geometry?.location?.lng ?? 0,
    },
    rating: raw.rating ?? null,
    userRatingsTotal: raw.user_ratings_total ?? null,
    priceLevel: raw.price_level ?? null,
    types: raw.types ?? [],
    openNow: raw.opening_hours?.open_now ?? null,
    photoReference: raw.photos?.[0]?.photo_reference ?? null,
    website: null,
    phoneNumber: null,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Search for nearby places using Google Places Nearby Search.
 */
export async function searchNearbyPlaces(
  params: PlaceSearchParams
): Promise<PlaceResult[]> {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  const cacheKey = `search:${JSON.stringify(params)}`;
  const cached = searchCache.get(cacheKey);
  if (cached) return cached;

  const url = new URL(`${BASE_URL}/nearbysearch/json`);
  url.searchParams.set("key", apiKey);
  url.searchParams.set(
    "location",
    `${params.location.lat},${params.location.lng}`
  );
  url.searchParams.set("radius", String(params.radius));
  if (params.type) url.searchParams.set("type", params.type);
  if (params.keyword) url.searchParams.set("keyword", params.keyword);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await fetchJson<any>(url.toString());
  if (!data?.results) return [];

  let results: PlaceResult[] = data.results.map(mapPlaceResult);

  if (params.minRating) {
    results = results.filter(
      (r) => r.rating !== null && r.rating >= params.minRating!
    );
  }

  searchCache.set(cacheKey, results);
  return results;
}

/**
 * Search for places using a text query.
 */
export async function searchPlacesByText(
  query: string,
  location?: { lat: number; lng: number },
  radius?: number
): Promise<PlaceResult[]> {
  const apiKey = getApiKey();
  if (!apiKey) return [];

  const cacheKey = `text:${query}:${location?.lat}:${location?.lng}:${radius}`;
  const cached = searchCache.get(cacheKey);
  if (cached) return cached;

  const url = new URL(`${BASE_URL}/textsearch/json`);
  url.searchParams.set("key", apiKey);
  url.searchParams.set("query", query);
  if (location) {
    url.searchParams.set(
      "location",
      `${location.lat},${location.lng}`
    );
  }
  if (radius) url.searchParams.set("radius", String(radius));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await fetchJson<any>(url.toString());
  if (!data?.results) return [];

  const results = data.results.map(mapPlaceResult);
  searchCache.set(cacheKey, results);
  return results;
}

/**
 * Get detailed information about a specific place.
 */
export async function getPlaceDetails(
  placeId: string
): Promise<PlaceDetails | null> {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const cached = detailsCache.get(placeId);
  if (cached) return cached;

  const fields = [
    "place_id",
    "name",
    "formatted_address",
    "geometry",
    "rating",
    "user_ratings_total",
    "price_level",
    "types",
    "opening_hours",
    "website",
    "formatted_phone_number",
    "reviews",
    "photos",
  ].join(",");

  const url = new URL(`${BASE_URL}/details/json`);
  url.searchParams.set("key", apiKey);
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", fields);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await fetchJson<any>(url.toString());
  if (!data?.result) return null;

  const raw = data.result;
  const details: PlaceDetails = {
    placeId: raw.place_id,
    name: raw.name,
    address: raw.formatted_address ?? "",
    location: {
      lat: raw.geometry?.location?.lat ?? 0,
      lng: raw.geometry?.location?.lng ?? 0,
    },
    rating: raw.rating ?? null,
    userRatingsTotal: raw.user_ratings_total ?? null,
    priceLevel: raw.price_level ?? null,
    types: raw.types ?? [],
    openingHours: raw.opening_hours?.weekday_text ?? null,
    website: raw.website ?? null,
    phoneNumber: raw.formatted_phone_number ?? null,
    reviews:
      raw.reviews?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (r: any) => ({
          authorName: r.author_name,
          rating: r.rating,
          text: r.text,
          relativeTimeDescription: r.relative_time_description,
        })
      ) ?? null,
    photos:
      raw.photos?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (p: any) => p.photo_reference as string
      ) ?? [],
  };

  detailsCache.set(placeId, details);
  return details;
}

/**
 * Build a Google Places photo URL for use in <img> tags.
 * Must be proxied through a server route to avoid exposing the API key.
 */
export function getPhotoUrl(
  photoReference: string,
  maxWidth: number = 400
): string {
  const apiKey = getApiKey();
  if (!apiKey) return "";
  return `${BASE_URL}/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${apiKey}`;
}
