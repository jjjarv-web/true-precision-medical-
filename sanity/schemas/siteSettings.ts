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
  ],
  preview: {
    select: { phone: 'phone' },
    prepare({ phone }) {
      return { title: 'Site Settings', subtitle: phone ?? 'Not set' }
    },
  },
})
