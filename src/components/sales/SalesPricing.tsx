'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedPrice() {
  const [price, setPrice] = useState(297);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => { setPrice(47); setPhase(1); }, 1200),
      setTimeout(() => { setPrice(17); setPhase(2); }, 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative mb-8">
      <div className="flex items-center justify-center gap-5 mb-3 min-h-[40px]">
        <motion.span
          animate={{ opacity: phase >= 1 ? 0.3 : 1, scale: phase >= 1 ? 0.8 : 1 }}
          transition={{ duration: 0.4 }}
          className={`text-2xl sm:text-3xl text-white/30 font-light font-serif ${phase >= 1 ? 'line-through' : ''}`}
        >
          $297
        </motion.span>
        {phase >= 1 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: phase >= 2 ? 0.3 : 1, scale: phase >= 2 ? 0.8 : 1 }}
            transition={{ duration: 0.4 }}
            className={`text-2xl sm:text-3xl text-white/40 font-light font-serif ${phase >= 2 ? 'line-through' : ''}`}
          >
            $47
          </motion.span>
        )}
      </div>

      <motion.div
        animate={{ scale: phase === 2 ? [1, 1.08, 1] : 1 }}
        transition={{ duration: 0.6, ease }}
        className="flex items-baseline justify-center gap-1"
      >
        <span className="text-white/40 text-2xl font-serif">$</span>
        <span className="text-7xl sm:text-8xl lg:text-9xl font-bold font-serif bg-gradient-to-b from-primary via-primary-200 to-primary bg-clip-text text-transparent leading-none">
          {phase === 2 ? '17' : price}
        </span>
      </motion.div>

      <p className="text-white/30 text-xs sm:text-sm mt-3 tracking-wide">
        Pago unico — Acceso de por vida
      </p>
    </div>
  );
}

const includes = [
  '21 audios de expertos (5 min c/u)',
  'Contrato Familiar de Tecnologia (PDF)',
  'Guia de Desintoxicacion (PDF)',
  'Acceso inmediato y permanente',
];

export default function SalesPricing() {
  return (
    <section className="relative py-28 sm:py-36 bg-utah-navy overflow-hidden">
      {/* Dramatic glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/[0.07] rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/[0.03] to-transparent" />
      </div>

      {/* Oversized price watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-serif text-[16rem] lg:text-[24rem] leading-none text-white/[0.015] select-none pointer-events-none tracking-tighter hidden lg:block">
        $17
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white/90 mb-4 tracking-tight leading-tight">
            Cuanto vale la salud mental{' '}
            <span className="text-primary italic">de tu hijo?</span>
          </h2>
          <p className="text-white/40 text-base max-w-md mx-auto leading-relaxed">
            Una sola sesion de terapia cuesta entre $80 y $150. Aqui accedes a{' '}
            <strong className="text-white/70">21 expertos para siempre.</strong>
          </p>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="relative"
        >
          {/* Glow ring */}
          <div className="absolute -inset-[1px] bg-gradient-to-b from-primary/30 via-primary/10 to-primary/30 rounded-[2rem] blur-sm" />

          <div className="relative bg-gradient-to-b from-white/[0.08] to-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-[2rem] p-8 sm:p-12">
            {/* Label */}
            <div className="inline-block bg-primary/15 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-8">
              Oferta especial
            </div>

            {/* Animated price */}
            <AnimatedPrice />

            {/* What's included */}
            <div className="flex flex-col gap-2.5 mb-8 text-left max-w-xs mx-auto">
              {includes.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-white/60">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Link
                href="/auth/magic"
                className="group relative btn-utah-gradient rounded-2xl px-8 py-5 text-base sm:text-lg font-bold text-white shadow-[0_8px_30px_rgba(200,150,62,0.35)] hover:shadow-[0_16px_50px_rgba(200,150,62,0.5)] transition-all duration-300 hover:scale-[1.02] inline-block w-full"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  SI, QUIERO RECUPERAR A MI HIJO
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.span>
                </span>
              </Link>
            </motion.div>

            <p className="text-white/30 text-xs mt-5">
              Descarga Inmediata — Garantia de 7 Dias
            </p>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-white/[0.06]">
              {[
                { label: 'Pago Seguro', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                { label: 'Acceso Inmediato', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                { label: 'Garantia 7 Dias', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-2">
                  <svg className="w-5 h-5 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
                  </svg>
                  <span className="text-[10px] text-white/30 font-medium">{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
