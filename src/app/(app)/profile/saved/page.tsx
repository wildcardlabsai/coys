'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  Bookmark,
  MapPin,
  Calendar,
  Beer,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/shared/EmptyState';

const savedItems = [
  {
    id: '1',
    type: 'pub' as const,
    title: 'The Bricklayers Arms',
    subtitle: 'High Road, N17',
    icon: Beer,
  },
  {
    id: '2',
    type: 'fixture' as const,
    title: 'Spurs vs Arsenal',
    subtitle: 'Sat 15 Mar · 12:30',
    icon: Calendar,
  },
  {
    id: '3',
    type: 'ground' as const,
    title: 'Emirates Stadium',
    subtitle: 'Holloway, N5',
    icon: MapPin,
  },
];

const typeColors: Record<string, string> = {
  pub: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  fixture: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  ground: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
};

export default function SavedPage() {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/profile"
          className="p-2 rounded-lg hover:bg-card-bg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">Saved</h1>
          <p className="text-sm text-muted">{savedItems.length} items saved</p>
        </div>
      </div>

      {savedItems.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="Nothing saved yet"
          description="Save pubs, fixtures, and grounds to find them quickly later."
        />
      ) : (
        <div className="space-y-3">
          {savedItems.map((item) => (
            <Card key={item.id} className="card-interactive">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${typeColors[item.type]}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted">{item.subtitle}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs capitalize">
                    {item.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
