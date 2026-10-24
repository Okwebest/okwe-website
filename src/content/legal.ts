/**
 * The four legal documents served at /legal/<slug>.
 *
 * These are working drafts written for Okwe Import Export Solutions, Lagos,
 * Nigeria, with the Nigeria Data Protection Act 2023 (NDPA) in mind. They use
 * only facts known about the business (name, city, email, phone, the Google
 * Form, no cookies or analytics) and must be reviewed by counsel before they
 * are relied on. Update `effectiveDate` whenever the text changes.
 */

import { brand, contact } from './site'

export type LegalSlug = 'privacy' | 'terms' | 'dpa' | 'disclaimer'

export type LegalSection = {
  /** Mono code shown beside the heading, e.g. "§·01". */
  code: string
  heading: string
  paragraphs: string[]
  bullets?: string[]
  /** A paragraph shown after the bullets. */
  after?: string[]
}

export type LegalDoc = {
  slug: LegalSlug
  title: string
  eyebrow: string
  /** One or two sentences under the title; also the page description. */
  summary: string
  effectiveDate: string
  appliesTo: string
  sections: LegalSection[]
}

export const legalEffectiveDate = '2026-10-23'

export const legalPage = {
  effectiveLabel: 'Effective date',
  appliesLabel: 'Applies to',
  contentsLabel: 'Contents',
  questionsTitle: 'Questions about this document?',
  questionsText: `Write to ${contact.email} or message us on WhatsApp. We answer questions about how we handle your information ourselves, not through a call centre.`,
  questionsCta: 'Contact Okwe →',
  otherLabel: 'Other documents',
}

const company = brand.legalName
const email = contact.email
const phone = contact.phone

const section = (
  n: number,
  heading: string,
  paragraphs: string[],
  extra: { bullets?: string[]; after?: string[] } = {}
): LegalSection => ({
  code: `§·${String(n).padStart(2, '0')}`,
  heading,
  paragraphs,
  ...extra,
})

