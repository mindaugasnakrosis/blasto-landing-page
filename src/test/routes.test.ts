import { describe, expect, it } from "vitest";
import { prerenderRoutes } from "@/lib/seo";
import { routeModules } from "@/lib/routes";

/**
 * Pages are code-split, and both entry points load the current route's chunk
 * before rendering. If a URL stops matching a route, the chunk is never
 * fetched and the page renders its Suspense fallback over prerendered HTML —
 * so the matching itself is worth pinning down.
 */
describe("route matching", () => {
  it("resolves a page module for every prerendered route", () => {
    for (const url of prerenderRoutes) {
      expect(routeModules(url), url).toHaveLength(1);
      expect(routeModules(url)[0], url).toMatch(/^src\/pages\/\w+\.tsx$/);
    }
  });

  it("resolves the same module with a trailing slash", () => {
    // GitHub Pages serves /privacy/index.html at /privacy/, so the browser's
    // pathname always carries the slash that prerenderRoutes omits.
    for (const url of prerenderRoutes) {
      if (url === "/") continue;
      expect(routeModules(`${url}/`), url).toEqual(routeModules(url));
    }
  });

  it("sends the homepage and an unknown URL to different pages", () => {
    expect(routeModules("/")).toEqual(["src/pages/Index.tsx"]);
    expect(routeModules("/no-such-page")).toEqual(["src/pages/NotFound.tsx"]);
  });
});
