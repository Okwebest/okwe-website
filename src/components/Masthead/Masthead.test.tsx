import { fireEvent, render, screen, within } from '@testing-library/react'

import Masthead from './Masthead'

const pathname = { current: '/' }
vi.mock('next/navigation', () => ({
  usePathname: () => pathname.current,
}))

const renderMasthead = (narrow: boolean) =>
  render(<Masthead mode="light" onToggleMode={() => {}} narrow={narrow} />)

describe('Masthead', () => {
  it('shows the inline nav and quote button on wide screens', () => {
    renderMasthead(false)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Talk to Okwe' })).toHaveAttribute(
      'href',
      '/#contact'
    )
    expect(screen.queryByRole('button', { name: /menu/i })).toBeNull()
  })

  it('replaces the nav with a menu on phones that opens, lists every link and closes', () => {
    renderMasthead(true)
    const menu = screen.getByRole('button', { name: 'Menu' })
    expect(menu).toHaveAttribute('aria-expanded', 'false')
    // Hidden panels are not exposed as navigation landmarks.
    expect(screen.queryByRole('navigation')).toBeNull()

    fireEvent.click(menu)
    expect(menu).toHaveAttribute('aria-expanded', 'true')
    expect(menu).toHaveTextContent('Close')
    const panel = screen.getByRole('navigation', { name: 'Site menu' })
    const links = within(panel).getAllByRole('link')
    expect(links.map((l) => l.textContent)).toEqual([
      'Know',
      'Connect',
      'Move',
      'How it works',
      'Customers',
      'FAQ',
      'Contact',
      'Talk to Okwe',
    ])

    fireEvent.click(within(panel).getByRole('link', { name: 'FAQ' }))
    expect(menu).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(menu)
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(menu).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes the menu when the route changes', () => {
    const { rerender } = renderMasthead(true)
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }))
    expect(screen.getByRole('navigation', { name: 'Site menu' })).toBeVisible()
    pathname.current = '/contact'
    rerender(<Masthead mode="light" onToggleMode={() => {}} narrow />)
    expect(screen.queryByRole('navigation')).toBeNull()
    pathname.current = '/'
  })
})
