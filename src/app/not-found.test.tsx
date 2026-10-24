import { render, screen } from '@testing-library/react'

import NotFound from './not-found'

describe('NotFound', () => {
  it('renders the 404 message outside the site chrome', () => {
    render(<NotFound />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      '404 Page Not Found'
    )
    expect(screen.queryByRole('banner')).toBeNull()
  })
})
