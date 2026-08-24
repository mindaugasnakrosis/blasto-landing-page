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

const {
  render,
  prerenderRoutes,
  renderSitemap,
  renderNotFoundHead,
  preloadAllRoutes,
  routeModules,
} = await import(pathToFileURL(path.join(dist, "server", "entry-server.js")).href);

// Pages are code-split, and render() is synchronous - every chunk has to be
// resolved before the first render() call or the pages come out empty.
await preloadAllRoutes();

// Strip the authoring note above the marker — it's guidance for whoever edits
// index.html, not something to ship on every page.
const base = template.replace(/<!--\s*Route-specific tags[\s\S]*?-->\s*/, "");

const fill = (head, body) =>
  base.replace("<!--app-head-->", head).replace("<!--app-html-->", body);

const manifestPath = path.join(dist, ".vite", "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

/** The built file for a page module. Pages are code-split, so without this the
 *  browser only discovers the page's chunk after the entry bundle has parsed
 *  and run - a whole round trip after it could have started. Only the page's
 *  own chunk is hinted: its static imports are small, are not needed until
 *  hydration, and preloading them too competes with the CSS and the font for
 *  the first paint. */
const chunkFile = (id) => {
  const entry = manifest[id];
  if (!entry) {
    throw new Error(
      `no build manifest entry for "${id}" - has the page moved? ` +
        "The id comes from routeChunk() in src/lib/routes.tsx."
    );
  }
  return entry.file;
};

/** modulepreload hints for the route's own chunks. Anything the template
 *  already references is skipped - Vite has hinted the entry's graph itself. */
const preloadsFor = (url) => {
  const files = new Set(routeModules(url).map(chunkFile));
  return [...files]
    .filter((file) => !base.includes(file))
    .map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`)
    .join("\n    ");
};

// The 404 shell renders client-side, so it gets a noindex head with no
// canonical rather than the homepage's — see renderNotFoundHead().
// useDocumentMeta() replaces it once the route resolves in the browser.
fs.writeFileSync(path.join(dist, "404.html"), fill(renderNotFoundHead(), ""));

for (const url of prerenderRoutes) {
  const { html: appHtml, head } = render(url);
  const html = fill(`${head}\n    ${preloadsFor(url)}`, appHtml);
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
// Build metadata, not something to serve.
fs.rmSync(path.join(dist, ".vite"), { recursive: true, force: true });
console.log("prerender complete");
