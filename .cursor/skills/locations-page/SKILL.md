---
name: locations-page
description: Design and layout rules for the /locations page in this project. Use when editing, rebuilding, or reviewing components/pages/LocationsClient.tsx or app/locations/page.tsx.
---

# /locations Page Rules

## Map
Always include the interactive map. Use the existing `LocationsMap` component (`components/sections/LocationsMap.tsx`) — it handles state, the location list sidebar, and the Leaflet tile layer.

**Do NOT** wire up `LeafletMap` directly inside `LocationsClient`. It requires controlled state (`activeId` + `onSelect`) that `LocationsMap` already manages internally.

On `/locations`, pass `sectionEyebrow`, `sectionHeadline`, and `sectionDescription` so the map block does not repeat the same headline as the page hero (“Closer than you think.”). The homepage uses the component defaults.

## Footer conversion copy
On `/locations`, pass `Footer` `conversionDescription="Most major insurance plans accepted."` so the conversion band does not mention virtual assessment (in-person context). Other pages use the default two-sentence copy.

## No redundant bottom CTA
The Footer already contains a full-width dark conversion band ("Ready when you are.") with a "Request a Consultation" button and phone number.

Do **not** add a second dark CTA section at the bottom of the locations page. Any page-level CTA would duplicate the footer band.

## Correct section order
1. **Hero** (white) — headline "Closer than you think.", subtext with location count
2. **Interactive map** (`LocationsMap`, dark) — includes the location list sidebar
3. **Location cards** (cream `#F9F7F4`) — grid of `LocationCard` components; fallback text if no Sanity locations
4. **Visit strip** (white) — three facts: Easy Parking, Same-Day Discharge, Seen Within the Week
5. *(Footer handles the CTA)*

## Component location
- Client component: `components/pages/LocationsClient.tsx`
- Server page (data fetch + metadata): `app/locations/page.tsx`
- Map section: `components/sections/LocationsMap.tsx` (already `'use client'`, uses `dynamic` for LeafletMap)
