import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Create a Supabase client for use in Server Components, Route Handlers,
 * and Server Actions inside the Next.js App Router.
 *
 * Must be called inside a request context (where `cookies()` is available).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // setAll can throw in Server Components when called during render.
            // This is expected — the cookies will be set by the middleware instead.
          }
        },
      },
    }
  );
}
