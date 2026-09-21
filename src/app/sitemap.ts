import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://coys.app';

const premierLeagueVenues = [
  'arsenal', 'aston-villa', 'bournemouth', 'brentford', 'brighton',
  'chelsea', 'crystal-palace', 'everton', 'fulham', 'ipswich-town',
  'leicester-city', 'liverpool', 'manchester-city', 'manchester-united',
  'newcastle-united', 'nottingham-forest', 'southampton', 'west-ham-united',
  'wolverhampton-wanderers',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/matchday`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/away-days`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/grounds`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/pubs`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/explore`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.6 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ];

  const groundPages: MetadataRoute.Sitemap = premierLeagueVenues.map((slug) => ({
    url: `${baseUrl}/grounds/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...groundPages];
}
