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

## Deploying on Vercel

1. Import this repository into [Vercel](https://vercel.com/new).
2. Set the **Root Directory** to `frontend`.
3. Under **Environment Variables**, add:
   * `GATEWAY_URL` = `https://cordon-api-978214922885.asia-south1.run.app`
   * `CORDON_API_KEY` = `AQ.Ab8RN6LClZkwqoGjpk5wc5c9b53e90e3d7460bbfd9bf8ecae4b5bf25ed10ae25ecc3de8ee2`
4. Click **Deploy**.

The Next.js proxy route at `/api/inspect` will automatically communicate with the Google Cloud Run gateway.
