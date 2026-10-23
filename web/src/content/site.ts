/**
 * Every string the website shows, transcribed from docs/OKWE Website.dc.html.
 * Sections and pages read from here so copy never drifts between them.
 */

export const siteConfig = {
  customCursor: true,
  ambientMotion: true,
  mapLabels: true,
} as const

export type NavKey =
  | 'know'
  | 'coms'
  | 'move'
  | 'how'
  | 'customers'
  | 'faq'
  | 'contact'

export const nav: { key: NavKey; label: string; href: string }[] = [
  { key: 'know', label: 'Know', href: '/#knows' },
  { key: 'coms', label: 'Coms', href: '/#coms' },
  { key: 'move', label: 'Move', href: '/#move' },
  { key: 'how', label: 'How it works', href: '/#how' },
  { key: 'customers', label: 'Customers', href: '/#customers' },
  { key: 'faq', label: 'FAQ', href: '/#faq' },
  { key: 'contact', label: 'Contact', href: '/#contact' },
]

export const brand = {
  wordmark: 'OKWE',
  requestQuote: 'Request a quote',
  location: 'Lagos',
  coordinates: '06°27′N 03°23′E',
  timezone: 'WAT',
}

export const hero = {
  eyebrow: 'Integrated trade & logistics',
  lines: [
    { em: 'Know', rest: ' the opportunity.' },
    { em: 'Connect', rest: ' the trade.' },
    { em: 'Move', rest: ' the goods.' },
  ],
  lede: 'One integrated trade and logistics business — from market intelligence to delivery at destination.',
  primary: 'Start a trade conversation  →',
  secondary: 'How it works',
  trustedLabel: 'Trusted across',
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
  eyebrow: 'The Core Idea',
  title: 'One operating system for trade.',
  lede: 'Okwe is built around a simple trade journey. Three connected processes that work as one — from market intelligence and sourcing through commercial execution and logistics.',
  processes: [
    {
      n: '01',
      word: 'Know',
      text: 'Understand the product, market, supplier, buyer, and commercial environment.',
      link: '→ Okwe Knows',
      href: '/#knows',
    },
    {
      n: '02',
      word: 'Connect',
      text: 'Communicate, build relationships, negotiate, and facilitate the transaction.',
      link: '→ Okwe Coms',
      href: '/#coms',
    },
    {
      n: '03',
      word: 'Move',
      text: 'Coordinate the physical movement of goods from origin to destination.',
      link: '→ Okwe Move',
      href: '/#move',
    },
  ],
}

export const services = {
  eyebrow: 'What Okwe Does',
  titleLines: ['Three processes.', 'One business.'],
  lede: 'Click any process to see what it covers.',
  rows: [
    {
      n: '01',
      title: 'Okwe Knows',
      sub: 'Knowledge & Intelligence',
      href: '/#knows',
    },
    {
      n: '02',
      title: 'Okwe Coms',
      sub: 'Communication & Commerce',
      href: '/#coms',
    },
    {
      n: '03',
      title: 'Okwe Move',
      sub: 'Movement & Logistics',
      href: '/#move',
    },
  ],
}

export const knows = {
  counter: '01 / 03',
  category: 'Knowledge & Intelligence',
  imagePlaceholder:
    'Photograph — close-up of product samples, trade documents, market research',
  image: '/okwe-image/trade-sample-research.jpeg',
  imageAlt: 'Product samples, trade documents and market research on a desk',
  statement:
    'We gather, organize, and apply the information needed to make informed trade decisions — so you know what is available, where it is available, and who needs it.',
  purposeLabel: 'Purpose',
  purpose:
    'Know what is available, where it is available, who needs it, and how the trade can be executed.',
  coversLabel: 'What it covers',
  coversCode: 'K / 06',
  items: [
    { code: 'K·01', text: 'Market & product research' },
    { code: 'K·02', text: 'Supplier & buyer research' },
    { code: 'K·03', text: 'Product sourcing' },
    { code: 'K·04', text: 'Pricing & availability' },
    { code: 'K·05', text: 'Regulatory & documentation' },
    { code: 'K·06', text: 'Opportunity identification' },
  ],
}

