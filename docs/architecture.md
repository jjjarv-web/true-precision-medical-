# Architecture Recommendation

This document defines the recommended architecture for this project.

## System Roles

- **Sanity (CMS)**: source of truth for editable content (site copy, assessment questions/options, CTA text, trust blocks).
- **Next.js app**: presentation layer and secure server-side API routes.
- **GHL (GoHighLevel)**: destination/system of record for form submissions containing contact and clinical intake data.
- **PostHog**: product and funnel analytics for non-sensitive events only.

## Core Principles

1. **Content and logic are separated**
   - Content lives in Sanity.
   - Application logic and validation stay in Next.js.
2. **Sensitive submission data is relayed server-side**
   - Browser does not send secrets or call private GHL endpoints directly.
   - Next.js route handlers validate and forward to GHL.
3. **Stable IDs over mutable labels**
   - Assessment answer payloads should use IDs (for example `severity = "moderate"`), not display text.
4. **Analytics excludes regulated data by default**
   - No PHI/PII is sent to PostHog unless explicitly approved and configured.

## Request Flows

### Content

1. Content editor updates data in Sanity.
2. Next.js fetches Sanity content and renders pages/assessment copy.

### Submission

1. User submits assessment/contact details in browser.
2. Browser posts to Next.js secure endpoint (for example `app/api/submissions/route.ts`).
3. Endpoint validates, sanitizes, and forwards to GHL.
4. Endpoint returns success/failure to browser.

## Future Integrations

- Keep a provider abstraction layer for CMS and submission transport so providers can change with minimal UI rewrites.
- Add background retry queue only if webhook reliability or volume requires it.
