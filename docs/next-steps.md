# Next steps

Everything below is blocked on a human, not on code. As of 13 Aug 2026 the site
is deployed and verified; nothing is half-finished in the repo.

Tick items off as you go. Related reading: `docs/content-plan.md` (keyword
research), `docs/medical-review-checklist.md` (for the reviewer).

---

## 1. Do this first — the indexing question

Search Console showed **0 indexed pages / 30 not indexed** for blastoivf.com.
If that's accurate, nothing else on this list matters yet: the site can't rank
if it isn't in the index.

- [ ] Search Console → **Indexing → Pages** → read the "Why pages aren't
      indexed" table
- [ ] Note the reason for each group and roughly how many URLs each covers
- [ ] Bring that list back before doing any further SEO work

**What the answers likely mean:**

| Reason shown | What it means |
|---|---|
| *Duplicate, Google chose a different canonical* | The old canonical bug. Fixed 12 Aug — should clear on its own over a few weeks. |
| *Crawled – currently not indexed* | Google saw it and declined. Usually thin content or low site authority. Time + content. |
| *Discovered – currently not indexed* | Crawl budget. Normal for a new site; the sitemap helps. |
| *Excluded by 'noindex' tag* | Expected for `/about` and the 5 draft guides — **11 pages should be indexable, everything else noindex is intentional.** |
| *Not found (404)* / *Redirect error* | Real problem. Flag it. |

- [ ] Confirm the Domain property verified (the DNS TXT record is live and correct)

---

## 2. About page — needs your facts

The page is live but `noindex` and unlinked, because it contains placeholder
text and an **unverified claim**.

- [ ] Open `src/pages/About.tsx`
- [ ] Read the two ORIGIN options in the first section. **Option A says "we went
      through IVF ourselves" — that was written as a guess.** Keep it only if
      it's true; otherwise delete it and uncomment Option B.
- [ ] Replace `[WIFE'S NAME]` and `[CREDENTIALS]` throughout
- [ ] Decide whether to add a photo of the two of you — it does more for trust
      on a health site than any amount of copy
- [ ] Remove `noindex: true` from the `/about` entry in `src/lib/seo.ts`
- [ ] Restore the About link in `src/components/landing/Footer.tsx` (there's a
      comment marking where it was)
- [ ] Delete the now-stale assertion in `src/test/seo.test.tsx`
      ("keeps /about noindex while it still has bracketed placeholders")

Why it matters: a search quality rater landing on `/about` is asking "who is
behind this, and why should I trust them with fertility data?" Two named people,
one a physician, is a better answer than most funded competitors can give.

---

## 3. Medical reviewer — unblocks all five guides

Nothing in `src/lib/guides.ts` can publish without a named reviewer;
`publishBlockers()` enforces it.

- [ ] Give your wife `docs/medical-review-checklist.md`
- [ ] **She checks her licensing body's rules** on lending credentials to
      commercial health content before being named publicly. Do this first —
      it's a five-minute check that could change the plan.
- [ ] Agree how she's described. If she's on the team, say so ("Medical
      reviewer, Blasto"). Don't word it to imply independent third-party review.
- [ ] Decide scope. She's a strong fit for the medications, two-week-wait, and
      consultation articles. **The egg-retrieval-numbers article is really REI
      territory** — she can review it for accuracy and safety, but shouldn't be
      presented as the subject authority. Consider deferring that one.

To publish a guide once reviewed, set in `src/lib/guides.ts`:

```ts
sections: [...],           // the body
references: [...],         // sources the claims rest on
reviewer: { name: "...", credentials: "..." },
reviewedOn: "YYYY-MM-DD",  // the date she actually read it
status: "published",       // joins the sitemap automatically
```

---

## 4. Confirm demand before writing

Trends gives relative numbers only. Get absolute volume free from
[Keyword Planner](https://ads.google.com/aw/keywordplanner) (needs a Google Ads
account; no spend required, figures come banded).

- [ ] Check the printable cluster: `ivf printable calendar`,
      `printable ivf medication calendar template`, `ivf planner printable free pdf`,
      `free printable ivf calendar pdf`, `ivf tracker template`
- [ ] Check `ivf due date calculator` and `after embryo transfer day by day`
- [ ] Update `docs/content-plan.md` with real numbers and re-order the slate

The printable cluster is the open question: the exact phrase measured near-zero,
but the cluster looks wider and people buy IVF trackers on Etsy. That decides
whether article #2 is worth writing.

---

## 5. Article backlog (in write order)

Ordered by demand × winnability. Full evidence in `docs/content-plan.md`.
Each needs body copy, sources, and review before it goes live.

- [ ] **After embryo transfer, day by day** → links to `/ivf-symptom-tracker`
      Highest demand of the set. Build as one page with a section per day (3–10).
      *The angle nobody has taken:* every ranking page lists symptoms; none lead
      with the fact that progesterone causes most of them, so symptom-spotting
      predicts nothing.
- [ ] **IVF printable calendar** → `/ivf-medication-tracker` *(pending §4)*
      Strongest commercial intent. Make a real downloadable PDF — it's a link magnet.
- [ ] **IVF follicle size by day** → `/ivf-results-tracker`
      Low demand but the weakest competition found anywhere. One page, section per
      stim day. Sizes and trigger criteria must be sourced — a wrong number here
      does harm.
- [ ] **Egg retrieval numbers explained** → `/ivf-results-tracker`
      Harder SERP, and the reviewer-fit problem above.
- [ ] **IVF calendar timeline** → `/ivf-medication-tracker`
      Toughest set (established clinics). Write last.

**Writing rules:** original prose from primary sources (ESHRE, ASRM, Cochrane) —
never rephrased competitor articles, which Google's helpful-content system
filters and which can't outrank the thing they were rephrased from. Vary the
anchor text on internal links; identical exact-match "IVF app" anchors across a
cluster is a manipulation footprint. One or two product links per article.

---

## 6. Passive — no action, just wait

- [ ] ~90 days after 12 Aug 2026, pull Search Console query data and redo the
      keyword work on real numbers instead of estimates
- [ ] Watch whether the deindexed pages recover as the canonical fix propagates
- [ ] When the app hits the App Store: set `APP_STORE_URL` in `src/lib/site.ts`
      and every CTA flips automatically. That also opens the `apps.apple.com`
      surface, which holds most of the app-intent SERP.

---

## Known open judgment calls

- **`/guides` is indexable with zero published articles.** Kept indexed so the
  hub gets crawled early; it's thin until a guide lands. Flip to `noindex` in
  `src/lib/seo.ts` if that becomes a concern.
- **Google Fonts is render-blocking.** Flagged but not fixed. Self-hosting Inter
  would remove a third-party round trip and a GDPR consideration for EU users.
  Moderate win, not urgent now that images are handled.
- **Nothing here competes for "ivf app" directly.** That term is contested by App
  Store listings and established products. These pages target queries where page
  one is currently personal blogs. That traffic converts better anyway.
