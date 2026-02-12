import { defineType, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export default defineType({
  name: 'mediaCoverage',
  title: 'Cobertura Mediática',
  type: 'document',
  icon: ImageIcon,
  groups: [
    { name: 'content', title: 'Contenido', default: true },
    { name: 'media', title: 'Multimedia' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título *',
      type: 'localizedString',
      group: 'content',
      description: 'Ej: "Análisis del incendio de Valencia"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug *',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title.es',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventName',
      title: 'Nombre del Evento *',
      type: 'string',
      group: 'content',
      description: 'Ej: "Torres Gemelas", "Windsor", "Edificio España"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventDate',
      title: 'Fecha del Evento *',
      type: 'date',
      group: 'content',
      validation: (Rule) => Rule.required(),
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
      description: 'Contexto del evento y papel del estudio',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverageType',
      title: 'Tipo de Cobertura *',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'TV', value: 'tv' },
          { title: 'Prensa', value: 'press' },
          { title: 'Radio', value: 'radio' },
          { title: 'Online', value: 'online' },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'mediaOutlets',
      title: 'Medios de Comunicación',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'Ej: ["Antena 3", "El País", "ABC"]',
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Fotos',
      type: 'array',
      group: 'media',
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
      name: 'videos',
      title: 'Videos',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'file',
          options: {
            accept: 'video/*',
          },
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Título del video',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'documents',
      title: 'Documentos Relacionados',
      type: 'array',
      group: 'media',
      description: 'PDFs de artículos, informes, etc.',
      of: [
        {
          type: 'file',
          options: {
            accept: '.pdf,.doc,.docx',
          },
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Título del documento',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'externalLinks',
      title: 'Enlaces Externos',
      type: 'array',
      group: 'media',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Título',
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'relatedProjects',
      title: 'Proyectos Relacionados',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      description: 'Proyectos del estudio relacionados con este evento',
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
      title: 'eventName',
      subtitle: 'title.es',
      media: 'coverImage',
      eventDate: 'eventDate',
    },
    prepare({ title, subtitle, media, eventDate }) {
      return {
        title: title || 'Sin nombre',
        subtitle: `${subtitle || 'Sin título'} - ${eventDate || 'Sin fecha'}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Fecha del evento, más reciente',
      name: 'eventDateDesc',
      by: [{ field: 'eventDate', direction: 'desc' }],
    },
  ],
})
