'use client'

import { motion } from 'motion/react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { TREATMENT_CATEGORIES } from '@/lib/constants'

export default function Treatments() {
  return (
    <section id="treatments" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-sky mb-4">
            Specialty Areas
          </span>
          <h2 className="text-[clamp(30px,4vw,48px)] font-heading font-bold text-brand-ink mb-5 leading-tight">
            Specialized care, tailored to you.
          </h2>
          <p className="text-lg text-brand-muted leading-relaxed">
            We focus on minimally invasive procedures that get you back to your
            life faster. Select your area of concern to see how we can help.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TREATMENT_CATEGORIES.map((cat, i) => (
            <motion.a
              href="#"
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`${cat.colorClass} rounded-3xl overflow-hidden group block relative cursor-pointer shadow-[0_2px_16px_rgba(13,27,62,0.06)] hover:shadow-[0_8px_32px_rgba(13,27,62,0.12)] transition-shadow duration-300`}
            >
              <div className="p-7 pb-0">
                <h3 className="text-xl font-heading font-bold text-brand-ink mb-2.5">{cat.title}</h3>
                <p className="text-brand-ink-secondary/80 text-sm leading-relaxed mb-5">{cat.desc}</p>
              </div>
              <div className="relative h-44 overflow-hidden rounded-t-2xl mx-4">
                <Image
                  src={cat.img}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="absolute bottom-[186px] right-5 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors duration-200">
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
