import { defineType, defineField } from 'sanity'

export const insuranceSettings = defineType({
  name: 'insuranceSettings',
  title: 'Insurance Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'outOfNetworkCarriers',
      title: 'Out-of-Network Carriers',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'List carrier names your practice is out of network with. Use the carrier name only — the matcher handles plan tiers and common abbreviations automatically. Examples: "Aetna" (catches "Aetna PPO Max"), "Blue Cross Blue Shield" (catches "BCBS of Arizona"), "Banner" (catches "Banner Medicare Advantage"), "Medicare", "Medicare Advantage", "Humana", "UnitedHealthcare".',
    }),
    defineField({
      name: 'passMessage',
      title: 'In-Network Message (Pass)',
      type: 'string',
      description:
        'Shown when a patient\'s carrier is NOT on the out-of-network list. Keep it reassuring and accurate.',
      initialValue:
        'We accept many plans like yours. Coverage varies by plan — benefits will be verified before your visit.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'failMessage',
      title: 'Out-of-Network Message (Fail)',
      type: 'string',
      description:
        "Shown when a patient's carrier IS on the out-of-network list. Keep it soft — encourage them to call.",
      initialValue:
        'We may be out of network with this carrier. Coverage varies by plan — please call to verify.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'unknownMessage',
      title: 'Unknown Carrier Message',
      type: 'string',
      description:
        "Shown when a patient types something that doesn't match any known carrier in our list.",
      initialValue:
        "We're not familiar with that carrier — call us and we'll look it up with you.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Insurance Settings' }
    },
  },
})