export const coms = {
  counter: '02 / 03',
  category: 'Communication & Commerce',
  imagePlaceholder:
    'Photograph — two traders at a table, hands, samples, a negotiation',
  image: '/okwe-image/two-traders.jpeg',
  imageAlt: 'Two traders reviewing product samples and documents at a table',
  hubLabel: ['Okwe', 'Coms'],
  statement:
    'We connect the parties involved in a transaction and help move an opportunity toward an actual trade.',
  purposeLabel: 'Purpose',
  purpose:
    'Turn information and opportunities into commercial relationships and transactions.',
  items: [
    'Buyer & supplier communication',
    'Business introductions',
    'Procurement coordination',
    'Negotiation & quotations',
    'Transaction coordination',
    'Trade documentation',
  ],
}

export const move = {
  counter: '03 / 03',
  category: 'Movement & Logistics',
  imagePlaceholderWide:
    'Photograph — port crane, road freight or cargo detail, full height',
  imagePlaceholderNarrow:
    'Photograph — port crane, road freight or cargo detail',
  image: '/okwe-image/port-cranes.jpeg',
  imageAlt: 'Port cranes lifting a shipping container onto a truck',
  statement:
    'Once a trade is agreed, we coordinate the physical movement of goods through the right logistics channels.',
  purposeLabel: 'Purpose',
  purpose:
    'Get the right goods from the right place to the right destination, efficiently.',
  scrollHint: 'Keep scrolling — the route runs sideways →',
  origin: 'Origin',
  destination: 'Destination',
  stops: [
    { code: 'M·01', text: 'Freight & shipping coordination' },
    { code: 'M·02', text: 'Import & export logistics' },
    { code: 'M·03', text: 'Cargo handling & warehousing' },
    { code: 'M·04', text: 'Distribution & delivery' },
    { code: 'M·05', text: 'Shipment tracking' },
    { code: 'M·06', text: 'Origin-to-destination management' },
  ],
}

export type StepTag = 'Knows' | 'Coms' | 'Move'

export const how = {
  eyebrow: 'How It Works',
  title: 'From opportunity to destination.',
  lede: 'Five steps. One integrated pathway through the entire trade process — use all of it, or only the part you need.',
  steps: [
    {
      n: '01',
      tag: 'Knows' as StepTag,
      word: 'Identify',
      text: 'We find the product, supplier, buyer, or opportunity.',
    },
    {
      n: '02',
      tag: 'Coms' as StepTag,
      word: 'Connect',
      text: 'We establish communication and facilitate the deal.',
    },
    {
      n: '03',
      tag: 'Coms' as StepTag,
      word: 'Transact',
      text: 'Terms are agreed and the transaction is coordinated.',
    },
    {
      n: '04',
      tag: 'Move' as StepTag,
      word: 'Move',
      text: 'We coordinate the logistics to move the goods.',
    },
    {
      n: '05',
      tag: 'Move' as StepTag,
      word: 'Deliver',
      text: 'Goods reach their destination. Trade is complete.',
    },
  ],
}

export const customers = {
  eyebrow: 'Who We Serve',
  title: 'Built for everyone in the trade cycle.',
  lede: 'From SMEs entering new markets to established cross-border traders — Okwe fits into different parts of the trade cycle depending on your needs.',
  imagePlaceholder:
    'Photograph — market, warehouse or port infrastructure, wide cinematic crop',
  image: '/okwe-image/market-warehouse.jpeg',
  imageAlt: 'Warehouse and port workers handling cargo and containers',
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
  eyebrow: 'Positioning',
  title: 'At the intersection of trade.',
  lede: 'Our differentiation comes from combining four things most companies handle separately.',
  quadrants: [
    {
      n: '01',
      word: 'Information',
      text: 'Market intelligence, sourcing, and opportunity data.',
    },
    {
      n: '02',
      word: 'Relationships',
      text: 'Buyers, suppliers, and partners connected with trust.',
    },
    {
      n: '03',
      word: 'Trade',
      text: 'Negotiation, coordination, and commercial execution.',
    },
    {
      n: '04',
      word: 'Movement',
      text: 'Freight, handling, and delivery to destination.',
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
      word: 'Integrated',
      text: 'Information, relationships, trade, and movement in one business.',
      a: '0 0.4',
    },
    {
      n: '02',
      word: 'Efficient',
      text: 'One pathway instead of juggling separate suppliers and logistics.',
      a: '0.1 0.5',
    },
    {
      n: '03',
      word: 'Connected',
      text: 'An ecosystem where information leads to connections, and connections to movement.',
      a: '0.2 0.6',
    },
  ],
}

