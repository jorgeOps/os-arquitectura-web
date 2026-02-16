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
      name: 'startDate',
      title: 'Fecha de Inicio',
      type: 'date',
      group: 'content',
      description: 'Fecha de inicio del evento o cobertura (opcional)',
    }),
    defineField({
      name: 'endDate',
      title: 'Fecha de Fin',
      type: 'date',
      group: 'content',
      description: 'Fecha de fin del evento o cobertura (opcional)',
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
      title: 'title.es',
      subtitle: 'mediaOutlets',
      media: 'coverImage',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({ title, subtitle, media, startDate, endDate }) {
      // Formatear rango de fechas
      let dateRange = '';
      if (startDate && endDate) {
        const start = new Date(startDate).getFullYear();
        const end = new Date(endDate).getFullYear();
        dateRange = start === end ? `${start}` : `${start} - ${end}`;
      } else if (startDate) {
        dateRange = new Date(startDate).getFullYear().toString();
      } else if (endDate) {
        dateRange = new Date(endDate).getFullYear().toString();
      }

      const mediosText = Array.isArray(subtitle) && subtitle.length > 0
        ? subtitle.slice(0, 2).join(', ') + (subtitle.length > 2 ? '...' : '')
        : '';

      return {
        title: title || 'Sin título',
        subtitle: dateRange ? `${dateRange}${mediosText ? ' • ' + mediosText : ''}` : mediosText,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Fecha de inicio, más reciente',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Título (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title.es', direction: 'asc' }],
    },
  ],
})
