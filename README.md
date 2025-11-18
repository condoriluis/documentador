## Documentador — visor de documentación (Next.js)

Proyecto Next.js para previsualizar y navegar documentación (HTML) con búsqueda integrada, tema claro/oscuro y componentes reutilizables.

Resumen

- Visor integrado para documentos (HTML) con fallback seguro para evitar errores en SSR.
- Búsqueda con Fuse.js (fuzzy search) y atajo Ctrl/Cmd+K.
- Componentes reutilizables y estilo con TailwindCSS y primitives en `components/ui/`.

Estructura relevante

- `app/`
  - `app/page.tsx` — página principal / hero
  - `app/docs/[slug]/page.tsx` — página de documento que usa `DocViewer`
- `components/`
  - `SearchBar.tsx` — buscador (atajo Ctrl/Cmd+K). Recientemente rediseñado para un aspecto más grande y profesional.
  - `DocViewer.tsx` — visor con comprobación de disponibilidad y fallback a `iframe` (para evitar errores como "DOMMatrix is not defined").
  - `DocsSearch.tsx`, `DocumentCard.tsx`, `Navbar.tsx`, `Sidebar.tsx`, `DocViewer.tsx`, `DocViewer.tsx` y más.
- `components/ui/` — primitives de UI (`Input`, `Button`, `Card`, ...)
- `data/` — `docs.json` y helpers en `data/docs.ts` con metadatos de los documentos
- `public/html/` — coloca aquí HTML locales si quieres previsualizarlos (servidos en `/html/...`)

Dependencias principales

- Next.js 16 (Turbopack)
- React 19
- TailwindCSS
- react-pdf + pdfjs-dist (usado con precauciones en cliente)
- Fuse.js para búsqueda

Cómo ejecutar (desarrollo)

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
npm install
npm run dev
```

Visita http://localhost:3000 en tu navegador.

Comandos útiles

- `npm run dev` — iniciar servidor de desarrollo
- `npm run build` — construir la app para producción
- `npm start` — iniciar servidor de producción (después de `build`)
- `npm run lint` — ejecutar ESLint

Añadir documentos para previsualizar

- HTML locales: copia a `public/html/` y referencia `/html/mi-pagina.html` en `data/docs.json`.

Búsqueda y atajos

- La búsqueda utiliza `Fuse.js` y busca en título, descripción y categoría.
- Atajo: pulsa `Ctrl`/`Cmd` + `K` para enfocar el buscador.

---

Archivo package.json (resumen):

```json
{
  "name": "documentador",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
