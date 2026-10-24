import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { contact } from '@/content/site'

import EnquiryForm from './EnquiryForm'

const { form } = contact

const fill = () => {
  fireEvent.change(screen.getByLabelText(/Your name/), {
    target: { value: 'Ada Okafor' },
  })
  fireEvent.change(screen.getByLabelText(/^Company/), {
    target: { value: 'Okafor Traders' },
  })
  fireEvent.change(screen.getByLabelText(/^Email/), {
    target: { value: 'ada@example.com' },
  })
  fireEvent.change(screen.getByLabelText(/Phone or WhatsApp/), {
    target: { value: '+234 800 000 0000' },
  })
  fireEvent.change(screen.getByLabelText(/What do you need help with/), {
    target: { value: 'Logistics and Movement' },
  })
  fireEvent.change(screen.getByLabelText(/Tell us about the trade/), {
    target: { value: 'Two containers of cashew to Rotterdam.' },
  })
}

const submit = () =>
  fireEvent.submit(
    screen
      .getByRole('button', { name: form.submit })
      .closest('form') as HTMLFormElement
  )

describe('EnquiryForm', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    fetchMock.mockReset()
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('posts every answer into the Google Form and confirms', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }))
    render(<EnquiryForm />)
    fill()
    submit()

    await waitFor(() =>
      expect(screen.getByText(form.success.title)).toBeInTheDocument()
    )
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit]
    expect(url).toBe(form.action)
    expect(url).toMatch(
      /^https:\/\/docs\.google\.com\/forms\/.*\/formResponse$/
    )
    expect(init.method).toBe('POST')
    expect(init.mode).toBe('no-cors')
    const body = init.body as URLSearchParams
    expect(body.get(form.fields.name)).toBe('Ada Okafor')
    expect(body.get(form.fields.company)).toBe('Okafor Traders')
    expect(body.get(form.fields.email)).toBe('ada@example.com')
    expect(body.get(form.fields.phone)).toBe('+234 800 000 0000')
    // The exact option text the Google Form expects, not Okwe's label.
    expect(body.get(form.fields.service)).toBe('Logistics and Movement')
    expect(body.get(form.fields.message)).toBe(
      'Two containers of cashew to Rotterdam.'
    )
    expect(
      screen.getByRole('link', { name: form.success.back })
    ).toHaveAttribute('href', '/#top')
  })

  it('keeps the message and offers WhatsApp when the network fails', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'))
    render(<EnquiryForm />)
    fill()
    submit()

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(form.error.title)
    )
    expect(screen.getByLabelText(/Tell us about the trade/)).toHaveValue(
      'Two containers of cashew to Rotterdam.'
    )
    expect(
      screen.getByRole('link', { name: form.error.whatsapp })
    ).toHaveAttribute('href', contact.whatsappHref)
    expect(
      screen.getByRole('link', { name: form.error.fallback })
    ).toHaveAttribute('href', form.viewUrl)

    fireEvent.click(screen.getByRole('button', { name: form.error.retry }))
    expect(screen.queryByRole('alert')).toBeNull()
    expect(screen.getByRole('button', { name: form.submit })).toBeEnabled()
  })

  it('silently drops submissions that fill the honeypot', async () => {
    render(<EnquiryForm />)
    fill()
    fireEvent.change(screen.getByLabelText('Website'), {
      target: { value: 'https://spam.example' },
    })
    submit()
    await waitFor(() =>
      expect(screen.getByText(form.success.title)).toBeInTheDocument()
    )
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('shows Okwe wording but submits Google option values', () => {
    render(<EnquiryForm />)
    const options = screen.getAllByRole('option')
    expect(options.map((o) => o.textContent)).toEqual(
      form.services.map((s) => s.label)
    )
    expect(options.map((o) => (o as HTMLOptionElement).value)).toEqual(
      form.services.map((s) => s.value)
    )
  })
})
