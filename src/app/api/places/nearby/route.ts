import { NextRequest, NextResponse } from 'next/server';

const SAMPLE_PLACES = [
  {
    id: 'pub-1',
    name: 'The Bricklayers Arms',
    type: 'pub',
    address: '32 High Road, London N17 9QR',
    latitude: 51.6035,
    longitude: -0.0685,
    rating: 4.3,
    ratingCount: 142,
    distance: 250,
    isSpursFriendly: true,
    showsFootball: true,
    priceLevel: 2,
    openNow: true,
  },
  {
    id: 'pub-2',
    name: 'The Corner Pin',
    type: 'pub',
    address: '45 Park Lane, London N17 0HG',
    latitude: 51.6048,
    longitude: -0.0710,
    rating: 4.1,
    ratingCount: 89,
    distance: 400,
    isSpursFriendly: true,
    showsFootball: true,
    priceLevel: 2,
    openNow: true,
  },
  {
    id: 'restaurant-1',
    name: 'Beavertown Tottenham',
    type: 'restaurant',
    address: '42 White Hart Lane, London N17 8DP',
    latitude: 51.6052,
    longitude: -0.0658,
    rating: 4.5,
    ratingCount: 215,
    distance: 150,
    isSpursFriendly: true,
    showsFootball: false,
    priceLevel: 3,
    openNow: true,
  },
  {
    id: 'pub-3',
    name: 'The Antwerp Arms',
    type: 'pub',
    address: '168-170 Church Road, London N17 8AS',
    latitude: 51.6025,
    longitude: -0.0620,
    rating: 4.4,
    ratingCount: 176,
    distance: 500,
    isSpursFriendly: true,
    showsFootball: true,
    priceLevel: 2,
    openNow: true,
  },
  {
    id: 'hotel-1',
    name: 'Premier Inn Tottenham Hale',
    type: 'hotel',
    address: 'Watermead Way, London N17 0UQ',
    latitude: 51.5935,
    longitude: -0.0605,
    rating: 3.9,
    ratingCount: 312,
    distance: 1200,
    isSpursFriendly: false,
    showsFootball: false,
    priceLevel: 2,
    openNow: true,
  },
  {
    id: 'restaurant-2',
    name: 'Goal Line Restaurant',
    type: 'restaurant',
    address: 'Tottenham Hotspur Stadium, London N17 0BX',
    latitude: 51.6042,
    longitude: -0.0662,
    rating: 4.2,
    ratingCount: 98,
    distance: 50,
    isSpursFriendly: true,
    showsFootball: false,
    priceLevel: 4,
    openNow: false,
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const type = searchParams.get('type');
    const radiusParam = searchParams.get('radius');

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

    const radius = radiusParam ? parseInt(radiusParam, 10) : 2000;
    if (isNaN(radius) || radius < 100 || radius > 50000) {
      return NextResponse.json(
        { data: null, error: 'radius must be between 100 and 50000 meters' },
        { status: 400 }
      );
    }

    const googleApiKey = process.env.GOOGLE_PLACES_API_KEY;

    if (googleApiKey) {
      const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
      url.searchParams.set('location', `${latitude},${longitude}`);
      url.searchParams.set('radius', String(radius));
      url.searchParams.set('key', googleApiKey);
      if (type) {
        url.searchParams.set('type', type);
      }

      const response = await fetch(url.toString());
      const data = await response.json();

      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        console.error('Google Places API error:', data.status, data.error_message);
        return NextResponse.json(
          { data: null, error: 'Places API returned an error' },
          { status: 502 }
        );
      }

      const places = (data.results ?? []).map((place: Record<string, unknown>) => ({
        id: place.place_id,
        name: place.name,
        type: type ?? 'unknown',
        address: place.vicinity,
        latitude: (place.geometry as Record<string, Record<string, number>>)?.location?.lat,
        longitude: (place.geometry as Record<string, Record<string, number>>)?.location?.lng,
        rating: place.rating ?? null,
        ratingCount: place.user_ratings_total ?? 0,
        priceLevel: place.price_level ?? null,
        openNow: (place.opening_hours as Record<string, boolean>)?.open_now ?? null,
      }));

      return NextResponse.json(
        { data: places, error: null },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
          },
        }
      );
    }

    // No API key -- return sample data filtered by type
    let places = SAMPLE_PLACES;
    if (type) {
      places = places.filter((p) => p.type === type);
    }
    places = places.filter((p) => p.distance <= radius);

    return NextResponse.json(
      { data: places, error: null },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    return NextResponse.json(
      { data: null, error: 'Failed to fetch nearby places' },
      { status: 500 }
    );
  }
}
