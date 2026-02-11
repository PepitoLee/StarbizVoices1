'use client';

import { useCallback } from 'react';
import { usePlayerStore } from '@/stores/player-store';

// Import the engine so it initializes (singleton, side-effect only)
import '@/lib/audio-engine';

export function useAudioPlayer() {
  const {
    currentAudioId,
    currentAudioUrl,
    isPlaying,
    progress,
    duration,
    currentTime,
    playbackRate,
    play: storePlay,
    pause: storePause,
    resume: storeResume,
    stop: storeStop,
    setPlaybackRate,
  } = usePlayerStore();

  const playAudio = useCallback((audioId: string, audioUrl: string) => {
    storePlay(audioId, audioUrl);
  }, [storePlay]);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) storePause();
    else storeResume();
  }, [isPlaying, storePause, storeResume]);

  const seek = useCallback((time: number) => {
    usePlayerStore.getState().seekTo(time);
  }, []);

  return {
    currentAudioId,
    isPlaying,
    progress,
    duration,
    currentTime,
    playbackRate,
    playAudio,
    togglePlayPause,
    pause: storePause,
    resume: storeResume,
    stop: storeStop,
    seek,
    setPlaybackRate,
  };
}
