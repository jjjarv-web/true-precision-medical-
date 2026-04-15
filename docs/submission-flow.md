# Submission Flow: Assessment and Booking -> GHL

This file documents the recommended server-mediated submission flow.

## Goals

- Keep secrets off the client.
- Minimize sensitive data exposure.
- Ensure reliable delivery to GHL.

## Recommended Flow

1. User completes assessment and contact capture UI.
2. Frontend sends payload to a Next.js API route on the same origin.
3. API route:
   - validates request schema
   - adds request ID and timestamp metadata
   - forwards to configured GHL endpoint
   - handles timeout/retry behavior
4. API route returns normalized success/error to frontend.
5. Frontend routes user to next step (`/book` or `/thank-you`) based on response.

## Payload Shape (Example)

```json
{
  "sessionId": "uuid",
  "assessmentVersion": "v1",
  "categorySlug": "spine",
  "answers": {
    "location": "neck",
    "severity": "moderate",
    "duration": "medium",
    "treatments": ["pt", "injections"]
  },
  "contact": {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "phone": "(602) 555-0100"
  },
  "source": {
    "path": "/assessment/spine",
    "utmSource": "google",
    "utmCampaign": "spine-consult"
  }
}
```

## Reliability Checklist

- Use outbound request timeout.
- Implement idempotency key per submission.
- Retry transient failures (5xx/network timeout).
- Return user-safe fallback messaging on failure.
- Record non-sensitive delivery status for diagnostics.
