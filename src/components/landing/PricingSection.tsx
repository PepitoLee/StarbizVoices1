'use client';

import { motion } from 'framer-motion';

const APP_URL = '/app';

const features = [
  'Acceso completo a todos los audios',
  'Nuevos audios cada semana',
  'Packs temáticos organizados',
  'Escucha sin límites desde cualquier dispositivo',
  'Contenido creado por expertos',
  'Actualizaciones de por vida',
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-5">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-medium uppercase tracking-widest badge-utah px-3 py-1.5 rounded-full mb-3">
            Precio único
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-soft-black">
            Invierte en tu familia
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card-premium rounded-2xl p-8 sm:p-10"
        >
          <div className="text-center mb-8">
            <span className="text-xs font-medium uppercase tracking-widest text-primary-600">
              Acceso completo
            </span>
            <div className="mt-3">
              <span className="font-serif text-4xl text-soft-black">StarbizVoice</span>
            </div>
            <p className="text-soft-black/40 text-sm mt-2">
              Pago único &middot; acceso de por vida
            </p>
          </div>

          <ul className="space-y-3 mb-8">
            {features.map((feature, idx) => {
              const colors = [
                { bg: 'rgba(200,150,62,0.12)', stroke: '#C8963E' },
                { bg: 'rgba(184,69,58,0.10)', stroke: '#B8453A' },
                { bg: 'rgba(30,58,95,0.10)', stroke: '#1E3A5F' },
              ];
              const c = colors[idx % 3];
              return (
                <li key={feature} className="flex items-center gap-3 text-sm text-soft-black/60">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
                    <circle cx="8" cy="8" r="8" fill={c.bg} />
                    <path d="M5 8l2 2 4-4" stroke={c.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {feature}
                </li>
              );
            })}
          </ul>

          <a
            href={APP_URL}
            className="block w-full btn-utah-gradient text-white font-medium py-4 rounded-full text-center shadow-lg shadow-primary/20"
          >
            <span>Obtener Acceso Ahora</span>
          </a>

          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-soft-black/30">
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v4l2.5 1.5M11 6a5 5 0 11-10 0 5 5 0 0110 0z" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              </svg>
              Acceso inmediato
            </span>
            <span className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 6.5l2 2 4-4M11 6a5 5 0 11-10 0 5 5 0 0110 0z" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              </svg>
              Pago seguro
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
