'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { AudioCard } from './AudioCard';
import { useAuthStore } from '@/stores/auth-store';
import type { Audio } from '@/types';

function WaveformLoader() {
  const bars = [0, 1, 2, 3, 4];
  return (
    <div className="flex items-end justify-center gap-1 h-8">
      {bars.map((i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-primary"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.12,
            ease: 'easeInOut',
          }}
          style={{ height: 24, transformOrigin: 'bottom' }}
        />
      ))}
    </div>
  );
}

export function AudioFeed() {
  const [audios, setAudios] = useState<Audio[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { token } = useAuthStore();

  const fetchAudios = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/feed', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setAudios(data.audios || []);
      }
    } catch (err) {
      console.error('Error fetching feed:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAudios();
  }, [fetchAudios]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) setVisibleIndex(index);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    const cards = container.querySelectorAll('[data-index]');
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [audios]);

  if (loading) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-gradient-to-b from-[#1E3A5F] to-[#162c49]">
        <div className="text-center">
          <WaveformLoader />
          <p className="font-serif text-white/50 text-sm mt-4">Preparando tu feed...</p>
        </div>
      </div>
    );
  }

  if (audios.length === 0) {
    return (
      <div className="h-[100dvh] flex items-center justify-center bg-gradient-to-b from-[#1E3A5F] to-[#162c49] px-6">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
            <Layers size={28} className="text-primary-300/60" />
          </div>
          <h3 className="font-serif text-white text-lg mb-2">Tu espacio esta listo</h3>
          <p className="text-white/40 text-sm">Vuelve pronto, estamos preparando contenido para ti</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-[100dvh] snap-feed hide-scrollbar">
      {audios.map((audio, index) => (
        <div key={audio.id} data-index={index}>
          <AudioCard audio={audio} isVisible={index === visibleIndex} />
        </div>
      ))}
    </div>
  );
}
