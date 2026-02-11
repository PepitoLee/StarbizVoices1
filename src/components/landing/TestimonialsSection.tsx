'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'María G.',
    role: 'Madre de 2 adolescentes',
    text: 'Estos audios me han ayudado a entender por qué mi hijo no quiere hablar conmigo. Ahora tenemos conversaciones reales.',
    accent: '#C8963E',
  },
  {
    name: 'Carlos R.',
    role: 'Padre de 3 hijos',
    text: 'Solo 3 minutos al día y siento que entiendo mejor el mundo de mis hijas. Lo recomiendo a todos los padres.',
    accent: '#B8453A',
  },
  {
    name: 'Ana L.',
    role: 'Madre primeriza de adolescente',
    text: 'Me sentía perdida con las redes sociales de mi hija. StarbizVoice me dio herramientas prácticas y reales.',
    accent: '#5C7A4D',
  },
  {
    name: 'Roberto M.',
    role: 'Padre divorciado',
    text: 'Con poco tiempo disponible, estos audios son oro. Aprendo en el auto camino al trabajo y aplico el fin de semana.',
    accent: '#4A6B8A',
  },
  {
    name: 'Laura P.',
    role: 'Madre de gemelos',
    text: 'Pensé que era la única que se sentía así. Los audios me hicieron ver que es normal y me dieron el cómo actuar.',
    accent: '#8B6B4A',
  },
  {
    name: 'Fernando S.',
    role: 'Padre de adolescente',
    text: 'Mi hijo me dijo "papá, siento que me entiendes más". Eso valía más que cualquier cosa. Gracias StarbizVoice.',
    accent: '#C8963E',
  },
];

/* ── Star SVG (shared) ── */
function Stars({ id }: { id: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, j) => (
        <svg key={j} width="12" height="12" viewBox="0 0 14 14" fill="none">
          <defs>
            <linearGradient id={`sg-${id}-${j}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8963E" />
              <stop offset="100%" stopColor="#B8453A" />
            </linearGradient>
          </defs>
          <path
            d="M7 1l1.76 3.25L13 4.96l-3 2.84.71 4.01L7 9.88l-3.71 1.93.71-4.01-3-2.84 4.24-.71L7 1z"
            fill={`url(#sg-${id}-${j})`}
          />
        </svg>
      ))}
    </div>
  );
}

/* ── Desktop grid variants ── */
const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const gridItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ═══════════════════════════════════════════
   Testimonial Card — shared between layouts
   ═══════════════════════════════════════════ */