export const privacyPolicy: LegalDoc = {
  slug: 'privacy',
  title: 'Privacy Policy',
  eyebrow: 'Legal',
  summary:
    'What we collect when you visit this website or get in touch, why we collect it, who sees it and the choices you have.',
  effectiveDate: legalEffectiveDate,
  appliesTo: 'Visitors to okwe.com and anyone who contacts Okwe',
  sections: [
    section(1, 'Who we are', [
      `${company} (“Okwe”, “we”, “us”) is a trade and logistics business based in Lagos, Nigeria. We help businesses research markets, reach buyers and suppliers, agree deals and move goods.`,
      `For anything in this policy, write to ${email} or call ${phone}. Okwe is the data controller for the personal information described here, within the meaning of the Nigeria Data Protection Act 2023 (the “NDPA”).`,
    ]),
    section(
      2,
      'What this website collects',
      [
        'This website is a set of static pages. It does not set cookies, does not run analytics or advertising scripts, and does not fingerprint your device.',
      ],
      {
        bullets: [
          'Theme preference. If you switch between light and dark mode, the choice is stored in your own browser (localStorage) and never sent to us.',
          'Server logs. The server that delivers the pages records the standard technical details of each request (IP address, time, page requested, browser type) for security and to keep the site running. Logs are kept for a short, rolling period.',
          'The enquiry form. The form on our Contact page is hosted by Google Forms. What you type (name, company, email, phone number, what you need help with and your message) is sent to Google and then to us. Google’s own privacy policy applies to the form itself.',
          'Direct contact. If you email, call or message us on WhatsApp we keep the correspondence and the contact details you give us.',
        ],
      }
    ),
    section(
      3,
      'Why we use your information and our lawful basis',
      [
        'We use your information only for the reasons below, each of which has a basis in section 25 of the NDPA.',
      ],
      {
        bullets: [
          'To answer your enquiry and discuss how we could help. Basis: steps taken at your request before entering a contract, and our legitimate interest in responding to people who contact us.',
          'To provide a service you have engaged us for, including research, introductions, deal support and shipping. Basis: performance of a contract with you.',
          'To keep the website secure and available. Basis: our legitimate interest in protecting our systems.',
          'To meet legal obligations, for example customs, tax or anti-money-laundering record keeping. Basis: compliance with a legal obligation.',
          'To send you updates about Okwe, only if you have asked for them. Basis: consent, which you can withdraw at any time.',
        ],
      }
    ),
    section(
      4,
      'Who we share it with',
      [
        'We do not sell personal information and we do not share it for advertising. We share it only as far as necessary to do what you asked us to do:',
      ],
      {
        bullets: [
          'Google LLC, which hosts the enquiry form and processes submissions on our behalf.',
          'Meta Platforms, which operates WhatsApp, if you choose to contact us through it.',
          'Counterparties and service providers involved in a trade you have engaged us for: the buyers or suppliers we introduce you to, freight carriers, clearing agents, warehouses and insurers. We share only what each of them needs to perform their part.',
          'Our email and hosting providers, who store data for us under their own security commitments.',
          'Public authorities, where the law requires it, for example customs or a court order.',
        ],
      }
    ),
    section(5, 'International transfers', [
      'Some of the providers above, including Google and Meta, store data outside Nigeria. Where that happens we rely on the adequacy and safeguard provisions of the NDPA and on the contractual commitments those providers make. Trade counterparties are, by the nature of cross-border trade, often outside Nigeria; we share only what is needed for the trade you asked us to arrange.',
    ]),
    section(6, 'How long we keep it', [
      'We keep enquiry details for as long as the conversation is active and for up to 24 months afterwards, so we can pick up where we left off if you come back. Records of services we have delivered are kept for as long as Nigerian commercial, tax and customs law requires, typically six years. Server logs are kept for a short rolling period. When information is no longer needed we delete it or anonymise it.',
    ]),
    section(7, 'Your rights', ['Under the NDPA you have the right to:'], {
      bullets: [
        'Ask for a copy of the personal information we hold about you.',
        'Ask us to correct information that is inaccurate or incomplete.',
        'Ask us to delete your information, where we no longer have a lawful reason to keep it.',
        'Object to, or ask us to restrict, a particular use of your information.',
        'Receive the information you gave us in a portable format.',
        'Withdraw consent at any time, where consent is the basis we rely on.',
        'Lodge a complaint with the Nigeria Data Protection Commission (NDPC) if you believe we have handled your information unlawfully.',
      ],
      after: [
        `To exercise any of these rights, email ${email}. We will respond within the time the NDPA allows and we will not charge you unless a request is clearly excessive.`,
      ],
    }),
    section(8, 'How we protect it', [
      'The website is served over HTTPS with strict security headers and loads no third-party scripts. Within Okwe, access to enquiries and customer records is limited to the people who need it to serve you. We review the providers we use and rely on their published security commitments. No system is perfectly secure; if a breach affects your information we will tell you and the NDPC as the NDPA requires.',
    ]),
    section(9, 'Children', [
      'Our services are for businesses and the people who run them. We do not knowingly collect information from anyone under 18. If you believe a child has sent us information, contact us and we will delete it.',
    ]),
    section(10, 'Changes to this policy', [
      'We will update this policy when our practices or the law change and will show the new effective date at the top of the page. Significant changes will also be mentioned on the Contact page for a period after they take effect.',
    ]),
  ],
}

