/**
 * IVF guides — the content silo.
 *
 * DELIBERATELY UNPOPULATED. Every entry below is a stub with `status: "draft"`,
 * which keeps it out of the sitemap and marks it noindex.
 *
 * Two reasons it works this way:
 *  1. Thin or placeholder pages in the index are worse than no pages at all —
 *     they dilute the site's quality signal and can suppress the pages that
 *     are good. A draft must not be crawlable.
 *  2. This is medical content in a YMYL vertical. Google weighs author and
 *     reviewer credentials heavily here, and an unreviewed IVF article
 *     published under a health brand is a liability well before it's an SEO
 *     problem. Nothing here should go live without a named clinician in
 *     `reviewer` who has actually read it.
 *
 * To publish one: write `sections`, set a real `reviewer` and `reviewedOn`,
 * then flip `status` to "published". It joins the sitemap automatically.
 */

export type Reviewer = {
  name: string;
  /** e.g. "MD, FACOG — Reproductive Endocrinologist" */
  credentials: string;
  /** Optional profile URL for the credential to be verifiable. */
  profileUrl?: string;
};

export type GuideCategory =
  | "Getting started"
  | "Medications"
  | "Egg retrieval"
  | "Embryo transfer"
  | "Results & testing"
  | "Emotional wellbeing";

export const guideCategories: GuideCategory[] = [
  "Getting started",
  "Medications",
  "Egg retrieval",
  "Embryo transfer",
  "Results & testing",
  "Emotional wellbeing",
];

export type Guide = {
  slug: string;
  title: string;
  /** Meta description. Write this even for drafts — it shapes the article. */
  description: string;
  category: GuideCategory;
  /** One-line summary shown on the /guides hub. */
  excerpt: string;
  /** Body content. Empty on drafts. */
  sections: { heading: string; body: string }[];
  /** Sources the article cites. Required before publishing. */
  references: { label: string; url: string }[];
  reviewer: Reviewer | null;
  /** ISO date the reviewer signed off. */
  reviewedOn: string | null;
  lastmod: string;
  status: "draft" | "published";
};

/**
 * Planned articles, chosen to sit where a dedicated IVF app can compete.
 * These target "doing" queries — tracking, logging, understanding your own
 * numbers — rather than general "what is IVF" explainers, which are owned by
 * Flo, Mayo Clinic, and clinic sites with far more authority.
 */
export const guides: Guide[] = [
  {
    slug: "how-to-track-your-ivf-medications",
    title: "How to Track Your IVF Medications Without Losing Your Mind",
    description:
      "A practical system for keeping stim injections, pills, and trigger timing straight through an IVF cycle.",
    category: "Medications",
    excerpt:
      "A practical system for keeping injections, pills, and trigger timing straight.",
    sections: [],
    references: [],
    reviewer: null,
    reviewedOn: null,
    lastmod: "2026-08-12",
    status: "draft",
  },
  {
    slug: "understanding-your-egg-retrieval-numbers",
    title: "Understanding Your Egg Retrieval Numbers",
    description:
      "What eggs retrieved, mature, fertilized, and blastocyst actually mean — and why the drop-off at each stage is normal.",
    category: "Results & testing",
    excerpt:
      "What each number in the retrieval funnel means, and why attrition is expected.",
    sections: [],
    references: [],
    reviewer: null,
    reviewedOn: null,
    lastmod: "2026-08-12",
    status: "draft",
  },
  {
    slug: "what-to-track-during-stims",
    title: "What to Track During Stims (and What to Skip)",
    description:
      "Which symptoms and measurements are worth logging during ovarian stimulation, and which just add anxiety.",
    category: "Medications",
    excerpt:
      "Which symptoms are worth logging during stimulation, and which just add anxiety.",
    sections: [],
    references: [],
    reviewer: null,
    reviewedOn: null,
    lastmod: "2026-08-12",
    status: "draft",
  },
  {
    slug: "questions-to-ask-at-your-ivf-consultation",
    title: "Questions to Ask at Your First IVF Consultation",
    description:
      "A checklist of questions to bring to an initial fertility consultation, and notes on what the answers tell you.",
    category: "Getting started",
    excerpt: "A checklist to bring to your first appointment.",
    sections: [],
    references: [],
    reviewer: null,
    reviewedOn: null,
    lastmod: "2026-08-12",
    status: "draft",
  },
  {
    slug: "surviving-the-two-week-wait",
    title: "Surviving the Two-Week Wait",
    description:
      "What's happening after an embryo transfer, why symptom-spotting misleads, and ways through the waiting.",
    category: "Emotional wellbeing",
    excerpt: "Why symptom-spotting misleads, and what actually helps.",
    sections: [],
    references: [],
    reviewer: null,
    reviewedOn: null,
    lastmod: "2026-08-12",
    status: "draft",
  },
];

export const publishedGuides = (): Guide[] =>
  guides.filter((g) => g.status === "published");

export const guideBySlug = (slug: string): Guide | undefined =>
  guides.find((g) => g.slug === slug);

/** A guide is publishable only once it has body copy, sources, and a reviewer. */
export function publishBlockers(guide: Guide): string[] {
  const missing: string[] = [];
  if (guide.sections.length === 0) missing.push("body content");
  if (guide.references.length === 0) missing.push("references");
  if (!guide.reviewer) missing.push("a named medical reviewer");
  if (!guide.reviewedOn) missing.push("a review date");
  return missing;
}
