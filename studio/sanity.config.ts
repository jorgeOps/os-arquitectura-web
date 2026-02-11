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
            S.listItem()
              .title('Blog')
              .icon(() => '📝')
              .child(S.documentTypeList('post').title('Posts')),
            S.divider(),
            S.listItem()
              .title('Autores')
              .icon(() => '👤')
              .child(S.documentTypeList('author').title('Autores')),
            S.divider(),
            S.listItem()
              .title('Categorías de Proyectos')
              .icon(() => '🏷️')
              .child(S.documentTypeList('category').title('Categorías')),
            S.listItem()
              .title('Categorías de Blog')
              .icon(() => '🏷️')
              .child(S.documentTypeList('postCategory').title('Categorías de Blog')),
          ]),
    }),
    visionTool(),
    colorInput(),
  ],

  schema: {
    types: schemaTypes,
  },
})
