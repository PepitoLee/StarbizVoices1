'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
        >
          <div className="bg-cream/95 backdrop-blur-xl border-t border-primary/10 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
            <Link
              href="/auth/magic"
              className="btn-utah-gradient rounded-xl py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(200,150,62,0.3)] flex items-center justify-center gap-2 w-full"
            >
              <span>Obtener por $17</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="text-[10px] text-soft-black/30 text-center mt-1.5">
              Acceso inmediato · Garantia 7 dias
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
