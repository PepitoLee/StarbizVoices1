'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const APP_URL = '/app';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Static waveform heights for when audio isn't playing
const STATIC_BARS = Array.from({ length: 40 }, (_, i) => {
  const x = i / 40;
  return 4 + Math.sin(x * Math.PI * 3) * 12 + Math.cos(x * Math.PI * 7) * 6 + Math.random() * 4;
});

interface PreviewCTAProps {
  showInvite?: boolean;
}

export function PreviewCTA({ showInvite = false }: PreviewCTAProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [barHeights, setBarHeights] = useState<number[]>(STATIC_BARS);
  const [audioReady, setAudioReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number>(0);

  // Setup Web Audio API analyser
  const setupAnalyser = useCallback(() => {
    if (!audioRef.current || analyserRef.current) return;
    try {
      const ctx = new AudioContext();
      const source = ctx.createMediaElementSource(audioRef.current);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      analyserRef.current = analyser;
      audioCtxRef.current = ctx;
    } catch {
      // Web Audio API not supported — waveform stays static
    }
  }, []);

  // Animate waveform bars from analyser data
  const drawWaveform = useCallback(() => {
    if (!analyserRef.current) return;
    const analyser = analyserRef.current;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);

    const bars = Array.from({ length: 40 }, (_, i) => {
      const dataIndex = Math.floor((i / 40) * data.length);
      const value = data[dataIndex] / 255;
      return 3 + value * 34;
    });
    setBarHeights(bars);
    rafRef.current = requestAnimationFrame(drawWaveform);
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      cancelAnimationFrame(rafRef.current);
      setBarHeights(STATIC_BARS);
    } else {
      setupAnalyser();
      if (audioCtxRef.current?.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      audio.play().catch(() => {
        // Audio file not available yet — fail gracefully
      });
      drawWaveform();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, setupAnalyser, drawWaveform]);

  // Time update + metadata listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && isFinite(audio.duration)) {
        setProgress(audio.currentTime / audio.duration);
      }
    };

    const onLoadedMetadata = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
        setAudioReady(true);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
      cancelAnimationFrame(rafRef.current);
      setBarHeights(STATIC_BARS);
    };

    const onCanPlay = () => setAudioReady(true);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('canplay', onCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('canplay', onCanPlay);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Cleanup audio context on unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      audioCtxRef.current?.close().catch(() => {});
    };
  }, []);

  const circumference = 2 * Math.PI * 21;

  return (
    <div className="sticky-text-block sticky-cta-block" data-desktop-side="left">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="headphone-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8963E" />
              <stop offset="100%" stopColor="#B8453A" />
            </linearGradient>
          </defs>
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" stroke="url(#headphone-grad)" />
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" stroke="url(#headphone-grad)" />
        </svg>
        <span className="text-xs font-medium uppercase tracking-widest text-primary-600">
          Preview
        </span>
      </div>
      <h3 className="font-serif text-2xl sm:text-3xl text-soft-black mb-2">
        Escúchalo tú mismo
      </h3>
      <p className="text-soft-black/60 text-sm leading-relaxed mb-5">
        Así se siente cada audio de 3 minutos.
      </p>

      {/* Audio player card */}
      <div className="glass-card-premium rounded-2xl p-4">
        <div className="flex items-center gap-4">
          {/* Play/Pause button with circular progress */}
          <div className="relative flex-shrink-0">
            {/* Pulsing rings when invite is active */}
            {showInvite && !isPlaying && (
              <>
                <span className="play-ring" style={{ animationDelay: '0s' }} />
                <span className="play-ring" style={{ animationDelay: '0.6s' }} />
                <span className="play-ring" style={{ animationDelay: '1.2s' }} />
              </>
            )}
            <button
              onClick={togglePlay}
              className={`focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full transition-transform duration-500 ease-out ${
                showInvite && !isPlaying ? 'play-glow-active scale-[1.08]' : ''
              }`}
              aria-label={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
            >
              <svg width="48" height="48" viewBox="0 0 48 48">
                <defs>
                  <linearGradient id="player-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C8963E" />
                    <stop offset="100%" stopColor="#B8453A" />
                  </linearGradient>
                </defs>
                {/* Background circle */}
                <circle cx="24" cy="24" r="21" fill="none" stroke="url(#player-grad)" strokeWidth="2" opacity="0.2" />
                {/* Progress circle */}
                <circle
                  cx="24"
                  cy="24"
                  r="21"
                  fill="none"
                  stroke="url(#player-grad)"
                  strokeWidth="2.5"
                  strokeDasharray={`${progress * circumference} ${circumference}`}
                  strokeLinecap="round"
                  style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                  className="transition-[stroke-dasharray] duration-200"
                />
                {isPlaying ? (
                  <>
                    <rect x="17" y="16" width="5" height="16" rx="1.5" fill="url(#player-grad)" />
                    <rect x="26" y="16" width="5" height="16" rx="1.5" fill="url(#player-grad)" />
                  </>
                ) : (
                  <path d="M20 15v18l14-9L20 15z" fill="url(#player-grad)" />
                )}
              </svg>
            </button>
          </div>

          {/* Waveform + time */}
          <div className="flex-1 min-w-0">
            <svg viewBox="0 0 200 40" className="w-full h-10" aria-hidden="true">
              <defs>
                <linearGradient id="waveform-active" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C8963E" />
                  <stop offset="60%" stopColor="#C8963E" />
                  <stop offset="100%" stopColor="#B8453A" />
                </linearGradient>
              </defs>
              {barHeights.map((h, i) => {
                const pos = i / 40;
                const isActive = pos < progress;
                const isNearEdge = Math.abs(pos - progress) < 0.05 && progress > 0;
                return (
                  <rect
                    key={i}
                    x={i * 5}
                    y={20 - h / 2}
                    width="3"
                    rx="1.5"
                    height={h}
                    fill={isActive ? 'url(#waveform-active)' : isNearEdge ? 'rgba(184,69,58,0.3)' : 'rgba(200,150,62,0.15)'}
                    className="transition-[fill] duration-150"
                  />
                );
              })}
            </svg>
            <div className="flex justify-between text-[10px] text-soft-black/40 mt-1 tabular-nums">
              <span>{formatTime(currentTime)}</span>
              <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
            </div>
          </div>
        </div>

        {/* Track info */}
        <div className="mt-3 pt-3 border-t border-border/60">
          <p className="text-[13px] font-medium text-soft-black leading-snug">
            Cuando dice &ldquo;estoy bien&rdquo; pero no lo está
          </p>
          <span className="inline-block mt-1.5 text-[10px] badge-utah px-2 py-0.5 rounded-full font-medium">
            Emociones
          </span>
        </div>
      </div>

      {/* Invite label */}
      {showInvite && !isPlaying && (
        <p className="invite-label text-center text-xs font-medium mt-3 badge-utah px-3 py-1 rounded-full inline-block">
          Pulsa play y escucha
        </p>
      )}

      {/* CTA button */}
      <a
        href={APP_URL}
        className="mt-5 inline-flex items-center gap-2 btn-utah-gradient text-white font-medium px-6 py-3 rounded-full text-sm shadow-lg shadow-primary/20"
      >
        <span className="flex items-center gap-2">
          Acceder a todos los audios
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10m-4-4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </a>

      {/* Hidden audio element */}
      <audio ref={audioRef} src="/audio/preview-emociones.mp3" preload="metadata" />
    </div>
  );
}
