'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';
import { PackCard } from './PackCard';
import type { Pack } from '@/types';
import { cn } from '@/lib/utils';

const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'comunicacion', label: 'Comunicacion' },
  { value: 'tecnologia', label: 'Tecnologia' },
  { value: 'emocional', label: 'Emocional' },
  { value: 'educacion', label: 'Educacion' },
  { value: 'relaciones', label: 'Relaciones' },
  { value: 'bienestar', label: 'Bienestar' },
];

interface PackGridProps {
  packs: Pack[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

export function PackGrid({ packs }: PackGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? packs
    : packs.filter((p) => p.category === activeCategory);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 pb-4">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all',
              activeCategory === cat.value
                ? 'btn-utah-gradient text-white shadow-md'
                : 'bg-white/60 text-soft-black/60 border border-primary/10'
            )}
          >
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </div>
      <motion.div
        className="grid grid-cols-2 gap-4 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeCategory}
      >
        {filtered.map((pack) => (
          <motion.div key={pack.id} variants={itemVariants}>
            <PackCard pack={pack} />
          </motion.div>
        ))}
      </motion.div>
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <Layers size={20} className="text-primary/40" />
          </div>
          <p className="text-soft-black/40 text-sm">No hay packs en esta categoria</p>
        </div>
      )}
    </div>
  );
}
