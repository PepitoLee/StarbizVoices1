'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-register';

export function FooterSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 60 },
        {
          y: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer className="bg-soft-black text-cream overflow-hidden relative">
      {/* Subtle warm gradient on dark footer */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 30% 100%, rgba(200,150,62,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 80% 80%, rgba(184,69,58,0.04) 0%, transparent 70%)'
        }}
      />
      {/* Giant text with parallax */}
      <div className="pt-24 pb-12 px-5 relative z-10">
        <div ref={textRef} className="max-w-6xl mx-auto">
          <p className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tight">
            conecta
            <br />
            <span className="text-gold-shimmer">con tu hijo</span>
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary/10 py-6 px-5 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/30">
            &copy; {new Date().getFullYear()} StarbizVoice. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-xs text-cream/30">
            <a href="#" className="hover:text-cream/60 transition-colors">
              Términos
            </a>
            <a href="#" className="hover:text-cream/60 transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-cream/60 transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
