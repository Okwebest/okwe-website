'use client'

import { useRef } from 'react'

import Footer from '@/components/Footer/Footer'
import Masthead from '@/components/Masthead/Masthead'
import CursorRing from '@/components/ui/CursorRing/CursorRing'
import { useColorMode } from '@/hooks/useColorMode'
import { useNarrow } from '@/hooks/useNarrow'
import { useScrollEngine } from '@/hooks/useScrollEngine'

type MainLayoutProps = {
  children?: React.ReactNode
}

/**
 * The site chrome: fixed masthead, footer, custom cursor and the scroll engine
 * that paints every scene. Pages are fully server-rendered, so `#anchor`
 * arrivals are handled by the browser (and by next/link on navigation).
 */
const MainLayout = ({ children }: MainLayoutProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const mastRef = useRef<HTMLElement>(null)
  const { mode, toggle } = useColorMode()
  const narrow = useNarrow()

  useScrollEngine({ rootRef, mastRef, mode, narrow })

  return (
    <div
      id="top"
      ref={rootRef}
      className="relative overflow-x-clip bg-bone-100 font-sans text-text-body"
    >
      <Masthead
        ref={mastRef}
        mode={mode}
        onToggleMode={toggle}
        narrow={narrow}
      />
      <main>{children}</main>
      <Footer />
      <CursorRing />
    </div>
  )
}

export default MainLayout
