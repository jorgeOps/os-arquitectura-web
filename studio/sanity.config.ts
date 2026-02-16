import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Arquitectura',

  projectId: 'vnp9hjul',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenido')
          .items([
            S.listItem()
              .title('Proyectos')
              .icon(() => '🏠')
              .child(S.documentTypeList('project').title('Proyectos')),
            S.divider(),
            S.listItem()
              .title('Publicaciones')
              .icon(() => '📄')
              .child(S.documentTypeList('publication').title('Publicaciones')),
            S.listItem()
              .title('Cobertura Mediática')
              .icon(() => '📷')
              .child(S.documentTypeList('mediaCoverage').title('Medios')),
            S.listItem()
              .title('Premios')
              .icon(() => '🏆')
              .child(S.documentTypeList('award').title('Premios')),
            S.divider(),
            S.listItem()
              .title('Categorías de Proyectos')
              .icon(() => '🏷️')
              .child(S.documentTypeList('category').title('Categorías')),
          ]),
    }),
    visionTool(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
