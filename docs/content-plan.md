# Content plan — SERP + demand research, August 2026

## Data sources used

| Source | What it gave | Limitation |
|---|---|---|
| Google SERPs (manual) | Who ranks, how strong, what format wins | No volume |
| Google autocomplete (public endpoint) | Real queries people type, ordered roughly by popularity | No volume |
| Google Trends (public) | **Relative** interest between terms, 0–100 | Not absolute; normalized per comparison |
| Google Keyword Planner | *Not used* — needs an Ads login | Get this yourself |

**Trends numbers below are relative indices, not searches per month.** Trends
normalizes each comparison to its own biggest term, so an index of 5 does not
mean "no volume" — it means "small next to the largest term in *that* chart."
Two terms are only comparable if they appeared in the same comparison.

To get absolute volume, log into [Keyword Planner](https://ads.google.com/aw/keywordplanner)
(free with an Ads account, no spend required — figures come banded until you
spend) and re-check the terms below. Once the site ranks, Search Console gives
better data than any estimate here.

---

## Demand data (Google Trends, US, past 12 months)

**Comparison 1 — product terms**

| Term | Relative index |
|---|---|
| ivf calculator | ~70 |
| ivf app | ~52 |
| ivf calendar | ~20 |
| ivf tracker | ~2 |

**Comparison 2 — content targets**

| Term | Relative index |
|---|---|
| two week wait | ~72 |
| embryo transfer due date | ~15 |
| ivf follicle size | ~3 |
| ivf medication schedule | ~1 |

**Comparison 3 — rescaled without the dominant term**

| Term | Relative index |
|---|---|
| ivf due date calculator | ~72 |
| embryo transfer due date | ~24 |
| ivf follicle size | ~5 |
| ivf medication schedule | ~1 |

### What this changes

**"ivf calculator" outdraws "ivf app".** The calculator play is not a
nice-to-have; it targets more demand than the term this whole project started
with, needs no medical reviewer, and earns links passively.

**"ivf tracker" is negligible as a standalone term** (~2) even though "ivf
tracker app" is the top autocomplete for it. Don't build a page around the bare
phrase.

**Some "ivf app" demand is news-driven, not product-seeking.** Its rising
related queries were "new york times" (breakout), "ivf news" (+110%),
"wikipedia" (+80%), "ivf cost" (+70%) — a news cycle, not people shopping for an
app. Treat the head term's commercial value as lower than its raw volume.

**A correction to the earlier plan:** ranking by SERP weakness alone put
"ivf follicle size by day" first and "ivf medication schedule template" second.
Those are the two *smallest* terms measured (~5 and ~1). They're still cheap
wins worth having for topical depth — just not the place to start.

---

## Autocomplete findings (real queries, public endpoint)

**A day-ladder exists for two topics.** Both should be built as one page with a
section per day, not separate articles:

- `ivf follicle size day 10 / 8 / 12 / 9 / 6 / 5 / 7 / 4 / 11`
- `after embryo transfer day by day symptoms`, then `day 6 / 7 / 5 / 4 / 3 / 8 / 10 symptoms`

**A "free printable" cluster nobody on this list owns:**

- `ivf printable calendar`, `printable ivf medication calendar template`,
  `ivf planner printable free pdf`, `free printable ivf calendar pdf`,
  `printable ivf journal`
- Also `ivf tracker template`, `ivf tracker journal`, `ivf tracker etsy`,
  `ivf tracker book` — people are buying physical trackers on Etsy. That's
  demand for the job your app does, expressed as a paper product.
- The exact phrase "ivf medication schedule" tested at ~1, but this cluster is
  broader than that phrase. **Test the printable terms in Keyword Planner
  separately** before writing it off.

**Disambiguation warning — "two week wait" is two different queries.**
Autocomplete returns `two week wait referral` and `two week wait pathway`,
which are the UK NHS *cancer referral* pathway. Targeting the bare phrase means
competing with NHS cancer content at completely different intent. Target
`two week wait ivf` and `after embryo transfer day by day` instead.

**Reddit appears throughout** (`ivf follicle size day 8 reddit`, `two week wait
reddit`). People want lived experience, and Google surfaces Reddit heavily. It's
a competitor for these SERPs and a distribution channel worth using honestly.

---

## Revised priority

Ordered by demand × winnability, not winnability alone.

### 1. IVF due date calculator (tool, not article)

Highest measured demand of anything here (~72). SERP is saturated but almost
entirely thin single-purpose sites — `ivfdatecalculator.org`,
`ivfdatecalculator.com`, `theluckyegg.com`, `londonpregnancy.com`,
`yourivfjourney.com` — plus RMA and Enfamil. A calculator on a real product site
can compete. **No medical reviewer needed**: day-3/day-5/day-6 transfer dating is
arithmetic. Best effort-to-return ratio available, and unblocked today.
Links to: homepage, `/ivf-results-tracker`.

### 2. After embryo transfer, day by day

Highest demand of the article set. Competition is mixed-quality — `get-carrot.com`,
`surrogate.com`, `lumafertility.com`, `theribbonbox.com`, clinic sites — with no
dominant authority. Build as one page with a section per day (3–10) to match the
autocomplete ladder. **The angle nobody has taken:** every ranking page lists
symptoms; none lead with the fact that progesterone causes most of them, so
symptom-spotting predicts nothing. That single framing makes it more useful than
the entire current page one. Links to: `/ivf-symptom-tracker`.

### 3. IVF printable calendar / planner

Verify volume in Keyword Planner first — the exact phrase tested low but the
cluster is wider. If it holds up, this has the strongest commercial intent on the
list: someone printing a medication schedule is exactly your user, and Etsy sales
prove willingness to act. A real PDF is a link magnet.
Note: Bonzun's `/appfeatures/medicationtracker/` ranks on this SERP — direct proof
a feature page can win here. Links to: `/ivf-medication-tracker`.

### 4. IVF follicle size by day (chart)

Low demand (~5) but the **weakest competition found anywhere** — a personal blog,
`babymoms.blog`, holds a top position, alongside `theluckyegg.com` and
`cnyfertility.com`. Cheap win, modest traffic, good topical depth. Build as one
page with a section per stim day.
Reviewer note: size ranges and trigger criteria must be sourced and checked —
this is where a wrong number does harm. Links to: `/ivf-results-tracker`.

### 5. Egg retrieval numbers explained

Harder SERP (Liv Hospital holds multiple positions, plus `rescripted.com`,
`rmanetwork.com`). Perfect product match — your app draws this exact funnel — but
the **weakest fit for a GP reviewer**. Consider scoping to terminology until
specialist input exists. Links to: `/ivf-results-tracker`.

### 6. IVF calendar / full cycle timeline

Toughest set on the list: CCRM, Pacific Fertility, Idaho Reproductive, Liv
Hospital. Broad query, established clinic competition. Write last, once the
cluster has topical footing. Links to: `/ivf-medication-tracker`.

---

## Competitive landscape

**Low-authority sites hold page one across this niche.** `babymoms.blog`,
`theluckyegg.com` (ranks for *both* the follicle chart and the due date
calculator), `theribbonbox.com`, `lumafertility.com`, `ivfpath.com`. These are
small content sites running exactly this strategy. `theluckyegg.com` is the
closest model — worth studying directly.

**Format beats prose.** Winners are day-by-day breakdowns, charts, printables,
and calculators. "Chart" recurs in ranking titles. Essays lose, and nobody links
to an essay.

**The app field is crowding.** IVFVault, Embraya, Olly, and Embie all surfaced
in this round and weren't present earlier. App-intent queries return almost
entirely `apps.apple.com` listings — closed to you until Blasto launches, which
is another argument for the informational and tool plays now.

---

## Internal linking

```
Guide / calculator (informational intent)
   ↓  contextual link, descriptive anchor, in the body
Feature page (commercial intent, /ivf-medication-tracker)
   ↓
Homepage (brand + "IVF app")
```

1. Link from **within the body**, where the article names the problem the feature
   solves. Footer links are worth far less.
2. **Vary the anchor text.** Identical exact-match "IVF app" anchors across a
   whole cluster is a recognisable manipulation footprint that works against you.
3. **One or two product links per article.** These are guides, not funnels.
4. **Link guides to each other** — cluster density is the signal.
5. Homepage → hub → every published guide. Already wired.

Internal linking consolidates authority between your pages; it doesn't create
any. The calculator and the printable are the two assets most likely to earn
external links.

---

## Next actions

1. **Verify in Keyword Planner**: the printable cluster, `ivf due date calculator`,
   `after embryo transfer day by day`. Absolute numbers will re-order this list
   again and that's fine — it's what the list is for.
2. **Build the calculator first.** Highest demand, no reviewer dependency,
   nothing blocking it.
3. Re-run this research before writing each article; SERPs move.
4. Revisit once Search Console has 90 days of impressions — your own query data
   beats every estimate here.
