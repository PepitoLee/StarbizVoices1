'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-register';
import { IPhoneMockup } from './IPhoneMockup';
import { PreviewCTA } from './PreviewCTA';
import { GlassFilters } from './GlassFilters';

const slides = [
  {
    title: 'Escucha antes de hablar',
    description:
      'Cada audio te prepara con las palabras y el tono adecuado para las conversaciones difíciles con tu hijo.',
  },
  {
    title: 'Temas que importan',
    description:
      'Emociones, límites, redes sociales, sexualidad, autoestima... los temas que te quitan el sueño, resueltos.',
  },
  {
    title: 'Creados por expertos',
    description:
      'Psicólogos y educadores especializados en adolescencia crean cada guía con evidencia y empatía.',
  },
  {
    title: 'En cualquier momento',
    description:
      'En el carro, antes de dormir, en una pausa del trabajo. 3 minutos que cambian tu próxima conversación.',
  },
];

const TOTAL_DOTS = slides.length + 1; // 4 slides + 1 CTA

export function StickyProductSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const ctaWrapperRef = useRef<HTMLDivElement>(null);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  /* ── Auto-play audio when section scrolls into view ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAutoPlayAudio(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  /* ── Show play invite when CTA wrapper enters viewport ── */
  useEffect(() => {
    const ctaWrapper = ctaWrapperRef.current;
    if (!ctaWrapper) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowInvite(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(ctaWrapper);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const phone = phoneRef.current;
    if (!section || !phone) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        // ─── Desktop (≥1024px) ───
        '(min-width: 1024px)': () => {
          // 4 slides + spacer + CTA = 6 screens
          section.style.height = `${(slides.length + 2) * 100}vh`;
          section.style.removeProperty('--slide-height');

          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            pin: phone,
            pinSpacing: false,
          });

          const textBlocks = section.querySelectorAll('.sticky-text-block');
          textBlocks.forEach((block) => {
            gsap.fromTo(
              block,
              { opacity: 0, y: 60 },
              {
                opacity: 1,
                y: 0,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: block,
                  start: 'top 75%',
                  end: 'top 35%',
                  scrub: 1,
                },
              }
            );
            // Only fade out non-CTA blocks
            if (!block.classList.contains('sticky-cta-block')) {
              gsap.fromTo(
                block,
                { opacity: 1 },
                {
                  opacity: 0,
                  ease: 'power2.in',
                  scrollTrigger: {
                    trigger: block,
                    start: 'bottom 45%',
                    end: 'bottom 20%',
                    scrub: 1,
                  },
                }
              );
            }
          });

          // iPhone scale-up on CTA
          const ctaBlock = section.querySelector('.sticky-cta-wrapper');
          if (ctaBlock) {
            gsap.to(phone, {
              scale: 1.3,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ctaBlock,
                start: 'top 80%',
                end: 'top 30%',
                scrub: 1,
              },
            });
          }
        },

        // ─── Mobile (<1024px) ───
        '(max-width: 1023px)': () => {
          section.style.height = '500vh';
          section.style.setProperty('--slide-height', '80vh');

          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            pin: phone,
            pinSpacing: false,
          });

          const textBlocks = section.querySelectorAll('.sticky-text-block');
          textBlocks.forEach((block, i) => {
            gsap.fromTo(
              block,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: block,
                  start: 'top 85%',
                  end: 'top 55%',
                  scrub: 0.8,
                },
              }
            );
            // Only fade out non-CTA blocks
            if (!block.classList.contains('sticky-cta-block')) {
              gsap.fromTo(
                block,
                { opacity: 1 },
                {
                  opacity: 0,
                  ease: 'power2.in',
                  scrollTrigger: {
                    trigger: block,
                    start: 'bottom 55%',
                    end: 'bottom 30%',
                    scrub: 0.8,
                  },
                }
              );
            }

            const dot = section.querySelector(`[data-dot-index="${i}"]`);
            if (dot) {
              ScrollTrigger.create({
                trigger: block,
                start: 'top 80%',
                end: 'bottom 40%',
                onToggle: ({ isActive }) => {
                  (dot as HTMLElement).style.opacity = isActive ? '1' : '0.3';
                  (dot as HTMLElement).style.transform = isActive
                    ? 'scale(1.5)'
                    : 'scale(1)';
                },
              });
            }
          });

          // iPhone scale-up on CTA (mobile)
          const ctaBlock = section.querySelector('.sticky-cta-wrapper');
          if (ctaBlock) {
            gsap.to(phone, {
              scale: 1.15,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ctaBlock,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 0.8,
              },
            });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="como-funciona" className="relative bg-cream">
      <GlassFilters />
      {/* Pinned phone — centered */}
      <div
        ref={phoneRef}
        className="absolute left-1/2 -translate-x-1/2 top-0 h-screen
                   flex items-center justify-center pointer-events-none z-10"
      >
        <div className="pointer-events-auto mobile-phone-sticky-scale">
          <IPhoneMockup autoPlay={autoPlayAudio} />
        </div>
      </div>

      {/* Scrolling text blocks */}
      <div className="relative z-20">
        <div className="h-screen" />

        {slides.map((slide, i) => (
          <div
            key={i}
            className="flex items-center lg:items-center sticky-slide-wrapper"
            style={{ height: 'var(--slide-height, 100vh)' }}
          >
            <div
              className="sticky-text-block"
              data-desktop-side={i % 2 === 0 ? 'left' : 'right'}
            >
              <span className={`text-xs font-medium uppercase tracking-widest mb-2 sm:mb-3 block ${
                [
                  'text-primary',
                  'text-utah-red',
                  'text-utah-navy',
                  'text-primary',
                ][i]
              }`}>
                0{i + 1}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-soft-black mb-2 sm:mb-3">
                {slide.title}
              </h3>
              <p className="text-soft-black/60 text-sm sm:text-base leading-relaxed">
                {slide.description}
              </p>
            </div>
          </div>
        ))}

        {/* CTA Preview block */}
        <div
          ref={ctaWrapperRef}
          className="flex items-center lg:items-center sticky-slide-wrapper sticky-cta-wrapper"
          style={{ height: 'var(--slide-height, 100vh)' }}
        >
          <PreviewCTA showInvite={showInvite} />
        </div>
      </div>

      {/* Mobile progress dots — 5 total (4 slides + CTA) */}
      <div className="sticky-progress-dots lg:hidden">
        {Array.from({ length: TOTAL_DOTS }).map((_, i) => (
          <div key={i} className="sticky-progress-dot" data-dot-index={i} />
        ))}
      </div>
    </section>
  );
}
