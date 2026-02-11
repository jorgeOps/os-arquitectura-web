# Living Portfolio - Documentación Técnica

## 📋 Resumen del Sistema

El "Living Portfolio" es un sistema de galería de proyectos arquitectónicos con filtrado bidireccional interactivo. Implementa un diseño de "solapas de archivador" físicas para los filtros y un efecto de revelado de color en las imágenes.

---

## 🎨 Características Implementadas

### 1. Matriz de Filtros con Diseño de Solapas Trapezoidales

**Ubicación:** `FilterTab.tsx`

- **Forma geométrica:** Las pestañas son trapezoidales usando `clip-path: polygon()`
- **Efecto de profundidad:** Cada solapa tiene una "sombra sólida" desplazada creada con un div absoluto
- **Estados visuales:**
  - **Normal:** Fondo blanco, borde gris
  - **Activa (click):** Fondo lima (`bg-lime-400`), borde oscuro
  - **Resaltada (hover en imagen):** Fondo amarillo (`bg-yellow-300`)
- **Animaciones:** Framer Motion con `whileHover` para efecto de elevación

**CSS clave:**
```css
clip-path: polygon(8px 0, 100% 0, 100% 100%, 0 100%);
/* Crea el borde izquierdo inclinado a 45° aproximadamente */
```

### 2. Galería con Efecto Blanco y Negro

**Ubicación:** `ProjectCard.tsx`

- **Estado por defecto:** Todas las imágenes en escala de grises (`grayscale`)
- **Hover:** La imagen recupera su color original (`grayscale-0`)
- **Transición:** Suave de 500ms con `transition-all duration-500`
- **Overlay informativo:** Aparece en hover con degradado desde negro

**Clases Tailwind clave:**
```tsx
className="grayscale group-hover:grayscale-0 group-hover:scale-105"
```

### 3. Sistema de Filtrado Bidireccional

**Ubicación:** `FilterContext.tsx`

El sistema mantiene dos estados independientes:

1. **`activeFilters`** (Set): Filtros seleccionados por click del usuario
   - Controlan qué proyectos se muestran en la galería
   - Se visualizan con fondo lima

2. **`highlightedFilters`** (Set): Filtros iluminados temporalmente por hover
   - NO afectan el filtrado de la galería
   - Se visualizan con fondo amarillo

**Flujo de interacción:**

```
Usuario pasa ratón sobre imagen
  ↓
ProjectCard.onMouseEnter()
  ↓
setHighlightedFilters(project.tags)
  ↓
FilterTab detecta que su ID está en highlightedFilters
  ↓
Cambia a estado "resaltado" (amarillo)
```

```
Usuario hace click en FilterTab
  ↓
toggleFilter(filterId)
  ↓
activeFilters se actualiza
  ↓
PortfolioContent recalcula filteredProjects
  ↓
Galería se re-renderiza con proyectos filtrados
```

---

## 🗂️ Estructura de Archivos

```
frontend/src/
├── contexts/
│   └── FilterContext.tsx           # Estado global de filtros
├── components/projects/
│   ├── FilterTab.tsx               # Solapa individual (trapezoidal)
│   ├── FilterMatrix.tsx            # Matriz de 5 filas de filtros
│   ├── ProjectCard.tsx             # Tarjeta de proyecto con B&W
│   └── PortfolioClient.tsx         # Orquestador principal (Client Component)
├── lib/
│   └── mockData.ts                 # 16 proyectos de ejemplo
└── app/[lang]/proyectos/
    └── page.tsx                    # Página Server Component
```

---

## 🔧 Tecnologías Utilizadas

- **Next.js 15** (App Router)
- **React 19** (Server & Client Components)
- **Framer Motion** (Animaciones de transición)
- **Lucide React** (Iconos)
- **Tailwind CSS** (Estilos + Utilidades)
- **TypeScript** (Tipado estricto)

---

## 📊 Categorías de Filtros Implementadas

