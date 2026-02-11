'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { AudioPreviewItem } from './AudioPreviewItem';
import { audioPreviewData } from '@/lib/landing-audio-data';

interface AudioPreviewListProps {
  /** When true, auto-plays the first audio that has a previewSrc */
  autoPlay?: boolean;
}

export function AudioPreviewList({ autoPlay = false }: AudioPreviewListProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const frameCount = useRef(0);
  const hasAutoPlayed = useRef(false);

  /* ── Stop current playback ── */
  const stopPlayback = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setProgress(0);
  }, []);

  /* ── Track progress via rAF (throttled to every 4th frame ≈ 15fps) ── */
  const trackProgress = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    frameCount.current++;
    if (frameCount.current % 4 === 0 && audio.duration > 0) {
      setProgress(audio.currentTime / audio.duration);
    }
    rafRef.current = requestAnimationFrame(trackProgress);
  }, []);

  /* ── Toggle playback for a given audio id ── */
  const togglePreview = useCallback(
    (id: string) => {
      stopPlayback();

      if (playingId === id) {
        setPlayingId(null);
        return;
      }

      const audioData = audioPreviewData.find((a) => a.id === id);
      if (!audioData?.previewSrc) {
        // No real audio — fallback to simulation
        setPlayingId(id);
        const start = Date.now();
        const dur = (audioData?.durationSeconds ?? 30) * 1000;
        const interval = setInterval(() => {
          const p = Math.min((Date.now() - start) / dur, 1);
          setProgress(p);
          if (p >= 1) {
            clearInterval(interval);
            setPlayingId(null);
            setProgress(0);
          }
        }, 100);
        // Store interval id in rafRef for cleanup
        rafRef.current = interval as unknown as number;
        return;
      }

      // Real audio playback
      const audio = new Audio(audioData.previewSrc);
      audioRef.current = audio;
      setPlayingId(id);

      audio.play().catch(() => {
        // Autoplay blocked — reset state
        setPlayingId(null);
        audioRef.current = null;
      });

      audio.addEventListener('ended', () => {
        setPlayingId(null);
        setProgress(0);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        audioRef.current = null;
      });

      rafRef.current = requestAnimationFrame(trackProgress);
    },
    [playingId, stopPlayback, trackProgress]
  );

  /* ── Auto-play when autoPlay prop becomes true ── */
  useEffect(() => {
    if (!autoPlay || hasAutoPlayed.current) return;
    const firstWithSrc = audioPreviewData.find((a) => a.previewSrc);
    if (!firstWithSrc) return;

    hasAutoPlayed.current = true;
    // Small delay so the section is fully visible
    const timer = setTimeout(() => {
      togglePreview(firstWithSrc.id);
    }, 600);
    return () => clearTimeout(timer);
  }, [autoPlay, togglePreview]);

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => stopPlayback();
  }, [stopPlayback]);

  return (
    <div className="flex flex-col h-full">
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-2 pb-1">
        <span className="text-[11px] font-semibold text-soft-black/60">9:41</span>
        <div className="flex items-center gap-1">
          <svg width="15" height="10" viewBox="0 0 15 10" className="text-soft-black/60">
            <rect x="0" y="3" width="3" height="7" rx="0.5" fill="currentColor" />
            <rect x="4" y="2" width="3" height="8" rx="0.5" fill="currentColor" />
            <rect x="8" y="0" width="3" height="10" rx="0.5" fill="currentColor" />
          </svg>
          <svg width="22" height="10" viewBox="0 0 22 10" className="text-soft-black/60">
            <rect x="0" y="0" width="19" height="10" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
            <rect x="1.5" y="1.5" width="12" height="7" rx="1" fill="currentColor" />
            <rect x="20" y="3" width="2" height="4" rx="0.5" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* App header */}
      <div className="px-4 pt-2 pb-3">
        <h3 className="text-[15px] font-semibold text-soft-black">StarbizVoice</h3>
        <p className="text-[11px] text-soft-black/40 mt-0.5">Tus audios de hoy</p>
      </div>

      {/* Audio list */}
      <div className="flex-1 px-1.5 pb-3 space-y-0.5 overflow-hidden">
        {audioPreviewData.map((audio) => (
          <AudioPreviewItem
            key={audio.id}
            audio={audio}
            isPlaying={playingId === audio.id}
            progress={playingId === audio.id ? progress : 0}
            onToggle={() => togglePreview(audio.id)}
          />
        ))}
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-28 h-1 rounded-full bg-soft-black/20" />
      </div>
    </div>
  );
}
