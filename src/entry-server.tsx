import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppShell } from "./App";
import {
  renderHead,
  renderNotFoundHead,
  renderSitemap,
  prerenderRoutes,
} from "./lib/seo";

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

/** Re-exported for the prerender script: the routes to emit, the sitemap
 *  generated from the indexable subset of them, and the 404 shell's head. */
export { prerenderRoutes, renderSitemap, renderNotFoundHead };
