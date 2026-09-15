# Cordon — Frontend

Landing page + customer dashboard for Cordon, the prompt-injection screening
API. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

This is **frontend only** — no backend, auth, or database is wired up.
Forms and buttons that would normally hit an API (login, signup, API key
regenerate, CSV export) are mocked so you can review the full flow; swap in
real calls when the backend is ready.

## Pages

- `/` — landing page: hero, how-it-works + install snippet, attack coverage,
  pricing (Free demo / Pro)
- `/login`, `/signup` — auth forms (currently just route to `/dashboard`)
- `/dashboard` — API key card, usage stats, volume chart, recent activity
- `/dashboard/logs` — full attack log table

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Design system

- Colors: `--ground` (#FFD84D sunflower), `--ink` (#221C4A indigo) — see
  `app/globals.css` and `tailwind.config.ts`
- Type: Rubik Mono One (display) + Space Grotesk (body/labels), loaded via
  `next/font/google` in `app/layout.tsx` — needs network access to Google
  Fonts at build time
- Shared motifs: rotated ink band (`.ink-band` / inline in `Hero.tsx`),
  sticker badge (`components/Sticker.tsx`), hand-drawn squiggle
  (`components/Squiggle.tsx`)

## Deploying

Built to deploy on Vercel as-is: `vercel deploy`, or connect the repo in the
Vercel dashboard. No environment variables are required yet — add
`CORDON_API_KEY` and friends once the backend exists.

## Package name used in copy

The install snippet in the "how it works" section and the dashboard
quickstart both reference `cordon-sdk` as the npm package name — update this
in `components/sections/HowItWorks.tsx` and `app/dashboard/page.tsx` once
you've settled on a real package name.
