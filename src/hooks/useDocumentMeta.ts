import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { canonicalFor, getRouteMeta, structuredDataFor } from "@/lib/seo";

/** Create the tag on first use so this works against the bare SPA shell too. */
function upsert(
  selector: string,
  create: () => HTMLElement
): HTMLElement {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

function setMeta(attrName: "name" | "property", key: string, content: string) {
  const el = upsert(`meta[${attrName}="${key}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(attrName, key);
    return m;
  });
  el.setAttribute("content", content);
}

/**
 * Keeps title/description/canonical/social tags in sync with the current route.
 *
 * Crawlers read the prerendered head baked in by scripts/prerender.mjs — this
 * covers `vite dev` and client-side navigation, where that head would go stale.
 * Values come from the same src/lib/seo.ts map, so the two can't disagree.
 */
export function useDocumentMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    const canonical = canonicalFor(meta);

    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", canonical);
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);

    upsert('link[rel="canonical"]', () => {
      const l = document.createElement("link");
      l.rel = "canonical";
      return l;
    }).setAttribute("href", canonical);

    const ld = upsert('script[type="application/ld+json"]', () => {
      const s = document.createElement("script");
      s.setAttribute("type", "application/ld+json");
      return s;
    });
    ld.textContent = JSON.stringify(structuredDataFor(pathname));
  }, [pathname]);
}
