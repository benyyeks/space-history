# Surface Failures

Interactive space history site for the NASA Space Apps Challenge.

Six surface missions on the Moon and Mars: click markers on a 3D globe, zoom to the site, watch the path or flag animate, then open the full profile with timeline, lessons, and a short quiz. Ingenuity includes a 3D hardware viewer.

## Stack

- React 18 + TypeScript + Vite
- React Router
- @react-three/fiber + @react-three/drei + three
- Framer Motion
- Vanilla CSS with glassmorphism and `prefers-color-scheme` (no theme toggle)

## Routes

| Path | Page |
|------|------|
| `/` | Landing |
| `/mars-exploration` | Mars 3D hub |
| `/lunar-exploration` | Lunar 3D hub |
| `/missions/:slug` | Full mission profile |

Slugs: `mars-polar-lander`, `phoenix`, `ingenuity`, `ranger-4`, `surveyor-3`, `apollo-15-lrv`

## Run locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Optional assets

- `public/assets/ingenuity.glb` : real Ingenuity mesh. Without it the viewer uses a procedural model.
- `public/textures/` : drop USGS / NASA globe mosaics later if you want photo-real planets. The hubs already run with solid materials.

## Cloudflare Workers / static host

This is a static SPA. After `npm run build`, publish the `dist/` folder. For Workers static assets or Pages, point the site root at `dist` and set a SPA fallback to `index.html`.

## Design notes

- 60% background / 30% glass / 10% accents
- Landing: deep space blue or soft gray, rust red and lunar silver
- Mars hub: orange accent `#E77D11`
- Lunar hub: white / crater gray accents
- Headers: Space Mono. Body: Inter.
