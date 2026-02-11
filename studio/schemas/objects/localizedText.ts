import {defineType} from 'sanity'

export default defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    {
      name: 'es',
      title: 'Español',
      type: 'text',
      rows: 4,
    },
    {
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
    },
  ],
})
