# True Precision Medical — Visual Theme

## Core Palette

| Token | Hex | Name | Where defined |
|---|---|---|---|
| `--ink` | `#07080C` | Near-black | Hero bg, darkest text |
| `--ink-warm` | `#1A1814` | Warm dark ink | Cards, selected states, body text |
| `--sand` | `#D4C4A8` | Warm sand | Hero CTA on dark bg only |
| `--cream` | `#EDE6D8` | Light cream | Text on dark selected cards |
| `--cyan` | `#4DCCE8` | Brand cyan | CTAs on light bg, progress bars, accents |
| `--surface` | `#F9F7F4` | Off-white | Modal/card surfaces on light pages |

---

## Semantic Rules

### CTAs (call-to-action buttons)

There are two CTA contexts. Never mix them.

**Dark background (hero, dark sections)**
- Fill: `#D4C4A8` (sand)
- Text: `#1A1814` (warm ink)
- Shadow: `0 2px 16px rgba(212,196,168,0.20)`

**Light background (assessment, booking, thank-you, modals)**
- Fill: `#4DCCE8` (cyan)
- Text: `#07080C` (near-black ink)
- Shadow: `0 2px 16px rgba(77,204,232,0.30)`
- Hover: `opacity: 0.90`

### Accent / highlight color

`#4DCCE8` (cyan) is the only accent. Use it for:
- Progress bar fills
- Check / confirm icons
- Input focus rings (`focus:border-[#4DCCE8]/60 focus:ring-[#4DCCE8]/10`)
- Eyebrow / status labels on white cards (e.g. "Request received")

Do **not** use cyan as a large decorative fill or background block.

### Selected / active states

**On dark backgrounds (hero pills)**
- Fill: `#D4C4A8` (sand)
- Text: `#1A1814`

**On light backgrounds (assessment cards, booking tiles)**
- Fill: `#1A1814` (warm ink)
- Border: `#1A1814`
- Text primary: `#EDE6D8` (cream)
- Text secondary: `rgba(237,230,216,0.65)`

### Body / supporting text

| Role | Value |
|---|---|
| Primary text | `#1A1814` |
| Secondary text | `#4A4440` |
| Muted / labels | `#9A9490` or `text-black/40` |
| Placeholder | `#C4BEBB` |

### Borders

- Default: `rgba(0,0,0,0.08)` (`border-black/[0.08]`)
- Hover: `rgba(0,0,0,0.16)`
- Never use colored borders except on selected states

---

## Off-Brand Colors — Do Not Use

| Color | Why banned |
|---|---|
| `#2F34F4` electric blue | Replaced site-wide with cyan |
| Any pure `#000000` black | Too harsh; use `#07080C` or `#1A1814` |
| Any saturated green / teal other than `#4DCCE8` | Off-brand |

---

## Hero — Frozen

The hero (`components/sections/Hero.tsx`) uses its own self-contained palette (ink bg, sand pill selected, white/opacity text). **Do not propose or apply color changes to the hero** unless the user explicitly requests it.
