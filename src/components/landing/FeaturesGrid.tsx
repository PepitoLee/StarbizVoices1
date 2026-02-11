'use client';

import { motion } from 'framer-motion';

const features = [
  { stat: '50+', label: 'Audios', description: 'Guías prácticas listas para escuchar', accent: 'text-primary' },
  { stat: '6', label: 'Categorías', description: 'Emociones, límites, digital y más', accent: 'text-utah-red' },
  { stat: '100%', label: 'Expertos Reales', description: 'Psicólogos especializados', accent: 'text-utah-navy' },
  { stat: '3 min', label: 'Por Audio', description: 'Cortos, directos y aplicables', accent: 'text-primary' },
  { stat: '24/7', label: 'Acceso Inmediato', description: 'Disponible al instante tras compra', accent: 'text-utah-red' },
  { stat: '∞', label: 'Cualquier Dispositivo', description: 'Celular, tablet o computador', accent: 'text-utah-navy' },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function FeaturesGrid() {
  return (
    <section className="py-24 px-5 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-medium uppercase tracking-widest badge-utah px-3 py-1.5 rounded-full mb-3">
            Todo incluido
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-soft-black">
            Lo que obtienes
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 lg:grid-cols-3 border-t border-l border-border"
        >
          {features.map((feat, i) => (
            <motion.div
              key={i}
              variants={item}
              className="glass-cell border-b border-r border-border p-6 sm:p-8 group cursor-default"
            >
              <span className={`text-3xl sm:text-4xl font-serif ${feat.accent} block mb-1`}>
                {feat.stat}
              </span>
              <span className="text-sm font-semibold text-soft-black block mb-2">
                {feat.label}
              </span>
              <p className="text-sm text-soft-black/50 leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
