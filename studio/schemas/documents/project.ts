import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  icon: HomeIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Título *',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug *',
      type: 'slug',
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
      description: 'Breve descripción que aparecerá en listados y previews',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción Completa *',
      type: 'localizedBlockContent',
      validation: (Rule) => Rule.required(),
    }),
    // FILTROS (Obligatorios y seguidos)
    defineField({
      name: 'buildingType',
      title: '(Filtro) Tipo de Edificio *',
      type: 'string',
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
      name: 'workType',
      title: '(Filtro) Tipo de Obra *',
      type: 'string',
      options: {
        list: [
          { title: 'Obra nueva', value: 'new' },
          { title: 'Rehabilitación', value: 'renovation' },
          { title: 'Otro', value: 'other' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'serviceScope',
      title: '(Filtro) Tipo de Trabajo *',
      type: 'string',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: '(Filtro) Estado del Trabajo *',
      type: 'string',
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
      title: '(Filtro) Filtro de Localización *',
      type: 'string',
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
    // Resto de campos
    defineField({
      name: 'location',
      title: 'Ubicación Detallada',
      type: 'object',
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
      validation: (Rule) =>
        Rule.required()
          .min(1900)
          .max(new Date().getFullYear() + 10),
    }),
    defineField({
      name: 'area',
      title: 'Área Construida (m²)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'string',
    }),
    defineField({
      name: 'collaborators',
      title: 'Colaboradores',
      type: 'array',
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
      description: 'Opcional. Ej: "€500,000 - €1,000,000"',
    }),
    defineField({
      name: 'awards',
      title: 'Premios y Reconocimientos',
      type: 'array',
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
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
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
