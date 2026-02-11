import {defineType, defineField} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Post de Blog',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Contenido', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localizedString',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title.es',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Destacada',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Extracto',
      type: 'localizedText',
      group: 'content',
      description: 'Breve descripción que aparecerá en listados',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'body',
      title: 'Contenido',
      type: 'localizedBlockContent',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      group: 'content',
      to: [{type: 'author'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      group: 'content',
      to: [{type: 'postCategory'}],
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      group: 'seo',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      group: 'seo',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      group: 'content',
      description: 'Mostrar en página principal',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      author: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare({title, author, media, date}) {
      return {
        title: title || 'Sin título',
        subtitle: `${author || 'Sin autor'} - ${
          date ? new Date(date).toLocaleDateString('es-ES') : 'Sin fecha'
        }`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Fecha de publicación, más reciente',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
})
