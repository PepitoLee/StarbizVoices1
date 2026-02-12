'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export default function SalesFooter() {
  return (
    <footer className="relative bg-soft-black overflow-hidden">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          <p className="font-serif text-xl sm:text-2xl text-white/60 italic mb-6">
            El momento de actuar es ahora.
          </p>
          <Link
            href="/auth/magic"
            className="inline-flex items-center gap-2 btn-utah-gradient rounded-full px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:shadow-[0_4px_20px_rgba(200,150,62,0.4)] transition-all duration-300 hover:scale-105"
          >
            Comenzar por $17
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-white/[0.06] mb-10" />

        {/* Logo + links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="font-serif text-lg text-white/70">
            Starbiz<span className="text-primary">Voice</span>
          </p>

          <div className="flex items-center gap-6 text-xs text-white/25">
            <Link href="#" className="hover:text-white/40 transition-colors">
              Privacidad
            </Link>
            <Link href="#" className="hover:text-white/40 transition-colors">
              Terminos
            </Link>
            <Link href="#" className="hover:text-white/40 transition-colors">
              Soporte
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center sm:text-left">
          <p className="text-[11px] text-white/15 max-w-md leading-relaxed mb-3">
            Este producto es un recurso educativo. Los resultados pueden variar. No
            reemplaza la orientacion profesional de un terapeuta o psicologo
            licenciado.
          </p>
          <p className="text-[11px] text-white/10">
            &copy; {new Date().getFullYear()} Starbiz Academy. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
