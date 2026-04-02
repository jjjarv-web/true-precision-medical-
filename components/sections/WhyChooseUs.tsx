import { ShieldCheck } from 'lucide-react'
import { WHY_FEATURES } from '@/lib/constants'

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 overflow-hidden relative" style={{ backgroundColor: '#0D1B3E' }}>
      {/* Background orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(74,144,212,0.12) 0%, transparent 70%)', transform: 'translate(20%, -30%)' }}
      />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(91,183,166,0.10) 0%, transparent 70%)', transform: 'translate(-20%, 30%)' }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-sky mb-4">
            Why True Precision Medical
          </span>
          <h2 className="text-[clamp(30px,4vw,48px)] font-heading font-bold text-white mb-5 leading-tight">
            Why choose True Precision Medical?
          </h2>
          <p className="text-lg text-white/65 leading-relaxed">
            We believe major surgery should be the last resort, not the first option.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHY_FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="bg-white/8 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/12 transition-colors duration-200"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: i === 0 ? 'rgba(74,144,212,0.2)' : i === 1 ? 'rgba(91,183,166,0.2)' : 'rgba(30,58,95,0.4)' }}
              >
                <ShieldCheck className="w-6 h-6"
                  style={{ color: i === 0 ? '#4A90D4' : i === 1 ? '#5BB7A6' : '#7DB8E8' }}
                />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-white/10">
          {[
            { value: '12', label: 'Premium Locations' },
            { value: '4.9', label: 'Patient Rating' },
            { value: '98%', label: 'Same-Day Discharge' },
            { value: '48h', label: 'Avg. Time to Appointment' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-heading font-extrabold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