export const termsOfUse: LegalDoc = {
  slug: 'terms',
  title: 'Terms of Use',
  eyebrow: 'Legal',
  summary:
    'The rules for using this website and the enquiry form. Services we provide to you are governed by a separate written agreement.',
  effectiveDate: legalEffectiveDate,
  appliesTo: 'Everyone who uses okwe.com',
  sections: [
    section(1, 'Agreement to these terms', [
      `By using this website you agree to these Terms of Use. If you do not agree, please do not use the site. The site is operated by ${company} (“Okwe”, “we”, “us”), Lagos, Nigeria.`,
    ]),
    section(2, 'What this website is', [
      'This website describes the services Okwe offers. Nothing on it is an offer, a quotation or a promise to take on a particular trade. Any service we provide is agreed in writing, with its own price, scope and terms. Where those written terms differ from this page, the written terms apply.',
      'Okwe is currently obtaining its own import and export licence and delivers the regulated parts of a trade through licensed partners in the meantime. Our Disclaimer explains how this works and will be updated when the licence is granted.',
    ]),
    section(
      3,
      'Using the site and the enquiry form',
      [
        'You may use the site to learn about Okwe and to contact us. You agree not to:',
      ],
      {
        bullets: [
          'Send enquiries that are false, misleading, abusive or unlawful, or that concern goods that are illegal to trade.',
          'Attempt to gain unauthorised access to the site, its hosting or the form provider.',
          'Use automated tools to scrape the site or to submit the form.',
          'Copy, frame or republish the site or any part of it except as allowed below.',
        ],
        after: [
          'The enquiry form is provided by Google Forms and your use of it is also subject to Google’s terms of service. If you contact us through WhatsApp, WhatsApp’s terms apply to that service.',
        ],
      }
    ),
    section(4, 'Intellectual property', [
      'The text, design, photographs, diagrams and the Okwe name and mark on this site belong to Okwe or are used under licence. You may view and print pages for your own business use. Any other use, including reproducing the content commercially, needs our written permission.',
    ]),
    section(5, 'Information on the site', [
      'We try to keep the information on this site accurate and current, but markets, prices, regulations and shipping conditions change constantly. Information here is general and may be out of date when you read it. Please read our Disclaimer, which forms part of these terms.',
    ]),
    section(6, 'Links to other sites', [
      'The site may link to third-party websites and services. We do not control them and are not responsible for their content or practices. A link is not an endorsement.',
    ]),
    section(7, 'No warranty and limitation of liability', [
      'The website is provided “as is” and “as available”. To the fullest extent permitted by Nigerian law, we exclude all warranties about the website, including that it will be uninterrupted, error-free or free of harmful components, and we are not liable for any loss arising from your use of, or inability to use, the website or from reliance on information published on it. Nothing in these terms limits liability that cannot be limited by law, including for fraud or for death or personal injury caused by negligence.',
      'Liability for services we actually provide to you is addressed in the written agreement for those services, not here.',
    ]),
    section(8, 'Privacy', [
      'How we handle personal information is described in our Privacy Policy, which forms part of these terms.',
    ]),
    section(9, 'Governing law', [
      'These terms are governed by the laws of the Federal Republic of Nigeria. The courts of Lagos State have jurisdiction over any dispute about them, without prejudice to any right to refer a dispute to arbitration under a written service agreement.',
    ]),
    section(10, 'Changes and contact', [
      `We may update these terms from time to time; the effective date at the top shows when they last changed. Questions about these terms can be sent to ${email}.`,
    ]),
  ],
}

