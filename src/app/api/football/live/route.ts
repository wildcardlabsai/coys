import { NextResponse } from 'next/server';
import { getFootballProvider } from '@/lib/football';

export async function GET() {
  try {
    const provider = getFootballProvider();
    const liveFixtures = await provider.getLiveFixtures();

    return NextResponse.json(
      { data: liveFixtures ?? [], error: null },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=10',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching live fixtures:', error);
    return NextResponse.json(
      { data: null, error: 'Failed to fetch live fixtures' },
      { status: 500 }
    );
  }
}
