import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Newsreader, Public_Sans } from 'next/font/google'

import './globals.css'

/*
 * The three brand families, self-hosted by next/font at build time. Their
 * CSS variables feed the design-system tokens (--font-display, --font-sans,
 * --font-mono) in globals.css, so no component needs to know about them.
 */
const newsreader = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  weight: 'variable',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-newsreader',
})

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-public-sans',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-mono',
})

export const metadata: Metadata = {
  title: 'OKWE — Know. Connect. Move.',
  description:
    'Okwe Import Export Solutions is an integrated trade and logistics business. We help you know the opportunity, connect the trade, and move the goods — from opportunity to destination.',
  icons: {
    icon: [{ url: '/okwe-image/favicon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-theme is set before paint by /theme-init.js and later by
    // useColorMode, so React must not reconcile it.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${publicSans.variable} ${plexMono.variable}`}
    >
      <head>
        {/* Plain, blocking script: it must run before the first paint, which
            next/script's beforeInteractive does not guarantee. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" />
      </head>
      <body>{children}</body>
    </html>
  )
}
