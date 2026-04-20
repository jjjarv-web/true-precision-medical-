'use client'

import dynamic from 'next/dynamic'

// ssr: false is required — Sanity Studio uses React context + styled-components
// that cannot be evaluated in a Node.js SSR environment.
const Studio = dynamic(
  async () => {
    const [{ NextStudio }, { default: config }] = await Promise.all([
      import('next-sanity/studio'),
      import('../../../sanity.config'),
    ])
    return function StudioPage() {
      return <NextStudio config={config} />
    }
  },
  { ssr: false }
)

export default function StudioPageClient() {
  return <Studio />
}
