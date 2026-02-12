'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const bonuses = [
  {
    title: 'Contrato Familiar de Tecnologia',
    format: 'PDF Interactivo',
    value: '$27',
    description: 'Un acuerdo familiar personalizable que establece reglas claras sobre el uso de tecnologia. Diseñado por psicologos para generar compromiso real.',
    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    title: 'Guia de Desintoxicacion de Fin de Semana',
    format: 'PDF con Actividades',
    value: '$19',
    description: 'Plan paso a paso para un fin de semana completo sin pantallas. Incluye 15 actividades probadas que tus hijos realmente disfrutaran.',
    iconPath: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  },
];

export default function BonusSection() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0eae2] via-cream to-cream" />

      {/* Gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-utah-red/10 border border-primary/20 flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-soft-black mb-3 tracking-tight">
            Si ordenas hoy, recibes{' '}
            <span className="text-primary italic">gratis</span>
          </h2>
          <p className="text-soft-black/50 text-base">
            Bonos exclusivos valorados en $46 — incluidos sin costo adicional.
          </p>
        </motion.div>

        {/* Bonus cards */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {bonuses.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              className="group relative bg-white/60 backdrop-blur-sm border border-primary/10 rounded-2xl p-7 sm:p-8 hover:border-primary/25 transition-colors duration-500"
            >
              {/* Free badge */}
              <div className="absolute -top-3 right-6">
                <div className="bg-utah-red text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-utah-red/20">
                  Gratis
                </div>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={b.iconPath} />
                </svg>
              </div>

              <h3 className="font-serif text-lg sm:text-xl text-soft-black mb-1.5 tracking-tight pr-12">
                {b.title}
              </h3>

              <p className="text-xs text-soft-black/40 mb-4">
                {b.format} — Valor{' '}
                <span className="line-through text-soft-black/30">{b.value}</span>
              </p>

              <p className="text-sm text-soft-black/55 leading-relaxed">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
