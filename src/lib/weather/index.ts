/**
 * OpenWeatherMap service with 1-hour in-memory caching.
 *
 * Server-side only — the API key stays on the server.
 * Returns null on failure instead of throwing.
 */

import { TTLCache } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WeatherCondition {
  id: number;
  main: string; // e.g. "Rain", "Clear", "Clouds"
  description: string; // e.g. "light rain"
  icon: string; // e.g. "10d"
}

export interface CurrentWeather {
  temperature: number; // Celsius
  feelsLike: number;
  humidity: number; // %
  windSpeed: number; // m/s
  windDirection: number; // degrees
  condition: WeatherCondition;
  visibility: number; // meters
  pressure: number; // hPa
  clouds: number; // %
  sunrise: string; // ISO
  sunset: string; // ISO
  updatedAt: string; // ISO
}

export interface HourlyForecast {
  dateTime: string; // ISO
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: WeatherCondition;
  precipitationProbability: number; // 0-100
  rain: number; // mm in last 3h
}

export interface DailyForecast {
  date: string; // ISO date
  temperatureMin: number;
  temperatureMax: number;
  humidity: number;
  windSpeed: number;
  condition: WeatherCondition;
  precipitationProbability: number;
  sunrise: string;
  sunset: string;
}

export interface MatchDayWeather {
  current: CurrentWeather | null;
  hourly: HourlyForecast[]; // next 24 hours
  matchTime: HourlyForecast | null; // forecast for kick-off time
  summary: string;
}

// ---------------------------------------------------------------------------
// Cache & helpers
// ---------------------------------------------------------------------------

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const weatherCache = new TTLCache<unknown>(CACHE_TTL_MS);

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const ONE_CALL_URL = "https://api.openweathermap.org/data/3.0/onecall";

function getApiKey(): string | null {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) {
    console.warn("[Weather] OPENWEATHER_API_KEY is not set");
    return null;
  }
  return key;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(
        `[Weather] HTTP ${response.status}: ${response.statusText}`
      );
      return null;
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("[Weather] Fetch failed:", error);
    return null;
  }
}

function toISOString(unixTimestamp: number): string {
  return new Date(unixTimestamp * 1000).toISOString();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapCondition(raw: any): WeatherCondition {
  return {
    id: raw.id,
    main: raw.main,
    description: raw.description,
    icon: raw.icon,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Get current weather for a location.
 */
export async function getCurrentWeather(
  lat: number,
  lon: number
): Promise<CurrentWeather | null> {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const cacheKey = `current:${lat.toFixed(2)}:${lon.toFixed(2)}`;
  const cached = weatherCache.get(cacheKey) as CurrentWeather | null;
  if (cached) return cached;

  const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await fetchJson<any>(url);
  if (!data) return null;

  const result: CurrentWeather = {
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    windDirection: data.wind.deg,
    condition: mapCondition(data.weather[0]),
    visibility: data.visibility,
    pressure: data.main.pressure,
    clouds: data.clouds.all,
    sunrise: toISOString(data.sys.sunrise),
    sunset: toISOString(data.sys.sunset),
    updatedAt: toISOString(data.dt),
  };

  weatherCache.set(cacheKey, result);
  return result;
}

/**
 * Get a 5-day/3-hour forecast for a location.
 */
export async function getForecast(
  lat: number,
  lon: number
): Promise<HourlyForecast[] | null> {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const cacheKey = `forecast:${lat.toFixed(2)}:${lon.toFixed(2)}`;
  const cached = weatherCache.get(cacheKey) as HourlyForecast[] | null;
  if (cached) return cached;

  const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await fetchJson<any>(url);
  if (!data?.list) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: HourlyForecast[] = data.list.map((item: any) => ({
    dateTime: toISOString(item.dt),
    temperature: Math.round(item.main.temp),
    feelsLike: Math.round(item.main.feels_like),
    humidity: item.main.humidity,
    windSpeed: item.wind.speed,
    condition: mapCondition(item.weather[0]),
    precipitationProbability: Math.round((item.pop ?? 0) * 100),
    rain: item.rain?.["3h"] ?? 0,
  }));

  weatherCache.set(cacheKey, result);
  return result;
}

/**
 * Get weather data relevant to a specific match.
 * Finds the forecast entry closest to the kick-off time.
 */
export async function getMatchDayWeather(
  lat: number,
  lon: number,
  kickoffTime: string | Date
): Promise<MatchDayWeather> {
  const [current, forecast] = await Promise.all([
    getCurrentWeather(lat, lon),
    getForecast(lat, lon),
  ]);

  const kickoff =
    typeof kickoffTime === "string"
      ? new Date(kickoffTime)
      : kickoffTime;
  const kickoffMs = kickoff.getTime();

  // Find forecast closest to kick-off
  let matchTime: HourlyForecast | null = null;
  if (forecast) {
    let minDiff = Infinity;
    for (const entry of forecast) {
      const diff = Math.abs(new Date(entry.dateTime).getTime() - kickoffMs);
      if (diff < minDiff) {
        minDiff = diff;
        matchTime = entry;
      }
    }
  }

  // Next 24 hours
  const now = Date.now();
  const next24h =
    forecast?.filter((f) => {
      const t = new Date(f.dateTime).getTime();
      return t >= now && t <= now + 24 * 60 * 60 * 1000;
    }) ?? [];

  // Build a human-readable summary
  const summary = buildWeatherSummary(matchTime, current);

  return { current, hourly: next24h, matchTime, summary };
}

function buildWeatherSummary(
  matchTime: HourlyForecast | null,
  current: CurrentWeather | null
): string {
  const source = matchTime ?? current;
  if (!source) return "Weather data unavailable";

  const temp =
    "temperature" in source ? source.temperature : 0;
  const condition =
    "condition" in source ? source.condition.description : "";
  const precip =
    matchTime?.precipitationProbability ?? 0;

  let summary = `${temp}°C, ${condition}`;
  if (precip > 30) {
    summary += ` (${precip}% chance of rain)`;
  }

  return summary;
}

/**
 * Get the OpenWeatherMap icon URL for a given icon code.
 */
export function getWeatherIconUrl(
  icon: string,
  size: "1x" | "2x" | "4x" = "2x"
): string {
  const sizeMap = { "1x": "", "2x": "@2x", "4x": "@4x" };
  return `https://openweathermap.org/img/wn/${icon}${sizeMap[size]}.png`;
}
