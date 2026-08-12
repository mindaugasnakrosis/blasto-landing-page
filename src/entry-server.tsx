import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "./App";
import { renderHead } from "./lib/seo";

/**
 * Called by scripts/prerender.mjs at build time to emit static HTML per route.
 * Returns the body markup and the route's <head> fragment — the head must be
 * per-route, or every page inherits the homepage canonical and drops out of
 * the index.
 */
export function render(url: string): { html: string; head: string } {
  const html = renderToString(
    <StaticRouter location={url}>
      <AppShell />
    </StaticRouter>
  );
  return { html, head: renderHead(url) };
}

/** Routes prerendered at build time. Add new indexable routes here and in
 *  src/lib/seo.ts (and public/sitemap.xml). */
export const prerenderRoutes = ["/", "/privacy", "/terms"];
