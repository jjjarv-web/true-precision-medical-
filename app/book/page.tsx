import type { Metadata } from 'next'
import BookingClient from './BookingClient'

export const metadata: Metadata = {
  title: 'Request a Consultation | True Precision Medical',
  description:
    'Request a consultation with True Precision Medical. Board-certified specialists in minimally invasive procedures. A care coordinator will be in touch within 48 hours.',
}

export default function BookPage() {
  return <BookingClient />
}
