'use client';

interface MiniWaveformProps {
  isPlaying: boolean;
  barCount?: number;
}

export function MiniWaveform({ isPlaying, barCount = 5 }: MiniWaveformProps) {
  return (
    <div className="flex items-end gap-[2px] h-4">
      {Array.from({ length: barCount }).map((_, i) => (
        <span
          key={i}
          className={`waveform-bar ${isPlaying ? 'playing' : 'idle'} ${
            isPlaying ? 'text-primary' : 'text-soft-black/20'
          }`}
          style={{
            height: '100%',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}
