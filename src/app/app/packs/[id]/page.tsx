'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Play, Pause, Clock, Layers } from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { formatDuration, getGradient } from '@/lib/utils';
import type { Pack, Audio } from '@/types';

export default function PackDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { token } = useAuthStore();
  const { currentAudioId, isPlaying, playAudio, togglePlayPause } = useAudioPlayer();
  const [pack, setPack] = useState<Pack | null>(null);
  const [audios, setAudios] = useState<Audio[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPack = useCallback(async () => {
    if (!token || !params.id) return;
    try {
      const res = await fetch(`/api/packs/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPack(data.pack);
        setAudios(data.audios || []);
      }
    } catch (err) {
      console.error('Error fetching pack:', err);
    } finally {
      setLoading(false);
    }
  }, [token, params.id]);

  useEffect(() => {
    fetchPack();
  }, [fetchPack]);

  if (loading) {
    return (
      <div className="pt-4 px-4">
        <div className="skeleton-premium h-64 w-full mb-4" />
        <div className="skeleton-premium h-6 w-3/4 mb-2" />
        <div className="skeleton-premium h-4 w-1/2 mb-6" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton-premium h-16 w-full mb-2" />
        ))}
      </div>
    );
  }

  if (!pack) {
    return (
      <div className="pt-4 px-4 text-center">
        <p className="text-soft-black/50">Pack no encontrado</p>
        <button onClick={() => router.back()} className="text-primary mt-2 text-sm">Volver</button>
      </div>
    );
  }

  const gradient = getGradient(pack.id);

  return (
    <div className="pb-4">
      {/* Header */}
      <div className={`relative h-64 bg-gradient-to-br ${gradient}`}>
        {pack.cover_url && (
          <img src={pack.cover_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
        <div className="relative z-10 p-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white active:scale-90 backdrop-blur-md bg-black/20 border border-white/10"
          >
            <ArrowLeft size={20} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <h1 className="text-2xl font-serif text-soft-black">{pack.title}</h1>
          {pack.description && (
            <p className="text-sm text-soft-black/60 mt-1 line-clamp-2 leading-relaxed">{pack.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className="badge-utah text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Layers size={10} />
              {pack.audio_count} audios
            </span>
          </div>
        </div>
      </div>

      {/* Audio list */}
      <div className="px-4 mt-4 space-y-2">
        {audios.map((audio, index) => {
          const isCurrent = currentAudioId === audio.id;
          return (
            <button
              key={audio.id}
              onClick={() => isCurrent ? togglePlayPause() : playAudio(audio.id, audio.audio_url)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                isCurrent
                  ? 'glass-card border-primary/20 shadow-md'
                  : 'bg-white/60 border border-transparent hover:bg-white/80'
              }`}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={isCurrent ? {
                  background: 'linear-gradient(135deg, #C8963E, #B8453A)',
                } : { backgroundColor: 'rgba(200,150,62,0.08)' }}
              >
                {isCurrent && isPlaying ? (
                  <Pause size={16} className="text-white" fill="currentColor" />
                ) : (
                  <Play size={16} className={isCurrent ? 'text-white ml-0.5' : 'text-primary/60 ml-0.5'} fill="currentColor" />
                )}
              </div>
              <div className="flex-1 min-w-0 relative z-10">
                <p className={`text-sm font-medium truncate ${isCurrent ? 'text-primary' : 'text-soft-black'}`}>
                  {index + 1}. {audio.title}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock size={10} className="text-soft-black/30" />
                  <span className="text-xs text-soft-black/30">{formatDuration(audio.duration_seconds)}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
