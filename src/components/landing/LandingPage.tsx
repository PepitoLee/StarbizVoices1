'use client';

import dynamic from 'next/dynamic';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { MarqueeStrip } from './MarqueeStrip';

const StickyProductSection = dynamic(
  () => import('./StickyProductSection').then((m) => ({ default: m.StickyProductSection })),
  { ssr: false }
);
const FeaturesGrid = dynamic(
  () => import('./FeaturesGrid').then((m) => ({ default: m.FeaturesGrid }))
);
const TestimonialsSection = dynamic(
  () => import('./TestimonialsSection').then((m) => ({ default: m.TestimonialsSection }))
);
const PricingSection = dynamic(
  () => import('./PricingSection').then((m) => ({ default: m.PricingSection }))
);
const FooterSection = dynamic(
  () => import('./FooterSection').then((m) => ({ default: m.FooterSection })),
  { ssr: false }
);

export function LandingPage() {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <StickyProductSection />
      <FeaturesGrid />
      <TestimonialsSection />
      <PricingSection />
      <FooterSection />
    </div>
  );
}
