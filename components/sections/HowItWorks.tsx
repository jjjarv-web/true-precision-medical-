'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { ArrowRight, Calendar } from 'lucide-react'
import { HOW_IT_WORKS_STEPS } from '@/lib/constants'

export default function HowItWorks() {
  return (
    <section id="approach" className="py-32" style={{ backgroundColor: 'var(--color-brand-bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-sky mb-4">
              Our Process
            </span>
            <h2 className="text-[clamp(30px,4vw,48px)] font-heading font-bold text-brand-ink mb-5 leading-tight">
              A simpler path to feeling better.
            </h2>
            <p className="text-lg text-brand-muted mb-12 leading-relaxed">
              We've removed the friction from specialty healthcare. No endless referrals,
              no confusing hospital mazes — just direct access to top specialists.
            </p>

            <div className="space-y-8">
              {HOW_IT_WORKS_STEPS.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-surface-blue text-brand-primary flex items-center justify-center font-heading font-bold text-base border border-brand-primary/10">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-brand-ink mb-1.5">{item.title}</h4>
                    <p className="text-brand-muted leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12">
              <a
                href="#"
                className="bg-brand-accent hover:bg-brand-accent-dark text-white px-8 py-4 rounded-xl font-semibold text-sm transition-all duration-200 shadow-[0_2px_16px_rgba(91,183,166,0.35)] hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                Start Your Journey
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-brand-surface-blue rounded-[3rem] transform rotate-2 scale-105 z-0" />
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1200&auto=format&fit=crop"
                alt="Doctor consulting with patient at True Precision Medical"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl z-20 max-w-[260px] border border-brand-primary/8">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-11 h-11 rounded-xl bg-brand-surface-teal flex items-center justify-center text-brand-accent flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-ink">Fast Access</p>
                  <p className="text-xs text-brand-muted">Appointments in 48h</p>
                </div>
              </div>
              <p className="text-xs text-brand-ink-secondary leading-relaxed">
                Skip the weeks of waiting. Get answers and a treatment plan this week.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
