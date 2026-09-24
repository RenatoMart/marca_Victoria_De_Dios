# Victoria de Dios · Manual de marca

Web de presentación de la marca **Victoria de Dios — Lifestyle & Home**: identidad, versiones de color, paleta, reglas de uso y bocetos de aplicación del logo en productos (empaques, papelería, ropa, carteras, bolsos, tazas, tomatodos y hogar).

## Stack

React 19 · TypeScript · Vite

## Uso

```bash
git clone https://github.com/RenatoMart/marca_Victoria_De_Dios.git
cd marca_Victoria_De_Dios
npm install
npm run dev
```

| Comando           | Descripción                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Servidor de desarrollo        |
| `npm run build`   | Build de producción en `dist` |
| `npm run preview` | Previsualiza el build         |
| `npm run lint`    | ESLint                        |

## Estructura

- `public/brand/` — logo recortado con fondo transparente y máscaras por color (azul, dorado, completo, logotipo).
- `src/brand/Mark.tsx` — componente que pinta el logo real en cualquier color o acabado (foil, relieve, bordado, grabado…).
- `src/brand/Scene.tsx` — lienzo 400×300 para dibujar cada maqueta.
- `src/brand/Identity.tsx` — arquitectura, versiones de color, paleta y reglas.
- `src/brand/Gallery.tsx` — galería filtrable con vista ampliada.
- `src/brand/mockups/` — maquetas por categoría.

Las maquetas son bocetos de presentación: valida colores y tamaños con una prueba física antes de producir.
