import {defineType, defineField} from 'sanity'
import {TagIcon} from '@sanity/icons'

export default defineType({
  name: 'postCategory',
  title: 'Categoría de Blog',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name.es',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'localizedText',
    }),
  ],
  preview: {
    select: {
      title: 'name.es',
      subtitle: 'description.es',
    },
  },
})
