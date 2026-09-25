import ComsSection from 'src/components/sections/ComsSection/ComsSection'
import ContactSection from 'src/components/sections/ContactSection/ContactSection'
import CoreIdeaSection from 'src/components/sections/CoreIdeaSection/CoreIdeaSection'
import CtaSection from 'src/components/sections/CtaSection/CtaSection'
import CustomersSection from 'src/components/sections/CustomersSection/CustomersSection'
import FaqSection from 'src/components/sections/FaqSection/FaqSection'
import HeroSection from 'src/components/sections/HeroSection/HeroSection'
import HowItWorksSection from 'src/components/sections/HowItWorksSection/HowItWorksSection'
import KnowsSection from 'src/components/sections/KnowsSection/KnowsSection'
import MoveSection from 'src/components/sections/MoveSection/MoveSection'
import PositioningSection from 'src/components/sections/PositioningSection/PositioningSection'
import PromiseSection from 'src/components/sections/PromiseSection/PromiseSection'
import ServicesSection from 'src/components/sections/ServicesSection/ServicesSection'
import VisionSection from 'src/components/sections/VisionSection/VisionSection'

/** The one-page Okwe website: hero → chapters → contact. */
const HomePage = () => (
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

export default HomePage
