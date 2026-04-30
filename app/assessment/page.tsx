import type { Metadata } from 'next'
import AssessmentLandingClient from '@/components/pages/AssessmentLandingClient'

export const metadata: Metadata = {
  title: 'Free Symptom Assessment | True Precision Medical',
  description:
    'Answer 5 quick questions about your symptoms and find out if you\'re a candidate for minimally invasive treatment. No commitment required.',
  alternates: { canonical: '/assessment' },
}

export default function AssessmentLandingPage() {
  return <AssessmentLandingClient />
}
