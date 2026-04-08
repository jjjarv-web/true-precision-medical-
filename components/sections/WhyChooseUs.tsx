'use client'

import { motion } from 'motion/react'
import { ScanLine, Building2, Award, type LucideIcon } from 'lucide-react'
import { WHY_FEATURES } from '@/lib/constants'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const ICONS: Record<(typeof WHY_FEATURES)[number]['icon'], LucideIcon> = {
  'scan-line': ScanLine,
  'building-2': Building2,
  award: Award,
}

const ICON_STYLES: Record<
  (typeof WHY_FEATURES)[number]['icon'],
  { bg: string; color: string }
> = {
  'scan-line': { bg: 'rgba(74,144,212,0.22)', color: '#7DB8E8' },
  'building-2': { bg: 'rgba(91,183,166,0.22)', color: '#5BB7A6' },
  award: { bg: 'rgba(125,184,232,0.18)', color: '#9CC9F0' },
}

const CARD_SHADOW =
  '0 4px 20px rgba(0,0,0,0.35), 0 20px 50px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.14)'

const CARD_SHADOW_HOVER =
  '0 10px 36px rgba(0,0,0,0.45), 0 36px 80px rgba(13,27,62,0.55), inset 0 1px 0 rgba(255,255,255,0.18)'

const STATS = [
  { value: '12', label: 'Premium Locations' },
  { value: '4.9', label: 'Patient Rating' },
  { value: '98%', label: 'Same-Day Discharge' },
  { value: '48h', label: 'Avg. Time to Appointment' },
] as const

export default function WhyChooseUs() {
  return (
    <section className="py-24 sm:py-32 overflow-hidden relative" style={{ backgroundColor: '#0D1B3E' }}>
      {/* Background orbs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(74,144,212,0.14) 0%, transparent 70%)',
          transform: 'translate(20%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(91,183,166,0.12) 0%, transparent 70%)',
          transform: 'translate(-20%, 30%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16"
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-sky mb-4">
            Why True Precision Medical
          </span>
          <h2 className="text-[clamp(28px,4vw,48px)] font-heading font-bold text-white mb-4 leading-tight">
            Why choose True Precision Medical?
          </h2>
          <p className="text-lg text-white/65 leading-relaxed">
            We believe major surgery should be the last resort, not the first option.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {WHY_FEATURES.map((feature, i) => {
            const Icon = ICONS[feature.icon]
            const iconStyle = ICON_STYLES[feature.icon]
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                whileHover={{
                  y: -6,
                  boxShadow: CARD_SHADOW_HOVER,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                className="group rounded-[1.5rem] border border-white/[0.12] p-8 backdrop-blur-xl transition-colors duration-200 hover:border-white/[0.18] hover:bg-white/[0.10]"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  boxShadow: CARD_SHADOW,
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
                  style={{ backgroundColor: iconStyle.bg }}
                >
                  <Icon className="w-6 h-6" style={{ color: iconStyle.color }} aria-hidden />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Stats row */}
        <div className="mt-16 lg:mt-20 pt-12 lg:pt-16 border-t border-white/[0.08]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.12 + i * 0.06 }}
                className="text-center rounded-[1.25rem] border border-white/[0.08] px-4 py-6 backdrop-blur-md hover:border-white/[0.12] transition-colors duration-200"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  boxShadow:
                    '0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                <p className="text-[clamp(28px,4vw,40px)] font-heading font-extrabold text-white mb-1.5 tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm text-white/50 leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
