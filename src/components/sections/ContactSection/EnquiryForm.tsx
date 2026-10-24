'use client'

import Link from 'next/link'
import { useState } from 'react'

import Button from '@/components/ui/Button/Button'
import Field from '@/components/ui/Field/Field'
import Input from '@/components/ui/Input/Input'
import OkweRow from '@/components/ui/OkweRow/OkweRow'
import Select from '@/components/ui/Select/Select'
import { contact } from '@/content/site'

type Status = 'idle' | 'sending' | 'sent' | 'error'

type Values = {
  name: string
  company: string
  email: string
  phone: string
  service: string
  message: string
  /** Honeypot: hidden from people, filled by bots. */
  website: string
}

const { form } = contact

const empty: Values = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: form.services[0].value,
  message: '',
  website: '',
}

/**
 * Posts an enquiry straight into the Okwe Google Form (its /formResponse
 * endpoint) without showing Google to the visitor.
 *
 * Google sends no CORS headers, so the request goes out with mode 'no-cors'
 * and the reply is opaque: a resolved fetch means the submission reached
 * Google, a rejected one means the network failed. The visitor's text is kept
 * on failure so nothing is lost, with WhatsApp and the hosted form as backups.
 */
export async function submitEnquiry(values: Values): Promise<void> {
  const body = new URLSearchParams()
  body.set(form.fields.name, values.name.trim())
  body.set(form.fields.company, values.company.trim())
  body.set(form.fields.email, values.email.trim())
  body.set(form.fields.phone, values.phone.trim())
  body.set(form.fields.service, values.service)
  body.set(form.fields.message, values.message.trim())
  body.set('fvv', '1')
  body.set('pageHistory', '0')
  await fetch(form.action, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
}

const panel =
  'flex flex-col items-start gap-[18px] rounded-[3px] border px-[24px] py-[40px] wide:px-[40px] wide:py-[56px]'

const EnquiryForm = () => {
  const [values, setValues] = useState<Values>(empty)
  const [status, setStatus] = useState<Status>('idle')

  const update =
    (key: keyof Values) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setValues((v) => ({ ...v, [key]: event.target.value }))

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (values.website) {
      // A bot filled the hidden field: pretend it worked, send nothing.
      setStatus('sent')
      return
    }
    setStatus('sending')
    try {
      await submitEnquiry(values)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`${panel} border-acc-k bg-ok-bg`}
      >
        <OkweRow open={0} />
        <h3 className="m-0 font-display text-[32px] font-normal tracking-[-.02em] wide:text-[40px]">
          {form.success.title}
        </h3>
        <p className="m-0 text-[17px] text-on-paper-2">{form.success.text}</p>
        <Button variant="primary" href="/#top">
          {form.success.back}
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-[24px]"
      noValidate={false}
    >
      <div className="flex flex-col gap-[6px]">
        <h3 className="m-0 font-sans text-[20px] font-semibold text-on-paper">
          {form.title}
        </h3>
        <p className="m-0 text-[15px] leading-[1.5] text-on-paper-2">
          {form.intro}
        </p>
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className={`${panel} gap-[12px] border-acc-m2 bg-status-danger-soft py-[24px] wide:py-[28px]`}
        >
          <h4 className="m-0 font-display text-[24px] font-normal tracking-[-.01em] text-on-paper">
            {form.error.title}
          </h4>
          <p className="m-0 text-[15px] leading-[1.5] text-on-paper-2">
            {form.error.text}
          </p>
          <div className="flex flex-wrap gap-[10px]">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={() => setStatus('idle')}
            >
              {form.error.retry}
            </Button>
            <Button
              variant="primary"
              size="sm"
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {form.error.whatsapp}
            </Button>
            <Button
              variant="link"
              href={form.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {form.error.fallback}
            </Button>
          </div>
        </div>
      )}

      <div
        className="grid gap-[24px]"
        style={{
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))',
        }}
      >
        <Field label={form.labels.name} required>
          <Input
            name="name"
            autoComplete="name"
            required
            size="lg"
            value={values.name}
            onChange={update('name')}
          />
        </Field>
        <Field label={form.labels.company} required>
          <Input
            name="company"
            autoComplete="organization"
            required
            size="lg"
            value={values.company}
            onChange={update('company')}
          />
        </Field>
        <Field label={form.labels.email} required>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            size="lg"
            value={values.email}
            onChange={update('email')}
          />
        </Field>
        <Field label={form.labels.phone} required>
          <Input
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder={form.placeholders.phone}
            required
            size="lg"
            value={values.phone}
            onChange={update('phone')}
          />
        </Field>
      </div>
      <Field label={form.labels.service} required>
        <Select
          name="service"
          size="lg"
          options={form.services}
          value={values.service}
          onChange={update('service')}
        />
      </Field>
      <Field label={form.labels.message} required>
        <Input
          name="message"
          multiline
          rows={6}
          required
          placeholder={form.placeholders.message}
          value={values.message}
          onChange={update('message')}
        />
      </Field>
      {/* Honeypot: visually hidden and skipped by assistive tech. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={update('website')}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-[16px]">
        <Button
          variant="primary"
          size="lg"
          type="submit"
          disabled={status === 'sending'}
          aria-busy={status === 'sending'}
        >
          {status === 'sending' ? form.sending : form.submit}
        </Button>
        <p className="m-0 max-w-[44ch] text-[13px] leading-[1.5] text-on-paper-3">
          {form.privacyNote}{' '}
          <Link
            href={form.privacyHref}
            className="border-0 border-b border-current text-on-paper-2 hover:text-on-paper"
          >
            {form.privacyLink}
          </Link>
          .
        </p>
      </div>
    </form>
  )
}

export default EnquiryForm
