import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { createServerClient } from '@supabase/ssr';

// Routes that require authentication
const PROTECTED_ROUTES = ['/profile', '/admin'];

// Routes that require admin role
const ADMIN_ROUTES = ['/admin'];

// Routes that should redirect authenticated users (e.g. login page)
const AUTH_ROUTES = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static assets and API routes (except auth callback)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next();
  }

  // Refresh Supabase session
  const response = await updateSession(request);

  // Check authentication for protected routes
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtectedRoute || isAuthRoute) {
    // Create a Supabase client to check the session
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll() {
            // We don't need to set cookies here; updateSession handles that
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    // If accessing protected route without auth, redirect to login
    if (isProtectedRoute && !user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If accessing admin route, check admin status
    if (isAdminRoute && user) {
      // Check user metadata for admin role
      // In production, check a role in the database or user metadata
      const isAdmin = user.user_metadata?.role === 'admin' ||
                      user.email?.endsWith('@coys.app') ||
                      process.env.NODE_ENV === 'development'; // Allow all in dev

      if (!isAdmin && process.env.NODE_ENV !== 'development') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    // If accessing auth routes while logged in, redirect to home
    if (isAuthRoute && user) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
