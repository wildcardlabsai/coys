import { NextRequest, NextResponse } from 'next/server';
import { getFootballProvider } from '@/lib/football';
import type { FixtureStatus } from '@/lib/football/provider';

const VALID_STATUSES: FixtureStatus[] = [
  'scheduled',
  'live',
  'halftime',
  'finished',
  'postponed',
  'cancelled',
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get('status') as FixtureStatus | null;
    const limitParam = searchParams.get('limit');
    const season = searchParams.get('season');

    if (status && !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { data: null, error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    const limit = limitParam ? parseInt(limitParam, 10) : undefined;
    if (limitParam && (isNaN(limit!) || limit! < 1 || limit! > 100)) {
      return NextResponse.json(
        { data: null, error: 'Limit must be a number between 1 and 100' },
        { status: 400 }
      );
    }

    const provider = getFootballProvider();
    const fixtures = await provider.getFixtures({
      status: status ?? undefined,
      limit: limit ?? undefined,
    });

    // Filter by season if provided
    let filtered = fixtures ?? [];
    if (season) {
      const seasonNum = parseInt(season, 10);
      if (!isNaN(seasonNum)) {
        filtered = filtered.filter((f) => f.seasonId === seasonNum);
      }
    }

    return NextResponse.json(
      { data: filtered, error: null },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching fixtures:', error);
    return NextResponse.json(
      { data: null, error: 'Failed to fetch fixtures' },
      { status: 500 }
    );
  }
}
