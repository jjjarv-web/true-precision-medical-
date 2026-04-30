'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import { SPECIALTIES, EASE } from '@/lib/constants'

// 1:1 mapping — each specialty now has its own tailored assessment flow
const ASSESSMENT_SLUG: Record<string, string> = {
  knee:       'knee',
  shoulder:   'shoulder',
  wrist:      'wrist',
  foot:       'foot',
  spine:      'spine',
  neuropathy: 'neuropathy',
  neuralgia:  'neuralgia',
  fibroids:   'fibroids',
}

// Optimal focal point per image to keep the anatomy centered in the card crop
const IMAGE_POSITION: Record<string, string> = {
  knee:       '50% 65%',
  shoulder:   '50% 28%',
  wrist:      '50% 55%',
  foot:       '50% 72%',
  spine:      '50% 45%',
  neuropathy: '50% 58%',
  neuralgia:  '50% 22%',
  fibroids:   '50% 50%',
}

export default function AssessmentLandingClient() {
  return (
    <div
      className="min-h-screen flex flex-col px-4 py-8 sm:px-6 sm:py-12"
      style={{ background: 'linear-gradient(160deg, #FDFCFA 0%, #F9F7F4 100%)' }}
    >
      <div className="max-w-[900px] mx-auto w-full flex-1 flex flex-col">

        {/* Logo + exit */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <Link href="/">
            <Logo variant="dark" width={140} height={38} className="h-9 w-auto opacity-80" />
          </Link>
          <Link
            href="/"
            className="text-[13px] text-black/35 hover:text-black/60 transition-colors tracking-wide"
          >
            Exit
          </Link>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-10 sm:mb-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490] mb-4">
            Free Symptom Assessment
          </p>
          <h1
            className="font-heading font-semibold text-[#0E0E0E] leading-[1.04] tracking-[-0.04em] mb-4"
            style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
          >
            What brings you in{' '}
            <span style={{ color: '#B8AA82' }}>today?</span>
          </h1>
          <p className="text-[#4A4440] text-[15px] leading-relaxed max-w-md">
            Choose the area that best describes your symptoms. Takes less than 2 minutes.
          </p>
        </motion.div>

        {/* Condition grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {SPECIALTIES.map((spec, i) => {
            const assessmentSlug = ASSESSMENT_SLUG[spec.id] ?? 'joint'
            const imgPosition = IMAGE_POSITION[spec.id] ?? '50% 50%'

            return (
              <motion.div
                key={spec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.12 + i * 0.06 }}
              >
                <Link
                  href={`/assessment/${assessmentSlug}`}
                  className="group block rounded-2xl overflow-hidden relative select-none
                             transition-all duration-300
                             hover:scale-[1.025] hover:shadow-[0_16px_48px_rgba(0,0,0,0.22)]"
                  style={{
                    background: '#07080C',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.10)',
                  }}
                >
                  {/* Image — portrait crop */}
                  <div className="relative w-full" style={{ paddingBottom: '130%' }}>
                    {spec.img && (
                      <Image
                        src={spec.img}
                        alt={spec.label}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-all duration-500
                                   saturate-[0.55] brightness-[0.82]
                                   group-hover:saturate-[0.75] group-hover:brightness-[0.92]"
                        style={{ objectPosition: imgPosition }}
                      />
                    )}

                    {/* Bottom fade to dark */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(to bottom, transparent 40%, rgba(7,8,12,0.55) 72%, #07080C 100%)',
                      }}
                    />
                  </div>

                  {/* Label row — sits below the image gradient */}
                  <div className="px-4 pt-0 pb-4 -mt-10 relative z-10 flex items-end justify-between gap-2">
                    <div>
                      <p className="font-heading font-semibold text-[#EDE6D8] text-[13px] sm:text-[14px] leading-snug tracking-[-0.02em]">
                        {spec.label}
                      </p>
                      <p className="text-[11px] text-white/35 mt-0.5 leading-none">
                        Start assessment
                      </p>
                    </div>
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
                                 border border-white/[0.14] bg-white/[0.05]
                                 group-hover:bg-[#4DCCE8] group-hover:border-[#4DCCE8]
                                 transition-all duration-250"
                    >
                      <ArrowRight className="w-3 h-3 text-white/60 group-hover:text-[#07080C] transition-colors duration-250" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.75 }}
          className="text-center text-[12px] text-[#B8B2AE] mt-8 leading-relaxed"
        >
          Not sure which applies? Pick the closest match — our team will clarify during your consultation.
        </motion.p>

      </div>
    </div>
  )
}
