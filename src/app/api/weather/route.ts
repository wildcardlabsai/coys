import { NextRequest, NextResponse } from 'next/server';

const SAMPLE_WEATHER = {
  temperature: 14,
  feelsLike: 12,
  description: 'Partly cloudy',
  icon: 'partly-cloudy',
  windSpeed: 12,
  windDirection: 'SW',
  humidity: 72,
  rainProbability: 35,
  visibility: 10,
  pressure: 1015,
  uvIndex: 3,
  sunrise: '06:42',
  sunset: '18:15',
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    if (!lat || !lng) {
      return NextResponse.json(
        { data: null, error: 'lat and lng query parameters are required' },
        { status: 400 }
      );
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    if (isNaN(latitude) || isNaN(longitude)) {
      return NextResponse.json(
        { data: null, error: 'lat and lng must be valid numbers' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    if (apiKey) {
      const url = new URL('https://api.openweathermap.org/data/2.5/weather');
      url.searchParams.set('lat', String(latitude));
      url.searchParams.set('lon', String(longitude));
      url.searchParams.set('appid', apiKey);
      url.searchParams.set('units', 'metric');

      const response = await fetch(url.toString());
      if (!response.ok) {
        console.error('OpenWeatherMap API error:', response.status);
        return NextResponse.json(
          { data: null, error: 'Weather API returned an error' },
          { status: 502 }
        );
      }

      const raw = await response.json();

      const data = {
        temperature: Math.round(raw.main?.temp ?? 0),
        feelsLike: Math.round(raw.main?.feels_like ?? 0),
        description: raw.weather?.[0]?.description ?? 'Unknown',
        icon: raw.weather?.[0]?.icon ?? '',
        windSpeed: Math.round((raw.wind?.speed ?? 0) * 2.237), // m/s to mph
        windDirection: degreesToDirection(raw.wind?.deg ?? 0),
        humidity: raw.main?.humidity ?? 0,
        rainProbability: raw.clouds?.all ?? 0,
        visibility: Math.round((raw.visibility ?? 10000) / 1000),
        pressure: raw.main?.pressure ?? 0,
        uvIndex: 0,
        sunrise: formatUnixTime(raw.sys?.sunrise),
        sunset: formatUnixTime(raw.sys?.sunset),
      };

      return NextResponse.json(
        { data, error: null },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
          },
        }
      );
    }

    // No API key -- return sample data
    return NextResponse.json(
      { data: SAMPLE_WEATHER, error: null },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=1800',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching weather:', error);
    return NextResponse.json(
      { data: null, error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}

function degreesToDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

function formatUnixTime(unix: number | undefined): string {
  if (!unix) return '--:--';
  const date = new Date(unix * 1000);
  return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}
