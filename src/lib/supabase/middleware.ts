import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refresh the Supabase auth session on every request and forward
 * the updated cookies to the browser.
 *
 * Call this from your root middleware.ts:
 *
 * ```ts
 * import { updateSession } from "@/lib/supabase/middleware";
 * export async function middleware(request: NextRequest) {
 *   return await updateSession(request);
 * }
 * ```
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          supabaseResponse = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            supabaseResponse.cookies.set(name, value, options);
          }
        },
      },
    }
  );

  // Refreshing the auth token is critical — do not remove this call.
  // Even if the user is not logged in, getUser() ensures the session
  // cookie stays fresh and is forwarded correctly.
  await supabase.auth.getUser();

  return supabaseResponse;
}
