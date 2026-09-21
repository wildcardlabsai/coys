import { cn, formatDate } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

export interface GuideCardProps {
  title: string;
  excerpt?: string | null;
  category: string;
  imageUrl?: string | null;
  date?: string | null;
  readTimeMinutes?: number | null;
  className?: string;
  onClick?: () => void;
}

function GuideCard({
  title,
  excerpt,
  category,
  imageUrl,
  date,
  readTimeMinutes,
  className,
  onClick,
}: GuideCardProps) {
  return (
    <Card
      className={cn(
        'overflow-hidden transition-shadow hover:shadow-md cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="aspect-[16/9] w-full bg-gradient-to-br from-[#132257]/5 to-[#8DB7E0]/10 dark:from-[#132257]/20 dark:to-[#8DB7E0]/5">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl opacity-20">COYS</span>
          </div>
        )}
        <div className="relative">
          <Badge className="absolute -top-3 left-4 capitalize">
            {category.replace(/_/g, ' ')}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 pt-5">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 leading-snug">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-1.5 text-sm text-[#6B7280] line-clamp-2">
            {excerpt}
          </p>
        )}
        <div className="mt-3 flex items-center gap-3 text-xs text-[#6B7280]">
          {date && <span>{formatDate(date)}</span>}
          {readTimeMinutes && (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {readTimeMinutes} min read
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export { GuideCard };
