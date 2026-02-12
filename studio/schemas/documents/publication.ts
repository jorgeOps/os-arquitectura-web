import { defineType, defineField } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export default defineType({
  name: 'publication',
  title: 'Publicación',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'content', title: 'Contenido', default: true },
    { name: 'meta', title: 'Metadatos' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Título *',
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
        source: 'title.es',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de Portada',
      type: 'image',
      group: 'content',
      description: 'Imagen principal (opcional)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Contenido *',
      type: 'localizedBlockContent',
      group: 'content',
      description: 'Contenido flexible: mezcla texto, imágenes, títulos, listas... Usa los botones del editor para añadir lo que necesites',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishDate',
      title: 'Fecha de Publicación',
      type: 'date',
      group: 'meta',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'publisher',
      title: 'Editorial / Medio',
      type: 'string',
      group: 'meta',
      description: 'Ej: "El País", "Hispalyt", etc.',
    }),
    defineField({
      name: 'authors',
      title: 'Autores',
      type: 'array',
      group: 'meta',
      of: [{ type: 'string' }],
      description: 'Nombres de los autores',
    }),
    defineField({
      name: 'pdfFile',
      title: 'Archivo PDF (Opcional)',
      type: 'file',
      group: 'meta',
      description: 'Si quieres adjuntar el PDF completo para descarga',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'externalLink',
      title: 'Enlace Externo',
      type: 'url',
      group: 'meta',
      description: 'URL si está publicado online',
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      group: 'meta',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      group: 'meta',
      description: 'Mostrar en destacados',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'publisher',
      media: 'coverImage',
      publishDate: 'publishDate',
    },
    prepare({ title, subtitle, media, publishDate }) {
      return {
        title: title || 'Sin título',
        subtitle: `${subtitle || ''} ${publishDate ? `- ${publishDate}` : ''}`.trim(),
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Fecha de publicación, más reciente',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
  ],
})
