'use client'

import StatusPage from '@/components/StatusPage/StatusPage'

/** Last-resort boundary: replaces the root layout itself when it throws. */
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error)
  }
  return (
    <html lang="en">
      <body>
        <StatusPage title="Something went wrong" />
      </body>
    </html>
  )
}