export const vision = {
  marquee: 'Information → Connections → Transactions → Movement →',
  eyebrow: 'Long-Term Vision',
  title: 'A connected ecosystem around trade.',
  lede: 'Okwe is growing into an integrated trade platform — where information leads to connections, connections to transactions, and transactions to movement.',
  rows: [
    {
      n: '01',
      word: 'Information',
      text: 'Discover opportunities with confidence',
    },
    { n: '02', word: 'Connections', text: 'Build commercial relationships' },
    { n: '03', word: 'Transactions', text: 'Execute trade with coordination' },
    { n: '04', word: 'Movement', text: 'Deliver goods across markets' },
  ],
}

export const faq = {
  eyebrow: 'FAQ',
  title: 'Understanding Okwe, simply.',
  lede: 'Short answers to what people ask us most.',
  cta: 'Ask us anything →',
  items: [
    {
      code: 'Q·01',
      q: 'Are you just a logistics / shipping company?',
      a: 'No. Logistics (Okwe Move) is only one of three processes. We also handle research and sourcing (Okwe Knows) and commercial coordination (Okwe Coms). That combination is what makes Okwe integrated.',
    },
    {
      code: 'Q·02',
      q: 'Can I use only one part — e.g. just sourcing or just movement?',
      a: 'Yes. The five steps (Identify → Connect → Transact → Move → Deliver) work as one pathway, but you can enter at any point. Need only research? Only freight coordination? We fit into the part of the trade cycle you need.',
    },
    {
      code: 'Q·03',
      q: 'Who do you work with?',
      a: 'Importers, exporters, manufacturers, wholesalers, distributors, retailers, SMEs entering new markets, and any business involved in cross-border trade — whether seeking suppliers or buyers.',
    },
    {
      code: 'Q·04',
      q: 'How do we start?',
      a: 'Send a message through the Contact page describing your product, market, or deal. We review it, identify the opportunity, and propose the right Know → Connect → Move pathway for you.',
    },
    {
      code: 'Q·05',
      q: 'What does “Know. Connect. Move.” mean in practice?',
      a: 'Know: we research the product, market, and counterparties. Connect: we introduce parties, negotiate, and coordinate the transaction. Move: we coordinate freight, handling, and delivery to destination.',
    },
  ],
}

export const cta = {
  eyebrow: 'Ready to trade?',
  title: "Let's move your next trade forward.",
  lede: "Tell us what you need. We'll help you know the opportunity, connect the trade, and move the goods.",
  primary: 'Contact Okwe  →',
  secondary: 'Explore services',
}

export const contact = {
  eyebrow: 'Contact',
  title: "Let's talk about your next trade.",
  lede: 'Tell us what you need. We help you know the opportunity, connect the trade, and move the goods.',
  getInTouch: 'Get in touch',
  emailLabel: 'Email',
  email: 'hello@okwe.com',
  phoneLabel: 'Phone',
  phone: '+234 000 000 0000',
  locationLabel: 'Location',
  location: 'Lagos, Nigeria',
  promiseLabel: 'Okwe promise',
  promise: 'Know the opportunity. Connect the trade. Move the goods.',
  form: {
    name: 'Name',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    service: 'What do you need help with?',
    message: 'Message',
    submit: 'Send message',
    services: [
      'Okwe Knows — Research & Sourcing',
      'Okwe Coms — Commercial Coordination',
      'Okwe Move — Logistics & Movement',
      'All of the above',
      'Something else',
    ],
  },
  success: {
    title: 'Message received.',
    text: "Thank you. We'll review your message and get back to you shortly.",
    back: 'Back to home',
  },
}

export const footer = {
  blurb:
    'Integrated trade and logistics. We help you know the opportunity, connect the trade, and move the goods.',
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
      { label: 'Contact', href: '/#contact' },
    ],
  },
  contactLabel: 'Contact',
  watermark: 'Know. Connect. Move.',
  rights: 'Okwe Import Export Solutions. All rights reserved.',
  tagline: 'Know. Connect. Move.',
}
