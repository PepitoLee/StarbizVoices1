'use client';

import SalesNavbar from './SalesNavbar';
import SalesHero from './SalesHero';
import ProblemSection from './ProblemSection';
import SolutionSection from './SolutionSection';
import BenefitsSection from './BenefitsSection';
import ContentSection from './ContentSection';
import BonusSection from './BonusSection';
import SalesPricing from './SalesPricing';
import SalesTestimonials from './SalesTestimonials';
import FAQSection from './FAQSection';
import SalesFooter from './SalesFooter';
import StickyMobileCTA from './StickyMobileCTA';

export default function SalesLandingPage() {
  return (
    <main className="min-h-screen bg-cream text-soft-black overflow-x-hidden">
      <SalesNavbar />
      <SalesHero />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <ContentSection />
      <BonusSection />
      <SalesPricing />
      <SalesTestimonials />
      <FAQSection />
      <SalesFooter />
      <StickyMobileCTA />
    </main>
  );
}
