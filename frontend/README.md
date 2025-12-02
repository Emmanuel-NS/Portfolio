# Emmanuel NS · Portfolio

Premium, neon-tinged portfolio for a senior software engineer. Built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** on top of Vite.

## Features

- Hero, expertise, projects, and contact sections with handcrafted copy
- Custom Tailwind theme (fonts, gradients, glass panels, utility classes)
- Aurora hero, staggered timeline, masonry-inspired project grid, and layered contact CTA deck
- Dedicated achievements and consulting sections so recruiters and clients can validate experience fast
- Responsive layout and accessible navigation with mobile drawer
- Motion flourishes powered by Framer Motion
- Content synced with Emmanuel Nsabagasanis public portfolio (education, experience, skills, and contact data)
- Ready-to-deploy Vite build (Rolldown bundler)

## Quick start

```bash
npm install
npm run dev
```

Visit `localhost:5173` to preview the site. Use `npm run build` for a production bundle and `npm run preview` to inspect the build locally.

## Project scripts

- `npm run dev` – Vite dev server with Fast Refresh
- `npm run build` – Type-check (`tsc -b`) and create optimized production build
- `npm run lint` – ESLint across the repo
- `npm run preview` – Serve the compiled `dist` folder

## Deployment notes

The output in `dist/` is static and deploys anywhere (Netlify, Vercel, GitHub Pages, Cloudflare Pages). Configure the platform to serve `index.html` for unmatched routes.
