import { useState } from 'react'

import Button from 'src/components/ui/Button/Button'
import Field from 'src/components/ui/Field/Field'
import Input from 'src/components/ui/Input/Input'
import OkweRow from 'src/components/ui/OkweRow/OkweRow'
import Select from 'src/components/ui/Select/Select'
import { contact } from 'src/content/site'

/**
 * The enquiry form. Submission is handled in the browser only, as in the
 * design: it swaps to the "Message received." panel.
 */
const ContactForm = () => {
  const [sent, setSent] = useState(false)
  const { form, success } = contact

  if (sent) {
    return (
      <div className="flex flex-col items-start gap-[18px] rounded-[3px] border border-acc-k bg-ok-bg px-[40px] py-[56px]">
        <OkweRow open={0} />
        <h3 className="m-0 font-display text-[40px] font-normal tracking-[-.02em]">
          {success.title}
        </h3>
        <p className="m-0 text-[17px] text-on-paper-2">{success.text}</p>
        <Button variant="primary" href="/#top">
          {success.back}
        </Button>
      </div>
    )
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setSent(true)
      }}
      className="flex flex-col gap-[24px]"
    >
      <div
        className="grid gap-[24px]"
        style={{
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))',
        }}
      >
        <Field label={form.name} required>
          <Input name="name" required size="lg" />
        </Field>
        <Field label={form.company}>
          <Input name="company" size="lg" />
        </Field>
        <Field label={form.email} required>
          <Input name="email" type="email" required size="lg" />
        </Field>
        <Field label={form.phone}>
          <Input name="phone" type="tel" size="lg" />
        </Field>
      </div>
      <Field label={form.service}>
        <Select name="service" size="lg" options={form.services} />
      </Field>
      <Field label={form.message} required>
        <Input name="message" multiline rows={6} required />
      </Field>
      <div>
        <Button variant="primary" size="lg" type="submit">
          {form.submit}
        </Button>
      </div>
    </form>
  )
}

export default ContactForm