| Categoría | Opciones |
|-----------|----------|
| **Tipo de edificio** | Residencial, Comercial, Oficinas, Cultural, Uso Mixto |
| **Ubicación** | Madrid, Barcelona, Valencia, Bilbao, Internacional |
| **Estado** | Construido, En Construcción, Proyecto, Concurso, Rehabilitación |
| **Año** | 2024, 2023, 2022, 2020-2021, Antes 2020 |
| **Escala** | < 500m², 500-2000m², 2000-5000m², > 5000m², Urbanismo |

---

## 🎯 Lógica de Filtrado

### Operador AND (Restrictivo)

El sistema usa lógica **AND**: un proyecto solo se muestra si cumple **TODOS** los filtros activos.

**Ejemplo:**
- Usuario activa: `"Oficinas"` + `"Madrid"`
- Se muestran: Solo proyectos que son **Oficinas Y están en Madrid**

**Código:**
```typescript
return Array.from(activeFilters).every((filterId) =>
  project.tags.includes(filterId)
);
```

---

## 🎨 Paleta de Colores

| Estado | Color Tailwind | Hex Aproximado |
|--------|---------------|----------------|
| Normal | `bg-white` | #FFFFFF |
| Activo | `bg-lime-400` | #A3E635 |
| Resaltado | `bg-yellow-300` | #FDE047 |
| Bordes | `border-gray-400` | #9CA3AF |

---

## 🚀 Cómo Probar

1. Inicia el servidor de desarrollo:
   ```bash
   cd frontend
   npm run dev
   ```

2. Navega a: `http://localhost:3000/es/proyectos`

3. **Pruebas recomendadas:**
   - Pasa el ratón sobre diferentes proyectos → observa qué filtros se iluminan
   - Haz click en "Oficinas" → la galería filtra
   - Haz click en "Madrid" → filtro combinado AND
   - Pasa ratón sobre un proyecto filtrado → verifica coherencia de tags
   - Haz click en "Limpiar filtros" → todos los proyectos vuelven

---

## 🔄 Próximos Pasos (Integración con Sanity)

Para conectar con datos reales de Sanity:

1. **Actualizar el schema de `project.ts`** en el studio:
   ```typescript
   defineField({
     name: 'filterTags',
     title: 'Tags de Filtros',
     type: 'array',
     of: [{ type: 'string' }],
     options: {
       list: [
         { title: 'Residencial', value: 'residential' },
         { title: 'Comercial', value: 'commercial' },
         // ... resto de opciones
       ]
     }
   })
   ```

2. **Crear query GROQ en `queries.ts`:**
   ```typescript
   export const portfolioProjectsQuery = groq`
     *[_type == "project"] | order(publishedAt desc) {
       _id,
       "title": title.es,
       "location": location,
       "year": year,
       "area": area,
       "image": mainImage.asset->url,
       filterTags
     }
   `;
   ```

3. **Reemplazar MOCK_PROJECTS en `PortfolioClient.tsx`:**
   ```typescript
   const projects = await client.fetch(portfolioProjectsQuery);
   ```

---

## 📝 Notas de Implementación

### ¿Por qué dos estados separados?

- **`activeFilters`:** Representa la "selección permanente" del usuario. Persiste hasta que el usuario hace click de nuevo o limpia filtros.
- **`highlightedFilters`:** Representa feedback visual temporal. Se limpia automáticamente cuando el ratón sale de la imagen.

Esta separación permite la UX de "doble dirección" sin confundir al usuario.

### Optimizaciones aplicadas

- **`useMemo`** en el cálculo de `filteredProjects` para evitar re-cálculos innecesarios
- **`AnimatePresence`** con `mode="wait"` para transiciones suaves entre estados de galería
- **Set()** en lugar de Array para búsquedas O(1) en filtros

---

## 🐛 Debugging

Si los filtros no se iluminan al hacer hover:

1. Verifica que los `project.tags` en mockData coincidan exactamente con los `option.id` en FilterMatrix
2. Abre React DevTools y verifica el estado de `highlightedFilters` en el contexto
3. Comprueba que `ProjectCard` está llamando a `setHighlightedFilters()` correctamente

Si las imágenes no cargan:

1. Verifica `next.config.ts` tenga configurado `images.unsplash.com`
2. Comprueba la consola del navegador por errores CORS
3. Asegúrate de que las URLs en mockData sean válidas

---

**Implementado con ❤️ para Portfolio de Arquitectura**