export const dataProcessingAgreement: LegalDoc = {
  slug: 'dpa',
  title: 'Data Processing Agreement',
  eyebrow: 'Legal',
  summary:
    'Our standard terms for handling personal data on behalf of a business customer while delivering a service. It is incorporated into a signed service agreement by reference.',
  effectiveDate: legalEffectiveDate,
  appliesTo: 'Business customers who engage Okwe for a service',
  sections: [
    section(1, 'Purpose and how this agreement applies', [
      `This Data Processing Agreement (“DPA”) sets out how ${company} (“Okwe”, the “Processor”) handles personal data on behalf of a customer (the “Customer”, the “Controller”) when delivering research, sourcing, deal support or logistics services under a written service agreement (the “Agreement”).`,
      'The DPA is incorporated into the Agreement by reference when the Agreement says so, or when the Customer and Okwe sign a copy of it. If this DPA conflicts with the Agreement on the handling of personal data, this DPA prevails. It is written to meet the requirements of the Nigeria Data Protection Act 2023 (the “NDPA”) and its implementing framework.',
    ]),
    section(2, 'Roles', [
      'For personal data the Customer gives Okwe to carry out the service, the Customer is the Controller and Okwe is the Processor. Where Okwe decides for itself how to use personal data, for example in keeping its own customer records or meeting its own legal duties, Okwe acts as a Controller and its Privacy Policy applies instead.',
    ]),
    section(
      3,
      'What is processed',
      [
        'Subject matter and duration: the personal data the Customer provides, or that Okwe collects at the Customer’s instruction, in connection with the service, for the term of the Agreement and any retention period in §·09.',
        'Nature and purpose of processing, by service:',
      ],
      {
        bullets: [
          'Know (research and sourcing): identifying and checking potential suppliers, buyers and markets named or described by the Customer.',
          'Connect (deals and paperwork): introducing the Customer to counterparties, exchanging messages and documents, and preparing trade paperwork.',
          'Move (shipping and delivery): booking freight, handling clearance, warehousing and delivery, and sharing shipment updates.',
        ],
        after: [
          'Categories of data subjects: the Customer’s staff and representatives; the staff and representatives of the Customer’s existing or prospective suppliers, buyers and partners; consignees and other people named on trade and shipping documents.',
          'Categories of personal data: names, job titles, employers, business contact details, correspondence, and the details that appear on commercial, customs and shipping documents. Okwe does not need, and the Customer agrees not to send, sensitive personal data as defined by the NDPA unless the parties agree additional safeguards in writing.',
        ],
      }
    ),
    section(4, 'Okwe’s obligations as Processor', ['Okwe will:'], {
      bullets: [
        'Process personal data only on the Customer’s documented instructions, which include the Agreement and this DPA, unless Nigerian law requires otherwise, in which case Okwe will tell the Customer first where the law allows.',
        'Make sure the people who handle the data are bound by confidentiality and have been told how to handle it.',
        'Apply appropriate technical and organisational security measures, taking into account the nature of the data and the risks, including access controls, encrypted transmission and secure storage.',
        'Tell the Customer without undue delay, and in any event within 72 hours of becoming aware, of a personal data breach affecting the Customer’s data, and give the information the Customer needs to meet its own NDPA notification duties.',
        'Help the Customer respond to data-subject requests (access, correction, deletion, objection and portability) and, where needed, with data protection impact assessments and consultations with the Nigeria Data Protection Commission.',
        'Keep a record of the processing it carries out for the Customer and make the information needed to demonstrate compliance with this DPA available on request.',
        'Tell the Customer promptly if, in Okwe’s view, an instruction infringes the NDPA.',
      ],
    }),
    section(5, 'Sub-processors', [
      'The Customer authorises Okwe to use sub-processors to deliver the service. At the effective date these are: Google (forms, email and document storage), Meta Platforms (WhatsApp messaging), Okwe’s website and email hosting providers, and the freight carriers, clearing agents, warehouses and insurers engaged for a specific shipment. Okwe will tell the Customer before adding a new category of sub-processor and will give the Customer a reasonable opportunity to object. Okwe remains responsible for its sub-processors’ handling of the data and will bind them to data-protection terms no less protective than this DPA.',
    ]),
    section(6, 'Trade counterparties', [
      'Introducing the Customer to a buyer or supplier necessarily involves sharing the Customer’s business contact details with that counterparty, and vice versa. Each counterparty then handles that information as its own Controller. Okwe will share only what is needed to make the introduction or to perform the trade, and will not pass on the Customer’s details to counterparties the Customer has not asked to be introduced to.',
    ]),
    section(7, 'International transfers', [
      'Cross-border trade means that counterparties, carriers and some providers are outside Nigeria. Okwe will transfer personal data outside Nigeria only where the transfer is necessary for the service, and only to recipients that offer an adequate level of protection or under appropriate safeguards as the NDPA allows, or where the Customer has given a specific instruction for a particular shipment or introduction.',
    ]),
    section(8, 'The Customer’s obligations', [
      'The Customer confirms that it has a lawful basis for giving the personal data to Okwe, that it has given the data subjects the notices the NDPA requires, that its instructions are lawful, and that it will not send Okwe more personal data than the service needs. The Customer is responsible for responding to data subjects, with Okwe’s assistance as described above.',
    ]),
    section(9, 'Return and deletion', [
      'When the Agreement ends, or earlier at the Customer’s written request, Okwe will return or delete the Customer’s personal data, at the Customer’s choice, except for copies Okwe must keep under Nigerian customs, tax, anti-money-laundering or other law, which Okwe will keep only for as long as that law requires and only for that purpose.',
    ]),
    section(10, 'Audit', [
      'On reasonable written notice, no more than once a year unless a regulator requires it or a breach has occurred, the Customer or an independent auditor bound by confidentiality may review Okwe’s compliance with this DPA. Okwe may satisfy the request by providing documentation, completed questionnaires or recent third-party reports before an on-site audit is considered.',
    ]),
    section(11, 'Liability and term', [
      'Each party’s liability under this DPA is subject to the limits and exclusions in the Agreement, except that nothing limits liability to data subjects or regulators where the NDPA does not permit it. This DPA lasts as long as Okwe holds personal data for the Customer.',
    ]),
    section(12, 'Contact and changes', [
      `Notices under this DPA go to ${email} for Okwe and to the Customer’s address in the Agreement. Okwe may update this standard DPA for future engagements; the version incorporated into an Agreement stays in force for that Agreement unless both parties agree a change in writing.`,
    ]),
  ],
}