function TestimonialCard({
  t,
  i,
  compact = false,
}: {
  t: (typeof testimonials)[0];
  i: number;
  compact?: boolean;
}) {
  return (
    <div className={`glass-card rounded-2xl ${compact ? 'p-5' : 'p-6'} relative`}>
      {/* Decorative quote mark */}
      <span
        className="absolute top-3 right-4 font-serif leading-none pointer-events-none select-none"
        style={{
          fontSize: compact ? '3rem' : '3.5rem',
          color: t.accent,
          opacity: 0.08,
        }}
      >
        &ldquo;
      </span>

      <Stars id={`${compact ? 'm' : 'd'}-${i}`} />

      <p
        className={`text-soft-black/70 leading-relaxed ${
          compact ? 'text-[13px] mt-3 mb-4' : 'text-sm mt-4 mb-5'
        }`}
      >
        &ldquo;{t.text}&rdquo;
      </p>

      <div className={`pt-3 border-t border-border flex items-center gap-3`}>
        {/* Avatar circle with accent */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
          style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent}dd)` }}
        >
          {t.name.split(' ').map((n) => n[0]).join('')}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-soft-black truncate">{t.name}</p>
          <p className="text-xs text-soft-black/40 truncate">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Mobile Carousel — scroll-snap, peek, dots
   ═══════════════════════════════════════════ */
function MobileCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const pausedUntil = useRef(0);
  const isVisible = useRef(false);

  /* ── Pause auto-scroll when off-screen ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return;
    const firstCard = el.firstElementChild as HTMLElement;
    const gap = 12; // gap-3 = 12px
    const step = firstCard.offsetWidth + gap;
    const idx = Math.round(el.scrollLeft / step);
    const clamped = Math.min(Math.max(idx, 0), testimonials.length - 1);
    activeRef.current = clamped;
    setActive(clamped);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement | undefined;
    if (!card) return;
    const containerLeft = el.getBoundingClientRect().left;
    const cardLeft = card.getBoundingClientRect().left;
    const offset = cardLeft - containerLeft + el.scrollLeft;
    el.scrollTo({ left: offset, behavior: 'smooth' });
  }, []);

  /* ── Auto-scroll every 4s, loop 1→6→1… (pauses when off-screen) ── */
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isVisible.current) return;
      if (Date.now() < pausedUntil.current) return;
      const next = (activeRef.current + 1) % testimonials.length;
      activeRef.current = next;
      setActive(next);
      scrollTo(next);
    }, 4000);
    return () => clearInterval(interval);
  }, [scrollTo]);

  /* Pause auto-scroll 8s after manual interaction */
  const handleManualScroll = useCallback(() => {
    pausedUntil.current = Date.now() + 8000;
  }, []);

  return (
    <div ref={containerRef}>
      <style>{`
        .testimonial-track::-webkit-scrollbar { display: none; }
      `}</style>
      {/* Scrollable track */}
      <div
        ref={scrollRef}
        onTouchStart={handleManualScroll}
        className="testimonial-track flex gap-3 overflow-x-auto pb-4 -mx-5 px-5"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="shrink-0"
            style={{
              width: 'calc(100vw - 56px)',
              scrollSnapAlign: 'center',
            }}
          >
            <TestimonialCard t={t} i={i} compact />
          </div>
        ))}
      </div>

      {/* Dots indicator + counter */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { handleManualScroll(); scrollTo(i); }}
              aria-label={`Testimonio ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: active === i ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background:
                  active === i
                    ? 'linear-gradient(90deg, #C8963E, #B8453A)'
                    : 'rgba(26,26,26,0.12)',
              }}
            />
          ))}
        </div>
        <span className="text-xs text-soft-black/30 font-medium tabular-nums">
          {active + 1}/{testimonials.length}
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Main Section Export
   ═══════════════════════════════════════════ */
export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 px-5 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block text-xs font-medium uppercase tracking-widest badge-utah px-3 py-1.5 rounded-full mb-3">
            Testimonios
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-soft-black">
            Lo que dicen los padres
          </h2>
          <p className="text-soft-black/40 text-sm mt-2 max-w-xs mx-auto md:hidden">
            Desliza para ver m&aacute;s historias
          </p>
        </motion.div>

        {/* ── Mobile: Carousel ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="md:hidden"
        >
          <MobileCarousel />
        </motion.div>

        {/* ── Desktop: Grid ── */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={gridItem}>
              <TestimonialCard t={t} i={i} />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Social proof + CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:mt-14 flex flex-col items-center gap-5"
        >
          {/* Aggregate rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, j) => (
                <svg key={j} width="16" height="16" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1l1.76 3.25L13 4.96l-3 2.84.71 4.01L7 9.88l-3.71 1.93.71-4.01-3-2.84 4.24-.71L7 1z"
                    fill="#C8963E"
                  />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-soft-black">4.9</span>
            <span className="text-xs text-soft-black/40">de padres satisfechos</span>
          </div>

          {/* CTA Button — impactful on mobile */}
          <a
            href="/app"
            className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-white text-sm font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #C8963E 0%, #B8453A 100%)',
            }}
          >
            {/* Shimmer effect */}
            <span
              className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
              aria-hidden="true"
            >
              <span
                className="absolute inset-0 -translate-x-full animate-[testimonial-shimmer_3s_ease-in-out_infinite]"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                }}
              />
            </span>

            <span className="relative z-10">
              Empieza a transformar tu relaci&oacute;n
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
