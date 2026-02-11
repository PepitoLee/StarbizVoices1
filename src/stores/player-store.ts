import { create } from 'zustand';

interface PlayerState {
  currentAudioId: string | null;
  currentAudioUrl: string | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  currentTime: number;
  playbackRate: number;
  _seekTarget: number | null;
  play: (audioId: string, audioUrl: string) => void;
  pause: () => void;
  resume: () => void;
  setProgress: (progress: number, currentTime: number) => void;
  setDuration: (duration: number) => void;
  stop: () => void;
  seekTo: (time: number) => void;
  setPlaybackRate: (rate: number) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentAudioId: null,
  currentAudioUrl: null,
  isPlaying: false,
  progress: 0,
  duration: 0,
  currentTime: 0,
  playbackRate: 1,
  _seekTarget: null,

  play: (audioId, audioUrl) => set({
    currentAudioId: audioId,
    currentAudioUrl: audioUrl,
    isPlaying: true,
    progress: 0,
    currentTime: 0,
    _seekTarget: null,
  }),

  pause: () => set({ isPlaying: false }),
  resume: () => set({ isPlaying: true }),
  setProgress: (progress, currentTime) => set({ progress, currentTime }),
  setDuration: (duration) => set({ duration }),

  stop: () => set({
    currentAudioId: null,
    currentAudioUrl: null,
    isPlaying: false,
    progress: 0,
    duration: 0,
    currentTime: 0,
    playbackRate: 1,
    _seekTarget: null,
  }),

  seekTo: (time) => set({ _seekTarget: time }),
  setPlaybackRate: (rate) => set({ playbackRate: rate }),
}));
