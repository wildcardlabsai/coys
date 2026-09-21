import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

export interface BadgeCardProps {
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  target?: number;
  earnedDate?: string | null;
  className?: string;
}

function BadgeCard({
  name,
  description,
  icon,
  earned,
  progress,
  target,
  className,
}: BadgeCardProps) {
  const progressPercent =
    progress !== undefined && target ? Math.min((progress / target) * 100, 100) : 0;

  return (
    <div
      className={cn(
        'relative flex flex-col items-center rounded-xl border border-[#E5E7EB] bg-white p-4 text-center shadow-sm transition-shadow',
        'dark:border-gray-800 dark:bg-[#0B1428]',
        !earned && 'opacity-60 grayscale',
        className
      )}
    >
      <div
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-full text-2xl',
          earned
            ? 'bg-[#C4A44A]/10 ring-2 ring-[#C4A44A]'
            : 'bg-gray-100 dark:bg-gray-800'
        )}
      >
        {earned ? (
          <span>{icon}</span>
        ) : (
          <Lock className="h-5 w-5 text-[#6B7280]" />
        )}
      </div>
      <h4 className="mt-3 text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
        {name}
      </h4>
      <p className="mt-1 text-xs text-[#6B7280] line-clamp-2">
        {description}
      </p>
      {!earned && progress !== undefined && target !== undefined && target > 0 && (
        <div className="mt-3 w-full">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div
              className="h-full rounded-full bg-[#C4A44A] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="mt-1 block text-[10px] text-[#6B7280]">
            {progress} / {target}
          </span>
        </div>
      )}
    </div>
  );
}

export { BadgeCard };
