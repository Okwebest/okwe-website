/**
 * Every string the website shows. Sections and pages read from here so copy
 * never drifts between them.
 *
 * Voice: written for the customer, not about Okwe. Name the frustration first,
 * then what Okwe does about it, in plain English. "Okwe Knows / Coms / Move"
 * are kept as chapter names; everything around them explains the benefit.
 *
 * Several arrays feed fixed layouts (six Knows items for the dot field, six
 * Coms labels around the hub, six Move stops on the route, five steps, four
 * quadrants, thirteen promise words with reveal windows). Keep those lengths.
 */

import { images } from './images'

export const siteConfig = {
  customCursor: true,
  ambientMotion: true,
  mapLabels: true,
} as const

export type NavKey =
  'know' | 'coms' | 'move' | 'how' | 'customers' | 'faq' | 'contact'

export const nav: { key: NavKey; label: string; href: string }[] = [
  { key: 'know', label: 'Know', href: '/#knows' },
  { key: 'coms', label: 'Connect', href: '/#coms' },
  { key: 'move', label: 'Move', href: '/#move' },
  { key: 'how', label: 'How it works', href: '/#how' },
  { key: 'customers', label: 'Customers', href: '/#customers' },
  { key: 'faq', label: 'FAQ', href: '/#faq' },
  { key: 'contact', label: 'Contact', href: '/#contact' },
]

export const brand = {
  wordmark: 'OKWE',
  legalName: 'Okwe Import Export Solutions',
  requestQuote: 'Talk to Okwe',
  location: 'Lagos',
  coordinates: '06°27′N 03°23′E',
  timezone: 'WAT',
}

export const hero = {
  eyebrow: 'Trade without the runaround',
  lines: [
    { em: 'Know', rest: ' the opportunity.' },
    { em: 'Connect', rest: ' the trade.' },
    { em: 'Move', rest: ' the goods.' },
  ],
  lede: 'Finding a buyer you can trust, agreeing a fair price and getting the goods to the door shouldn’t take three companies and a hundred phone calls. Tell us what you’re trading. We handle the rest and keep you informed.',
  primary: 'Tell us what you’re trading  →',
  secondary: 'See how it works',
  trustedLabel: 'Built for',
  trusted: [
    'Importers',
    'Exporters',
    'Manufacturers',
    'Distributors',
    'Retailers',
  ],
  scrollHint: 'Scroll ↓',
  readoutOrigin: 'Origin',
}

export const coreIdea = {
  eyebrow: 'Why Okwe exists',
  title: 'Three things go wrong in trade. We fix all three.',
  lede: 'A supplier who isn’t who they said. A deal that stalls over paperwork. A shipment nobody is watching. That is where traders lose money, and that is exactly what Okwe takes off your plate.',
  processes: [
    {
      n: '01',
      word: 'Know',
      text: 'Is this supplier real? Is this price fair? We check before you pay.',
      link: '→ Okwe Knows',
      href: '/#knows',
    },
    {
      n: '02',
      word: 'Connect',
      text: 'Will the deal actually close? We keep both sides talking until it’s signed and the papers are right.',
      link: '→ Okwe Coms',
      href: '/#coms',
    },
    {
      n: '03',
      word: 'Move',
      text: 'Where are my goods? We book, track and deliver, and tell you where they are.',
      link: '→ Okwe Move',
      href: '/#move',
    },
  ],
}

export const services = {
  eyebrow: 'What we do for you',
  titleLines: ['Start with the part', 'that’s hurting.'],
  lede: 'Take one service or the whole trade. Tap any row to see what it covers.',
  rows: [
    {
      n: '01',
      title: 'Okwe Knows',
      sub: 'Check a market, product, supplier or buyer',
      href: '/#knows',
    },
    {
      n: '02',
      title: 'Okwe Coms',
      sub: 'Agree the deal and get the paperwork right',
      href: '/#coms',
    },
    {
      n: '03',
      title: 'Okwe Move',
      sub: 'Ship, clear and deliver the goods',
      href: '/#move',
    },
  ],
}

export const knows = {
  counter: '01 / 03',
  category: 'Research & Sourcing',
  imagePlaceholder:
    'Photograph — close-up of product samples, trade documents, market research',
  image: images.knows,
  statement:
    '“I found a supplier online. How do I know they’re real, and that the price is fair?”',
  purposeLabel: 'What we do about it',
  purpose:
    'We check for you: who they are, what they have sold before, what the product really costs and whether your market wants it. You decide with facts, not hope.',
  coversLabel: 'What we find out for you',
  coversCode: 'K / 06',
  items: [
    { code: 'K·01', text: 'Which markets actually want your product' },
    { code: 'K·02', text: 'Suppliers and buyers you can verify' },
    { code: 'K·03', text: 'Where to source it, at what quality' },
    { code: 'K·04', text: 'Real prices and current availability' },
    { code: 'K·05', text: 'The permits and paperwork you’ll need' },
    { code: 'K·06', text: 'Deals worth your time, flagged early' },
  ],
}

