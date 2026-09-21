import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Globe,
  Navigation,
  Bookmark,
  ChevronLeft,
  Beer,
  Users,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const pubsData: Record<
  string,
  {
    name: string;
    type: string;
    rating: number;
    reviewCount: number;
    address: string;
    phone: string;
    website: string;
    description: string;
    tags: string[];
    matchdayInfo: string;
    hours: { day: string; time: string }[];
    reviews: { author: string; rating: number; text: string; date: string }[];
  }
> = {
  'bricklayers-arms': {
    name: 'The Bricklayers Arms',
    type: 'Pub',
    rating: 4.7,
    reviewCount: 324,
    address: '34 High Road, Tottenham, London N17 8BD',
    phone: '+44 20 8808 1234',
    website: 'https://bricklayersarms.co.uk',
    description:
      'A traditional Tottenham pub that has served Spurs fans for decades. Known for its warm atmosphere, great selection of ales, and proximity to the stadium. The Bricklayers Arms is the go-to spot for pre-match pints and post-match celebrations.',
    tags: ['Spurs friendly', 'Pre-match', 'Real ales', 'Traditional'],
    matchdayInfo:
      'Opens early on matchdays (10am). Gets busy from 2 hours before kick-off. Reservations recommended for groups of 6+.',
    hours: [
      { day: 'Monday', time: '12:00 - 23:00' },
      { day: 'Tuesday', time: '12:00 - 23:00' },
      { day: 'Wednesday', time: '12:00 - 23:00' },
      { day: 'Thursday', time: '12:00 - 23:30' },
      { day: 'Friday', time: '11:00 - 00:00' },
      { day: 'Saturday', time: '10:00 - 00:00' },
      { day: 'Sunday', time: '11:00 - 22:30' },
    ],
    reviews: [
      {
        author: 'SpursFan92',
        rating: 5,
        text: 'Best pub near the ground. Brilliant atmosphere on matchdays and the staff are top notch. Always come here before a game.',
        date: '2024-09-01',
      },
      {
        author: 'NorthLondonYid',
        rating: 4,
        text: 'Great selection of beers and a proper football pub. Can get very crowded but that is part of the charm.',
        date: '2024-08-20',
      },
      {
        author: 'AwayDayFan',
        rating: 5,
        text: 'Visited as an away fan and was made to feel welcome. Good prices and friendly locals. Will definitely return.',
        date: '2024-08-10',
      },
    ],
  },
  'the-beehive': {
    name: 'The Beehive',
    type: 'Pub',
    rating: 4.5,
    reviewCount: 287,
    address: '78 Tottenham Lane, London N8 7EE',
    phone: '+44 20 8340 5678',
    website: 'https://thebeehivepub.co.uk',
    description:
      'A lively pub with multiple screens showing live football. Popular with both home and away fans, The Beehive offers a great selection of craft beers, pub grub, and a buzzing atmosphere on matchdays.',
    tags: ['Great atmosphere', 'Live games', 'Craft beer', 'Pub grub'],
    matchdayInfo:
      'All Premier League and Champions League matches shown on big screens. Book a table on matchday for guaranteed seating.',
    hours: [
      { day: 'Monday', time: '11:00 - 23:00' },
      { day: 'Tuesday', time: '11:00 - 23:00' },
      { day: 'Wednesday', time: '11:00 - 23:00' },
      { day: 'Thursday', time: '11:00 - 23:30' },
      { day: 'Friday', time: '11:00 - 00:00' },
      { day: 'Saturday', time: '10:00 - 00:00' },
      { day: 'Sunday', time: '11:00 - 22:30' },
    ],
    reviews: [
      {
        author: 'MatchdayRegular',
        rating: 5,
        text: 'Fantastic atmosphere on matchdays. Great beer selection and the food is surprisingly good for a pub.',
        date: '2024-09-05',
      },
      {
        author: 'LondonFoodie',
        rating: 4,
        text: 'Good pub food and a decent selection of ales. Gets packed on matchdays so arrive early.',
        date: '2024-08-25',
      },
    ],
  },
};

