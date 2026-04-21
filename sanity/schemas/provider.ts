import { defineType, defineField } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export const provider = defineType({
  name: 'provider',
  title: 'Team member',
  type: 'document',
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'profile', title: 'Profile & credentials' },
    { name: 'bio', title: 'Bio copy' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Display name',
      type: 'string',
      group: 'basics',
      description: 'e.g. "Dr. Marcus Webb" or "Jordan Ellis" (include credentials in name if you always want them shown).',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      group: 'basics',
      readOnly: true,
      description: 'Auto-generated from display name. Used in /specialists/[slug].',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/[\u2014\u2013]/g, '-')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Role or title',
      type: 'string',
      group: 'basics',
      description:
        'Shown under the name on the website (e.g. Orthopedic Surgeon, Clinic Director, Medical Director, Family NP, PA-C). Use the accurate title for your organization.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active on site',
      type: 'boolean',
      group: 'basics',
      initialValue: true,
      description:
        'Uncheck to hide this provider from the website (directory, profiles, homepage) without deleting the document.',
    }),
    defineField({
      name: 'featuredOnHomepage',
      title: 'Featured on homepage',
      type: 'boolean',
      group: 'basics',
      initialValue: false,
      description:
        'Show in the “Meet the Specialists” strip on the homepage (max 4 recommended — use Providers list order to control left-to-right).',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      group: 'basics',
      options: { hotspot: true },
      description:
        'How to upload a good photo\n\n' +
        '• **File types:** JPG, PNG, or WebP.\n' +
        '• **Shape:** Vertical portrait — about **3 wide × 4 tall** (same proportions as a classic headshot / doctor photo).\n' +
        '• **Minimum size:** At least **960 × 1280 pixels** so the image stays sharp on phones and large screens. Larger is fine; avoid tiny thumbnails.\n' +
        '• **Framing:** Head and upper chest, centered, neutral or professional background, even lighting.\n' +
        '• **After upload:** Use the focal point / crop (hotspot) so faces stay centered — the site shows this in tall cards.\n\n' +
        'Images are stored in your Sanity project and delivered from Sanity’s CDN (not as external links).',
    }),
    defineField({
      name: 'cardTagline',
      title: 'Card tagline',
      type: 'string',
      group: 'profile',
      description:
        'Short line on directory cards (hover footer). e.g. board / fellowship / license — must be accurate.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlights',
      title: 'Credential highlights',
      type: 'array',
      group: 'profile',
      of: [{ type: 'string' }],
      description: '1–3 pills on the profile page (e.g. board certification, fellowship, state license).',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'shortIntro',
      title: 'Short intro (overview)',
      type: 'text',
      rows: 4,
      group: 'bio',
      description:
        'Maps to the **Overview** section on the website — tight paragraph under the photo. Also used as the teaser on cards.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'extendedBio',
      title: 'Extended bio',
      type: 'text',
      rows: 14,
      group: 'bio',
      description:
        'Maps to the **Full bio** section. Long text is partially shown with a Read more control on the site. Use blank lines between paragraphs.',
    }),
    orderRankField({ type: 'provider' }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'photo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? 'Untitled',
        subtitle: subtitle ?? '',
        media,
      }
    },
  },
})
