import type { Faq } from "./faqs";

/**
 * FAQs for the hCG doubling calculator. Rendered visibly by the page AND
 * emitted as FAQPage structured data - same single-source rule as the homepage
 * and the due date calculator, because markup that doesn't match visible text
 * is a spam signal.
 *
 * These answers give published ranges and say where they come from. None of
 * them tells a reader what their own number means: see the header of
 * src/lib/hcg.ts for why that line is drawn where it is.
 */
export const hcgFaqs: Faq[] = [
  {
    q: "How is hCG doubling time calculated?",
    a: "It assumes the level grows exponentially between the two draws, then solves for how long a doubling would take at that rate. In full: doubling time = hours between draws multiplied by ln(2), divided by the natural log of the second result divided by the first. A rise from 100 to 200 in 48 hours gives a doubling time of exactly 48 hours; a rise from 100 to 153 in the same window works out at about 78 hours.",
  },
  {
    q: "How fast is beta hCG expected to rise in early pregnancy?",
    a: "The familiar rule is that it doubles every 48 to 72 hours, but the published curves are slower than that at the bottom end. Barnhart and colleagues (2004) put the minimum rise for the slowest 1% of viable intrauterine pregnancies at 53% over two days. Morse and colleagues (2012) proposed a more conservative 35% over two days, on the grounds that a small number of pregnancies that turn out viable rise that slowly. Those are population figures, and your clinic interprets your results against your history rather than against a table.",
  },
  {
    q: "Does a slow rise mean the cycle has failed?",
    a: "Not on its own. The whole point of the revised curves is that some pregnancies which rise more slowly than the classic rule still go on to be viable, which is why the published floors were lowered rather than raised. A case series in F&S Reports specifically documented viable intrauterine pregnancies after embryo transfer with an abnormal rate of rise. A single pair of numbers is a data point, not an outcome, and only your clinic can put it in context.",
  },
  {
    q: "My draws were not exactly 48 hours apart. Does that matter?",
    a: "Not for the arithmetic. Reference ranges are quoted over 48 hours, so a 41-hour or 55-hour gap cannot be compared to them directly. This calculator converts whatever interval you actually had into the equivalent change over 48 hours, which is why it asks for the time of day and not just the date.",
  },
  {
    q: "What does a single beta number tell me?",
    a: "Much less than people expect. Individual values at any given point after transfer span an enormous range, and a high or low first beta on its own predicts very little. The change between two draws carries far more information than either draw alone, which is why clinics order the second one.",
  },
  {
    q: "Why does hCG stop doubling later on?",
    a: "The rise decelerates as levels climb. Doubling times lengthen substantially by the time levels reach the thousands, and hCG stops being the informative test once an ultrasound can see something. ACOG suggests that if a discriminatory hCG level is used at all, it should be set conservatively high, as much as 3,500 mIU/mL, to avoid misdiagnosing an early pregnancy. Past that point the scan answers questions the bloodwork cannot.",
  },
  {
    q: "Could my trigger shot still be in my system?",
    a: "It can be, early on. An hCG trigger such as Ovidrel or Pregnyl is hCG, so a beta drawn too soon after it measures the injection rather than the pregnancy. It clears over roughly a week to two weeks depending on dose, and clinics time the first beta to fall past it. If you tested early at home and are comparing that number here, it may not mean what it appears to.",
  },
  {
    q: "Does this work the same for a frozen transfer?",
    a: "Yes. The arithmetic compares two blood results and does not care how the embryo got there, whether the transfer was fresh or frozen, or which day the embryo was at transfer. What those numbers are expected to look like at a given point does depend on the cycle, which is another reason the interpretation belongs with your clinic.",
  },
];
