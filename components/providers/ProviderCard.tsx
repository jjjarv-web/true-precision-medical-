'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { EASE } from '@/lib/constants'
import type { Provider } from '@/lib/constants'

function defaultBioTeaser(): string {
  return 'Focused on clear communication and coordinated, patient-centered care.'
}
/** Matches `providerPhotoUrl` pipeline in lib/sanity.ts (3:4 portrait). */
const PHOTO_SPEC = 'JPG, PNG, or WebP · min 960×1280 · portrait 3:4'

type Props = {
  provider: Provider
  index?: number
  imageSizes?: string
}

export default function ProviderCard({ provider, index = 0, imageSizes }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.1 }}
      style={{ aspectRatio: '3/4' }}
    >
      <Link
        href={`/specialists/${provider.slug}`}
        className="group relative flex h-full w-full flex-none flex-col overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4DCCE8] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        aria-label={`View profile of ${provider.name}, ${provider.title}`}
      >
        {provider.photoUrl ? (
          <Image
            src={provider.photoUrl}
            alt={provider.name}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            sizes={imageSizes ?? '(max-width: 640px) 76vw, (max-width: 1024px) 58vw, 25vw'}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#F5F3F0]">
            <div className="flex flex-col items-center gap-1 opacity-20">
              <div className="rounded-full bg-[#1A1814]" style={{ width: 52, height: 52 }} />
              <div
                className="rounded-t-full bg-[#1A1814]"
                style={{ width: 80, height: 48, marginTop: 6 }}
              />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#1A1814]/30">
              {PHOTO_SPEC}
            </p>
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(26,24,20,0.82) 0%, rgba(26,24,20,0.20) 45%, transparent 70%)',
          }}
        />

        {/* Hover-only bio panel (desktop). Touch users tap the card to navigate. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden translate-y-4 p-6 opacity-0 transition-all duration-[400ms] ease-out group-hover:translate-y-0 group-hover:opacity-100 lg:block"
          style={{
            background:
              'linear-gradient(to top, rgba(26,24,20,0.96) 0%, rgba(26,24,20,0.75) 80%, transparent 100%)',
          }}
        >
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#EDE6D8]/40">
            About
          </p>
          <p className="mb-4 text-sm leading-relaxed text-[#EDE6D8]/75 line-clamp-4">
            {provider.shortIntro ?? defaultBioTeaser()}
          </p>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#EDE6D8]/30">
            {provider.cardTagline}
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-6 transition-opacity duration-300 lg:group-hover:opacity-0">
          <p className="font-heading text-lg font-semibold leading-tight text-white">
            {provider.name}
          </p>
          <p className="mt-1 text-sm text-[#4DCCE8]">{provider.title}</p>
        </div>
      </Link>
    </motion.div>
  )
}
