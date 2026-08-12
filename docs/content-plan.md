# Content plan — SERP research, August 2026

## What this is and isn't

This is **SERP research**, not volume research. Every ranking observation below
came from running the query and reading the results. What's missing is search
volume and keyword difficulty, which need a data provider.

**Do not let anyone hand you volume numbers without a source.** Get them
yourself, free:

| Source | Gives you | Cost |
|---|---|---|
| [Google Keyword Planner](https://ads.google.com/aw/keywordplanner) | Volume ranges, related terms | Free with an Ads account (no spend needed; ranges are banded until you spend) |
| Google Search Console | Real impressions/clicks/position **for your own site** | Free — the highest-quality data you'll get, but only after you rank |
| [Ahrefs Free Keyword Generator](https://ahrefs.com/keyword-generator) | Top-10 volume + KD per query | Free, limited |
| Semrush / Ahrefs paid | Full volume, difficulty, competitor gap | ~$100+/mo |

Pair the volume numbers you pull with the competitive reads below. Volume alone
picks unwinnable head terms; SERP analysis alone picks winnable terms nobody
searches. You need both.

Also worth knowing: for a site with no rankings yet, Search Console is empty, so
Keyword Planner is the practical starting point.

---

## The single most important finding

**Low-authority sites are ranking on page one across this entire niche.**

Observed ranking for competitive IVF queries:

- `babymoms.blog` — ranks for IVF follicle size by day
- `theluckyegg.com` — ranks for **both** follicle-size-by-day **and** IVF due date calculator
- `theribbonbox.com`, `lumafertility.com` — rank for post-transfer symptoms
- `ivfpath.com` — ranks for stim medication schedule, with a free printable

These are not authority sites. They're small content sites executing exactly the
strategy in this document. `theluckyegg.com` is the closest thing to a model:
study what they publish and how they format it.

This is the evidence that the niche is winnable. It's also the evidence that the
window is open now and will close as bigger players notice.

## The second most important finding

**Format beats prose in these SERPs.** The winners are overwhelmingly:

- **Day-by-day breakdowns** — "follicle size by day", "after embryo transfer day by day"
- **Charts and tables** — the word "chart" appears in ranking titles repeatedly
- **Printables and templates** — `ivfpath.com` ranks a "Free Printable" schedule
- **Calculators** — an entire SERP of them for due dates

Essays lose. Structured, scannable, referenceable formats win. This matters more
than word count, and it's also what earns links: nobody links to your opinion,
they link to your chart.

## The third finding — the competitive set has grown

New IVF apps visible since the earlier research: **IVFVault**, **Embraya**,
**Olly**, **Embie**, alongside Alife, Berry, Bonzun, Ovom. App-intent queries
("ivf tracker app free") return almost entirely `apps.apple.com` listings.

Two implications. Competition is intensifying, so speed matters. And app-intent
queries are largely closed to you until Blasto has an App Store listing — which
is another argument for informational content being the near-term play.

---

## Prioritized article slate

Ranked by winnability, based on who currently holds the SERP. Each links to a
product page — that internal link is the point of the article.

### 1. IVF follicle size by day (chart)

- **Format:** day-by-day chart, mm ranges by stim day
- **Who ranks now:** `babymoms.blog`, `theluckyegg.com`, `cnyfertility.com`,
  clinic blogs. **Weakest competitive set found.**
- **Why you can win:** a personal blog holds a top position. Beatable with a
  better chart and real citations.
- **Links to:** `/ivf-results-tracker`, `/ivf-medication-tracker`
- **Reviewer note:** follicle size ranges and trigger criteria must be sourced
  and checked — this is the article where a wrong number does harm.

### 2. IVF medication schedule template (printable)

- **Format:** downloadable/printable template + explanation
- **Who ranks now:** `ivfpath.com` (free printable), Liv Hospital, CCRM,
  University of Rochester PDF, `americansurrogacy.com`
- **Why you can win:** clinic pages are static PDFs nobody maintains. A genuine
  printable is a link magnet.
- **Links to:** `/ivf-medication-tracker` — strongest commercial intent match on
  the whole slate; someone printing a med schedule is your exact user
- **Note:** Bonzun's `/appfeatures/medicationtracker/` ranks on this SERP. A
  *feature page* ranking here is direct proof the feature-page strategy works.

### 3. Two week wait symptoms day by day

- **Format:** day-by-day timeline
- **Who ranks now:** `get-carrot.com`, `surrogate.com`, `lumafertility.com`,
  `theribbonbox.com`, clinic sites
- **Why you can win:** mixed-quality SERP, no dominant authority. High emotional
  search intent and high repeat-visit behaviour.
- **Links to:** `/ivf-symptom-tracker`
- **Angle nobody owns:** every result lists symptoms; none say clearly that
  symptoms don't predict outcome because progesterone causes most of them. Lead
  with that and you're more useful than the entire first page.

### 4. Egg retrieval numbers explained (the funnel)

- **Format:** funnel diagram + attrition percentages by stage
- **Who ranks now:** Liv Hospital (multiple pages), `rescripted.com`,
  `rmanetwork.com`, `fertilityanswers.com`
- **Why it's harder:** more clinic authority here, and the topic is genuinely
  specialist.
- **Links to:** `/ivf-results-tracker` — perfect product match, your app draws
  this exact funnel
- **Reviewer note:** weakest fit for a GP reviewer. Consider deferring until you
  have specialist input, or scope it tightly to explaining terminology.

### 5. IVF calendar / full cycle timeline

- **Format:** phase-by-phase timeline
- **Who ranks now:** CCRM, Pacific Fertility, Idaho Reproductive, Liv Hospital —
  **mostly established clinics**
- **Why it's last:** the toughest set on this list, and the broadest query.
  Write it once the others have established some topical footing.
- **Links to:** `/ivf-medication-tracker`, `/guides`

### Tool (not an article): embryo transfer due date calculator

- **Who ranks now:** `ivfdatecalculator.org`, `ivfdatecalculator.com`,
  `theluckyegg.com`, `londonpregnancy.com`, `yourivfjourney.com`, RMA, Enfamil
- **Read:** saturated, but almost entirely by thin single-purpose sites. A
  well-built calculator on a real product site can compete.
- **Why it's still worth building:** calculators earn links passively in a way
  articles don't, and it needs no medical reviewer — the day-5 / day-3 arithmetic
  is arithmetic. Best effort-to-return ratio on this page.
- **Links to:** homepage, `/ivf-results-tracker`

---

## Internal linking architecture

The structure you described is right. The specifics that make it work:

```
Guide (informational intent)
   ↓  contextual link, descriptive anchor
Feature page (commercial intent, /ivf-medication-tracker)
   ↓
Homepage (brand + "IVF app")
```

**Rules:**

1. **Link from within the body**, at the moment the article names the problem
   the feature solves. A link in a footer block is worth far less than one
   inside a relevant sentence.
2. **Vary the anchor text.** "IVF medication tracker", "tracking your meds in
   Blasto", "an app that handles the schedule". Every article linking with the
   identical exact-match anchor "IVF app" is a recognisable manipulation
   footprint — it works against you, not for you.
3. **One or two product links per article, maximum.** These are guides, not
   funnels. Over-linking is both a quality signal problem and worse for readers.
4. **Link guides to each other.** The cluster's internal density is what tells
   Google this is a topic you cover, not a page you happen to have.
5. **The homepage should link to the hub**, and the hub to every published
   guide. Already wired.

**What to expect:** internal linking consolidates relevance and passes authority
between your own pages. It does not create authority. Nothing here substitutes
for external links — the calculator and the printable template are the two assets
on this list most likely to earn them.

---

## Honest expectation setting

These five articles will not move "ivf app". That term is contested by App Store
listings and established products, and the homepage competes for it on its own
merits plus whatever authority the site accrues.

What this slate can realistically do within a few months: rank for several
specific long-tail queries where the current competition is a personal blog,
bring in people actively in treatment, and route them to the feature pages. That
traffic converts better than the head term would anyway.

Revisit this document once Search Console has 90 days of impression data. At that
point you'll have real query data for your own site, which beats every estimate
in here.
