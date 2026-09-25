import { render, screen } from '@redwoodjs/testing/web'

import HomePage from './HomePage'

describe('HomePage', () => {
  beforeAll(() => {
    // jsdom has no 2D canvas; DotField skips drawing when it gets no context.
    jest
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockImplementation(() => null)
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
})
