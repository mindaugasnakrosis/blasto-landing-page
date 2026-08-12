# Medical review checklist

For the reviewer named on a Blasto guide. Signing off means your name,
credentials, and the review date appear publicly on the article, and that you
are willing to stand behind it.

This is not a formality. If an article fails any check below, send it back —
it cannot be published without your sign-off, and that gate exists so it can
be used.

## Before you start

- Ask who wrote it and what it was written from. Every factual claim should
  trace to a source listed at the bottom of the article.
- If the topic is outside your scope of practice, say so and don't sign.
  "Reviewed for accuracy and safety, not as a subject specialist" is an
  honest position — flag it and we'll note the limitation or find a
  specialist.

## Per article

**Accuracy**

- [ ] Every factual claim is correct as far as you know.
- [ ] Every claim about treatment, medication, or outcomes is supported by a
      listed source, and the source actually says what the article says it does.
- [ ] Numbers, ranges, and statistics are current and correctly stated —
      including whether they're per-cycle, per-transfer, or per-patient, which
      is the most common way IVF statistics get misreported.
- [ ] Nothing is stated with more confidence than the evidence supports. Where
      evidence is mixed or thin, the article says so.

**Safety**

- [ ] Nothing here could cause harm if a reader followed it literally.
- [ ] Anything that warrants urgent care (e.g. OHSS warning signs, severe pain,
      heavy bleeding) is flagged as such, with a clear instruction to contact
      their clinic.
- [ ] No dosing, timing, or protocol instruction that should come from the
      reader's own clinic.

**Scope**

- [ ] The article informs; it does not diagnose, prescribe, or tell the reader
      what to do about their own results.
- [ ] It defers to the reader's care team wherever a clinical decision is
      implied.
- [ ] The "informational only" disclaimer is present and accurate for this
      specific article.

**Tone**

- [ ] Nothing here would frighten someone mid-cycle without cause.
- [ ] Nothing implies a particular outcome is likely, expected, or deserved.
- [ ] It reads as though written for someone in treatment, not about them.

## Signing off

When it passes, we record in `src/lib/guides.ts`:

```ts
reviewer: {
  name: "Dr. <full name>",
  credentials: "<degree> — <role>, Blasto",   // e.g. "MD — General Practitioner"
  profileUrl: "<optional, a verifiable profile>",
},
reviewedOn: "YYYY-MM-DD",   // the date you actually read it
status: "published",
```

State your role accurately. If you are part of the Blasto team, say so — in-house
medical review is normal and honest. Do not word it to imply independent
third-party review.

## Re-review

Guidance changes. Articles carry a last-reviewed date publicly, so a stale one
is visible to readers. Re-check each article annually, or sooner if guidance
you're aware of has moved.
