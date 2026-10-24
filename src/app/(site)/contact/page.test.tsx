import { render, screen } from '@testing-library/react'

import { contact } from '@/content/site'

import ContactPage from './page'

describe('ContactPage', () => {
  it('renders the contact chapter with the Okwe enquiry form', () => {
    render(<ContactPage />)
    expect(document.getElementById('contact')).not.toBeNull()
    expect(
      screen.getByRole('button', { name: contact.form.submit })
    ).toBeInTheDocument()
    expect(document.querySelector('iframe')).toBeNull()
  })

  it('offers WhatsApp, phone and email as real links', () => {
    render(<ContactPage />)
    // WhatsApp and phone show the same number; tell them apart by href.
    const numberLinks = screen.getAllByRole('link', { name: contact.phone })
    expect(numberLinks).toHaveLength(2)
    const whatsapp = numberLinks.find((a) =>
      a.getAttribute('href')?.startsWith('https://wa.me/')
    )
    expect(whatsapp).toHaveAttribute('href', contact.whatsappHref)
    expect(whatsapp?.getAttribute('href')).toMatch(
      /^https:\/\/wa\.me\/2348107973645\?text=/
    )
    expect(whatsapp).toHaveAttribute('target', '_blank')
    expect(
      numberLinks.find((a) => a.getAttribute('href')?.startsWith('tel:'))
    ).toHaveAttribute('href', 'tel:+2348107973645')
    expect(screen.getByRole('link', { name: contact.email })).toHaveAttribute(
      'href',
      `mailto:${contact.email}`
    )
  })
})
