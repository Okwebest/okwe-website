'use client'

import StatusPage from '@/components/StatusPage/StatusPage'

/**
 * Rendered when an error escapes every component boundary inside the root
 * layout (the Redwood FatalErrorPage equivalent).
 */
export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error)
  }
  return <StatusPage title="Something went wrong" />
}
