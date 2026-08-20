/**
 * Standalone pages for each core feature.
 *
 * These exist to give the landing page's anchor-linked feature sections real
 * indexable URLs — "IVF medication tracker" and "IVF symptom tracker" are
 * queries a dedicated app can win, and a #anchor cannot rank for any of them.
 *
 * This is product copy, not medical content: safe to ship as written. Guides
 * (src/lib/guides.ts) are the opposite and default to noindex until reviewed.
 */

/** Resolved to a real screenshot by src/pages/FeatureDetail.tsx. */
export type ScreenKey = "home" | "symptoms" | "results" | "companion";

export type FeaturePage = {
  /** Route path, also the sitemap entry. */
  slug: string;
  /** <title> — keep the target phrase in the first half. */
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  /** Gradient-highlighted tail of the h1. */
  h1Accent: string;
  intro: string;
  bullets: string[];
  sections: { heading: string; body: string }[];
  screen: ScreenKey;
  /** Slugs of sibling feature pages, for the internal-link cluster. */
  related: string[];
  lastmod: string;
};

export const featurePages: FeaturePage[] = [
  {
    slug: "/ivf-medication-tracker",
    title: "IVF Medication Tracker — Never Miss a Dose | Blasto",
    description:
      "Track every IVF injection, pill, and appointment in one daily checklist, with reminders timed the way you want them. Free during beta on iPhone and Android.",
    eyebrow: "Medications & appointments",
    h1: "An IVF medication tracker that gets every dose",
    h1Accent: "off your mind",
    intro:
      "Stim protocols are a part-time job. Between injections that have to land in a narrow window, pills at different times of day, and monitoring appointments that move at short notice, the tracking itself becomes a source of stress. Blasto turns your protocol into a simple daily checklist.",
    bullets: [
      "Today's tasks in one clear list",
      "Reminders for every medication and appointment",
      "Your clinic, protocol, and treatment phase in one place",
    ],
    sections: [
      {
        heading: "Your protocol as a daily checklist",
        body: "Enter your protocol once and Blasto lays out what you need to take and when, day by day. No cross-referencing a printout against a calendar app — open the app and today's doses are the first thing you see.",
      },
      {
        heading: "Reminders that fit your schedule",
        body: "Trigger shots and timed injections don't forgive a missed window. Set reminders per medication, at the times that work around your day, and get a nudge before each one rather than a generic daily alert.",
      },
      {
        heading: "Appointments alongside the meds",
        body: "Monitoring scans, blood draws, and retrieval dates live next to your medication schedule instead of in a separate calendar, so you can see the whole week at a glance.",
      },
    ],
    screen: "home",
    related: ["/ivf-symptom-tracker", "/ivf-results-tracker"],
    lastmod: "2026-08-12",
  },
  {
    slug: "/ivf-symptom-tracker",
    title: "IVF Symptom Tracker — Log How You Feel | Blasto",
    description:
      "Log IVF symptoms and their intensity in seconds, spot patterns across your cycle, and give your care team a clearer picture. Free during beta on iPhone and Android.",
    eyebrow: "Symptom tracking",
    h1: "Log how you feel",
    h1Accent: "in seconds",
    intro:
      "Stims, retrieval, and the two-week wait each bring their own set of physical changes, and it's hard to remember by your next appointment what happened when. Blasto makes logging fast enough that you'll actually do it.",
    bullets: [
      "Quick intensity sliders, no long forms",
      "A running log across your whole cycle",
      "Gentle reassurance, backed by real prevalence data",
    ],
    sections: [
      {
        heading: "Fast enough to actually use",
        body: "Pick a symptom, drag the intensity slider, done. No multi-screen forms and no required fields — the goal is a log you keep up with, not a perfect dataset you abandon in week two.",
      },
      {
        heading: "Patterns across the whole cycle",
        body: "Individual days tell you little; the shape across a cycle tells you more. Blasto keeps a running log so you can see how symptoms tracked against your stim days, retrieval, and transfer.",
      },
      {
        heading: "Context on what you're feeling",
        body: "Seeing how common a symptom is among others at the same stage takes some of the edge off wondering whether what you're feeling is normal. This is context, not a diagnosis — anything worrying goes to your clinic.",
      },
    ],
    screen: "symptoms",
    related: ["/ivf-medication-tracker", "/ivf-results-tracker"],
    lastmod: "2026-08-12",
  },
  {
    slug: "/ivf-results-tracker",
    title: "IVF Results Tracker — Eggs, Embryos & Bloodwork | Blasto",
    description:
      "See every retrieval as a clear funnel from eggs to euploid embryos, with bloodwork and ultrasounds alongside. Free during beta on iPhone and Android.",
    eyebrow: "Results",
    h1: "Your numbers,",
    h1Accent: "finally clear",
    intro:
      "Clinic portals hand you a PDF of numbers with no shape to them. How many eggs were retrieved, how many were mature, how many fertilized, how many made blastocyst — that funnel is the story of your cycle, and it deserves to be legible.",
    bullets: [
      "Retrieval funnel from eggs to embryos",
      "Blood work and ultrasounds alongside",
      "Every cycle kept for easy reference",
    ],
    sections: [
      {
        heading: "The retrieval funnel at a glance",
        body: "Eggs retrieved, mature, fertilized, blastocyst, euploid — laid out as a funnel so the attrition at each stage is visible instead of buried in a table. It's the view most people end up drawing by hand.",
      },
      {
        heading: "Bloodwork and scans in context",
        body: "Estradiol trends and follicle counts sit alongside the outcomes they led to, so when you look back at a cycle you can see how the monitoring tracked against the result.",
      },
      {
        heading: "Every cycle, kept",
        body: "If you go through more than one round, past cycles stay available to compare against. Useful for your own reference, and for conversations with a new clinic if you switch.",
      },
    ],
    screen: "results",
    related: ["/ivf-medication-tracker", "/ivf-symptom-tracker"],
    lastmod: "2026-08-12",
  },
  {
    slug: "/ivf-support-companion",
    title: "IVF Support Companion — Someone to Talk To | Blasto",
    description:
      "A supportive voice companion one tap away on every screen, that knows where you are in treatment and explains what's ahead in plain language.",
    eyebrow: "Your AI companion",
    h1: "Someone to talk to,",
    h1Accent: "any hour of the cycle",
    intro:
      "IVF comes with questions at 11pm and nerves before every scan, and the people around you are often as much in the dark as you are. Blasto's voice companion is one tap away on every screen.",
    bullets: [
      "Talk or type — whatever feels right in the moment",
      "Knows where you are in your treatment",
      "Never a substitute for your clinic's advice",
    ],
    sections: [
      {
        heading: "Talk or type",
        body: "Some moments call for typing a question quietly; some call for talking it through out loud. The companion handles both, and can log things hands-free while you're mid-injection.",
      },
      {
        heading: "It knows where you are",
        body: "Because it can see your protocol and phase, you don't have to re-explain your situation every time. Asking what happens next gives you an answer about your treatment, not a general article.",
      },
      {
        heading: "Where it stops",
        body: "The companion explains and supports — it does not diagnose, interpret your results, or tell you what to do about them. Anything clinical goes to your care team, and it will say so.",
      },
    ],
    screen: "companion",
    related: ["/ivf-medication-tracker", "/ivf-symptom-tracker"],
    lastmod: "2026-08-12",
  },
];

export const featurePageBySlug = (slug: string): FeaturePage | undefined =>
  featurePages.find((p) => p.slug === slug);
