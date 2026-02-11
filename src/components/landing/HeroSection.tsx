'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const HeroPhone3D = dynamic(
  () => import('./HeroPhone3D').then((m) => ({ default: m.HeroPhone3D })),
  {
    ssr: false,
    loading: () => (
      <div className="w-[280px] h-[560px] rounded-[44px] bg-soft-black/5 animate-pulse" />
    ),
  }
);

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, duration: 0.9, ease: EASE },
  }),
};

export function HeroSection() {
  const scrollToComoFunciona = useCallback(() => {
    const target = document.getElementById('como-funciona');
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  return (
    <section className="hero-section relative min-h-screen flex items-end lg:items-center pt-20 pb-10 lg:pb-16 overflow-hidden">
      {/* Layered atmospheric background */}
      <div className="hero-bg-layer" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      {/* Oversized decorative text — editorial accent */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
        className="hero-editorial-text"
        aria-hidden="true"
      >
        VOICE
      </motion.div>

      {/* Gold accent line — left vertical */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.6, ease: EASE }}
        className="hero-gold-line hidden lg:block"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Text column — takes 7 cols on desktop */}
          <div className="lg:col-span-7 max-w-2xl relative z-20">
            <motion.span
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase badge-utah px-3.5 py-1.5 rounded-full mb-6"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <circle cx="6" cy="6" r="2" fill="#C8963E" />
                <circle cx="6" cy="6" r="5" stroke="#C8963E" strokeWidth="1" opacity="0.3" />
              </svg>
              Para padres
            </motion.span>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              {/* Superline — editorial style */}
              <span className="hero-superline block mb-3">
                entiende a tu hijo
              </span>

              <h1 className="font-serif text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem] text-soft-black leading-[0.95] mb-0">
                Conecta con
                <br />
                <span className="hero-accent-word">tu adolescente</span>
              </h1>
            </motion.div>

            {/* Gold horizontal rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="hero-divider my-6"
            />

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="text-soft-black/55 text-base sm:text-lg leading-relaxed max-w-lg"
            >
              Audios cortos de 3&nbsp;min creados por expertos.
              <span className="text-soft-black/80 font-medium"> Escucha antes de hablar</span> y
              transforma la relaci&oacute;n con tu hijo.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="flex flex-wrap items-center gap-4 mt-8"
            >
              <a
                href="#como-funciona"
                className="group flex items-center gap-2 text-sm font-medium text-soft-black/60 hover:text-primary transition-colors"
              >
                <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-primary/30 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v8m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                C&oacute;mo funciona
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="flex items-center gap-5 mt-10"
            >
              {[
                { value: '50+', label: 'audios', color: 'text-primary' },
                { value: '6', label: 'categorías', color: 'text-utah-red' },
                { value: '3 min', label: 'por audio', color: 'text-utah-navy' },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-baseline gap-1.5">
                  <span className={`font-serif text-2xl sm:text-3xl ${stat.color}`}>
                    {stat.value}
                  </span>
                  <span className="text-xs text-soft-black/35 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* iPhone column — 5 cols, overlapping into text area */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
            className="lg:col-span-5 flex justify-center lg:justify-end relative"
          >
            {/* Dramatic halo behind phone */}
            <div className="hero-phone-halo" aria-hidden="true" />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <HeroPhone3D onInitClick={scrollToComoFunciona} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="hero-bottom-fade" aria-hidden="true" />
    </section>
  );
}
