import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import LegalPage from '@/components/LegalPage/LegalPage'
import { getLegalDoc, legalSlugs } from '@/content/legal'

type Params = { slug: string }

/** Static export: every legal document is pre-rendered; nothing else matches. */
export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return legalSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const doc = getLegalDoc((await params).slug)
  if (!doc) return {}
  return {
    title: `${doc.title} — OKWE`,
    description: doc.summary,
  }
}

export default async function LegalDocumentPage({
  params,
}: {
  params: Promise<Params>
}) {
  const doc = getLegalDoc((await params).slug)
  if (!doc) notFound()
  return <LegalPage doc={doc} />
}
