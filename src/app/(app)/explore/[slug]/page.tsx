import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, Calendar, User, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const articlesData: Record<
  string,
  {
    title: string;
    category: string;
    date: string;
    author: string;
    readTime: string;
    content: string[];
    relatedSlugs: string[];
  }
> = {
  'complete-guide-tottenham-stadium': {
    title: 'The Complete Guide to Tottenham Hotspur Stadium',
    category: 'matchday_guide',
    date: '10 September 2024',
    author: 'COYS Editorial',
    readTime: '8 min read',
    content: [
      'Tottenham Hotspur Stadium is one of the most modern and impressive football grounds in the world. Opened in 2019, the 62,850-capacity stadium replaced the historic White Hart Lane and has quickly become one of the Premier League\'s most iconic venues.',
      'The stadium features the world\'s first dividing retractable football pitch, which slides beneath the south stand to reveal an artificial surface used for NFL games and other events. The ground also boasts the longest bar in Europe, a microbrewery, and a cheese room.',
      'Getting to the stadium is straightforward. The nearest stations are White Hart Lane (overground) and Tottenham Hale (Victoria line and overground). Both are within a 10-15 minute walk of the ground. On matchdays, additional services run from Liverpool Street.',
      'For first-time visitors, we recommend arriving at least 90 minutes before kick-off. This gives you time to soak in the atmosphere, grab a bite from one of the many food outlets inside the stadium, and find your seat. The stadium offers a cashless experience, so make sure you have a card or mobile payment ready.',
      'The South Stand is the home end and where the most vocal supporters sit. If you want to experience the full matchday atmosphere, this is where you want to be. The stand holds over 17,000 fans and creates an incredible wall of sound.',
      'Food options inside the stadium are excellent compared to most grounds. You will find everything from traditional pies and burgers to gourmet options from local restaurants. The Beavertown Brewery tap room on the south side is worth a visit for craft beer fans.',
    ],
    relatedSlugs: ['10-must-visit-spurs-pubs', 'stadium-tour-what-to-expect'],
  },
  '10-must-visit-spurs-pubs': {
    title: '10 Must-Visit Spurs Pubs',
    category: 'pub_guide',
    date: '5 September 2024',
    author: 'COYS Editorial',
    readTime: '6 min read',
    content: [
      'Finding the right pub on matchday can make or break your experience. Whether you are looking for a traditional boozer with Sky Sports on every screen or a gastropub with craft beers and gourmet food, the area around Tottenham Hotspur Stadium has something for everyone.',
      'The Bricklayers Arms on High Road is a Tottenham institution. This traditional pub has been serving Spurs fans for decades and is the go-to spot for pre-match pints. Arrive early on matchday as it fills up quickly.',
      'The Beehive on Tottenham Lane is another popular choice, known for its buzzing atmosphere and multiple screens showing live football. Their craft beer selection is impressive, and the pub grub hits the spot before a game.',
      'For something a bit different, try Number 8 on Tottenham High Road. This restaurant and bar offers a more upmarket experience with excellent food and cocktails, while still maintaining a football-friendly atmosphere.',
      'The Antelope is a hidden gem slightly further from the ground but well worth the walk. Known for its craft beer selection and knowledgeable staff, this is where the connoisseurs head for a pre-match drink.',
    ],
    relatedSlugs: ['complete-guide-tottenham-stadium', 'away-day-tips-first-time'],
  },
  'away-day-tips-first-time': {
    title: 'Away Day Tips: First Time Travelling',
    category: 'tips',
    date: '28 August 2024',
    author: 'COYS Editorial',
    readTime: '5 min read',
    content: [
      'Your first Spurs away day is an experience you will never forget. The camaraderie, the singing, the shared experience of supporting your team on hostile territory -- it is what being a football fan is all about.',
      'Planning is essential for a successful away day. Start by sorting your ticket through the official Tottenham Hotspur ticket exchange or through the club directly. Away tickets are allocated based on loyalty points, so make sure your membership is up to date.',
      'Travel is often the biggest consideration. For domestic away days, the supporters\' coach is the most popular option. It is affordable, sociable, and drops you right near the ground. Book through the official supporters\' trust for the best experience.',
      'When you arrive, find the away end and soak in the atmosphere. Spurs fans are known for their incredible away support, and the singing in a packed away end is one of football\'s great experiences.',
      'Check the local police guidelines for the away ground you are visiting. Some grounds have specific routes for away fans and designated pubs. Following these guidelines makes for a smoother and safer experience.',
    ],
    relatedSlugs: ['european-away-days-ultimate-list', '10-must-visit-spurs-pubs'],
  },
  'european-away-days-ultimate-list': {
    title: 'European Away Days: The Ultimate List',
    category: 'away_guide',
    date: '20 August 2024',
    author: 'COYS Editorial',
    readTime: '10 min read',
    content: [
      'European away days with Spurs are the pinnacle of the supporter experience. From the sun-soaked grounds of southern Europe to the atmospheric cauldrons of eastern Europe, following Tottenham in continental competition is an adventure like no other.',
      'The key to a great European away day is preparation. Flights, accommodation, and tickets should be sorted well in advance. Budget airlines often add extra services to popular routes on matchday, so set up alerts for the best deals.',
      'Some of the most memorable Spurs European away days include the trips to Amsterdam for the Ajax semi-final in 2019, the incredible night in Manchester City, and the atmospheric visits to Dortmund\'s Westfalenstadion.',
      'Always research the local area before you travel. Many European cities have excellent public transport that makes getting to the ground straightforward. Local fans are often happy to point you in the right direction and recommend good bars.',
      'Pack light but smart. A Spurs shirt, your passport, your ticket or digital wallet, and a portable charger are the essentials. Leave the heavy luggage at your hotel and travel to the ground with just what you need.',
    ],
    relatedSlugs: ['away-day-tips-first-time', 'complete-guide-tottenham-stadium'],
  },
  'stadium-tour-what-to-expect': {
    title: 'Spurs Stadium Tour: What to Expect',
    category: 'features',
    date: '15 August 2024',
    author: 'COYS Editorial',
    readTime: '4 min read',
    content: [
      'The Tottenham Hotspur Stadium tour is one of the best stadium tours in world football. Whether you are a lifelong Spurs fan or a curious visitor, the 90-minute guided experience takes you behind the scenes of this architectural marvel.',
      'The tour begins in the atrium, where your guide will give you an overview of the stadium\'s history and construction. You will then head through the players\' tunnel, walking the same path that the likes of Harry Kane and Son Heung-min take on matchday.',
      'One of the highlights is the visit to the home dressing room. You will see the individual player stations, the tactics boards, and the recovery facilities. The attention to detail in every aspect of the player experience is remarkable.',
      'The pitch-side experience is unforgettable. Standing on the edge of the playing surface and looking up at the towering South Stand gives you a real sense of the atmosphere that players experience on matchday.',
      'The tour concludes in the club shop, where you can pick up the latest merchandise. Tours run daily and can be booked through the official Tottenham Hotspur website. Prices start at 30 pounds for adults, with concessions available.',
    ],
    relatedSlugs: ['complete-guide-tottenham-stadium', '10-must-visit-spurs-pubs'],
  },
};

