import MainLayout from '@/components/MainLayout/MainLayout'

/** Every public page shares the masthead, footer, cursor and scroll engine. */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MainLayout>{children}</MainLayout>
}
