'use client';

import { useState, useEffect, useCallback } from 'react';
import { PackGrid } from '@/components/packs/PackGrid';
import { useAuthStore } from '@/stores/auth-store';
import type { Pack } from '@/types';

export default function PacksPage() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();

  const fetchPacks = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/packs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPacks(data.packs || []);
      }
    } catch (err) {
      console.error('Error fetching packs:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPacks();
  }, [fetchPacks]);

  return (
    <div className="pt-4 pb-4">
      <div className="px-4 mb-6">
        <h1 className="text-2xl font-serif text-soft-black">Explorar</h1>
        <p className="text-sm text-soft-black/40 mt-1">Packs de audio por tema</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="skeleton-premium aspect-[4/3] w-full" />
              <div className="skeleton-premium h-4 w-3/4 mt-2" />
              <div className="skeleton-premium h-3 w-1/2 mt-1" />
            </div>
          ))}
        </div>
      ) : (
        <PackGrid packs={packs} />
      )}
    </div>
  );
}
