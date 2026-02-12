'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease }}
      className="text-center"
    >
      <div className="font-serif text-5xl sm:text-6xl lg:text-7xl text-utah-red mb-2 tracking-tight">{value}</div>
      <div className="text-sm text-soft-black/50 max-w-[200px] mx-auto leading-snug">{label}</div>
    </motion.div>
  );
}

const problems = [
  {
    number: '01',
    title: 'El Silencio en la Cena',
    text: 'La familia esta junta, pero cada uno vive en su pantalla. Las conversaciones murieron y ni te diste cuenta.',
    accent: 'border-utah-red',
  },
  {
    number: '02',
    title: 'La Barrera Invisible',
    text: 'Intentas hablar con tu hijo, pero sus ojos estan pegados al telefono. Un muro digital se levanto entre ustedes.',
    accent: 'border-primary',
  },
  {
    number: '03',
    title: 'La Culpa Constante',
    text: 'Sientes que fallaste como padre. Que debiste actuar antes. Que tal vez ya sea demasiado tarde.',
    accent: 'border-utah-navy',
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Dark atmospheric background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-[#f0eae2] to-cream" />

      {/* Red atmospheric glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-utah-red/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Stats row — dramatic numbers */}
        <div className="grid grid-cols-3 gap-6 sm:gap-10 mb-20 sm:mb-28">
          <AnimatedStat value="7h" label="promedio diario frente a pantallas" delay={0} />
          <AnimatedStat value="73%" label="de padres sienten que perdieron la conexion" delay={0.1} />
          <AnimatedStat value="11" label="años — edad promedio del primer smartphone" delay={0.2} />
        </div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block bg-utah-red/10 text-utah-red text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            La crisis silenciosa
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-soft-black leading-[1.15] mb-4">
            Tu hijo esta{' '}
            <span className="relative inline-block">
              presente
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0,5 Q50,0 100,5 T200,5" fill="none" stroke="#B8453A" strokeWidth="2" opacity="0.5" />
              </svg>
            </span>
            , pero no esta{' '}
            <em className="text-utah-red not-italic font-serif">ahi</em>.
          </h2>
        </motion.div>

        {/* Problem cards — editorial numbered */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease }}
              className={`relative group border-t-2 ${p.accent} pt-8 pb-6`}
            >
              <span className="font-serif text-6xl text-soft-black/[0.06] absolute top-2 right-2 leading-none select-none">
                {p.number}
              </span>
              <h3 className="font-serif text-xl text-soft-black mb-3 relative">{p.title}</h3>
              <p className="text-sm text-soft-black/55 leading-relaxed relative">{p.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Emotional closer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-utah-red/40 to-transparent mx-auto mb-8" />
          <p className="font-serif text-xl sm:text-2xl text-soft-black/70 italic leading-relaxed mb-4">
            &ldquo;No es tu culpa. Pero si es tu responsabilidad.&rdquo;
          </p>
          <p className="text-sm text-soft-black/40 font-medium">
            Los creadores de Silicon Valley prohiben las pantallas a sus hijos.
            <br className="hidden sm:block" />
            Ellos saben algo que tu no.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
