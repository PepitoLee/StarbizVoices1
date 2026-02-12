'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame: number;
    const duration = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <>{count.toLocaleString()}{suffix}</>;
}

function FloatingWave() {
  return (
    <div className="flex items-end gap-[2px] h-16 opacity-20">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full bg-primary"
          animate={{ height: [`${15 + Math.sin(i * 0.5) * 30}%`, `${50 + Math.cos(i * 0.7) * 40}%`, `${15 + Math.sin(i * 0.5) * 30}%`] }}
          transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }}
        />
      ))}
    </div>
  );
}

export default function SalesHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dramatic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-primary-50/20 to-cream" />
      <div className="absolute inset-0 hero-grain" />

      {/* Oversized decorative text */}
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 font-serif text-[18rem] lg:text-[28rem] leading-none text-primary/[0.03] select-none pointer-events-none tracking-tighter hidden lg:block">
        21
      </div>

      {/* Gold accent line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: '40%' }}
        transition={{ duration: 1.2, delay: 0.5, ease }}
        className="absolute left-[8%] top-[15%] w-[1.5px] bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden lg:block"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full pt-24 pb-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
          {/* Left — Copy */}
          <div>
            {/* Social proof counter */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex -space-x-2">
                {['bg-primary', 'bg-utah-red', 'bg-utah-navy', 'bg-primary-300'].map((bg, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-cream`} />
                ))}
              </div>
              <p className="text-sm text-soft-black/60">
                <span className="font-bold text-soft-black"><AnimatedCounter target={2847} /></span>{' '}
                familias ya comenzaron
              </p>
            </motion.div>

            {/* Headline — oversized with word emphasis */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
              className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl leading-[1.08] text-soft-black mb-7 tracking-tight"
            >
              Las pantallas te{' '}
              <span className="relative inline-block">
                <span className="hero-accent-word">robaron</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.9, ease }}
                  className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-primary via-utah-red to-transparent"
                />
              </span>{' '}
              a tu hijo.
              <br />
              <span className="text-soft-black/40 text-[0.7em]">
                Recuperalo en 21 dias.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease }}
              className="text-base sm:text-lg text-soft-black/60 mb-10 max-w-lg leading-relaxed"
            >
              El protocolo de audio creado por <strong className="text-soft-black/80">neurocientificos</strong> que
              esta transformando familias. Solo 5 minutos al dia.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-5"
            >
              <Link
                href="/auth/magic"
                className="group relative btn-utah-gradient rounded-2xl px-8 py-5 text-base sm:text-lg font-bold text-white shadow-[0_8px_30px_rgba(200,150,62,0.3)] hover:shadow-[0_12px_40px_rgba(200,150,62,0.5)] transition-all duration-300 hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  COMENZAR MI TRANSFORMACION — $17
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </motion.span>
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 text-xs text-soft-black/40"
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Acceso inmediato
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Garantia 7 dias
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Pago unico
              </span>
            </motion.div>
          </div>

          {/* Right — Phone with atmosphere */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Glow halo */}
              <div className="absolute -inset-12 bg-gradient-to-br from-primary/15 via-utah-red/8 to-utah-navy/10 rounded-full blur-[60px]" />

              {/* Floating wave decoration */}
              <motion.div
                animate={{ y: [-5, 5, -5], rotate: [-1, 1, -1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                {/* Phone */}
                <div className="relative w-60 sm:w-68 lg:w-72 bg-soft-black rounded-[2.5rem] p-3 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-soft-black rounded-b-2xl z-10" />
                  <div className="rounded-[2rem] overflow-hidden bg-gradient-to-b from-utah-navy via-utah-navy-500 to-utah-navy-600 aspect-[9/19.5]">
                    <div className="p-5 pt-10 flex flex-col h-full">
                      <div className="text-primary/60 text-[10px] font-bold tracking-[0.25em] uppercase mb-3">
                        Starbiz Voice
                      </div>
                      <div className="font-serif text-white text-base mb-1">
                        Dia 1
                      </div>
                      <div className="font-serif text-primary-200 text-sm mb-3">
                        Dopamina Digital
                      </div>
                      <div className="text-white/40 text-[11px] mb-auto">
                        Dra. Elena Martinez
                      </div>

                      {/* Animated waveform */}
                      <FloatingWave />

                      {/* Play button */}
                      <div className="flex items-center justify-center mt-4 mb-2">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-utah-red flex items-center justify-center shadow-[0_4px_20px_rgba(200,150,62,0.4)]">
                          <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1" />
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] text-white/30">1:24</span>
                        <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-utah-red"
                            animate={{ width: ['20%', '60%', '20%'] }}
                            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        </div>
                        <span className="text-[10px] text-white/30">5:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5, ease }}
                className="absolute -left-4 sm:-left-8 bottom-24 glass-card rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-soft-black">21 expertos</p>
                    <p className="text-[10px] text-soft-black/50">5 min/dia</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-cream pointer-events-none" />
    </section>
  );
}
