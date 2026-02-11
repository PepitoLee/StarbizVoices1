'use client';

import Link from 'next/link';
import { Layers, Headphones } from 'lucide-react';
import type { Pack } from '@/types';
import { getGradient } from '@/lib/utils';

interface PackCardProps {
  pack: Pack;
}

export function PackCard({ pack }: PackCardProps) {
  const gradient = getGradient(pack.id);

  return (
    <Link
      href={`/app/packs/${pack.id}`}
      className="block rounded-2xl overflow-hidden glass-card hover:shadow-md transition-shadow active:scale-[0.98]"
    >
      <div className={`aspect-[4/3] relative bg-gradient-to-br ${gradient}`}>
        {pack.cover_url ? (
          <img
            src={pack.cover_url}
            alt={pack.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Layers size={40} className="text-white/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {pack.is_featured && (
          <span className="absolute top-2 left-2 badge-utah text-[10px] font-bold px-2 py-0.5 rounded-full">
            Destacado
          </span>
        )}
      </div>
      <div className="p-3 relative z-10">
        <h3 className="font-serif text-soft-black text-sm truncate">{pack.title}</h3>
        <div className="flex items-center gap-1 mt-1 text-primary/50">
          <Headphones size={12} />
          <span className="text-xs">{pack.audio_count} audios</span>
        </div>
      </div>
    </Link>
  );
}
