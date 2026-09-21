import { NextResponse } from 'next/server';
import { getFootballProvider } from '@/lib/football';

const SAMPLE_STANDINGS = [
  { position: 1, team: 'Arsenal', played: 6, won: 5, drawn: 1, lost: 0, gf: 14, ga: 4, gd: 10, points: 16, form: ['W', 'W', 'W', 'D', 'W'] },
  { position: 2, team: 'Manchester City', played: 6, won: 4, drawn: 2, lost: 0, gf: 12, ga: 5, gd: 7, points: 14, form: ['W', 'D', 'W', 'W', 'D'] },
  { position: 3, team: 'Liverpool', played: 6, won: 4, drawn: 1, lost: 1, gf: 11, ga: 5, gd: 6, points: 13, form: ['W', 'W', 'L', 'W', 'D'] },
  { position: 4, team: 'Tottenham Hotspur', played: 6, won: 4, drawn: 0, lost: 2, gf: 13, ga: 5, gd: 8, points: 12, form: ['W', 'W', 'W', 'L', 'W'] },
  { position: 5, team: 'Aston Villa', played: 6, won: 3, drawn: 2, lost: 1, gf: 10, ga: 6, gd: 4, points: 11, form: ['D', 'W', 'W', 'D', 'L'] },
  { position: 6, team: 'Newcastle United', played: 6, won: 3, drawn: 2, lost: 1, gf: 9, ga: 6, gd: 3, points: 11, form: ['W', 'D', 'W', 'L', 'D'] },
  { position: 7, team: 'Chelsea', played: 6, won: 3, drawn: 1, lost: 2, gf: 10, ga: 8, gd: 2, points: 10, form: ['L', 'W', 'W', 'D', 'W'] },
  { position: 8, team: 'Brighton', played: 6, won: 3, drawn: 1, lost: 2, gf: 9, ga: 7, gd: 2, points: 10, form: ['W', 'L', 'D', 'W', 'W'] },
  { position: 9, team: 'Manchester United', played: 6, won: 3, drawn: 0, lost: 3, gf: 7, ga: 8, gd: -1, points: 9, form: ['L', 'W', 'L', 'W', 'W'] },
  { position: 10, team: 'West Ham', played: 6, won: 2, drawn: 2, lost: 2, gf: 8, ga: 8, gd: 0, points: 8, form: ['D', 'L', 'W', 'D', 'W'] },
  { position: 11, team: 'Bournemouth', played: 6, won: 2, drawn: 2, lost: 2, gf: 7, ga: 7, gd: 0, points: 8, form: ['W', 'D', 'L', 'D', 'W'] },
  { position: 12, team: 'Fulham', played: 6, won: 2, drawn: 2, lost: 2, gf: 6, ga: 7, gd: -1, points: 8, form: ['D', 'W', 'D', 'L', 'L'] },
  { position: 13, team: 'Crystal Palace', played: 6, won: 2, drawn: 1, lost: 3, gf: 5, ga: 7, gd: -2, points: 7, form: ['L', 'W', 'L', 'W', 'D'] },
  { position: 14, team: 'Brentford', played: 6, won: 2, drawn: 1, lost: 3, gf: 7, ga: 9, gd: -2, points: 7, form: ['W', 'L', 'W', 'L', 'L'] },
  { position: 15, team: 'Wolves', played: 6, won: 2, drawn: 0, lost: 4, gf: 6, ga: 10, gd: -4, points: 6, form: ['L', 'L', 'W', 'L', 'W'] },
  { position: 16, team: 'Nottingham Forest', played: 6, won: 1, drawn: 2, lost: 3, gf: 4, ga: 7, gd: -3, points: 5, form: ['L', 'D', 'L', 'D', 'W'] },
  { position: 17, team: 'Everton', played: 6, won: 1, drawn: 2, lost: 3, gf: 5, ga: 9, gd: -4, points: 5, form: ['D', 'L', 'L', 'W', 'D'] },
  { position: 18, team: 'Leicester City', played: 6, won: 1, drawn: 1, lost: 4, gf: 5, ga: 11, gd: -6, points: 4, form: ['L', 'L', 'W', 'L', 'D'] },
  { position: 19, team: 'Ipswich Town', played: 6, won: 0, drawn: 3, lost: 3, gf: 3, ga: 9, gd: -6, points: 3, form: ['D', 'L', 'D', 'L', 'D'] },
  { position: 20, team: 'Southampton', played: 6, won: 0, drawn: 1, lost: 5, gf: 2, ga: 13, gd: -11, points: 1, form: ['L', 'L', 'L', 'D', 'L'] },
];

export async function GET() {
  try {
    const provider = getFootballProvider();
    const standings = await provider.getStandings();

    // If the provider returns data, use it; otherwise use sample data
    const data = standings ?? SAMPLE_STANDINGS;

    return NextResponse.json(
      { data, error: null },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching standings:', error);
    return NextResponse.json(
      { data: null, error: 'Failed to fetch standings' },
      { status: 500 }
    );
  }
}
