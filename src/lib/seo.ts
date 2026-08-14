/**
 * Per-route SEO metadata — single source of truth.
 *
 * Consumed in three places:
 *   - scripts/prerender.mjs (via entry-server.tsx) bakes renderHead() into the
 *     static HTML for each route, so crawlers get a correct title/canonical,
 *     and writes sitemap.xml from renderSitemap().
 *   - useDocumentMeta() applies the same values client-side for dev and for
 *     SPA navigation.
 *
 * Feature-page and guide routes are generated from their data modules, so a
 * new entry there automatically gets a head, a route, and a sitemap line.
 * Only hand-written routes need an entry in `staticRoutes` below.
 */
import { SITE_URL, SUPPORT_EMAIL } from "./site";
import { faqs, type Faq } from "./faqs";
import { calculatorFaqs } from "./calculatorFaqs";
import { featurePages } from "./featurePages";
import { guides } from "./guides";

export type RouteMeta = {
  title: string;
  description: string;
  /** Path only, e.g. "/privacy" — joined to SITE_URL for the canonical. */
  path: string;
  /** Omit to inherit the default social image. */
  ogImage?: string;
  /** Keeps the route out of the sitemap and marks it noindex. */
  noindex?: boolean;
  /** ISO date for the sitemap. Bump when the page's content changes —
   *  a lastmod that moves on every build is noise Google learns to ignore. */
  lastmod?: string;
  /** Sitemap priority relative to other pages on this site. */
  priority?: string;
};

const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const SITE_UPDATED = "2026-08-12";

const staticRoutes: RouteMeta[] = [
  {
    title: "Blasto — The IVF App That Keeps Your Cycle Organized",
    description:
      "Blasto is an iPhone IVF app for tracking medications, appointments, symptoms, and results — with a supportive AI companion. Private by design, free during beta.",
    path: "/",
    lastmod: SITE_UPDATED,
    priority: "1.0",
  },
  {
    title: "IVF Due Date Calculator — Transfer & Retrieval | Blasto",
    description:
      "Calculate your IVF due date from an embryo transfer or egg retrieval date. Works for fresh and frozen day 3, 5, and 6 transfers, with milestone dates.",
    path: "/ivf-due-date-calculator",
    lastmod: SITE_UPDATED,
    priority: "0.9",
  },
  {
    title: "IVF Guides — Tracking, Results & What to Expect | Blasto",
    description:
      "Practical guides to tracking an IVF cycle: medications, symptoms, retrieval numbers, and the emotional side. Reviewed by clinicians.",
    path: "/guides",
    lastmod: SITE_UPDATED,
    priority: "0.8",
  },
  {
    title: "About Blasto — Who We Are",
    description:
      "Who builds Blasto, why we built an IVF tracking app, and how we handle the most personal data there is.",
    path: "/about",
    lastmod: SITE_UPDATED,
    priority: "0.5",
    // GATED: the page still contains [BRACKETED] placeholders and a drafted
    // origin story that hasn't been confirmed as true. Publishing an unverified
    // personal claim under the founder's name is not a thing to ship by
    // accident. Remove this flag and the Footer link once the copy is real.
    noindex: true,
  },
  {
    title: "Editorial Standards — How We Review Content | Blasto",
    description:
      "How Blasto researches, writes, and medically reviews its IVF content, and the sources we rely on.",
    path: "/editorial-standards",
    lastmod: SITE_UPDATED,
    priority: "0.5",
  },
  {
    title: "Privacy Policy — Blasto IVF App",
    description:
      "How Blasto collects, uses, and protects your IVF and fertility data. We never sell your data or share it with advertisers or data brokers.",
    path: "/privacy",
    lastmod: SITE_UPDATED,
    priority: "0.3",
  },
  {
    title: "Verify Your Email — Blasto",
    description: "Confirm your email address for your Blasto account.",
    path: "/verify-email",
    lastmod: SITE_UPDATED,
    priority: "0.1",
    // Email-action handler (verification / password-reset links land here).
    // Not a destination page; keep it out of search.
    noindex: true,
  },
  {
    title: "Terms of Service — Blasto IVF App",
    description:
      "The terms governing your use of Blasto, the IVF tracking app for iPhone. Blasto is not a medical device and does not provide medical advice.",
    path: "/terms",
    lastmod: SITE_UPDATED,
    priority: "0.3",
  },
];

