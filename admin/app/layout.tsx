import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Partnex Admin CMS',
  description: 'Professional content management system for Partnex website',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
