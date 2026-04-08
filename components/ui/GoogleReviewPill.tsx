'use client'

import { useId } from 'react'

const STAR_PATH =
  'M6 0.5l1.237 3.809H11.4L8.09 6.586l1.237 3.809L6 8.138l-3.326 2.257L3.91 6.586.6 4.309h4.163z'

const STAR_STEP = 11.5
/** Fifth star fill ratio for ~4.9 */
const FIFTH_STAR_FILL = 0.9

export function GoogleGLogo({
  className,
  size = 18,
}: {
  className?: string
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`shrink-0 ${className ?? ''}`}
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

function GoogleStarsWithPartial({ ratingTail }: { ratingTail: number }) {
  const uid = useId().replace(/:/g, '')
  const clipId = `gstar-clip-${uid}`
  const fifthW = 11.5 * ratingTail

  return (
    <svg
      width={5 * STAR_STEP + 2}
      height="12"
      viewBox={`0 0 ${5 * STAR_STEP + 2} 12`}
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${1 + i * STAR_STEP}, 0.5)`}>
          <path d={STAR_PATH} fill="#FBBC05" />
        </g>
      ))}
      <g transform={`translate(${1 + 4 * STAR_STEP}, 0.5)`}>
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <rect x="0" y="0" width={fifthW} height="12" />
          </clipPath>
        </defs>
        <path d={STAR_PATH} fill="#E8EAED" />
        <path d={STAR_PATH} fill="#FBBC05" clipPath={`url(#${clipId})`} />
      </g>
    </svg>
  )
}

type GoogleReviewPillProps = {
  href: string
  rating?: string
  reviewLine?: string
  /** 0–1 portion of the 5th star filled (default ~0.9 for 4.9) */
  fifthStarFill?: number
  className?: string
}

export default function GoogleReviewPill({
  href,
  rating = '4.9',
  reviewLine = '400+ reviews on Google',
  fifthStarFill = FIFTH_STAR_FILL,
  className = '',
}: GoogleReviewPillProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center rounded-full bg-white px-4 py-2.5 sm:px-5 sm:py-3
        border border-[#E8EAED] shadow-[0_2px_12px_rgba(60,64,67,0.08),0_1px_2px_rgba(60,64,67,0.06)]
        transition-shadow duration-200 hover:shadow-[0_4px_18px_rgba(60,64,67,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky focus-visible:ring-offset-2 ${className}`}
      aria-label={`${rating} on Google, ${reviewLine}. Opens in a new tab.`}
    >
      <div className="flex items-center gap-2 sm:gap-2.5">
        <GoogleGLogo size={18} />
        <GoogleStarsWithPartial ratingTail={fifthStarFill} />
      </div>
      <span className="text-sm font-bold text-[#1A1C1E] tabular-nums leading-none">{rating}</span>
      <span className="text-sm text-[#5F6368] select-none leading-none" aria-hidden>
        ·
      </span>
      <span className="text-[13px] sm:text-sm text-[#5F6368] font-normal leading-none max-sm:text-center">
        {reviewLine}
      </span>
    </a>
  )
}