export const disclaimer: LegalDoc = {
  slug: 'disclaimer',
  title: 'Disclaimer',
  eyebrow: 'Legal',
  summary:
    'The limits of what this website, and the information we share, can promise. Trade involves markets, borders and third parties that nobody fully controls.',
  effectiveDate: legalEffectiveDate,
  appliesTo: 'All content on okwe.com and general information we share',
  sections: [
    section(1, 'General information only', [
      `The content of this website is published by ${company} (“Okwe”) for general information about our services. It is not an offer, a quotation, a guarantee of any outcome, or advice tailored to your situation. Any work we do for you is defined in a written agreement.`,
    ]),
    section(2, 'Licensing and how we deliver today', [
      'Okwe is in the process of obtaining its own import and export licence. Until it is granted, the regulated parts of a trade, such as customs clearance, freight carriage and bonded storage, are carried out by licensed partners that we select, brief and coordinate.',
      'Okwe’s own work today is the part around those steps: market and counterparty research, deal support, shipment tracking and logistics monitoring, and keeping you informed from first enquiry to delivery. We tell you which partner is handling which step before it happens, and we remain your single point of contact throughout.',
      'We are building this way deliberately, so that our customers’ goods always move through properly licensed hands while we earn the trust and track record a licence holder should have. This page will be updated when our licence is granted.',
    ]),
    section(3, 'Market information changes', [
      'Prices, availability, demand, exchange rates, tariffs and regulations move all the time and often depend on information from third parties such as suppliers, trade bodies and public sources. Research we share is accurate to the best of our knowledge at the time we share it, and it is dated. It can be out of date by the time you act on it. You remain responsible for your own commercial decisions.',
    ]),
    section(4, 'Counterparties are independent', [
      'When we introduce you to a buyer, supplier or partner we check them as far as is reasonably possible, but they are independent businesses. We do not guarantee that they will perform, pay or deliver, and we are not party to the contract between you and them unless a written agreement with us says so.',
    ]),
    section(5, 'Shipping depends on third parties', [
      'We arrange and coordinate transport, but goods are carried, stored, insured and cleared by independent carriers, warehouses, insurers, port operators and customs authorities. Transit times, routes, duties, fees and inspections can change without notice for reasons outside our control, including weather, congestion, strikes and regulatory decisions. Estimates we give are estimates.',
    ]),
    section(6, 'Not professional advice', [
      'Nothing on this site or in our general communications is legal, tax, customs, insurance, financial or investment advice. For decisions that depend on such matters, consult a qualified adviser in the relevant country.',
    ]),
    section(7, 'Photographs and examples', [
      'Photographs, maps and diagrams on this site are illustrative. The cities on our route map show the kinds of corridors we work with and are not a promise of service to any particular place. Example figures, where shown, are not quotations.',
    ]),
    section(8, 'External links and services', [
      'The site links to, and embeds, services run by others, including Google Forms and WhatsApp. We are not responsible for their availability, content or handling of your data beyond what our Privacy Policy describes.',
    ]),
    section(9, 'Liability', [
      'To the fullest extent permitted by Nigerian law, Okwe is not liable for any loss or damage arising from reliance on information on this website or shared as general information. This does not limit any liability we accept under a written service agreement, or any liability that cannot be excluded by law.',
    ]),
    section(10, 'Questions', [
      `If anything here is unclear, or you believe something on the site is wrong or out of date, tell us at ${email} and we will look into it.`,
    ]),
  ],
}

export const legalDocs: LegalDoc[] = [
  privacyPolicy,
  termsOfUse,
  dataProcessingAgreement,
  disclaimer,
]

export const legalSlugs = legalDocs.map((doc) => doc.slug) as LegalSlug[]

export const getLegalDoc = (slug: string): LegalDoc | undefined =>
  legalDocs.find((doc) => doc.slug === slug)