const allArticleMeta = [
  { slug: 'complete-guide-tottenham-stadium', title: 'The Complete Guide to Tottenham Hotspur Stadium', category: 'matchday_guide' },
  { slug: '10-must-visit-spurs-pubs', title: '10 Must-Visit Spurs Pubs', category: 'pub_guide' },
  { slug: 'away-day-tips-first-time', title: 'Away Day Tips: First Time Travelling', category: 'tips' },
  { slug: 'european-away-days-ultimate-list', title: 'European Away Days: The Ultimate List', category: 'away_guide' },
  { slug: 'stadium-tour-what-to-expect', title: 'Spurs Stadium Tour: What to Expect', category: 'features' },
];

const categoryLabels: Record<string, string> = {
  matchday_guide: 'Matchday Guide',
  pub_guide: 'Pub Guide',
  away_guide: 'Away Guide',
  tips: 'Tips',
  features: 'Features',
};

const categoryColors: Record<string, string> = {
  matchday_guide: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  pub_guide: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  away_guide: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  tips: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  features: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
};

function getDefaultArticle(slug: string) {
  return {
    title: slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    category: 'features',
    date: '1 September 2024',
    author: 'COYS Editorial',
    readTime: '5 min read',
    content: [
      'This article is being prepared and will be available soon. Check back for the full content.',
    ],
    relatedSlugs: ['complete-guide-tottenham-stadium', '10-must-visit-spurs-pubs'],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData[slug] || getDefaultArticle(slug);
  return {
    title: `${article.title} | Explore | COYS`,
    description: article.content[0],
    openGraph: {
      title: `${article.title} | COYS`,
      description: article.content[0],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articlesData[slug] || getDefaultArticle(slug);
  const related = article.relatedSlugs
    .map((s) => allArticleMeta.find((a) => a.slug === s))
    .filter(Boolean);

  return (
    <div className="mx-auto w-full max-w-lg">
      {/* Hero */}
      <div className="relative h-48 w-full bg-gradient-to-br from-[#132257] to-[#1a2d6d] dark:from-[#0B1428] dark:to-[#132257]">
        <div className="absolute left-4 top-4">
          <Link
            href="/explore"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="px-4 py-5">
        {/* Category + meta */}
        <div className="mb-3 flex items-center gap-2">
          <Badge
            className={cn(
              'text-[10px]',
              categoryColors[article.category] || categoryColors.features
            )}
          >
            {categoryLabels[article.category] || article.category}
          </Badge>
        </div>

        {/* Title */}
        <h1 className="mb-3 text-xl font-bold leading-tight text-gray-900 dark:text-gray-100">
          {article.title}
        </h1>

        {/* Author / date / read time */}
        <div className="mb-6 flex flex-wrap items-center gap-3 text-xs text-[#6B7280] dark:text-gray-400">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {article.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readTime}
          </span>
        </div>

        {/* Content */}
        <div className="mb-8 flex flex-col gap-4">
          {article.content.map((paragraph, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed text-gray-700 dark:text-gray-300"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              Related Articles
            </h2>
            <div className="flex flex-col gap-2">
              {related.map((r) =>
                r ? (
                  <Link key={r.slug} href={`/explore/${r.slug}`} className="block">
                    <Card className="transition-shadow hover:shadow-md">
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="min-w-0 flex-1">
                          <Badge
                            className={cn(
                              'mb-1.5 text-[9px] px-1.5',
                              categoryColors[r.category] || categoryColors.features
                            )}
                          >
                            {categoryLabels[r.category] || r.category}
                          </Badge>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                            {r.title}
                          </p>
                        </div>
                        <ChevronRight className="ml-2 h-4 w-4 shrink-0 text-[#6B7280] dark:text-gray-500" />
                      </CardContent>
                    </Card>
                  </Link>
                ) : null
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
