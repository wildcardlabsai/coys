import { NextRequest, NextResponse } from 'next/server';

// Sample affiliate links for development
const SAMPLE_AFFILIATE_LINKS: Record<string, { url: string; partner: string }> = {
  'trainline-away': {
    url: 'https://www.thetrainline.com/?utm_source=coys&utm_medium=affiliate',
    partner: 'Trainline',
  },
  'booking-hotel': {
    url: 'https://www.booking.com/?aid=coys_affiliate',
    partner: 'Booking.com',
  },
  'stubhub-tickets': {
    url: 'https://www.stubhub.co.uk/?gcid=coys_affiliate',
    partner: 'StubHub',
  },
  'kitbag-merch': {
    url: 'https://www.kitbag.com/tottenham-hotspur/?ref=coys',
    partner: 'Kitbag',
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { linkId, page, fixtureId } = body;

    if (!linkId || typeof linkId !== 'string') {
      return NextResponse.json(
        { data: null, error: 'linkId is required' },
        { status: 400 }
      );
    }

    // Log the affiliate click (in production, store in database)
    const clickRecord = {
      linkId,
      page: page ?? 'unknown',
      fixtureId: fixtureId ?? null,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') ?? null,
      referer: request.headers.get('referer') ?? null,
    };

    console.log('Affiliate click recorded:', clickRecord);

    // Look up the redirect URL
    const affiliateLink = SAMPLE_AFFILIATE_LINKS[linkId];
    const redirectUrl = affiliateLink?.url ?? `https://coys.app/partner/${linkId}`;

    return NextResponse.json({
      data: {
        redirectUrl,
        partner: affiliateLink?.partner ?? 'Unknown',
        recorded: true,
      },
      error: null,
    });
  } catch (error) {
    console.error('Error recording affiliate click:', error);
    return NextResponse.json(
      { data: null, error: 'Failed to record click' },
      { status: 500 }
    );
  }
}