const featureRoutes: RouteMeta[] = featurePages.map((p) => ({
  title: p.title,
  description: p.description,
  path: p.slug,
  lastmod: p.lastmod,
  priority: "0.9",
}));

/** Draft guides render (so you can preview them) but stay noindex and out of
 *  the sitemap — see the note at the top of src/lib/guides.ts. */
const guideRoutes: RouteMeta[] = guides.map((g) => ({
  title: `${g.title} | Blasto`,
  description: g.description,
  path: `/guides/${g.slug}`,
  lastmod: g.lastmod,
  priority: "0.7",
  noindex: g.status !== "published",
}));

export const routeMeta: Record<string, RouteMeta> = Object.fromEntries(
  [...staticRoutes, ...featureRoutes, ...guideRoutes].map((m) => [m.path, m])
);

export function getRouteMeta(pathname: string): RouteMeta {
  // Tolerate trailing slashes so "/privacy/" and "/privacy" resolve alike.
  const key = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
  return routeMeta[key] ?? routeMeta["/"];
}

export function canonicalFor(meta: RouteMeta): string {
  return meta.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${meta.path}`;
}

/** Routes prerendered at build time — everything, including noindex drafts,
 *  so they're previewable on the deployed site. */
export const prerenderRoutes: string[] = Object.keys(routeMeta);

/** Routes eligible for the sitemap. */
export const indexableRoutes: RouteMeta[] = Object.values(routeMeta).filter(
  (m) => !m.noindex
);

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

/** Pages that render a visible FAQ block. The markup is generated from the
 *  same array the page renders, so the two can never drift — FAQPage markup
 *  that doesn't match on-page text is treated as spam. */
const faqsByPath: Record<string, Faq[]> = {
  "/": faqs,
  "/ivf-due-date-calculator": calculatorFaqs,
};

function faqPageFor(path: string): object | null {
  const pageFaqs = faqsByPath[path];
  if (!pageFaqs) return null;
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}${path === "/" ? "/" : path}#faq`,
    mainEntity: pageFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Article markup for a published guide. Drafts get none — claiming a
 *  reviewer that doesn't exist is exactly the signal not to fake. */
function guideArticle(pathname: string): object | null {
  const slug = pathname.replace(/^\/guides\//, "");
  const guide = guides.find((g) => g.slug === slug);
  if (!guide || guide.status !== "published" || !guide.reviewer) return null;

  return {
    "@type": "MedicalWebPage",
    "@id": `${SITE_URL}${pathname}#article`,
    headline: guide.title,
    description: guide.description,
    url: `${SITE_URL}${pathname}`,
    dateModified: guide.lastmod,
    publisher: { "@id": `${SITE_URL}/#organization` },
    reviewedBy: {
      "@type": "Person",
      name: guide.reviewer.name,
      jobTitle: guide.reviewer.credentials,
      ...(guide.reviewer.profileUrl ? { url: guide.reviewer.profileUrl } : {}),
    },
    ...(guide.reviewedOn ? { lastReviewed: guide.reviewedOn } : {}),
  };
}

/** JSON-LD graph for a route. */
export function structuredDataFor(pathname: string): object {
  const meta = getRouteMeta(pathname);
  const graph: object[] = [organization, website];

  if (meta.path === "/") graph.push(application);

  const faqPage = faqPageFor(meta.path);
  if (faqPage) graph.push(faqPage);

  const article = guideArticle(meta.path);
  if (article) graph.push(article);

  return { "@context": "https://schema.org", "@graph": graph };
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
    meta.noindex ? `<meta name="robots" content="noindex, nofollow" />` : "",
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

/** sitemap.xml, generated at build time from the indexable routes. */
export function renderSitemap(): string {
  const urls = indexableRoutes
    .map((m) => {
      const lines = [
        `    <loc>${canonicalFor(m)}</loc>`,
        m.lastmod ? `    <lastmod>${m.lastmod}</lastmod>` : "",
        m.priority ? `    <priority>${m.priority}</priority>` : "",
      ].filter(Boolean);
      return `  <url>\n${lines.join("\n")}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
