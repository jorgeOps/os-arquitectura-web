import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'content', title: 'Contenido', default: true },
    { name: 'details', title: 'Detalles' },
    { name: 'seo', title: 'SEO' },
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
      name: 'mainImage',
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
      name: 'gallery',
      title: 'Galería de Imágenes *',
      type: 'array',
      group: 'content',
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
      name: 'excerpt',
      title: 'Descripción Corta *',
      type: 'localizedText',
      group: 'content',
      description: 'Breve descripción que aparecerá en listados y previews',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción Completa',
      type: 'localizedBlockContent',
      group: 'content',
    }),
    defineField({
      name: 'buildingType',
      title: 'Tipo de Edificio *',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Terciario oficinas', value: 'office' },
          { title: 'Terciario comercial', value: 'commercial' },
          { title: 'Terciario dotacional', value: 'institutional' },
          { title: 'Residencial colectivo', value: 'residential_collective' },
          { title: 'Residencial unifamiliar', value: 'residential_single' },
          { title: 'Industrial', value: 'industrial' },
          { title: 'Otro', value: 'other' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Ubicación',
      type: 'object',
      group: 'details',
      fields: [
        {
          name: 'city',
          title: 'Ciudad',
          type: 'string',
        },
        {
          name: 'country',
          title: 'País',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'year',
      title: 'Año de Finalización *',
      type: 'number',
      group: 'details',
      validation: (Rule) =>
        Rule.required()
          .min(1900)
          .max(new Date().getFullYear() + 10),
    }),
    defineField({
      name: 'area',
      title: 'Área Construida (m²)',
      type: 'number',
      group: 'details',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'workType',
      title: 'Tipo de Obra',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Obra nueva', value: 'new' },
          { title: 'Rehabilitación', value: 'renovation' },
          { title: 'Otro', value: 'other' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'serviceScope',
      title: 'Tipo de Trabajo',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'Misión completa', value: 'full' },
          { title: 'Proyectos Previos', value: 'previous' },
          { title: 'Project Management', value: 'pm' },
          { title: 'Consultoría', value: 'consulting' },
          { title: 'Otro', value: 'other' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'status',
      title: 'Estado del Trabajo *',
      type: 'string',
      group: 'details',
      options: {
        list: [
          { title: 'En estudio', value: 'study' },
          { title: 'En curso', value: 'ongoing' },
          { title: 'Finalizado', value: 'finished' },
          { title: 'Otro', value: 'other' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locationFilter',
      title: 'Filtro de Localización *',
      type: 'string',
      group: 'details',
      description: 'Selecciona la agrupación para el filtro de localización',
      options: {
        list: [
          { title: 'Madrid', value: 'madrid' },
          { title: 'Barcelona', value: 'barcelona' },
          { title: 'Otro', value: 'other' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'collaborators',
      title: 'Colaboradores',
      type: 'array',
      group: 'details',
      description: 'Arquitectos, ingenieros, consultores, etc.',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nombre',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Rol',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'budget',
      title: 'Presupuesto',
      type: 'string',
      group: 'details',
      description: 'Opcional. Ej: "€500,000 - €1,000,000"',
    }),
    defineField({
      name: 'awards',
      title: 'Premios y Reconocimientos',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nombre del Premio',
              type: 'string',
            },
            {
              name: 'year',
              title: 'Año',
              type: 'number',
            },
            {
              name: 'organization',
              title: 'Organización',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'year',
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
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      group: 'seo',
      initialValue: () => new Date().toISOString(),
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
      subtitle: 'category.name.es',
      media: 'mainImage',
      year: 'year',
    },
    prepare({ title, subtitle, media, year }) {
      return {
        title: title || 'Sin título',
        subtitle: `${subtitle || 'Sin categoría'} - ${year || 'Sin año'}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Fecha de publicación, más reciente',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Año, más reciente',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
  ],
})
