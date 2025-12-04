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
- Admin workspace locked behind a passcode with optional two-factor verification that can be toggled from the dashboard
- Ready-to-deploy Vite build (Rolldown bundler)

## Quick start

```bash
npm install
npm run dev:full # runs frontend + API
```

Visit `http://localhost:5173` to preview the public site. The admin workspace lives under `/admin` and talks to the Express API (`server/`).

⚠️ The public site now reads its hero, projects, achievements, and contact data directly from `/api/content`, so keep the API server running (for example with `npm run dev:full`) to see admin edits reflected immediately.

> Prefer to run each side manually? Use `npm run dev` for the frontend and `npm --prefix server run dev` for the API.

- `VITE_API_URL` (optional) – set this to the deployed API origin if the frontend and backend are hosted separately. During local dev we rely on Vite’s `/api` proxy (configured in `vite.config.ts`) so no extra env is needed.
- Run `npm run prisma:migrate` and `npm run prisma:seed` to sync the Postgres schema/data before opening the admin.

## Admin security

The admin experience at `/admin` now requires a passcode (and optional Authy/Google Authenticator code) before unlocking the dashboard.

Configure the secrets inside `server/.env`:

```env
ADMIN_PASSCODE="admin-passcode"
ADMIN_TOTP_SECRET="JBSWY3DPEHPK3PXP"      # base32 seed for Authenticator apps
ADMIN_TOTP_LABEL="Portfolio Admin"        # account label shown inside Authenticator
ADMIN_TOTP_ISSUER="Emmanuel Portfolio"    # issuer name displayed beneath the label
ADMIN_SESSION_SECRET="replace-with-strong-secret"
ADMIN_SESSION_TTL="86400" # optional override, seconds
```

- The passcode and authenticator secret seed the initial values in the database. Rotate both from **Admin → Security**—rotating the secret disables 2FA until you confirm a new code.
- When two-factor is enabled, both the passcode and the 6-digit authenticator code must be entered on the access gate.
- The session secret signs short-lived JWTs that authorize subsequent admin API calls.

## Project scripts

- `npm run dev` – Vite dev server with Fast Refresh
- `npm run dev:full` – Runs Vite + Express API (via `server/`) together
- `npm run build` – Type-check (`tsc -b`) and create optimized production build
- `npm run lint` – ESLint across the repo
- `npm run preview` – Serve the compiled `dist` folder

## Deployment notes

The output in `dist/` is static and deploys anywhere (Netlify, Vercel, GitHub Pages, Cloudflare Pages). Configure the platform to serve `index.html` for unmatched routes.