export const coms = {
  counter: '02 / 03',
  category: 'Deals & Paperwork',
  imagePlaceholder:
    'Photograph — two traders at a table, hands, samples, a negotiation',
  image: images.coms,
  hubLabel: ['Okwe', 'Coms'],
  statement: '“We’ve been talking for weeks and nothing is signed.”',
  purposeLabel: 'What we do about it',
  purpose:
    'We keep both sides moving, settle price and terms, and make sure the documents are right the first time, so the deal closes instead of fading away.',
  items: [
    'Introductions',
    'Clear communication',
    'Buying for you',
    'Price & terms',
    'Deal follow-through',
    'Correct paperwork',
  ],
}

export const move = {
  counter: '03 / 03',
  category: 'Shipping & Delivery',
  imagePlaceholderWide:
    'Photograph — port crane, road freight or cargo detail, full height',
  imagePlaceholderNarrow:
    'Photograph — port crane, road freight or cargo detail',
  image: images.move,
  statement:
    '“The goods left two weeks ago. Nobody can tell me where they are.”',
  purposeLabel: 'What we do about it',
  purpose:
    'One number to call for the whole journey. You always know where your goods are and when they land. Shipping and clearance run through licensed partners we manage while our own licence is in progress.',
  scrollHint: 'Keep scrolling — the route runs sideways →',
  origin: 'Origin',
  destination: 'Destination',
  stops: [
    { code: 'M·01', text: 'Booking the freight' },
    { code: 'M·02', text: 'Import & export clearance' },
    { code: 'M·03', text: 'Handling & storage' },
    { code: 'M·04', text: 'Last-mile delivery' },
    { code: 'M·05', text: 'Live shipment updates' },
    { code: 'M·06', text: 'One point of contact' },
  ],
}

export type StepTag = 'Knows' | 'Coms' | 'Move'

export const how = {
  eyebrow: 'How it works',
  title: 'What working with us looks like.',
  lede: 'From “I have an idea” to “it has arrived”, in five steps. Use all five or just the one you’re stuck on.',
  steps: [
    {
      n: '01',
      tag: 'Knows' as StepTag,
      word: 'Identify',
      text: 'We find the product, the buyer or the supplier you’re missing, and check they’re real.',
    },
    {
      n: '02',
      tag: 'Coms' as StepTag,
      word: 'Connect',
      text: 'We open the conversation and keep it moving so the deal doesn’t die in a message thread.',
    },
    {
      n: '03',
      tag: 'Coms' as StepTag,
      word: 'Agree',
      text: 'Price, quantity, payment and delivery terms are settled and written down properly.',
    },
    {
      n: '04',
      tag: 'Move' as StepTag,
      word: 'Move',
      text: 'We book the freight, handle clearance and keep you updated along the way.',
    },
    {
      n: '05',
      tag: 'Move' as StepTag,
      word: 'Deliver',
      text: 'Your goods arrive where they should. You get on with selling them.',
    },
  ],
}

export const customers = {
  eyebrow: 'Who we work with',
  title: 'For anyone tired of doing trade the hard way.',
  lede: 'First-time importer or seasoned distributor, you bring the part of the trade that keeps you up at night. We take it from there.',
  imagePlaceholder:
    'Photograph — market, warehouse or port infrastructure, wide cinematic crop',
  image: images.customers,
  tags: [
    'Importers',
    'Exporters',
    'Manufacturers',
    'Wholesalers',
    'Distributors',
    'Retailers',
    'SMEs',
    'International suppliers',
    'International buyers',
    'Cross-border traders',
  ],
}

export const positioning = {
  eyebrow: 'Why Okwe',
  title: 'Why one team beats four vendors.',
  lede: 'Research firms, sourcing agents, brokers and freight forwarders each see one slice of your trade and blame the others when it goes wrong. We hold the whole thing.',
  quadrants: [
    {
      n: '01',
      word: 'Facts',
      text: 'What’s selling, where, at what price — checked, not guessed.',
    },
    {
      n: '02',
      word: 'People',
      text: 'Buyers and suppliers who pick up the phone, because we’ve vetted them.',
    },
    {
      n: '03',
      word: 'Deals',
      text: 'Terms you understand, agreed in writing, with paperwork that holds.',
    },
    {
      n: '04',
      word: 'Delivery',
      text: 'Goods that arrive when promised, and one person to call if they don’t.',
    },
  ],
}

