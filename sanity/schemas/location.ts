import { defineType, defineField } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

const US_STATES: Array<{ title: string; value: string }> = [
  { title: 'Alabama', value: 'AL' },
  { title: 'Alaska', value: 'AK' },
  { title: 'Arizona', value: 'AZ' },
  { title: 'Arkansas', value: 'AR' },
  { title: 'California', value: 'CA' },
  { title: 'Colorado', value: 'CO' },
  { title: 'Connecticut', value: 'CT' },
  { title: 'Delaware', value: 'DE' },
  { title: 'District of Columbia', value: 'DC' },
  { title: 'Florida', value: 'FL' },
  { title: 'Georgia', value: 'GA' },
  { title: 'Hawaii', value: 'HI' },
  { title: 'Idaho', value: 'ID' },
  { title: 'Illinois', value: 'IL' },
  { title: 'Indiana', value: 'IN' },
  { title: 'Iowa', value: 'IA' },
  { title: 'Kansas', value: 'KS' },
  { title: 'Kentucky', value: 'KY' },
  { title: 'Louisiana', value: 'LA' },
  { title: 'Maine', value: 'ME' },
  { title: 'Maryland', value: 'MD' },
  { title: 'Massachusetts', value: 'MA' },
  { title: 'Michigan', value: 'MI' },
  { title: 'Minnesota', value: 'MN' },
  { title: 'Mississippi', value: 'MS' },
  { title: 'Missouri', value: 'MO' },
  { title: 'Montana', value: 'MT' },
  { title: 'Nebraska', value: 'NE' },
  { title: 'Nevada', value: 'NV' },
  { title: 'New Hampshire', value: 'NH' },
  { title: 'New Jersey', value: 'NJ' },
  { title: 'New Mexico', value: 'NM' },
  { title: 'New York', value: 'NY' },
  { title: 'North Carolina', value: 'NC' },
  { title: 'North Dakota', value: 'ND' },
  { title: 'Ohio', value: 'OH' },
  { title: 'Oklahoma', value: 'OK' },
  { title: 'Oregon', value: 'OR' },
  { title: 'Pennsylvania', value: 'PA' },
  { title: 'Rhode Island', value: 'RI' },
  { title: 'South Carolina', value: 'SC' },
  { title: 'South Dakota', value: 'SD' },
  { title: 'Tennessee', value: 'TN' },
  { title: 'Texas', value: 'TX' },
  { title: 'Utah', value: 'UT' },
  { title: 'Vermont', value: 'VT' },
  { title: 'Virginia', value: 'VA' },
  { title: 'Washington', value: 'WA' },
  { title: 'West Virginia', value: 'WV' },
  { title: 'Wisconsin', value: 'WI' },
  { title: 'Wyoming', value: 'WY' },
]

export const location = defineType({
  name: 'location',
  title: 'Location',
  type: 'document',
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'address', title: 'Address' },
    { name: 'hours', title: 'Hours' },
    { name: 'extras', title: 'Extras' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Location Name',
      type: 'string',
      group: 'basics',
      description:
        'Displayed everywhere on the site. e.g. "Phoenix — Central" or "Scottsdale — North".',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      group: 'basics',
      description:
        'Location-specific phone. Enter in any readable format — the tap-to-call link is generated automatically.',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true
          const digits = value.replace(/\D/g, '')
          if (digits.length < 10) return 'Needs at least 10 digits'
          return true
        }),
    }),
    defineField({
      name: 'isActive',
      title: 'Active on Site',
      type: 'boolean',
      group: 'basics',
      description:
        'Uncheck to temporarily hide this location from the website without deleting the document.',
      initialValue: true,
    }),

    defineField({
      name: 'streetAddress',
      title: 'Street Address',
      type: 'string',
      group: 'address',
      description: 'e.g. "6036 N 19th Ave"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'suite',
      title: 'Suite / Unit',
      type: 'string',
      group: 'address',
      description: 'Optional. e.g. "Suite 204"',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      group: 'address',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      group: 'address',
      initialValue: 'AZ',
      options: { list: US_STATES, layout: 'dropdown' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'postalCode',
      title: 'ZIP / Postal Code',
      type: 'string',
      group: 'address',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true
          return /^\d{5}(-\d{4})?$/.test(value) || 'Must be a 5-digit ZIP (optionally ZIP+4)'
        }),
    }),
    defineField({
      name: 'coordinates',
      title: 'Map Pin Coordinates',
      type: 'string',
      group: 'address',
      description:
        'Places the marker on the site map. How to fill this in:\n' +
        '1. Open google.com/maps and search this location\'s street address.\n' +
        '2. Right-click the exact spot on the map where you want the pin.\n' +
        '3. The first item in the menu is two numbers separated by a comma (e.g. "33.5069, -112.1012"). Click it — that copies the coordinates to your clipboard.\n' +
        '4. Paste directly into this field (example: "33.5069, -112.1012"). That\'s it.',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return 'Required'
          const parts = String(value).split(',').map((s) => s.trim())
          if (parts.length !== 2) return 'Paste the full "latitude, longitude" string copied from Google Maps'
          const [latStr, lngStr] = parts
          const lat = Number(latStr)
          const lng = Number(lngStr)
          if (!Number.isFinite(lat) || !Number.isFinite(lng)) return 'Both values must be numbers'
          if (lat < -90 || lat > 90) return 'Latitude must be between -90 and 90'
          if (lng < -180 || lng > 180) return 'Longitude must be between -180 and 180'
          return true
        }),
    }),

    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'object',
      group: 'hours',
      description:
        'One entry per day. Type the hours however you like — "8am – 5pm", "By appointment", "Closed", etc. Consecutive days with identical hours are automatically collapsed on the site (e.g. "Mon – Fri: 8am – 5pm").',
      fields: [
        defineField({ name: 'monday', title: 'Monday', type: 'string', initialValue: '8am – 5pm' }),
        defineField({ name: 'tuesday', title: 'Tuesday', type: 'string', initialValue: '8am – 5pm' }),
        defineField({ name: 'wednesday', title: 'Wednesday', type: 'string', initialValue: '8am – 5pm' }),
        defineField({ name: 'thursday', title: 'Thursday', type: 'string', initialValue: '8am – 5pm' }),
        defineField({ name: 'friday', title: 'Friday', type: 'string', initialValue: '8am – 5pm' }),
        defineField({ name: 'saturday', title: 'Saturday', type: 'string', initialValue: 'Closed' }),
        defineField({ name: 'sunday', title: 'Sunday', type: 'string', initialValue: 'Closed' }),
      ],
      options: { collapsible: true, collapsed: false, columns: 1 },
    }),

    defineField({
      name: 'specialties',
      title: 'Specialties Offered',
      type: 'array',
      group: 'extras',
      of: [{ type: 'string' }],
      description:
        'Optional. Services available specifically at this location (e.g. "Orthopedics", "Spine", "Sports Medicine").',
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      group: 'extras',
      description: 'Optional. Used on future per-location pages and cards.',
      options: { hotspot: true },
    }),

    orderRankField({ type: 'location' }),
  ],
  preview: {
    select: {
      title: 'name',
      city: 'city',
      state: 'state',
      isActive: 'isActive',
      image: 'image',
    },
    prepare({ title, city, state, isActive, image }) {
      const parts = [city, state].filter(Boolean)
      const subtitle = parts.join(', ')
      return {
        title: isActive === false ? `${title} (hidden)` : title,
        subtitle: subtitle || '—',
        media: image,
      }
    },
  },
})
