'use client'

import { useId, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

/** Above this length, show line-clamp + Read more (tune for your average paragraph). */
const MIN_CHARS_FOR_EXPAND = 320

type Props = {
  /** Plain text; use \\n\\n between paragraphs (matches Sanity multiline text). */
  text: string
}

export default function ProviderExtendedBio({ text }: Props) {
  const id = useId()
  const panelId = `${id}-extended-bio`
  const trimmed = text.trim()
  if (!trimmed) return null

  const needsExpand = trimmed.length >= MIN_CHARS_FOR_EXPAND
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="mt-10 border-t border-black/[0.06] pt-10">
      <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A9490]">
        Full bio
      </h2>
      <div
        id={panelId}
        className={`text-[16px] leading-relaxed text-[#4A4440] whitespace-pre-line ${
          needsExpand && !expanded ? 'line-clamp-5' : ''
        }`}
      >
        {trimmed}
      </div>
      {needsExpand && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          aria-controls={panelId}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A1814] transition-colors hover:text-[#4DCCE8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4DCCE8]/40 focus-visible:ring-offset-2 rounded-lg"
        >
          {expanded ? (
            <>
              Show less
              <ChevronUp className="h-4 w-4" aria-hidden />
            </>
          ) : (
            <>
              Read more
              <ChevronDown className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      )}
    </div>
  )
}
