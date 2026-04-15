# Data Handling Policy (Project-Level)

This policy is an implementation guide for handling assessment and booking data in this repository.

## Data Classification

- **Sensitive submission data**: name, email, phone, assessment answers tied to an identifiable person.
- **Non-sensitive analytics data**: anonymous page views, click events, step progression, conversion markers without direct identifiers.

## Allowed Destinations

- **GHL**: receives submission payloads via secure server endpoint relay.
- **PostHog**: receives only non-sensitive analytics events.
- **Sanity**: stores content configuration only; no form-submitted patient data.

## Prohibited Patterns

- Do not send sensitive submission fields directly from browser to GHL private endpoints.
- Do not place API secrets in client-side code.
- Do not log full submission payloads in server logs.
- Do not store sensitive submission records in local files or non-approved third-party analytics tools.

## Logging and Redaction

- Log only operational metadata (timestamp, route, status code, request ID, error class).
- Mask or omit direct identifiers in all logs.
- Use short retention for operational logs where feasible.

## Security Requirements

- Keep all external service secrets in environment variables (`.env.local` and hosting provider secrets).
- Validate and sanitize incoming request payloads on server endpoints.
- Use HTTPS-only transport for all external requests.
- Apply timeouts and retries for outbound webhook calls to GHL.

## Analytics Rules

- Track assessment flow events using opaque IDs and stage names.
- Avoid including raw form field values in analytics event properties.
- If identity resolution is needed, use internal anonymous/session IDs that are not direct PII.
