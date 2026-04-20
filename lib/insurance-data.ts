/**
 * Comprehensive list of US insurance carriers for autocomplete search.
 * This list is for UX/search purposes only — it is NOT the acceptance list.
 * Pass/fail logic is determined solely by the outOfNetworkCarriers list in Sanity.
 */
export const ALL_CARRIERS: string[] = [
  // Major national commercial carriers
  'Aetna',
  'Anthem',
  'Blue Cross Blue Shield',
  'BCBS',
  'Cigna',
  'Humana',
  'Kaiser Permanente',
  'UnitedHealthcare',
  'United Healthcare',
  'UHC',

  // Government programs
  'Medicare',
  'Medicaid',
  'Medicare Advantage',
  'Tricare',
  'TRICARE',
  'VA',
  'Veterans Affairs',
  'CHAMPVA',
  'Indian Health Service',

  // Regional / national carriers
  'Ambetter',
  'AmeriHealth',
  'Availity',
  'Banner Health',
  'Beacon Health Options',
  'Blue Shield of California',
  'Bright Health',
  'Capital Blue Cross',
  'CareFirst',
  'Centene',
  'Community Health Plan',
  'Coventry Health Care',
  'EmblemHealth',
  'Empire BlueCross',
  'First Health',
  'Florida Blue',
  'Friday Health Plans',
  'Geisinger Health Plan',
  'GlobalHealth',
  'HealthMarkets',
  'HealthNet',
  'Health Net',
  'HealthFirst',
  'HealthSpring',
  'Highmark',
  'Independent Health',
  'Innovation Health',
  'Magellan Health',
  'Medica',
  'Meritain Health',
  'Molina Healthcare',
  'MultiPlan',
  'MVP Health Care',
  'Network Health',
  'Oscar Health',
  'Premera Blue Cross',
  'Priority Health',
  'Prominence Health Plan',
  'Providence Health Plan',
  'Regence BlueCross BlueShield',
  'Scott and White Health Plan',
  'SelectHealth',
  'Sentara Health Plans',
  'Sierra Health and Life',
  'Tufts Health Plan',
  'UCare',
  'Unum',
  'UPMC Health Plan',
  'WellCare',
  'Western Health Advantage',

  // Worker's comp / specialty
  "Worker's Compensation",
  "Workers' Compensation",
  'Auto Insurance / PIP',
  'Lien / Attorney Lien',
  'Self-Pay',
  'Uninsured',

  // Arizona-specific
  'AHCCCS',
  'Arizona Health Care Cost Containment System',
  'Arizona Complete Health',
  'Banner Medicare Advantage',
  'Mercy Care',
  'University of Arizona Health Plans',
]

/**
 * Normalize a string for comparison: lowercase, strip punctuation, collapse spaces.
 */
export function normalizeCarrier(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Find matching carriers from the full list for autocomplete suggestions.
 */
export function getCarrierSuggestions(query: string, limit = 6): string[] {
  if (!query.trim()) return []
  const q = normalizeCarrier(query)
  return ALL_CARRIERS.filter((c) => normalizeCarrier(c).includes(q)).slice(0, limit)
}

/**
 * Common short-forms patients type that should resolve to a canonical carrier
 * name before matching. Applied to both the patient's input AND each Sanity
 * out-of-network entry, so the clinic can type either form.
 *
 * Word-boundaries are enforced at match time — e.g. `va` will not rewrite
 * `nevada`.
 */
const ALIASES: Record<string, string> = {
  bcbs: 'blue cross blue shield',
  uhc: 'unitedhealthcare',
  'united healthcare': 'unitedhealthcare',
  bsca: 'blue shield of california',
  'arizona health care cost containment system': 'ahcccs',
}

function expandAliases(s: string): string {
  let n = normalizeCarrier(s)
  for (const [alias, full] of Object.entries(ALIASES)) {
    n = n.replace(new RegExp(`\\b${alias}\\b`, 'g'), full)
  }
  return n
}

function tokensOf(s: string): string[] {
  return expandAliases(s).split(' ').filter(Boolean)
}

/**
 * True if the patient's input matches any carrier on the Sanity-authored
 * out-of-network list, after normalizing both sides.
 *
 * Matching rule: every token of the out-of-network carrier name must appear
 * in the patient's input (as tokens, not substrings). This lets the clinic
 * type just the carrier name (`Aetna`) and automatically catch plan-suffixed
 * inputs (`Aetna PPO Max`, `Aetna Choice POS II`, etc.).
 *
 * Special case: if the clinic lists `Medicare` we don't want to match patients
 * who clearly typed a Medicare Advantage plan — those are different products.
 */
export function isOutOfNetwork(input: string, outOfNetworkList: string[]): boolean {
  const userTokens = new Set(tokensOf(input))
  if (userTokens.size === 0) return false

  return outOfNetworkList.some((carrier) => {
    const carrierTokens = tokensOf(carrier)
    if (carrierTokens.length === 0) return false
    if (!carrierTokens.every((t) => userTokens.has(t))) return false

    // Medicare ≠ Medicare Advantage
    if (carrierTokens.join(' ') === 'medicare' && userTokens.has('advantage')) {
      return false
    }
    return true
  })
}

/**
 * True if the patient's input resolves to a carrier in our autocomplete list.
 * Used for the idle/unknown UI branches only — never for pass/fail logic.
 */
export function isKnownCarrier(query: string): boolean {
  const q = new Set(tokensOf(query))
  if (q.size === 0) return false
  return ALL_CARRIERS.some((c) => {
    const ct = tokensOf(c)
    return ct.length > 0 && ct.every((t) => q.has(t))
  })
}
