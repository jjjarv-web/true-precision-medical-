import Image from 'next/image'
import { MapPin, Phone } from 'lucide-react'

export default function LocationsCTA() {
  return (
    <section id="locations" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-[0_4px_40px_rgba(13,27,62,0.07)] border border-brand-primary/6 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text */}
          <div className="max-w-lg">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-sky mb-4">
              Locations
            </span>
            <h2 className="text-[clamp(28px,3.5vw,42px)] font-heading font-bold text-brand-ink mb-4 leading-tight">
              Find a clinic near you.
            </h2>
            <p className="text-lg text-brand-muted mb-9 leading-relaxed">
              With 12 premium locations across the region, advanced specialty care
              is closer than you think.
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5">
              <a
                href="#"
                className="bg-brand-primary hover:bg-brand-primary-dark text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-[0_2px_16px_rgba(30,58,95,0.25)] hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                View All Locations
              </a>
              <a
                href="#"
                className="bg-brand-surface-blue border border-brand-primary/15 hover:border-brand-primary/40 text-brand-primary px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Request a Call
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-[48%] relative">
            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop"
                alt="True Precision Medical clinic exterior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
            {/* Accepting badge */}
            <div className="absolute -bottom-5 -left-5 bg-white px-4 py-3 rounded-xl border border-brand-primary/8 shadow-md flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
              <span className="font-semibold text-brand-ink text-sm">Accepting new patients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
