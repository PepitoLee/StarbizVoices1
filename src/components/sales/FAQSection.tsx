'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const faqs = [
  {
    question: 'Es contenido de audio o video?',
    answer: 'Todo el contenido es en formato de audio. Estan diseñados para escuchar en cualquier momento: manejando, cocinando, haciendo ejercicio o antes de dormir. Cada audio dura aproximadamente 5 minutos.',
  },
  {
    question: 'Para que edades de hijos funciona?',
    answer: 'El programa esta diseñado para padres con hijos de 6 a 17 años. Las estrategias se adaptan a diferentes etapas del desarrollo, desde la niñez hasta la adolescencia.',
  },
  {
    question: 'Tienen garantia de devolucion?',
    answer: 'Si, ofrecemos una garantia de 7 dias sin preguntas. Si sientes que el programa no es para ti, te devolvemos el 100% de tu dinero. Sin complicaciones.',
  },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
    >
      <div className={`border-b border-soft-black/[0.06] transition-colors duration-300 ${open ? 'bg-white/30' : ''}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-6 sm:py-7 px-2 text-left group"
        >
          <div className="flex items-start gap-5">
            <span className="font-serif text-2xl text-soft-black/[0.08] leading-none mt-1 select-none">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="font-serif text-lg sm:text-xl text-soft-black pr-4 group-hover:text-soft-black/80 transition-colors">
              {q}
            </span>
          </div>

          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease }}
            className="flex-shrink-0"
          >
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden"
            >
              <div className="pl-12 pr-6 pb-6 sm:pb-7">
                <p className="text-sm sm:text-base text-soft-black/55 leading-relaxed max-w-lg">
                  {a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0eae2] to-cream" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-soft-black tracking-tight">
            Preguntas Frecuentes
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="border-t border-soft-black/[0.06]">
          {faqs.map((f, i) => (
            <FAQItem key={f.question} q={f.question} a={f.answer} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
