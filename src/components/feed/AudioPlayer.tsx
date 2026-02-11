'use client';

import { useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatDuration } from '@/lib/utils';
import { useAudioPlayer } from '@/hooks/use-audio-player';

const RATES = [1, 1.5, 2] as const;

export function AudioPlayer() {
  const {
    isPlaying, progress, duration, currentTime,
    playbackRate, togglePlayPause, seek, setPlaybackRate,
  } = useAudioPlayer();

  const handleSeekBack = useCallback(() => {
    seek(Math.max(0, currentTime - 15));
  }, [seek, currentTime]);

  const handleSeekForward = useCallback(() => {
    seek(Math.min(duration, currentTime + 15));
  }, [seek, currentTime, duration]);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    seek(percentage * duration);
  }, [seek, duration]);

  const cycleRate = useCallback(() => {
    const idx = RATES.indexOf(playbackRate as typeof RATES[number]);
    const next = RATES[(idx + 1) % RATES.length];
    setPlaybackRate(next);
  }, [playbackRate, setPlaybackRate]);

  const textShadow = '0 1px 6px rgba(0,0,0,0.7), 0 0 2px rgba(0,0,0,0.5)';

  return (
    <div className="w-full px-6">
      <div className="cursor-pointer mb-2" onClick={handleProgressClick}>
        <ProgressBar
          progress={progress}
          className="h-[3px] bg-white/20"
          barClassName="bg-gradient-to-r from-primary to-[#efc584] progress-glow"
        />
      </div>
      <div className="flex justify-between text-xs mb-4">
        <span className="text-white/90 font-medium" style={{ textShadow }}>
          {formatDuration(Math.floor(currentTime))}
        </span>
        <span className="text-white/60 font-medium" style={{ textShadow }}>
          {formatDuration(Math.floor(duration))}
        </span>
      </div>
      <div className="flex items-center justify-center gap-6">
        {/* Speed button */}
        <motion.button
          onClick={cycleRate}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/10"
          whileTap={{ scale: 0.85 }}
          style={{ textShadow }}
        >
          <span className="text-white text-xs font-bold">
            {playbackRate === 1 ? '1x' : `${playbackRate}x`}
          </span>
        </motion.button>

        <motion.button
          onClick={handleSeekBack}
          className="text-white hover:text-white transition-colors"
          style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.6))' }}
          whileTap={{ scale: 0.85 }}
        >
          <SkipBack size={32} fill="currentColor" />
        </motion.button>

        <motion.button
          onClick={togglePlayPause}
          className="w-[72px] h-[72px] rounded-full flex items-center justify-center shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #C8963E, #B8453A)',
            boxShadow: '0 4px 20px rgba(200, 150, 62, 0.4), 0 2px 8px rgba(184, 69, 58, 0.3)',
          }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? (
            <Pause size={28} className="text-white" fill="currentColor" />
          ) : (
            <Play size={28} className="text-white ml-1" fill="currentColor" />
          )}
        </motion.button>

        <motion.button
          onClick={handleSeekForward}
          className="text-white hover:text-white transition-colors"
          style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.6))' }}
          whileTap={{ scale: 0.85 }}
        >
          <SkipForward size={32} fill="currentColor" />
        </motion.button>

        {/* Spacer to balance the speed button */}
        <div className="w-10" />
      </div>
    </div>
  );
}
