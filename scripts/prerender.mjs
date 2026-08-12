/**
 * Build-time prerendering for GitHub Pages.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle):
 *   1. keeps dist/index.html as the template
 *   2. writes dist/404.html as the SPA shell (GitHub Pages fallback for
 *      unknown routes, rendered client-side) with the homepage head
 *   3. renders each prerendered route to static HTML — body *and* head — so
 *      crawlers, link unfurlers, and curl see real content with the right
 *      title and canonical for that URL
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");

for (const marker of ["<!--app-html-->", "<!--app-head-->"]) {
  if (!template.includes(marker)) {
    throw new Error(`dist/index.html is missing the ${marker} placeholder`);
  }
}

const { render, prerenderRoutes, renderSitemap } = await import(
  pathToFileURL(path.join(dist, "server", "entry-server.js")).href
);

// Strip the authoring note above the marker — it's guidance for whoever edits
// index.html, not something to ship on every page.
const base = template.replace(/<!--\s*Route-specific tags[\s\S]*?-->\s*/, "");

const fill = (head, body) =>
  base.replace("<!--app-head-->", head).replace("<!--app-html-->", body);

// The 404 shell renders client-side; give it the homepage head so unfurlers
// hitting an unknown URL still get sane tags. useDocumentMeta() corrects the
// title once the route resolves in the browser.
const { head: homeHead } = render("/");
fs.writeFileSync(path.join(dist, "404.html"), fill(homeHead, ""));

for (const url of prerenderRoutes) {
  const { html: appHtml, head } = render(url);
  const html = fill(head, appHtml);
  const file =
    url === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, url.slice(1), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log(
    `prerendered ${url} -> ${path.relative(dist, file)} (${(html.length / 1024).toFixed(0)} kB)`
  );
}

// Generated rather than kept in public/, so a new route can't be added without
// its sitemap entry. Draft guides are excluded — see src/lib/guides.ts.
const sitemap = renderSitemap();
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
console.log(
  `sitemap.xml -> ${(sitemap.match(/<loc>/g) ?? []).length} indexable URLs ` +
    `(${prerenderRoutes.length} routes prerendered)`
);

fs.rmSync(path.join(dist, "server"), { recursive: true, force: true });
console.log("prerender complete");
