'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const benefits = [
  {
    number: '01',
    title: 'Entender su Cerebro',
    text: 'Comprende como la dopamina digital secuestra la atencion de tu hijo y aprende a contrarrestarlo con ciencia.',
    accent: 'text-primary',
    line: 'bg-primary/30',
    iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  {
    number: '02',
    title: 'Romper el Silencio',
    text: 'Tecnicas probadas para abrir conversaciones significativas, incluso con adolescentes que "no quieren hablar".',
    accent: 'text-utah-red',
    line: 'bg-utah-red/30',
    iconPath: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
  {
    number: '03',
    title: 'Blindar su Mente',
    text: 'Protege a tu hijo del cyberbullying, contenido toxico y manipulacion algoritmica sin ser el "padre malo".',
    accent: 'text-utah-navy',
    line: 'bg-utah-navy/30',
    iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    number: '04',
    title: 'Convertirte en su Heroe',
    text: 'Pasa de ser "el que quita el WiFi" a ser la persona que tu hijo busca cuando necesita ayuda.',
    accent: 'text-primary',
    line: 'bg-primary/30',
    iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  },
];

export default function BenefitsSection() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-white/50 to-cream" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl mb-20"
        >
          <div className="inline-block bg-soft-black/5 text-soft-black/50 text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Transformacion
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-soft-black leading-[1.15] tracking-tight">
            Lo que lograras<br />
            <span className="text-soft-black/40">en 21 dias</span>
          </h2>
        </motion.div>

        {/* Benefits — editorial asymmetric grid */}
        <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-14">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              className={`relative ${i % 2 === 1 ? 'md:mt-12' : ''}`}
            >
              {/* Number + line */}
              <div className="flex items-center gap-4 mb-5">
                <span className={`font-serif text-5xl ${b.accent} opacity-20 leading-none`}>
                  {b.number}
                </span>
                <div className={`flex-1 h-[1px] ${b.line}`} />
              </div>

              {/* Icon */}
              <div className="mb-4">
                <svg className={`w-7 h-7 ${b.accent} opacity-70`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={b.iconPath} />
                </svg>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-soft-black mb-3 tracking-tight">
                {b.title}
              </h3>
              <p className="text-sm sm:text-base text-soft-black/55 leading-relaxed max-w-sm">
                {b.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
