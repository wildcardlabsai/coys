/**
 * Affiliate link tracking service.
 *
 * Manages affiliate URLs for pub/restaurant recommendations,
 * ticket links, and merchandise. Tracks clicks server-side
 * via Supabase (when available) and provides branded short links.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AffiliateCategory =
  | "pub"
  | "restaurant"
  | "tickets"
  | "merchandise"
  | "transport"
  | "accommodation";

export interface AffiliateLink {
  id: string;
  name: string;
  url: string;
  category: AffiliateCategory;
  partnerId: string | null;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
}

export interface AffiliateClickEvent {
  linkId: string;
  userId: string | null;
  fixtureId: number | null;
  referrer: string | null;
  timestamp: string;
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

interface AffiliateConfig {
  /** Base URL for affiliate redirect endpoint */
  redirectBaseUrl: string;
  /** UTM source tag */
  utmSource: string;
  /** UTM medium tag */
  utmMedium: string;
}

const config: AffiliateConfig = {
  redirectBaseUrl: process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/affiliate/redirect`
    : "/api/affiliate/redirect",
  utmSource: "coys-app",
  utmMedium: "matchday",
};

// ---------------------------------------------------------------------------
// Link building
// ---------------------------------------------------------------------------

/**
 * Build a tracked affiliate URL that goes through our redirect endpoint.
 *
 * The redirect endpoint logs the click, then forwards to the actual URL.
 */
export function buildAffiliateUrl(
  link: AffiliateLink,
  context?: {
    fixtureId?: number;
    userId?: string;
    campaign?: string;
  }
): string {
  const url = new URL(config.redirectBaseUrl, "https://placeholder.local");
  url.searchParams.set("id", link.id);
  if (context?.fixtureId) {
    url.searchParams.set("fixture", String(context.fixtureId));
  }
  if (context?.campaign) {
    url.searchParams.set("campaign", context.campaign);
  }

  // Return the path + query (works for both relative and absolute base URLs)
  return `${config.redirectBaseUrl}?${url.searchParams.toString()}`;
}

/**
 * Append UTM tracking parameters to any URL.
 */
export function appendUtmParams(
  targetUrl: string,
  campaign: string = "matchday"
): string {
  try {
    const url = new URL(targetUrl);
    url.searchParams.set("utm_source", config.utmSource);
    url.searchParams.set("utm_medium", config.utmMedium);
    url.searchParams.set("utm_campaign", campaign);
    return url.toString();
  } catch {
    // If the URL is invalid, return it unchanged
    return targetUrl;
  }
}

// ---------------------------------------------------------------------------
// Click tracking (server-side)
// ---------------------------------------------------------------------------

/**
 * Record an affiliate link click.
 *
 * This should be called from the server-side redirect API route.
 * It writes to Supabase if available; otherwise it logs to console.
 */
export async function trackClick(event: AffiliateClickEvent): Promise<void> {
  try {
    // Attempt to write to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseServiceKey) {
      const response = await fetch(`${supabaseUrl}/rest/v1/affiliate_clicks`, {
        method: "POST",
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          link_id: event.linkId,
          user_id: event.userId,
          fixture_id: event.fixtureId,
          referrer: event.referrer,
          clicked_at: event.timestamp,
        }),
      });

      if (!response.ok) {
        console.error(
          `[Affiliate] Failed to track click: ${response.status} ${response.statusText}`
        );
      }
    } else {
      // Fallback: log to console in development
      console.log("[Affiliate] Click tracked (no Supabase):", event);
    }
  } catch (error) {
    // Never let tracking errors affect the user experience
    console.error("[Affiliate] Error tracking click:", error);
  }
}

/**
 * Resolve an affiliate link ID to its target URL.
 *
 * Looks up the link in Supabase, or returns null if not found.
 */
export async function resolveAffiliateLink(
  linkId: string
): Promise<AffiliateLink | null> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      console.warn("[Affiliate] Supabase not configured, cannot resolve link");
      return null;
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/affiliate_links?id=eq.${encodeURIComponent(linkId)}&is_active=eq.true&select=*`,
      {
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
        },
      }
    );

    if (!response.ok) return null;

    const rows = await response.json();
    if (!rows || rows.length === 0) return null;

    const row = rows[0];
    return {
      id: row.id,
      name: row.name,
      url: row.url,
      category: row.category,
      partnerId: row.partner_id ?? null,
      description: row.description ?? null,
      imageUrl: row.image_url ?? null,
      isActive: row.is_active,
    };
  } catch (error) {
    console.error("[Affiliate] Error resolving link:", error);
    return null;
  }
}

/**
 * Get affiliate links for a specific category.
 */
export async function getAffiliateLinksByCategory(
  category: AffiliateCategory
): Promise<AffiliateLink[]> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) return [];

    const response = await fetch(
      `${supabaseUrl}/rest/v1/affiliate_links?category=eq.${category}&is_active=eq.true&select=*&order=name.asc`,
      {
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
        },
      }
    );

    if (!response.ok) return [];

    const rows = await response.json();
    return rows.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (row: any): AffiliateLink => ({
        id: row.id,
        name: row.name,
        url: row.url,
        category: row.category,
        partnerId: row.partner_id ?? null,
        description: row.description ?? null,
        imageUrl: row.image_url ?? null,
        isActive: row.is_active,
      })
    );
  } catch (error) {
    console.error("[Affiliate] Error fetching links:", error);
    return [];
  }
}
