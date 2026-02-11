'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MiniWaveform } from './MiniWaveform';
import type { AudioPreview } from '@/lib/landing-audio-data';

interface AudioPreviewItemProps {
  audio: AudioPreview;
  isPlaying: boolean;
  progress: number;
  onToggle: () => void;
}

export function AudioPreviewItem({
  audio,
  isPlaying,
  progress,
  onToggle,
}: AudioPreviewItemProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-black/[0.03] active:bg-black/[0.06] text-left"
    >
      {/* Play/Pause button */}
      <div className="relative flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isPlaying ? (
            <motion.svg
              key="pause"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              className="text-primary"
            >
              <rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
              <rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" />
            </motion.svg>
          ) : (
            <motion.svg
              key="play"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              width="14"
              height="14"
              viewBox="0 0 14 14"
              className="text-primary ml-0.5"
            >
              <path d="M3 1.5v11l9-5.5L3 1.5z" fill="currentColor" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Circular progress */}
        {isPlaying && (
          <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 36 36"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-primary/30"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${progress * 100.53} 100.53`}
              className="text-primary transition-all duration-300"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>

      {/* Text content */}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-soft-black truncate leading-tight">
          {audio.title}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${audio.categoryColor}`}
          >
            {audio.category}
          </span>
          <span className="text-[11px] text-soft-black/40">{audio.duration}</span>
        </div>
      </div>

      {/* Waveform */}
      <MiniWaveform isPlaying={isPlaying} />
    </button>
  );
}
