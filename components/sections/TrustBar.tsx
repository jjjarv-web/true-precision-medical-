import { ShieldCheck, Star, Clock, MapPin } from 'lucide-react'
import { TRUST_ITEMS } from '@/lib/constants'

const iconMap = {
  'shield-check': ShieldCheck,
  star: Star,
  clock: Clock,
  'map-pin': MapPin,
}

const iconColorMap = {
  'shield-check': 'text-brand-primary',
  star: 'text-brand-accent',
  clock: 'text-brand-sky',
  'map-pin': 'text-brand-primary',
}

export default function TrustBar() {
  return (
    <section className="py-8" style={{ backgroundColor: 'var(--color-brand-bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-wrap justify-center gap-6 md:gap-14">
          {TRUST_ITEMS.map((item) => {
            const Icon = iconMap[item.icon]
            const colorClass = iconColorMap[item.icon]
            return (
              <div
                key={item.label}
                className="flex items-center gap-2.5 text-sm font-medium text-brand-ink-secondary"
              >
                <Icon className={`w-4.5 h-4.5 ${colorClass} flex-shrink-0`} />
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
