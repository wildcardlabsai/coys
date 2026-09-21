import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (!code) {
    // No code provided -- redirect to login with error
    const loginUrl = new URL('/login', origin);
    loginUrl.searchParams.set('error', 'missing_code');
    return NextResponse.redirect(loginUrl);
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Auth callback error:', error.message);
      const loginUrl = new URL('/login', origin);
      loginUrl.searchParams.set('error', 'auth_failed');
      return NextResponse.redirect(loginUrl);
    }

    // Successful authentication -- redirect to intended destination
    const redirectUrl = new URL(next, origin);
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Auth callback exception:', error);
    const loginUrl = new URL('/login', origin);
    loginUrl.searchParams.set('error', 'server_error');
    return NextResponse.redirect(loginUrl);
  }
}
