'use client';

import { Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { AudioPlayer } from './AudioPlayer';
import type { Audio } from '@/types';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { cn, getGradient } from '@/lib/utils';
import { useEffect } from 'react';
import Link from 'next/link';

interface AudioCardProps {
  audio: Audio;
  isVisible: boolean;
}

export function AudioCard({ audio, isVisible }: AudioCardProps) {
  const { currentAudioId, playAudio, pause } = useAudioPlayer();
  const isCurrentAudio = currentAudioId === audio.id;

  useEffect(() => {
    if (isVisible && !isCurrentAudio) {
      playAudio(audio.id, audio.audio_url);
    } else if (!isVisible && isCurrentAudio) {
      pause();
    }
  }, [isVisible, audio.id, audio.audio_url, isCurrentAudio, playAudio, pause]);

  const coverUrl = audio.cover_url || audio.pack?.cover_url || null;
  const isGif = coverUrl?.toLowerCase().endsWith('.gif');
  const gradient = getGradient(audio.id);

  return (
    <div className="h-[100dvh] w-full relative flex flex-col justify-end snap-start">
      {/* Background */}
      <div className={cn('absolute inset-0', isGif ? 'bg-black' : cn('bg-gradient-to-b', gradient))}>
        {isGif && coverUrl ? (
          <img src={coverUrl} alt="" className="absolute inset-0 w-full h-full object-contain" />
        ) : coverUrl ? (
          <img src={coverUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm" />
        ) : null}
        <div className={cn(
          'absolute inset-0 bg-gradient-to-b',
          isGif ? 'from-black/30 via-transparent to-black/80' : 'from-black/20 via-transparent to-black/60'
        )} />
      </div>

      <div className="relative z-10 px-6 pb-32">
        {/* Album art — only for non-GIF covers */}
        {!isGif && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-8 w-52 h-52 rounded-2xl overflow-hidden ring-1 ring-white/10"
            style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.3), 0 0 20px rgba(200,150,62,0.15)' }}
          >
            {coverUrl ? (
              <img src={coverUrl} alt={audio.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/10">
                <Layers size={48} className="text-white/40" />
              </div>
            )}
          </motion.div>
        )}

        <div className="text-center mb-6" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 3px rgba(0,0,0,0.5)' }}>
          <h2 className="text-xl font-serif text-white font-bold mb-1">{audio.title}</h2>
          {audio.description && (
            <p className="text-sm text-white/80 line-clamp-2">{audio.description}</p>
          )}
          {audio.pack && (
            <Link
              href={`/app/packs/${audio.pack_id}`}
              className="inline-flex items-center gap-1.5 mt-3 text-xs badge-utah rounded-full px-3 py-1 !text-primary-200 !bg-black/30 !border-white/15 backdrop-blur-sm"
            >
              <Layers size={12} />
              {audio.pack.title}
            </Link>
          )}
        </div>

        {isCurrentAudio && <AudioPlayer />}
      </div>

      {audio.pack_id && (
        <div className="absolute right-4 bottom-44 z-20 flex flex-col items-center gap-5">
          <Link
            href={`/app/packs/${audio.pack_id}`}
            className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
            style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.7))' }}
          >
            <Layers size={28} className="text-white" />
            <span className="text-[10px] text-white/80 font-medium">Pack</span>
          </Link>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none z-0" />
    </div>
  );
}
