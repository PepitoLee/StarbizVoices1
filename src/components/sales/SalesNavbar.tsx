'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

export default function SalesNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'blur-nav shadow-sm' : 'bg-transparent'
      }`}
    >
      {/* Scroll progress bar */}
      <motion.div
        style={{ width: progressWidth }}
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-utah-red to-primary"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/ventas" className="font-serif text-xl text-soft-black tracking-tight">
          Starbiz<span className="text-primary">Voice</span>
        </Link>

        <Link
          href="/auth/magic"
          className="group relative btn-utah-gradient rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-md hover:shadow-[0_4px_20px_rgba(200,150,62,0.4)] transition-all duration-300 hover:scale-105"
        >
          <span className="relative z-10 flex items-center gap-2">
            Obtener por $17
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </span>
        </Link>
      </div>
    </motion.nav>
  );
}
