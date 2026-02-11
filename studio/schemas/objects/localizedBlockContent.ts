import {defineType} from 'sanity'

export default defineType({
  name: 'localizedBlockContent',
  title: 'Localized Block Content',
  type: 'object',
  fields: [
    {
      name: 'es',
      title: 'Español',
      type: 'blockContent',
    },
    {
      name: 'en',
      title: 'English',
      type: 'blockContent',
    },
  ],
})
