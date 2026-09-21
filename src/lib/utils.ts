import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  format,
  formatDistanceToNow,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  isToday,
  isTomorrow,
  isYesterday,
  parseISO,
} from "date-fns";

/**
 * Merge class names with Tailwind CSS class deduplication.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string or Date object into a readable date.
 * @example formatDate("2025-01-15") => "15 Jan 2025"
 */
export function formatDate(
  date: string | Date,
  pattern: string = "d MMM yyyy"
): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, pattern);
}

/**
 * Format a date/time into just the time portion.
 * @example formatTime("2025-01-15T15:00:00Z") => "15:00"
 */
export function formatTime(
  date: string | Date,
  pattern: string = "HH:mm"
): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, pattern);
}

/**
 * Format a match date with contextual labeling.
 * Returns "Today", "Tomorrow", "Yesterday", or the formatted date.
 */
export function formatMatchDate(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  if (isToday(d)) return "Today";
  if (isTomorrow(d)) return "Tomorrow";
  if (isYesterday(d)) return "Yesterday";
  return format(d, "EEE d MMM");
}

/**
 * Format a countdown to a future date.
 * @example formatCountdown(futureDate) => "2d 5h 30m"
 */
export function formatCountdown(target: string | Date): string {
  const d = typeof target === "string" ? parseISO(target) : target;
  const now = new Date();

  if (d <= now) return "Now";

  const days = differenceInDays(d, now);
  const hours = differenceInHours(d, now) % 24;
  const minutes = differenceInMinutes(d, now) % 60;

  if (days > 0) {
    return `${days}d ${hours}h`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  const seconds = differenceInSeconds(d, now) % 60;
  return `${minutes}m ${seconds}s`;
}

/**
 * Format a relative time string.
 * @example formatRelativeTime(pastDate) => "2 hours ago"
 */
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

/**
 * Format a distance in meters to a human-readable string.
 * @example formatDistance(1500) => "1.5 km"
 * @example formatDistance(800) => "800 m"
 */
export function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${Math.round(meters)} m`;
}

/**
 * Convert a string to a URL-friendly slug.
 * @example slugify("Tottenham Hotspur") => "tottenham-hotspur"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate a string to a maximum length, adding ellipsis if needed.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1).trimEnd() + "…";
}

/**
 * Convert match minute to display string.
 * @example formatMatchMinute(45, 2) => "45+2'"
 * @example formatMatchMinute(67) => "67'"
 */
export function formatMatchMinute(
  minute: number,
  extra?: number | null
): string {
  if (extra && extra > 0) {
    return `${minute}+${extra}'`;
  }
  return `${minute}'`;
}

/**
 * Simple in-memory cache with TTL support.
 */
export class TTLCache<T> {
  private cache = new Map<string, { value: T; expiresAt: number }>();

  constructor(private defaultTTLMs: number) {}

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    return entry.value;
  }

  set(key: string, value: T, ttlMs?: number): void {
    this.cache.set(key, {
      value,
      expiresAt: Date.now() + (ttlMs ?? this.defaultTTLMs),
    });
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  /** Remove all expired entries. */
  prune(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}
