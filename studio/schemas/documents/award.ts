import { defineType, defineField } from 'sanity'
import { RocketIcon } from '@sanity/icons'

export default defineType({
  name: 'award',
  title: 'Premio',
  type: 'document',
  icon: RocketIcon,
  groups: [
    { name: 'content', title: 'Contenido', default: true },
    { name: 'media', title: 'Multimedia' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Premio *',
      type: 'localizedString',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug *',
      type: 'slug',
      group: 'content',
      options: {
        source: 'name.es',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Año *',
      type: 'number',
      group: 'content',
      validation: (Rule) =>
        Rule.required()
          .min(1900)
          .max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'organization',
      title: 'Organización *',
      type: 'string',
      group: 'content',
      description: 'Ej: "Ayuntamiento de...", "Colegio de Arquitectos"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      group: 'content',
      description: 'Ej: "Mejor Proyecto de Rehabilitación"',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen Principal *',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo *',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción *',
      type: 'localizedBlockContent',
      group: 'content',
      description: 'Detalles del premio y contexto',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedProject',
      title: 'Proyecto Ganador',
      type: 'reference',
      to: [{ type: 'project' }],
      group: 'content',
      description: 'Proyecto por el que se recibió el premio',
    }),
    defineField({
      name: 'ceremonyGallery',
      title: 'Galería de la Ceremonia',
      type: 'array',
      group: 'media',
      description: 'Fotos de la entrega del premio',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texto alternativo *',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'localizedString',
              title: 'Pie de foto',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'certificate',
      title: 'Certificado / Diploma',
      type: 'file',
      group: 'media',
      description: 'Documento PDF del certificado o diploma',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      group: 'media',
      description: 'Video de la ceremonia o presentación',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'externalLink',
      title: 'Enlace Externo',
      type: 'url',
      group: 'media',
      description: 'URL de la página oficial del premio',
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      group: 'seo',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      group: 'content',
      description: 'Mostrar en destacados',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación en Web',
      type: 'datetime',
      group: 'seo',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name.es',
      subtitle: 'organization',
      media: 'coverImage',
      year: 'year',
    },
    prepare({ title, subtitle, media, year }) {
      return {
        title: title || 'Sin nombre',
        subtitle: `${subtitle || 'Sin organización'} - ${year || 'Sin año'}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Año, más reciente',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
})