function getDefaultPub(slug: string) {
  return {
    name: slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    type: 'Pub',
    rating: 4.3,
    reviewCount: 150,
    address: 'High Road, Tottenham, London N17',
    phone: '+44 20 8808 0000',
    website: '#',
    description:
      'A popular spot near Tottenham Hotspur Stadium, serving drinks and food to fans and locals alike. A great option for a pre-match or post-match visit.',
    tags: ['Near stadium', 'Matchday'],
    matchdayInfo:
      'Open on matchdays with extended hours. Expect a lively crowd before and after the game.',
    hours: [
      { day: 'Monday - Thursday', time: '12:00 - 23:00' },
      { day: 'Friday - Saturday', time: '11:00 - 00:00' },
      { day: 'Sunday', time: '11:00 - 22:30' },
    ],
    reviews: [
      {
        author: 'SpursFan',
        rating: 4,
        text: 'Decent pub near the ground. Good for a quick pint before kick-off.',
        date: '2024-08-15',
      },
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pub = pubsData[slug] || getDefaultPub(slug);
  return {
    title: `${pub.name} | Pubs & Food | COYS`,
    description: pub.description,
    openGraph: {
      title: `${pub.name} | COYS`,
      description: pub.description,
    },
  };
}

export default async function PubDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pub = pubsData[slug] || getDefaultPub(slug);

  return (
    <div className="mx-auto w-full max-w-lg">
      {/* Hero / Image area */}
      <div className="relative h-56 w-full bg-gradient-to-br from-[#132257] to-[#1a2d6d] dark:from-[#0B1428] dark:to-[#132257]">
        <div className="absolute left-4 top-4">
          <Link
            href="/pubs"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </div>
        <div className="absolute bottom-4 right-4">
          <Badge className="bg-white/20 text-white backdrop-blur-sm">
            {pub.type}
          </Badge>
        </div>
      </div>

      <div className="px-4 py-5">
        {/* Name + Rating */}
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {pub.name}
          </h1>
          <div className="mt-1.5 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {pub.rating}
              </span>
            </div>
            <span className="text-sm text-[#6B7280] dark:text-gray-400">
              ({pub.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mb-5 grid grid-cols-4 gap-2">
          <Button variant="secondary" size="sm" className="flex-col h-auto py-2.5 gap-1">
            <Navigation className="h-4 w-4" />
            <span className="text-[10px]">Directions</span>
          </Button>
          <Button variant="secondary" size="sm" className="flex-col h-auto py-2.5 gap-1">
            <Phone className="h-4 w-4" />
            <span className="text-[10px]">Call</span>
          </Button>
          <Button variant="secondary" size="sm" className="flex-col h-auto py-2.5 gap-1">
            <Globe className="h-4 w-4" />
            <span className="text-[10px]">Website</span>
          </Button>
          <Button variant="secondary" size="sm" className="flex-col h-auto py-2.5 gap-1">
            <Bookmark className="h-4 w-4" />
            <span className="text-[10px]">Save</span>
          </Button>
        </div>

        {/* Address & contact */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#6B7280] dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {pub.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#6B7280] dark:text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {pub.phone}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4 shrink-0 text-[#6B7280] dark:text-gray-400" />
                <span className="text-sm text-[#132257] dark:text-[#8DB7E0]">
                  {pub.website.replace('https://', '')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <div className="mb-5">
          <h2 className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
            About
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {pub.description}
          </p>
        </div>

        {/* Tags */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {pub.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Matchday info */}
        <Card className="mb-5 border-[#132257]/20 dark:border-[#8DB7E0]/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Beer className="h-4 w-4 text-[#132257] dark:text-[#8DB7E0]" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Matchday Info
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {pub.matchdayInfo}
            </p>
          </CardContent>
        </Card>

        {/* Opening hours */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-[#6B7280] dark:text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Opening Hours
            </h2>
          </div>
          <div className="flex flex-col gap-1.5">
            {pub.hours.map((h) => (
              <div key={h.day} className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">{h.day}</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {h.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#6B7280] dark:text-gray-400" />
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Reviews
              </h2>
            </div>
            <span className="text-xs text-[#6B7280] dark:text-gray-400">
              {pub.reviewCount} reviews
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {pub.reviews.map((review) => (
              <Card key={review.author}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {review.author}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                        {review.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {review.text}
                  </p>
                  <p className="mt-2 text-xs text-[#6B7280] dark:text-gray-500">
                    {review.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
