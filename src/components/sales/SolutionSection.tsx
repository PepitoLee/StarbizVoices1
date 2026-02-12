'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const negations = [
  { text: 'No libros de 300 paginas que jamas terminaras', icon: '✕' },
  { text: 'No terapias de $100 por sesion', icon: '✕' },
  { text: 'No aplicaciones complicadas', icon: '✕' },
];

const situations = [
  'Mientras conduces al trabajo',
  'Mientras lavas los platos',
  'Mientras haces ejercicio',
];

export default function SolutionSection() {
  return (
    <section className="relative py-28 sm:py-36 bg-utah-navy overflow-hidden">
      {/* Atmospheric layers */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cream/5 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/[0.06] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-utah-red/[0.04] rounded-full blur-[120px]" />
      </div>

      {/* Oversized decorative text */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 font-serif text-[14rem] lg:text-[22rem] leading-none text-white/[0.02] select-none pointer-events-none tracking-tighter hidden lg:block">
        VOZ
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2.5 bg-white/[0.06] border border-white/[0.08] text-white/60 text-[11px] font-bold tracking-[0.25em] uppercase px-5 py-2.5 rounded-full mb-8">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            Presentando
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white/95 mb-3 tracking-tight">
            STARBIZ <span className="text-primary">VOICES</span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '120px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="h-[2px] bg-gradient-to-r from-primary via-primary to-transparent mx-auto mb-6"
          />

          <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-primary-200/80 italic">
            El Netflix de la Crianza Moderna
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — What it's NOT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <p className="text-[11px] font-bold tracking-[0.2em] text-utah-red/80 uppercase mb-6">
              Esto no es...
            </p>
            <div className="flex flex-col gap-4">
              {negations.map((n, i) => (
                <motion.div
                  key={n.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease }}
                  className="flex items-start gap-4 group"
                >
                  <span className="w-8 h-8 rounded-full bg-utah-red/15 border border-utah-red/20 flex items-center justify-center text-utah-red text-xs font-bold flex-shrink-0 mt-0.5">
                    {n.icon}
                  </span>
                  <span className="text-white/50 text-base leading-relaxed line-through decoration-white/20">
                    {n.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — What it IS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            <p className="text-[11px] font-bold tracking-[0.2em] text-primary/80 uppercase mb-6">
              Solo ponte los audifonos
            </p>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8">
              <strong className="text-white">21 audios de 5 minutos</strong> creados por{' '}
              <strong className="text-white">21 especialistas</strong> que te guian paso a
              paso para reconectar con tu hijo.
            </p>

            <div className="flex flex-col gap-3">
              {situations.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease }}
                  className="flex items-center gap-4"
                >
                  <span className="w-8 h-8 rounded-full bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-white/70 text-base">{s}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
          className="text-center mt-20"
        >
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mb-8" />
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary-200/90 tracking-tight">
            21 Dias. 21 Expertos.
          </p>
          <p className="font-serif text-lg sm:text-xl text-white/40 mt-2 italic">
            Una sola mision: Reconectar.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
