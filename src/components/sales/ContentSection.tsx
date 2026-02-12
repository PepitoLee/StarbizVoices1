'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const blocks = [
  {
    days: '1–5',
    phase: 'FASE I',
    title: 'Fundamentos',
    experts: 'Dra. Elena Martinez · Dr. Marco Villanueva',
    description: 'Comprende como funciona la adiccion digital en el cerebro de tu hijo. Bases neurocientificas y primeros pasos.',
    color: 'bg-primary',
    textColor: 'text-primary',
    borderColor: 'border-primary/20',
  },
  {
    days: '6–10',
    phase: 'FASE II',
    title: 'Comunicacion',
    experts: 'Dra. Carolina Reyes · Coach David Gutierrez',
    description: 'Tecnicas de comunicacion no violenta y escucha activa. Abre canales de dialogo autentico con tu adolescente.',
    color: 'bg-utah-red',
    textColor: 'text-utah-red',
    borderColor: 'border-utah-red/20',
  },
  {
    days: '11–15',
    phase: 'FASE III',
    title: 'Salud Digital',
    experts: 'Dr. Esteban Navarro · Dra. Monica Silva',
    description: 'Establece limites saludables sin conflicto. Herramientas practicas para crear un ambiente digital seguro.',
    color: 'bg-utah-navy',
    textColor: 'text-utah-navy',
    borderColor: 'border-utah-navy/20',
  },
  {
    days: '16–21',
    phase: 'FASE IV',
    title: 'Reconexion',
    experts: 'Coach Victor Ramirez · Henry Orellana',
    description: 'Estrategias avanzadas de reconexion. Crea un plan familiar sostenible para la era digital.',
    color: 'bg-primary',
    textColor: 'text-primary',
    borderColor: 'border-primary/20',
  },
];

export default function ContentSection() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream to-[#f0eae2]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-20"
        >
          <div className="inline-block bg-primary/10 text-primary text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Tu recorrido
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-soft-black mb-4 tracking-tight">
            21 Dias de Expertos
          </h2>
          <p className="text-soft-black/50 max-w-lg mx-auto text-base">
            Por menos de lo que cuesta una pizza, accedes a 21 especialistas que te
            guian dia a dia.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/20 via-utah-red/20 to-primary/20 hidden sm:block" />

          <div className="flex flex-col gap-8">
            {blocks.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="relative flex gap-6 sm:gap-8"
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 relative z-10">
                  <div className={`w-12 sm:w-16 h-12 sm:h-16 rounded-2xl ${b.color} flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-serif text-lg sm:text-xl font-bold">{b.days.split('–')[0]}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 border ${b.borderColor} rounded-2xl p-5 sm:p-7 bg-white/40 backdrop-blur-sm`}>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className={`text-[10px] font-bold tracking-[0.2em] ${b.textColor} uppercase`}>
                      {b.phase}
                    </span>
                    <span className="text-[10px] text-soft-black/30 font-medium">
                      Dias {b.days}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-soft-black mb-2 tracking-tight">
                    {b.title}
                  </h3>

                  <p className={`text-xs ${b.textColor} font-semibold mb-3 opacity-70`}>
                    {b.experts}
                  </p>

                  <p className="text-sm text-soft-black/55 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
