import { createBrowserClient } from "@supabase/ssr";

/**
 * Create a Supabase client for use in browser / client components.
 *
 * This is safe to call repeatedly; @supabase/ssr deduplicates under the hood.
 * Cookie-based auth tokens are sent automatically via the browser.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
