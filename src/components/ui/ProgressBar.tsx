'use client';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  progress: number;
  className?: string;
  barClassName?: string;
}

export function ProgressBar({ progress, className, barClassName }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={cn('h-1 bg-white/20 rounded-full overflow-hidden', className)}>
      <div
        className={cn('h-full bg-white rounded-full transition-all duration-300', barClassName)}
        style={{ width: `${clampedProgress}%` }}
      />
    </div>
  );
}
