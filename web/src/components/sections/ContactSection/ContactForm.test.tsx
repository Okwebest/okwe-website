import { render, screen, fireEvent } from '@redwoodjs/testing/web'

import ContactForm from './ContactForm'

describe('ContactForm', () => {
  it('shows the success panel after submitting', () => {
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/^Name/), {
      target: { value: 'Ada' },
    })
    fireEvent.change(screen.getByLabelText(/^Email/), {
      target: { value: 'ada@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/^Message/), {
      target: { value: 'Hello' },
    })
    fireEvent.submit(
      screen
        .getByRole('button', { name: 'Send message' })
        .closest('form') as HTMLFormElement
    )
    expect(screen.getByText('Message received.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute(
      'href',
      '/#top'
    )
  })
})
