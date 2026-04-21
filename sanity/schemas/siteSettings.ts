import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'phone',
      title: 'Website Phone Number',
      type: 'string',
      description:
        'Displayed in the header, footer, and the insurance out-of-network call-to-action. Type it in whatever format looks right — e.g. "(800) 555-0199", "800-555-0199", or "800.555.0199". The tap-to-call link is generated automatically.',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true
          const digits = value.replace(/\D/g, '')
          if (digits.length < 10) return 'Needs at least 10 digits'
          return true
        }),
    }),
    defineField({
      name: 'googleReviewRating',
      title: 'Google average rating',
      type: 'number',
      description:
        'Star rating shown next to Google badges (e.g. 4.9). Must be between 1 and 5.',
      initialValue: 4.9,
      validation: (Rule) =>
        Rule.required().min(1).max(5).custom((value) => {
          if (value == null) return true
          const s = String(value)
          const parts = s.split('.')
          if (parts.length > 1 && parts[1] && parts[1].length > 1) {
            return 'Use at most one decimal place (e.g. 4.9)'
          }
          return true
        }),
    }),
    defineField({
      name: 'googleReviewCount',
      title: 'Google review count',
      type: 'number',
      description:
        'Total number of Google reviews. The site displays this with a + automatically (e.g. 400+ reviews).',
      initialValue: 400,
      validation: (Rule) => Rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: { phone: 'phone', rating: 'googleReviewRating', count: 'googleReviewCount' },
    prepare({ phone, rating, count }) {
      const extra =
        rating != null && count != null ? ` · Google ${rating} (${count}+)` : ''
      return { title: 'Site Settings', subtitle: `${phone ?? 'No phone'}${extra}` }
    },
  },
})
