import type { Metadata } from 'next'

import StatusPage from '@/components/StatusPage/StatusPage'

export const metadata: Metadata = {
  title: '404 Page Not Found — OKWE',
}

export default function NotFound() {
  return <StatusPage title="404 Page Not Found" />
}
