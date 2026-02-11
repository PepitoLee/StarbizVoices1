import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const gradients = [
  'from-[#1E3A5F] to-[#162c49]',
  'from-[#B8453A] to-[#7E2D27]',
  'from-[#C8963E] to-[#8F6520]',
  'from-[#1E3A5F] via-[#3d6a96] to-[#B8453A]',
  'from-[#563D14] to-[#C8963E]',
  'from-[#B8453A] via-[#C8963E] to-[#1E3A5F]',
];

export function getGradient(seed: string): string {
  const index = seed.charCodeAt(0) % gradients.length;
  return gradients[index];
}
