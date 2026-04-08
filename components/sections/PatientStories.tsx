'use client'

import { motion } from 'motion/react'
import { ArrowUpRight, Star } from 'lucide-react'
import BeforeAfterSlider from '@/components/ui/BeforeAfterSlider'
import GoogleReviewPill, { GoogleGLogo } from '@/components/ui/GoogleReviewPill'
import {
  FEATURED_TESTIMONIALS,
  GOOGLE_BUSINESS_REVIEWS_URL,
  PATIENT_STORIES_BEFORE_AFTER,
} from '@/lib/constants'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

function StarRow() {
  return (
    <div className="flex items-center gap-1.5 mb-4" aria-hidden>
      <GoogleGLogo size={16} className="self-center" />
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" strokeWidth={0} />
        ))}
      </div>
    </div>
  )
}

export default function PatientStories() {
  const ba = PATIENT_STORIES_BEFORE_AFTER

  return (
    <section
      id="patient-stories"
      className="py-24 sm:py-32 bg-gradient-to-b from-[#f6f8fc] via-white to-white"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center max-w-2xl mx-auto mb-10 lg:mb-14"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-sky mb-4">
            Patient stories
          </span>
          <h2 className="text-[clamp(28px,4vw,48px)] font-heading font-bold text-brand-ink mb-6 leading-tight">
            Real outcomes. Real people.
          </h2>
          <div className="flex justify-center mb-5">
            <GoogleReviewPill href={GOOGLE_BUSINESS_REVIEWS_URL} />
          </div>
          <p className="text-lg text-brand-muted leading-relaxed max-w-xl mx-auto">
            Thoughtful, minimally invasive care — told by patients who’ve experienced it firsthand.
          </p>
        </motion.div>

        {/* Before / after */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.06 }}
          className="max-w-3xl mx-auto mb-6 lg:mb-8"
        >
          <BeforeAfterSlider
            beforeSrc={ba.beforeSrc}
            afterSrc={ba.afterSrc}
            altBefore={ba.altBefore}
            altAfter={ba.altAfter}
          />
          <p className="mt-4 text-center text-xs sm:text-sm text-brand-muted leading-relaxed max-w-xl mx-auto">
            {ba.caption}
          </p>
        </motion.div>

        {/* Featured testimonials — mobile carousel / desktop grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-5 px-5 pb-2 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:gap-6 lg:mx-0 lg:px-0 lg:overflow-visible lg:pb-0 mb-10 lg:mb-12">
          {FEATURED_TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.48, ease: EASE, delay: 0.08 + i * 0.06 }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              className="snap-center flex-none w-[min(88vw,380px)] lg:w-auto rounded-[1.35rem] lg:rounded-[1.5rem] border border-brand-primary/8 bg-white/70 backdrop-blur-xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(30,58,95,0.07),0_1px_0_rgba(255,255,255,0.9)_inset] lg:hover:shadow-[0_12px_40px_rgba(30,58,95,0.12)] transition-shadow duration-200"
            >
              <StarRow />
              <blockquote className="text-brand-ink text-[15px] sm:text-base leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <footer className="border-t border-brand-primary/8 pt-4">
                <p className="font-heading font-bold text-brand-ink text-sm">{t.name}</p>
                <p className="text-xs text-brand-muted mt-0.5">{t.detail}</p>
              </footer>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE }}
          className="flex justify-center"
        >
          <a
            href={GOOGLE_BUSINESS_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-brand-primary-dark transition-colors duration-200"
          >
            Read more reviews on Google
            <ArrowUpRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
