import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'
export const alt = 'True Precision Medical | Surgery Reimagined'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  const heroBg = fs.readFileSync(
    path.join(process.cwd(), 'public/images/tpm-hero-bg-1.jpg')
  )
  const heroBgBase64 = `data:image/jpeg;base64,${heroBg.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          overflow: 'hidden',
        }}
      >
        {/* Hero background */}
        <img
          src={heroBgBase64}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />

        {/* Dark gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(160deg, rgba(0,0,0,0.60) 0%, rgba(4,6,14,0.80) 100%)',
          }}
        />

        {/* Subtle top edge fade */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 120,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.45), transparent)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 80px',
          }}
        >
          {/* Brand name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 28,
            }}
          >
            {/* Small diamond accent */}
            <div
              style={{
                width: 6,
                height: 6,
                background: '#38bdf8',
                transform: 'rotate(45deg)',
              }}
            />
            <span
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.70)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              True Precision Medical
            </span>
            <div
              style={{
                width: 6,
                height: 6,
                background: '#38bdf8',
                transform: 'rotate(45deg)',
              }}
            />
          </div>

          {/* Headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              lineHeight: 1.0,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                fontSize: 112,
                fontWeight: 800,
                color: '#38bdf8',
                letterSpacing: '-3px',
              }}
            >
              Surgery
            </span>
            <span
              style={{
                fontSize: 112,
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-3px',
              }}
            >
              Reimagined
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 48,
              height: 2,
              background: 'rgba(56,189,248,0.50)',
              marginBottom: 24,
            }}
          />

          {/* Tagline */}
          <p
            style={{
              fontSize: 20,
              color: 'rgba(255,255,255,0.65)',
              fontWeight: 400,
              margin: 0,
              maxWidth: 680,
              lineHeight: 1.55,
            }}
          >
            Arizona&apos;s leading center for minimally invasive specialty care —
            neurosurgeons, interventional radiologists &amp; orthopedic surgeons.
          </p>
        </div>
      </div>
    ),
    { ...size }
  )
}
