import type { Metadata } from 'next'

import ContactSection from '@/components/sections/ContactSection/ContactSection'

export const metadata: Metadata = {
  title: 'Contact — OKWE',
}

/** The contact chapter on its own route. */
export default function ContactPage() {
  return <ContactSection />
}
