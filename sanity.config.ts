import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  title: 'True Precision Medical',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            orderableDocumentListDeskItem({
              type: 'location',
              title: 'Locations',
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'provider',
              title: 'Team members',
              S,
              context,
            }),
            S.divider(),
            S.listItem()
              .title('Insurance Settings')
              .id('insuranceSettings')
              .child(
                S.document()
                  .schemaType('insuranceSettings')
                  .documentId('insuranceSettings')
              ),
          ]),
    }),
  ],
})
