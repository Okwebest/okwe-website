import ComsSection from '@/components/sections/ComsSection/ComsSection'
import ContactSection from '@/components/sections/ContactSection/ContactSection'
import CoreIdeaSection from '@/components/sections/CoreIdeaSection/CoreIdeaSection'
import CtaSection from '@/components/sections/CtaSection/CtaSection'
import CustomersSection from '@/components/sections/CustomersSection/CustomersSection'
import FaqSection from '@/components/sections/FaqSection/FaqSection'
import HeroSection from '@/components/sections/HeroSection/HeroSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection/HowItWorksSection'
import KnowsSection from '@/components/sections/KnowsSection/KnowsSection'
import MoveSection from '@/components/sections/MoveSection/MoveSection'
import PositioningSection from '@/components/sections/PositioningSection/PositioningSection'
import PromiseSection from '@/components/sections/PromiseSection/PromiseSection'
import ServicesSection from '@/components/sections/ServicesSection/ServicesSection'
import VisionSection from '@/components/sections/VisionSection/VisionSection'

/** The one-page Okwe website: hero → chapters → contact. */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CoreIdeaSection />
      <ServicesSection />
      <KnowsSection />
      <ComsSection />
      <MoveSection />
      <HowItWorksSection />
      <CustomersSection />
      <PositioningSection />
      <PromiseSection />
      <VisionSection />
      <FaqSection />
      <CtaSection />
      <ContactSection />
    </>
  )
}
