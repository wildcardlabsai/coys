import { NextRequest, NextResponse } from 'next/server';
import { getFootballProvider } from '@/lib/football';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fixtureId = parseInt(id, 10);

    if (isNaN(fixtureId)) {
      return NextResponse.json(
        { data: null, error: 'Invalid fixture ID' },
        { status: 400 }
      );
    }

    const provider = getFootballProvider();
    const fixture = await provider.getFixture(fixtureId);

    if (!fixture) {
      return NextResponse.json(
        { data: null, error: 'Fixture not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: fixture, error: null },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching fixture:', error);
    return NextResponse.json(
      { data: null, error: 'Failed to fetch fixture' },
      { status: 500 }
    );
  }
}
