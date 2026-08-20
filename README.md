# Blasto landing page

Marketing and compliance site for [Blasto](https://blastoivf.com) - an iPhone and
Android app for tracking IVF cycles, medications, symptoms, and results.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui, framer-motion
- Deployed to GitHub Pages via `.github/workflows/deploy.yml` on push to `main`

## Development

```sh
npm install
npm run dev        # dev server on :8080
npm run build      # client build + SSR build + prerender
npm run preview    # serve dist/
npm test           # vitest
```

## Prerendering

`npm run build` renders `/`, `/privacy`, and `/terms` to static HTML
(`scripts/prerender.mjs`), so crawlers and link unfurlers see full content.
`dist/404.html` stays a plain SPA shell as the GitHub Pages fallback for
unknown routes. The client hydrates prerendered pages (`src/main.tsx`).

## Going live on the stores

Set `APP_STORE_URL` and/or `PLAY_STORE_URL` in `src/lib/site.ts`. The navbar,
hero, footer and feature-page CTAs switch from "Request Beta Access" to the
matching store badge(s) automatically, so one store can go live before the
other. The Play URL will be
`https://play.google.com/store/apps/details?id=com.blastoivf.blasto`.

## App screenshots

Real app screenshots live in `src/assets/screenshots/` (750 px wide). The AI
companion feature block uses a stylized illustration
(`ScreenCompanion` in `src/components/landing/PhoneMockups.tsx`) until a real
screenshot of that screen exists — swap it the same way the other blocks
use `<PhoneFrame><img …/></PhoneFrame>`.

## Where things stand

Outstanding work is tracked in [`docs/next-steps.md`](docs/next-steps.md) —
start there. Supporting docs:

- [`docs/content-plan.md`](docs/content-plan.md) — keyword research and the article slate
- [`docs/medical-review-checklist.md`](docs/medical-review-checklist.md) — for the guide reviewer
