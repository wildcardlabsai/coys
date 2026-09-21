'use client';

import * as React from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const sampleArticles = [
  {
    id: 1,
    title: 'The Complete Guide to Tottenham Hotspur Stadium',
    slug: 'complete-guide-tottenham-stadium',
    category: 'matchday_guide',
    excerpt:
      'Everything you need to know about visiting the Tottenham Hotspur Stadium on matchday.',
    image: null,
    date: '2024-09-10',
    featured: true,
  },
  {
    id: 2,
    title: '10 Must-Visit Spurs Pubs',
    slug: '10-must-visit-spurs-pubs',
    category: 'pub_guide',
    excerpt:
      'The best pubs near Tottenham Hotspur Stadium for a pre-match drink.',
    image: null,
    date: '2024-09-05',
  },
  {
    id: 3,
    title: 'Away Day Tips: First Time Travelling',
    slug: 'away-day-tips-first-time',
    category: 'tips',
    excerpt:
      'Everything you need to know for your first Spurs away day.',
    image: null,
    date: '2024-08-28',
  },
  {
    id: 4,
    title: 'European Away Days: The Ultimate List',
    slug: 'european-away-days-ultimate-list',
    category: 'away_guide',
    excerpt:
      'Our comprehensive guide to European away days with Spurs.',
    image: null,
    date: '2024-08-20',
  },
  {
    id: 5,
    title: 'Spurs Stadium Tour: What to Expect',
    slug: 'stadium-tour-what-to-expect',
    category: 'features',
    excerpt:
      'A complete guide to the Tottenham Hotspur Stadium tour experience.',
    image: null,
    date: '2024-08-15',
  },
];

const categoryLabels: Record<string, string> = {
  matchday_guide: 'Matchday Guide',
  pub_guide: 'Pub Guide',
  away_guide: 'Away Guide',
  tips: 'Tips',
  features: 'Features',
  news: 'News',
  club: 'Club',
};

const categoryColors: Record<string, string> = {
  matchday_guide: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  pub_guide: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  away_guide: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
  tips: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  features: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
  news: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  club: 'bg-[#132257]/10 text-[#132257] dark:bg-[#8DB7E0]/10 dark:text-[#8DB7E0]',
};

function filterArticles(tab: string) {
  if (tab === 'all') return sampleArticles;
  const categoryMap: Record<string, string[]> = {
    guides: ['matchday_guide', 'pub_guide', 'away_guide'],
    news: ['news'],
    features: ['features'],
    club: ['club'],
  };
  const cats = categoryMap[tab] || [];
  return sampleArticles.filter((a) => cats.includes(a.category));
}

export default function ExplorePage() {
  const [activeTab, setActiveTab] = React.useState('all');
  const featured = sampleArticles.find((a) => a.featured);
  const articles = filterArticles(activeTab);

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="h-5 w-5 text-[#132257] dark:text-[#8DB7E0]" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Explore
          </h1>
        </div>
        <p className="text-sm text-[#6B7280] dark:text-gray-400">
          News, guides, stadiums and more.
        </p>
      </div>

      {/* Filter tabs */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="mb-5 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <TabsList className="w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="club">Club</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab}>
          {/* Featured article */}
          {featured && activeTab === 'all' && (
            <Link href={`/explore/${featured.slug}`} className="block mb-5">
              <Card className="overflow-hidden transition-shadow hover:shadow-md">
                <div className="h-44 w-full bg-gradient-to-br from-[#132257] to-[#1a2d6d] dark:from-[#0B1428] dark:to-[#132257] relative">
                  <div className="absolute bottom-3 left-3">
                    <Badge
                      className={cn(
                        'text-[10px]',
                        categoryColors[featured.category] || categoryColors.news
                      )}
                    >
                      {categoryLabels[featured.category] || featured.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 line-clamp-2">
                    {featured.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {featured.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-[#6B7280] dark:text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{featured.date}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}

          {/* Article grid */}
          <div className="grid grid-cols-2 gap-3">
            {articles
              .filter((a) => !(activeTab === 'all' && a.featured))
              .map((article) => (
                <Link
                  key={article.id}
                  href={`/explore/${article.slug}`}
                  className="block"
                >
                  <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                    <div className="h-24 w-full bg-gradient-to-br from-[#132257]/80 to-[#1a2d6d] dark:from-[#0B1428] dark:to-[#132257]" />
                    <CardContent className="p-3">
                      <Badge
                        className={cn(
                          'mb-1.5 text-[9px] px-1.5',
                          categoryColors[article.category] || categoryColors.news
                        )}
                      >
                        {categoryLabels[article.category] || article.category}
                      </Badge>
                      <h3 className="text-xs font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug">
                        {article.title}
                      </h3>
                      <p className="mt-1 text-[11px] text-[#6B7280] dark:text-gray-400 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-[#6B7280] dark:text-gray-500">
                        <Calendar className="h-2.5 w-2.5" />
                        <span>{article.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>

          {articles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Tag className="mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                No articles in this category yet
              </p>
              <p className="mt-1 text-xs text-[#6B7280] dark:text-gray-400">
                Check back soon for new content.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Categories quick links */}
      <div className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
          Browse by Category
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            'Matchday Guides',
            'Away Day Guides',
            'Spurs Pubs',
            'Travel',
            'Stadiums',
            'Tips',
            'Features',
          ].map((cat) => (
            <Badge key={cat} variant="outline" className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
              {cat}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
