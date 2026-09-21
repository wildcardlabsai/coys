'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);

    try {
      // In production, use Supabase auth
      console.log('Signup attempt:', { name, email });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.href = '/';
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-navy rounded-2xl mb-4">
            <span className="text-white text-2xl font-bold font-heading">C</span>
          </div>
          <h1 className="text-2xl font-bold font-heading tracking-wide text-foreground">
            Join COYS
          </h1>
          <p className="text-sm text-muted mt-1">Create your matchday companion account</p>
        </div>

        {/* Signup Card */}
        <div className="card p-6">
          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-sm text-error">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                Display Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-foreground placeholder:text-muted-light"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-foreground placeholder:text-muted-light"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full px-3 py-2.5 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy text-foreground placeholder:text-muted-light"
                placeholder="At least 8 characters"
              />
              <p className="text-xs text-muted-light mt-1">Minimum 8 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full py-2.5"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <p className="text-xs text-muted text-center mt-4">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-sm text-muted mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-navy font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
