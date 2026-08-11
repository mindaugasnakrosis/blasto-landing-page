/**
 * Build-time prerendering for GitHub Pages.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle):
 *   1. keeps dist/index.html as the template
 *   2. writes dist/404.html as the plain SPA shell (GitHub Pages fallback
 *      for unknown routes, rendered client-side)
 *   3. renders /, /privacy, /terms to static HTML so crawlers, link
 *      unfurlers, and curl see real content
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");

if (!template.includes("<!--app-html-->")) {
  throw new Error("dist/index.html is missing the <!--app-html--> placeholder");
}

fs.writeFileSync(path.join(dist, "404.html"), template);

const { render } = await import(
  pathToFileURL(path.join(dist, "server", "entry-server.js")).href
);

const routes = ["/", "/privacy", "/terms"];
for (const url of routes) {
  const appHtml = render(url);
  const html = template.replace("<!--app-html-->", appHtml);
  const file =
    url === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, url.slice(1), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log(`prerendered ${url} -> ${path.relative(dist, file)} (${(html.length / 1024).toFixed(0)} kB)`);
}

fs.rmSync(path.join(dist, "server"), { recursive: true, force: true });
console.log("prerender complete");
