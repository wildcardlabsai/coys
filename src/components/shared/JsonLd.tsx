type JsonLdProps = {
  data: Record<string, unknown>;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'COYS',
        description: 'The ultimate Tottenham Hotspur matchday companion.',
        applicationCategory: 'SportsApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'GBP',
        },
        author: {
          '@type': 'Organization',
          name: 'COYS App',
        },
      }}
    />
  );
}

export function SportsEventJsonLd({
  name,
  startDate,
  location,
  homeTeam,
  awayTeam,
}: {
  name: string;
  startDate: string;
  location: string;
  homeTeam: string;
  awayTeam: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'SportsEvent',
        name,
        startDate,
        location: {
          '@type': 'StadiumOrArena',
          name: location,
        },
        homeTeam: {
          '@type': 'SportsTeam',
          name: homeTeam,
        },
        awayTeam: {
          '@type': 'SportsTeam',
          name: awayTeam,
        },
      }}
    />
  );
}

export function LocalBusinessJsonLd({
  name,
  address,
  rating,
  reviewCount,
}: {
  name: string;
  address: string;
  rating?: number;
  reviewCount?: number;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BarOrPub',
        name,
        address,
        ...(rating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: rating,
            reviewCount: reviewCount || 0,
          },
        }),
      }}
    />
  );
}
