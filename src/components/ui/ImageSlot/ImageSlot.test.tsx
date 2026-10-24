import { render, screen } from '@testing-library/react'

import { images } from '@/content/images'

import ImageSlot from './ImageSlot'

describe('ImageSlot', () => {
  it('serves AVIF and WebP with a JPEG fallback, sized to the slot', () => {
    const { container } = render(
      <ImageSlot
        id="t"
        placeholder="Photo"
        image={images.knows}
        sizes="(max-width: 859px) 100vw, 40vw"
      />
    )
    const sources = container.querySelectorAll('picture > source')
    expect(sources).toHaveLength(2)
    expect(sources[0]).toHaveAttribute('type', 'image/avif')
    expect(sources[1]).toHaveAttribute('type', 'image/webp')
    for (const source of sources) {
      expect(source.getAttribute('srcset')).toMatch(
        /\/okwe-image\/[\w-]+\.[0-9a-f]{8}\.640\.(avif|webp) 640w/
      )
      expect(source).toHaveAttribute('sizes', '(max-width: 859px) 100vw, 40vw')
    }
    const img = screen.getByRole('img', { name: images.knows.alt })
    expect(img).toHaveAttribute('src', images.knows.fallback.src)
    expect(img.getAttribute('srcset')).toContain('.jpg 1920w')
    expect(img).toHaveAttribute('width', String(images.knows.width))
    expect(img).toHaveAttribute('height', String(images.knows.height))
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(img).toHaveAttribute('decoding', 'async')
  })

  it('loads eagerly when marked as the priority photo', () => {
    render(
      <ImageSlot id="t" placeholder="Photo" image={images.coms} priority />
    )
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('loading', 'eager')
    expect(img).toHaveAttribute('fetchpriority', 'high')
  })

  it('shows the labelled empty state without an image', () => {
    render(<ImageSlot id="t" placeholder="Photograph — a port" />)
    expect(screen.getByText('Photograph — a port')).toBeInTheDocument()
    expect(screen.queryByRole('img')).toBeNull()
  })
})
