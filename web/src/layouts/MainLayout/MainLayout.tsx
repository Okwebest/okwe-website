import { useRef } from 'react'

import Footer from 'src/components/Footer/Footer'
import Masthead from 'src/components/Masthead/Masthead'
import CursorRing from 'src/components/ui/CursorRing/CursorRing'
import { useColorMode } from 'src/hooks/useColorMode'
import { useHashScroll } from 'src/hooks/useHashScroll'
import { useNarrow } from 'src/hooks/useNarrow'
import { useScrollEngine } from 'src/hooks/useScrollEngine'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const mastRef = useRef<HTMLElement>(null)
  const { mode, toggle } = useColorMode()
  const narrow = useNarrow()

  useScrollEngine({ rootRef, mastRef, mode, narrow })
  useHashScroll()

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
