import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure' // ← new import
import {schemaTypes} from './schemaTypes'
import {CogIcon, ImagesIcon} from '@sanity/icons'

export default defineConfig({
  projectId: 'yc6cdmk1',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Nandini')
          .items([
            // SETTINGS group
            S.listItem()
              .title('Settings')
              .icon(CogIcon)
              .child(
                S.list()
                  .title('Settings')
                  .items([
                    // Singleton editor for Home Carousel
                    S.listItem()
                      .title('Home Carousel')
                      .icon(ImagesIcon)
                      .child(S.document().schemaType('homeCarousel').documentId('homeCarousel')),
                  ]),
              ),

            // Optional: show all other document types except the singleton
            ...S.documentTypeListItems().filter((li) => li.getId() !== 'homeCarousel'),
          ]),
    }),
  ],

  // (Optional) Singleton guards: hide create, disable delete/duplicate
  document: {
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global'
        ? prev.filter((t) => t.templateId !== 'homeCarousel')
        : prev,
    actions: (prev, {schemaType}) =>
      schemaType === 'homeCarousel'
        ? prev.filter(({action}) => !['delete', 'duplicate'].includes(action))
        : prev,
  },

  schema: {types: schemaTypes},
})
