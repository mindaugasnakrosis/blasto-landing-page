# Blasto landing page

Marketing and compliance site for [Blasto](https://blastoivf.com) — an iPhone app
for tracking IVF cycles, medications, symptoms, and results.

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

## Going live on the App Store

Set `APP_STORE_URL` in `src/lib/site.ts`. The navbar, hero, and footer switch
from "Request Beta Access" to a Download-on-the-App-Store badge automatically.

## App screenshots

Real app screenshots live in `src/assets/screenshots/` (750 px wide). The AI
companion feature block uses a stylized illustration
(`ScreenCompanion` in `src/components/landing/PhoneMockups.tsx`) until a real
screenshot of that screen exists — swap it the same way the other blocks
use `<PhoneFrame><img …/></PhoneFrame>`.