export const promise = {
  eyebrow: 'The Okwe Promise',
  /** Each word carries its own reveal window; `em` words are set in brass. */
  words: [
    { text: 'We', a: '0.05 0.2' },
    { text: 'help', a: '0.1 0.25' },
    { text: 'you', a: '0.15 0.3' },
    { text: 'know', a: '0.2 0.35', em: true },
    { text: 'the', a: '0.25 0.4' },
    { text: 'opportunity,', a: '0.3 0.45' },
    { text: 'connect', a: '0.35 0.5', em: true },
    { text: 'the', a: '0.4 0.55' },
    { text: 'trade,', a: '0.45 0.6' },
    { text: 'and', a: '0.5 0.65' },
    { text: 'move', a: '0.55 0.7', em: true },
    { text: 'the', a: '0.6 0.75' },
    { text: 'goods.', a: '0.65 0.8' },
  ],
  rows: [
    {
      n: '01',
      word: 'One team',
      text: 'Accountable for the whole trade, so nobody points fingers.',
      a: '0 0.4',
    },
    {
      n: '02',
      word: 'Less hassle',
      text: 'Fewer calls, fewer middlemen, fewer surprises on your invoice.',
      a: '0.1 0.5',
    },
    {
      n: '03',
      word: 'Always informed',
      text: 'You know where your deal and your goods are, at every step.',
      a: '0.2 0.6',
    },
  ],
}

export const vision = {
  marquee: 'Know → Connect → Move → Delivered →',
  eyebrow: 'Where we’re headed',
  title: 'Trade that feels as simple as ordering online.',
  lede: 'We’re building Okwe into one place where you can check a market, find someone you can trust, close the deal and follow the shipment — without juggling five vendors and a hundred messages.',
  rows: [
    { n: '01', word: 'Insight', text: 'Check a market before you commit' },
    { n: '02', word: 'Trust', text: 'Deal with people who have been vetted' },
    {
      n: '03',
      word: 'Deals',
      text: 'Close without the endless back-and-forth',
    },
    { n: '04', word: 'Delivery', text: 'Follow your goods from door to door' },
  ],
}

export const faq = {
  eyebrow: 'FAQ',
  title: 'Understanding Okwe, simply.',
  lede: 'Plain answers to what new customers ask us first.',
  cta: 'Ask us anything →',
  items: [
    {
      code: 'Q·01',
      q: 'Are you just a logistics / shipping company?',
      a: 'No. Shipping is only the last part. First we help you find out what sells and who to trust, then we help you agree the deal with proper paperwork, and only then do the goods move. Use one part or all three.',
    },
    {
      code: 'Q·02',
      q: 'Can I use only one part — just sourcing, or just shipping?',
      a: 'Yes. Most customers come to us with one problem: a supplier they can’t verify, a deal stuck on paperwork, or a container that needs clearing. We fix that part. If you want the rest later, the same team already knows your trade.',
    },
    {
      code: 'Q·03',
      q: 'Who do you work with?',
      a: 'Importers, exporters, manufacturers, wholesalers, distributors, retailers and small businesses trading across borders for the first time. If you buy or sell goods between Nigeria and the rest of the world, or want to start, we can help.',
    },
    {
      code: 'Q·04',
      q: 'How do we start?',
      a: 'Message us on WhatsApp, call, or fill in the short form below. Tell us what you’re trading, where, and what is slowing you down. We come back with how we would handle it and what it would cost.',
    },
    {
      code: 'Q·05',
      q: 'What do “Know. Connect. Move.” actually mean?',
      a: 'Know: we find out what sells, what it costs and who is trustworthy. Connect: we get you to the right people and help you agree the deal. Move: we get the goods delivered and keep you informed. Three plain promises, one team.',
    },
    {
      code: 'Q·06',
      q: 'Do you have your own import/export licence?',
      a: 'Not yet. It is in progress. For now the regulated steps, such as customs clearance, freight and bonded storage, are done by licensed partners we choose and manage, while we handle the research, the deal, the tracking and the updates. You always know who is doing what. The full statement is in our Disclaimer.',
    },
  ],
}

export const cta = {
  eyebrow: 'Ready when you are',
  title: 'Stop chasing. Start trading.',
  lede: 'Tell us the product, the market or the problem. We’ll come back with a plan and a price. No jargon, no obligation.',
  primary: 'Contact Okwe  →',
  secondary: 'See what we do',
}

