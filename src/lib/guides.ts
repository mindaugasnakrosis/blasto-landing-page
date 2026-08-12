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
  /** The query this article is written to answer. See docs/content-plan.md
   *  for the SERP evidence behind each one. */
  targetQuery: string;
  /** Relative Google Trends interest (US, 12mo, Aug 2026) and competitive read.
   *  Trends is normalized per comparison — these are NOT searches per month, and
   *  a low number means "small next to the terms it was compared against", not
   *  "no demand". Confirm in Keyword Planner before committing writing time. */
  demand: string;
  /** The shape the ranking results take for this query. These SERPs reward
   *  charts, timelines, and templates over essays — match the format. */
  format: string;
  /** Feature-page slugs this article should link to from its body. Descriptive
   *  anchors, varied per article — identical exact-match anchors across a whole
   *  cluster read as manipulation. */
  linksTo: string[];
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
 * Planned articles, in write order. Full evidence is in docs/content-plan.md —
 * read it before changing the slate, and re-run the research before writing,
 * because SERPs move.
 *
 * Ordered by demand × winnability. An earlier version of this list was ordered
 * by SERP weakness alone, which put the two lowest-demand terms first; Trends
 * data corrected it. The common thread is unchanged: queries where page one is
 * personal blogs and unmaintained clinic pages, not Flo or Mayo. General
 * "what is IVF" explainers are deliberately absent — that fight is lost before
 * it starts.
 *
 * NOTE: the highest-demand opportunity found isn't in this list at all — it's
 * an IVF due date calculator ("ivf due date calculator" outdrew every article
 * target measured, and outdrew "ivf app"). It needs no medical reviewer, so
 * nothing blocks it. See docs/content-plan.md §Revised priority.
 */
export const guides: Guide[] = [
  {
    slug: "two-week-wait-symptoms-day-by-day",
    title: "Two-Week Wait Symptoms, Day by Day After Embryo Transfer",
    description:
      "What's happening after an embryo transfer day by day, and why the symptoms you're watching for don't predict the outcome.",
    category: "Emotional wellbeing",
    excerpt: "What's happening each day — and why symptom-spotting misleads.",
    // Target the IVF-qualified phrasing, NOT bare "two week wait" — that term
    // collides with the UK NHS cancer referral pathway at totally different
    // intent (see the "two week wait referral/pathway" autocompletes).
    targetQuery: "after embryo transfer day by day",
    demand: "Highest of the article set. Mixed-quality SERP, no dominant authority.",
    format: "One page, section per day (3–10), matching the autocomplete ladder",
    // Every ranking page lists symptoms; none lead with the fact that
    // progesterone causes most of them. That framing is the whole opening.
    linksTo: ["/ivf-symptom-tracker"],
    sections: [],
    references: [],
    reviewer: null,
    reviewedOn: null,
    lastmod: "2026-08-12",
    status: "draft",
  },
  {
    slug: "ivf-printable-calendar",
    title: "IVF Calendar & Medication Schedule (Free Printable)",
    description:
      "A printable IVF calendar and stim medication schedule, plus how to lay out injections, pills, and trigger timing so nothing gets missed.",
    category: "Medications",
    excerpt: "A printable calendar and schedule, and how to lay your protocol out.",
    targetQuery: "ivf printable calendar",
    // The exact phrase "ivf medication schedule" measured ~1, but the printable
    // cluster is wider than that phrase and people are buying paper trackers on
    // Etsy. CONFIRM IN KEYWORD PLANNER before writing.
    demand: "Unconfirmed — exact phrase low, surrounding cluster looks larger.",
    format: "Downloadable PDF + explanation",
    // Strongest commercial intent on the slate: someone printing a med schedule
    // is exactly the user. Bonzun's medication-tracker feature page ranks on
    // this SERP — direct proof the feature-page pattern works here.
    linksTo: ["/ivf-medication-tracker"],
    sections: [],
    references: [],
    reviewer: null,
    reviewedOn: null,
    lastmod: "2026-08-12",
    status: "draft",
  },
  {
    slug: "ivf-follicle-size-by-day",
    title: "IVF Follicle Size by Day: A Stim-Cycle Chart",
    description:
      "What follicle sizes to expect on each day of stimulation, how fast they grow, and what your clinic is looking for before trigger.",
    category: "Medications",
    excerpt: "What size follicles should be on each stim day, and why it varies.",
    targetQuery: "ivf follicle size by day",
    demand: "Low, but the weakest competition found anywhere — a personal blog ranks.",
    format: "One page, section per stim day (4–12), with mm ranges",
    linksTo: ["/ivf-results-tracker", "/ivf-medication-tracker"],
    sections: [],
    references: [],
    reviewer: null,
    reviewedOn: null,
    lastmod: "2026-08-12",
    status: "draft",
  },
  {
    slug: "egg-retrieval-numbers-explained",
    title: "Egg Retrieval Numbers Explained: From Eggs to Blastocysts",
    description:
      "What eggs retrieved, mature, fertilized, and blastocyst actually mean, and why the drop-off at each stage is expected.",
    category: "Results & testing",
    excerpt: "Every number in the retrieval funnel, and why attrition is normal.",
    targetQuery: "how many eggs make it to blastocyst",
    demand: "Harder SERP — Liv Hospital holds multiple positions.",
    format: "Funnel diagram with attrition percentages",
    // Perfect product match, but the weakest fit for a GP reviewer. Consider
    // scoping to terminology until specialist input exists.
    linksTo: ["/ivf-results-tracker"],
    sections: [],
    references: [],
    reviewer: null,
    reviewedOn: null,
    lastmod: "2026-08-12",
    status: "draft",
  },
  {
    slug: "ivf-calendar-timeline",
    title: "The IVF Calendar: A Full Cycle, Phase by Phase",
    description:
      "How an IVF cycle is laid out from suppression through transfer, with the appointments and decisions at each phase.",
    category: "Getting started",
    excerpt: "How a full cycle is laid out, from suppression to transfer.",
    targetQuery: "ivf calendar timeline",
    demand: "Toughest set on the list — established clinics hold it.",
    format: "Phase-by-phase timeline",
    // Write last, once the cluster has some topical footing.
    linksTo: ["/ivf-medication-tracker"],
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
