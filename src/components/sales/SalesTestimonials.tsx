'use client';

import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const testimonials = [
  {
    quote: 'En la primera semana mi hijo me pidio que hicieramos algo juntos un sabado. No pasaba desde hacia meses. Este programa funciona.',
    name: 'Maria G.',
    role: 'Madre de adolescente de 14 años',
    accent: 'border-t-primary',
  },
  {
    quote: 'Como padre soltero, no tenia tiempo para leer libros. Los audios de 5 minutos fueron perfectos para mi rutina. Ahora entiendo a mi hija.',
    name: 'Carlos R.',
    role: 'Padre de niña de 11 años',
    accent: 'border-t-utah-red',
  },
  {
    quote: 'Pensaba que el problema era solo el celular. Los expertos me ayudaron a ver que la desconexion empezaba conmigo. Hoy somos un equipo.',
    name: 'Ana L.',
    role: 'Madre de dos adolescentes',
    accent: 'border-t-utah-navy',
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function SalesTestimonials() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream to-[#f0eae2]" />

      {/* Large decorative quote */}
      <div className="absolute left-8 top-20 font-serif text-[18rem] leading-none text-soft-black/[0.02] select-none pointer-events-none hidden lg:block">
        &ldquo;
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-soft-black/5 text-soft-black/50 text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            Testimonios
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-soft-black tracking-tight">
            Lo que dicen<br />
            <span className="text-soft-black/40">otros padres</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              className={`relative border-t-2 ${t.accent} bg-white/50 backdrop-blur-sm rounded-2xl p-7 sm:p-8`}
            >
              <Stars />

              <blockquote className="font-serif text-base sm:text-lg text-soft-black/75 italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-utah-red/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-soft-black/60">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-soft-black">{t.name}</p>
                  <p className="text-xs text-soft-black/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
