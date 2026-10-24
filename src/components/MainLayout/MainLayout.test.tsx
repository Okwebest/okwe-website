import { render, screen, within } from '@testing-library/react'

import MainLayout from './MainLayout'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('MainLayout', () => {
  it('renders the masthead, content and footer', () => {
    render(
      <MainLayout>
        <p>Page content</p>
      </MainLayout>
    )
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByText('Page content')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /light and dark mode/i })
    ).toHaveTextContent('Light')
  })

  it('links the masthead nav to the home-page chapters', () => {
    render(<MainLayout />)
    const nav = within(screen.getByRole('banner')).getByRole('navigation')
    expect(within(nav).getByRole('link', { name: 'Know' })).toHaveAttribute(
      'href',
      '/#knows'
    )
    expect(within(nav).getByRole('link', { name: 'Connect' })).toHaveAttribute(
      'href',
      '/#coms'
    )
    expect(within(nav).getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'href',
      '/#contact'
    )
  })

  it('links the footer to the legal documents and real contact channels', () => {
    render(<MainLayout />)
    const footer = within(screen.getByRole('contentinfo'))
    for (const [name, href] of [
      ['Privacy Policy', '/legal/privacy'],
      ['Terms of Use', '/legal/terms'],
      ['Data Processing Agreement', '/legal/dpa'],
      ['Disclaimer', '/legal/disclaimer'],
    ]) {
      expect(footer.getByRole('link', { name })).toHaveAttribute('href', href)
    }
    expect(footer.getByRole('link', { name: /WhatsApp/ })).toHaveAttribute(
      'href',
      expect.stringMatching(/^https:\/\/wa\.me\/2348107973645/)
    )
    expect(
      footer.getByRole('link', { name: '+234 810 797 3645' })
    ).toHaveAttribute('href', 'tel:+2348107973645')
  })
})
