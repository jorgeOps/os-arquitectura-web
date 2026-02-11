# Portfolio de Arquitectura

Portfolio profesional de proyectos arquitectónicos construido con Next.js y Sanity CMS.

## 🏗️ Estructura del Proyecto

```
web/
├── frontend/          # Aplicación Next.js
└── studio/           # Sanity CMS
```

## 🚀 Tecnologías

### Frontend
- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **next-sanity** - Integración con Sanity

### Backend (CMS)
- **Sanity.io** - Headless CMS
- **GROQ** - Query language

## 📦 Instalación

### Frontend

```bash
cd frontend
npm install
```

### Studio (Sanity)

```bash
cd studio
npm install
```

## 🛠️ Configuración

### 1. Crear Proyecto de Sanity

1. Ve a [sanity.io](https://www.sanity.io/)
2. Crea un nuevo proyecto
3. Copia el **Project ID**

### 2. Configurar Variables de Entorno

**Frontend** (`frontend/.env.local`):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=tu-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-02-11
```

**Studio** (`studio/sanity.cli.ts` y `studio/sanity.config.ts`):

Reemplaza `your-project-id` con tu Project ID real.

## 🏃‍♂️ Desarrollo

### Frontend

```bash
cd frontend
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### Studio

```bash
cd studio
npm run dev
```

Abre [http://localhost:3333](http://localhost:3333)

## 🌐 Idiomas

El proyecto soporta:
- 🇪🇸 Español (por defecto)
- 🇬🇧 Inglés

## 📝 Crear Contenido

1. Inicia el Studio: `cd studio && npm run dev`
2. Accede a `http://localhost:3333`
3. Crea categorías de proyectos
4. Crea autores
5. Crea proyectos y posts

## 🎨 Personalización

Los estilos se pueden personalizar en:
- `frontend/tailwind.config.ts` - Configuración de Tailwind
- `frontend/src/app/globals.css` - Estilos globales

## 📦 Deploy

### Frontend (Vercel)

```bash
cd frontend
vercel
```

### Studio (Sanity)

```bash
cd studio
npm run deploy
```

## 📄 Licencia

Este proyecto es privado.