export const contact = {
  eyebrow: 'Contact',
  title: 'Tell us what’s slowing your trade down.',
  lede: 'Describe the product, the market or the problem. We’ll tell you how we would handle it, and what it would cost.',
  getInTouch: 'Get in touch',
  emailLabel: 'Email',
  email: 'hello@okwe.com',
  phoneLabel: 'Phone',
  phone: '+234 810 797 3645',
  phoneHref: 'tel:+2348107973645',
  whatsappLabel: 'WhatsApp',
  whatsappHint: 'Fastest reply',
  whatsapp: '+234 810 797 3645',
  whatsappHref:
    'https://wa.me/2348107973645?text=' +
    encodeURIComponent('Hello Okwe, I’d like to talk about a trade.'),
  locationLabel: 'Location',
  location: '10 Block C Mogbonjubola Street, Lagos, Nigeria',
  promiseLabel: 'Okwe promise',
  promise: 'Know the opportunity. Connect the trade. Move the goods.',
  form: {
    title: 'Send us the details',
    intro: 'Takes about two minutes. We reply by email or WhatsApp.',
    /**
     * Submissions post straight into Okwe's Google Form, so they appear with
     * every other response. Field ids come from the form's own page
     * (FB_PUBLIC_LOAD_DATA_); if the form is edited, update them here.
     */
    action:
      'https://docs.google.com/forms/d/e/1FAIpQLSevjcBRrC_RL_V0ksXcDQmVQxOlK_5tefY1d5CgpeEuN5xlEA/formResponse',
    viewUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSevjcBRrC_RL_V0ksXcDQmVQxOlK_5tefY1d5CgpeEuN5xlEA/viewform',
    fields: {
      name: 'entry.142985105',
      company: 'entry.1841417774',
      email: 'entry.1481305974',
      phone: 'entry.1597221126',
      service: 'entry.1038939625',
      message: 'entry.845999026',
    },
    labels: {
      name: 'Your name',
      company: 'Company',
      email: 'Email',
      phone: 'Phone or WhatsApp number',
      service: 'What do you need help with?',
      message: 'Tell us about the trade',
    },
    placeholders: {
      phone: '+234 …',
      message:
        'What are you buying or selling, where is it going, and what is slowing you down?',
    },
    /** Labels are Okwe's words; values are the exact Google Form options. */
    services: [
      {
        label: 'Checking a market, product, supplier or buyer',
        value: 'Research and Sourcing',
      },
      {
        label: 'Agreeing a deal and getting the paperwork right',
        value: 'Commercial Coordination',
      },
      {
        label: 'Shipping, clearing and delivering goods',
        value: 'Logistics and Movement',
      },
      { label: 'The whole trade, start to finish', value: 'All of the Above' },
      { label: 'Something else', value: 'Something else' },
    ],
    submit: 'Send message',
    sending: 'Sending…',
    success: {
      title: 'Message received.',
      text: 'Thank you. We’ll read it and reply by email or WhatsApp.',
      back: 'Back to home',
    },
    error: {
      title: 'That didn’t go through.',
      text: 'Your message is still here. Try again, or send it to us on WhatsApp.',
      retry: 'Try again',
      whatsapp: 'Message us on WhatsApp',
      fallback: 'Open the form on Google ↗',
    },
    privacyNote:
      'Your details go only to Okwe. How we handle them is explained in our',
    privacyLink: 'Privacy Policy',
    privacyHref: '/legal/privacy',
  },
}

export const footer = {
  blurb:
    'We help businesses that buy and sell across borders know what they’re getting into, agree good deals and get their goods delivered.',
  services: {
    label: 'Services',
    links: [
      { label: 'Okwe Knows', href: '/#knows', hover: 'hover:text-lagoon-300' },
      { label: 'Okwe Coms', href: '/#coms', hover: 'hover:text-brass-300' },
      { label: 'Okwe Move', href: '/#move', hover: 'hover:text-persimmon-400' },
    ],
  },
  company: {
    label: 'Company',
    links: [
      { label: 'How it works', href: '/#how' },
      { label: 'Customers', href: '/#customers' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  legal: {
    label: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Use', href: '/legal/terms' },
      { label: 'Data Processing Agreement', href: '/legal/dpa' },
      { label: 'Disclaimer', href: '/legal/disclaimer' },
    ],
  },
  contactLabel: 'Contact',
  watermark: 'Know. Connect. Move.',
  rights: 'Okwe Import Export Solutions. All rights reserved.',
  tagline: 'Know. Connect. Move.',
}
