import { render, screen, within } from '@testing-library/react'

import { legalDocs } from '@/content/legal'

import LegalDocumentPage, {
  generateMetadata,
  generateStaticParams,
} from './page'

describe('LegalDocumentPage', () => {
  it('pre-renders exactly the four legal documents', () => {
    expect(generateStaticParams().map((p) => p.slug)).toEqual([
      'privacy',
      'terms',
      'dpa',
      'disclaimer',
    ])
  })

  it.each(legalDocs.map((doc) => [doc.slug, doc]))(
    'renders /legal/%s with its title, contents and every section',
    async (slug, doc) => {
      const page = await LegalDocumentPage({
        params: Promise.resolve({ slug }),
      })
      render(page)
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        doc.title
      )
      const contents = screen.getByRole('navigation', { name: 'Contents' })
      expect(within(contents).getAllByRole('link')).toHaveLength(
        doc.sections.length
      )
      for (const section of doc.sections) {
        expect(
          screen.getByRole('heading', { level: 2, name: section.heading })
        ).toBeInTheDocument()
      }
      expect(screen.getByText('Effective date')).toBeInTheDocument()
      // Cross-links to the other three documents.
      for (const other of legalDocs.filter((d) => d.slug !== slug)) {
        expect(screen.getByRole('link', { name: other.title })).toHaveAttribute(
          'href',
          `/legal/${other.slug}`
        )
      }
    }
  )

  it('titles the document for the browser tab', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'privacy' }),
    })
    expect(metadata.title).toBe('Privacy Policy — OKWE')
    expect(metadata.description).toBeTruthy()
  })
})
