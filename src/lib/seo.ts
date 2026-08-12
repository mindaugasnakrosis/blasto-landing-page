/**
 * Per-route SEO metadata — single source of truth.
 *
 * Consumed in two places:
 *   - scripts/prerender.mjs (via entry-server.tsx) bakes renderHead() into the
 *     static HTML for each route, so crawlers get a correct title/canonical.
 *   - useDocumentMeta() applies the same values client-side for dev and for
 *     SPA navigation.
 *
 * IMPORTANT: every indexable route needs an entry here. A route with no entry
 * falls back to the homepage meta, which would hand it the homepage's canonical
 * and drop it from the index.
 */
import { SITE_URL, SUPPORT_EMAIL } from "./site";
import { faqs } from "./faqs";

export type RouteMeta = {
  title: string;
  description: string;
  /** Path only, e.g. "/privacy" — joined to SITE_URL for the canonical. */
  path: string;
  /** Omit to inherit the default social image. */
  ogImage?: string;
  /** Keep experimental or thin routes out of the index. */
  noindex?: boolean;
};

const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const routeMeta: Record<string, RouteMeta> = {
  "/": {
    title: "Blasto — The IVF App That Keeps Your Cycle Organized",
    description:
      "Blasto is an iPhone IVF app for tracking medications, appointments, symptoms, and results — with a supportive AI companion. Private by design, free during beta.",
    path: "/",
  },
  "/privacy": {
    title: "Privacy Policy — Blasto IVF App",
    description:
      "How Blasto collects, uses, and protects your IVF and fertility data. We never sell your data or share it with advertisers or data brokers.",
    path: "/privacy",
  },
  "/terms": {
    title: "Terms of Service — Blasto IVF App",
    description:
      "The terms governing your use of Blasto, the IVF tracking app for iPhone. Blasto is not a medical device and does not provide medical advice.",
    path: "/terms",
  },
};

export function getRouteMeta(pathname: string): RouteMeta {
  // Tolerate trailing slashes so "/privacy/" and "/privacy" resolve alike.
  const key = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
  return routeMeta[key] ?? routeMeta["/"];
}

export function canonicalFor(meta: RouteMeta): string {
  return meta.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${meta.path}`;
}

/* ------------------------------------------------------------------ *
 * Structured data
 * ------------------------------------------------------------------ */

const organization = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Blasto",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  email: SUPPORT_EMAIL,
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: "Blasto",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const application = {
  "@type": "MobileApplication",
  "@id": `${SITE_URL}/#app`,
  name: "Blasto",
  operatingSystem: "iOS",
  applicationCategory: "HealthApplication",
  description:
    "Blasto helps you track IVF cycles, medications, appointments, symptoms, and results — with a supportive AI voice companion.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const faqPage = {
  "@type": "FAQPage",
  "@id": `${SITE_URL}/#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

/** JSON-LD graph for a route. Only the homepage carries app + FAQ markup. */
export function structuredDataFor(pathname: string): object {
  const isHome = getRouteMeta(pathname).path === "/";
  return {
    "@context": "https://schema.org",
    "@graph": isHome
      ? [organization, website, application, faqPage]
      : [organization, website],
  };
}

/* ------------------------------------------------------------------ *
 * Head rendering (build time)
 * ------------------------------------------------------------------ */

/** Escape a value destined for an HTML attribute. */
function attr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Full <head> fragment for a route, injected at the <!--app-head--> marker.
 * Covers every tag that varies per route; index.html keeps only site-wide tags.
 */
export function renderHead(pathname: string): string {
  const meta = getRouteMeta(pathname);
  const canonical = canonicalFor(meta);
  const image = meta.ogImage ?? OG_IMAGE;
  // JSON-LD is escaped so a "</script>" inside any string can't close the tag.
  const jsonLd = JSON.stringify(structuredDataFor(pathname), null, 2).replace(
    /</g,
    "\\u003c"
  );

  return [
    `<title>${attr(meta.title)}</title>`,
    `<meta name="description" content="${attr(meta.description)}" />`,
    `<link rel="canonical" href="${attr(canonical)}" />`,
    meta.noindex ? `<meta name="robots" content="noindex" />` : "",
    `<meta property="og:title" content="${attr(meta.title)}" />`,
    `<meta property="og:description" content="${attr(meta.description)}" />`,
    `<meta property="og:url" content="${attr(canonical)}" />`,
    // Dimensions must follow their og:image — unfurlers bind them positionally.
    `<meta property="og:image" content="${attr(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:title" content="${attr(meta.title)}" />`,
    `<meta name="twitter:description" content="${attr(meta.description)}" />`,
    `<meta name="twitter:image" content="${attr(image)}" />`,
    `<script type="application/ld+json">${jsonLd}</script>`,
  ]
    .filter(Boolean)
    .join("\n    ");
}
