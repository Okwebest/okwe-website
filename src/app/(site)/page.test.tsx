import { render, screen } from '@testing-library/react'

import HomePage from './page'

describe('HomePage', () => {
  beforeAll(() => {
    // jsdom has no 2D canvas; DotField skips drawing when it gets no context.
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(
      () => null
    )
  })

  it('renders successfully', () => {
    expect(() => {
      render(<HomePage />)
    }).not.toThrow()
  })

  it('renders every chapter anchor the masthead links to', () => {
    render(<HomePage />)
    for (const id of [
      'services',
      'knows',
      'coms',
      'move',
      'how',
      'customers',
      'faq',
      'contact',
    ]) {
      expect(document.getElementById(id)).not.toBeNull()
    }
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Know the opportunity.'
    )
  })

  it('leads with the customer, not the process', () => {
    render(<HomePage />)
    expect(screen.getByText('Trade without the runaround')).toBeInTheDocument()
    expect(
      screen.getByText('Three things go wrong in trade. We fix all three.')
    ).toBeInTheDocument()
    expect(screen.getAllByText('What we do about it')).toHaveLength(3)
    expect(
      screen.getByRole('button', { name: 'Send message' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Do you have your own import/export licence?')
    ).toBeInTheDocument()
  })
})
