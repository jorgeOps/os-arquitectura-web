import {defineType, defineField} from 'sanity'
import {TagIcon} from '@sanity/icons'

export default defineType({
  name: 'category',
  title: 'Categoría de Proyecto',
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
    defineField({
      name: 'color',
      title: 'Color',
      type: 'color',
      description: 'Color representativo de la categoría',
    }),
  ],
  preview: {
    select: {
      title: 'name.es',
      subtitle: 'description.es',
    },
  },
})
