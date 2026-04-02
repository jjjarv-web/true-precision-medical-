import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'True Precision Medical | Advanced Minimally Invasive Specialty Care',
  description:
    'Explore alternatives to major surgery with True Precision Medical — world-class specialists in orthopedics, neurosurgery, and interventional radiology. Less invasive. Faster recovery.',
  keywords: [
    'minimally invasive surgery',
    'orthopedics',
    'neurosurgery',
    'interventional radiology',
    'spine care',
    'joint pain',
    'sports medicine',
    'True Precision Medical',
  ],
  openGraph: {
    title: 'True Precision Medical | Advanced Specialty Care',
    description:
      'Advanced care. Less invasive. Faster recovery. Board-certified specialists across 12 premium locations.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'True Precision Medical',
    description: 'Advanced care. Less invasive. Faster recovery.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
