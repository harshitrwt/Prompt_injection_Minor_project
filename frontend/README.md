# Cordon — Frontend

Landing page + customer dashboard for Cordon, the prompt-injection screening
API. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

This frontend includes a live playground proxy at `/api/inspect`. The proxy
forwards prompt inspections to the Python FastAPI gateway; it does not generate
fallback or random detector results. Login, signup, API key regeneration, CSV
export, and dashboard telemetry remain mocked.

## Pages

- `/` — landing page: hero, how-it-works + install snippet, attack coverage,
  pricing (Free demo / Pro)
- `/login`, `/signup` — auth forms (currently just route to `/dashboard`)
- `/dashboard` — API key card, usage stats, volume chart, recent activity
- `/dashboard/logs` — full attack log table

## Run it

```bash
# From the repository root, start the Python model gateway in another terminal:
python -m src.api.server

# In this directory, start the frontend:
npm install
npm run dev
```

Open http://localhost:3000.

The playground calls `http://127.0.0.1:8000/v1/inspect` by default. Set
`GATEWAY_URL` and `CORDON_API_KEY` in `frontend/.env.local` to use another
gateway. If the Python gateway is not running, the playground shows an error
instead of fabricating a result.

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
